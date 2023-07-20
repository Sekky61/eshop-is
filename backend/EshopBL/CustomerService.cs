using System.Security.Claims;
using DataAccess.Models;
using DataAccess.Repositories;
using Microsoft.Extensions.Logging;

namespace EshopBL;

public class CustomerService
{
    private readonly AccountService _accountService;
    private readonly AuthenticationService _authenticationService;
    private readonly IAnonymousCustomerRepository _anonymousCustomerRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IBasketRepository _basketRepository;
    private readonly IMerchandiseRepository _merchandiseRepository;
    private readonly IOrderRepository _orderRepository;
    private readonly IBasketItemRepository _basketItemRepository;
    private readonly IAddressRepository _addressRepository;
    private readonly ICreditCardRepository _creditCardRepository;
    private readonly ILogger<CustomerService> _logger;

    public CustomerService(
        ICustomerRepository customerRepository,
        IMerchandiseRepository merchandiseRepository,
        IOrderRepository orderRepository,
        IBasketItemRepository basketItemRepository,
        AccountService accountService,
        IAnonymousCustomerRepository anonymousCustomerRepository,
        IBasketRepository basketRepository,
        ILogger<CustomerService> logger,
        AuthenticationService authenticationService,
        IAddressRepository addressRepository,
        ICreditCardRepository creditCardRepository
        )
    {
        _customerRepository = customerRepository;
        _merchandiseRepository = merchandiseRepository;
        _orderRepository = orderRepository;
        _basketItemRepository = basketItemRepository;
        _accountService = accountService;
        _anonymousCustomerRepository = anonymousCustomerRepository;
        _basketRepository = basketRepository;
        _logger = logger;
        _authenticationService = authenticationService;
        _addressRepository = addressRepository;
        _creditCardRepository = creditCardRepository;
    }

    public async Task<IEnumerable<Customer>> GetCustomers()
    {
        IEnumerable<Customer> customers = await _customerRepository.GetAll();

        return customers;
    }

    public async Task<Customer?> GetCustomerById(Guid id)
    {
        Customer? customer = await _customerRepository.GetById(id);

        return customer;
    }

    public async Task<Customer> UpdateCustomer(Customer customer)
    {
        Customer updatedCustomer = await _customerRepository.Update(customer);

        return updatedCustomer;
    }

    public async Task<int> GetBasketItemCount(Guid customerId)
    {
        Basket? basket = await GetBasketByCustomerId(customerId);

        if (basket == null)
        {
            return 0;
        }

        return basket.BasketItems.Sum(bi => bi.Quantity);
    }

    // Add to basket by customer id
    // Customer can also be anonymous
    public async Task<bool> SetCartItem(Guid customerId, Guid merchandiseId, int quantity)
    {
        Basket? basket = await GetBasketByCustomerId(customerId);

        if (basket == null)
        {
            _logger.LogWarning($"Basket for customer {customerId} not found");
            return false;
        }

        if (basket.BasketItems == null)
        {
            _logger.LogWarning($"Basket items for customer {customerId} not found");
            return false;
        }

        // Get merch 
        Merchandise? merch = await _merchandiseRepository.GetById(merchandiseId);

        if (merch == null)
        {
            return false;
        }

        // Check if merch is already in basket
        BasketItem? basketItem = basket.BasketItems.FirstOrDefault(bi => bi.Item.Id == merch.Id);

        if (basketItem == null)
        {
            // Not found in basket

            if (quantity == 0)
            {
                return true;
            }

            // Add merch to basket
            basket.BasketItems.Add(new BasketItem
            {
                Item = merch,
                Quantity = quantity
            });
            _logger.LogInformation($"Added merch {merch.Id} to basket {basket.Id}");
        }
        else
        {
            // Already in basket

            if (quantity == 0)
            {
                basket.BasketItems.Remove(basketItem);
                await _basketItemRepository.Delete(basketItem.Id);
                _logger.LogInformation($"Removed merch {merch.Id} from basket {basket.Id}");
                return true;
            }

            // Update merch quantity
            basketItem.Quantity = quantity;
            _logger.LogInformation($"Updated merch {merch.Id} to quantity {quantity} in basket {basket.Id}");
        }

        // Update basket
        Basket updated = await _basketRepository.Update(basket);

        return true;
    }

    // Get basket by customer id
    // Customer can also be anonymous
    public async Task<Basket?> GetBasketByCustomerId(Guid id)
    {
        Customer? customer = await GetCustomerById(id);

        if (customer == null)
        {
            // Search in anonymous customers
            AnonymousCustomer? anonymousCustomer = await _anonymousCustomerRepository.GetById(id);

            if (anonymousCustomer == null)
            {
                return null;
            }

            _logger.LogInformation($"Found anonymous customer with basket {anonymousCustomer.Basket.Id}");

            if (anonymousCustomer.Basket == null)
            {
                throw new Exception("Anonymous customer's basket is null");
            }
            return anonymousCustomer.Basket;
        }

        if (customer.Basket == null)
        {
            customer.Basket = new Basket();
        }

        return customer.Basket;
    }

    // Customer can also be anonymous
    public async Task<bool> ClearCart(Guid customerId)
    {
        Basket? basket = await GetBasketByCustomerId(customerId);

        if (basket == null)
        {
            return false;
        }

        bool success = await _basketItemRepository.DeleteBasket(basket.Id);

        _logger.LogInformation($"Cleared basket {basket.Id}");
        return true;
    }

    private async Task<bool> CreateOrder(Guid customerId, Address address, CreditCard creditCard)
    {
        Basket? basket = await GetBasketByCustomerId(customerId);

        if (basket == null)
        {
            return false;
        }

        // assert address and credit card have ids
        if (address.Id == Guid.Empty || creditCard.Id == Guid.Empty)
        {
            throw new Exception("Address or credit card id is empty");
        }

        decimal total = basket.BasketItems.Sum(bi => bi.Item.Price * bi.Quantity);

        Order order = new Order
        {
            CreatedTime = DateTime.Now,
            CustomerId = customerId,
            AddressId = address.Id,
            PaymentInformationId = creditCard.Id,
            Items = basket.BasketItems.Select(bi => new OrderItem
            {
                MerchandiseId = bi.MerchandiseId,
                Price = bi.Item.Price,
                Quantity = bi.Quantity
            }).ToList(),
            Status = OrderStatus.Pending,
            TotalPrice = total
        };

        Console.WriteLine($"Creating order {order.Id} with {order.Items.Count} items");

        Order created = await _orderRepository.Create(order);

        _logger.LogInformation($"Created order {created.Id} for customer {customerId}");

        return true;
    }

    // Place an order
    // 
    // 1. Check if customer exists and is Customer or AnonymousCustomer
    // 2. Check if customer has a basket and is not empty
    // 3. Check that customer has an address and a credit card or that it has been provided
    // 4. Create order
    // 5. If customer is Customer, update customer's order history
    public async Task<bool> OrderBasket(Guid customerId, Address? address, CreditCard? creditCard)
    {
        bool isAnyCustomer = await IsCustomer(customerId);

        if (!isAnyCustomer)
        {
            return false;
        }

        bool hasToBeRegisteredCustomer = address == null || creditCard == null;

        Customer? customer = await GetCustomerById(customerId);
        bool isRegisteredCustomer = customer != null;

        if (!isRegisteredCustomer && hasToBeRegisteredCustomer)
        {
            // Some data would be missing
            return false;
        }

        // Customer is not anonymous
        Address customerAddress;
        if (address == null)
        {
            // Pull address from customer
            if (customer.Address == null)
            {
                _logger.LogWarning($"Customer {customerId} has no address and no address was provided");
                return false;
            }
            customerAddress = customer.Address;
        }
        else
        {
            // Add address to database
            customerAddress = await _addressRepository.Create(address);
        }

        CreditCard customerCreditCard;
        if (creditCard == null)
        {
            if (customer.PaymentInformation == null)
            {
                _logger.LogWarning($"Customer {customerId} has no credit card and no credit card was provided");
                return false;
            }
            customerCreditCard = customer.PaymentInformation;
        }
        else
        {
            // Add credit card to database
            customerCreditCard = await _creditCardRepository.Create(creditCard);
        }


        Basket? basket = await GetBasketByCustomerId(customerId);

        if (basket == null)
        {
            _logger.LogWarning($"Anonymous customer {customerId} has no basket");
            return false;
        }

        if (basket.BasketItems.Count == 0)
        {
            return false;
        }

        // Create order
        bool success = await CreateOrder(customerId, customerAddress, customerCreditCard);

        if (!success)
        {
            return false;
        }

        // Clear basket
        bool cleared = await ClearCart(customerId);

        if (!cleared)
        {
            _logger.LogError($"Failed to clear basket {basket.Id}");
        }

        return true;
    }

    public async Task<AnonymousCustomer> CreateAnonymousCustomer()
    {
        AnonymousCustomer customer = new AnonymousCustomer
        {
            Id = Guid.NewGuid(),
            Basket = new Basket()
        };

        _logger.LogInformation($"Creating anonymous customer {customer.Id}");
        return await _anonymousCustomerRepository.Create(customer);
    }

    public async Task<bool> IsCustomer(Guid value)
    {
        // Check if customer exists
        Customer? customer = await _customerRepository.GetById(value);

        if (customer != null)
        {
            return true;
        }

        // Check if anonymous customer exists
        AnonymousCustomer? anonymousCustomer = await _anonymousCustomerRepository.GetById(value);

        if (anonymousCustomer != null)
        {
            return true;
        }

        return false;
    }

    // Any admin can edit customers
    // Customers can edit themselves
    public bool CanEditCustomer(ClaimsPrincipal claimsPrincipal, Guid customerId)
    {
        string? role = _authenticationService.GetRoleFromClaim(claimsPrincipal);

        if (role == "Admin")
        {
            return true;
        }

        Guid? userId = _authenticationService.GetUserIdFromClaim(claimsPrincipal);

        return userId == customerId;
    }

    public async Task<bool> DeleteCustomer(Guid customerId)
    {
        // Check if customer exists
        Customer? customer = await _customerRepository.GetById(customerId);

        if (customer == null)
        {
            return false;
        }

        await _customerRepository.Delete(customerId);

        return true;
    }
}
