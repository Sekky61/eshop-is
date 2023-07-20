using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Schema.Mutations;
using API.Schema.Queries.MerchandiseQueries;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using HotChocolate;
using HotChocolate.Authorization;
using Server.QueryHelpers;

namespace API.Schema.Queries.CustomerQueries
{

    public class CustomerInfo
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;
        public async Task<List<OrderInfo>> GetOrders([Service] OrderService orderService)
        {
            ICollection<Order> orders = await orderService.GetOrdersByCustomerId(Id);

            if (orders == null)
            {
                throw new Exception("No orders found");
            }

            // Map the order to the order info
            List<OrderInfo> orderInfos = orders.Select(order =>
            {
                return new OrderInfo
                {
                    Id = order.Id,
                    Address = order.Address,
                    OrderDate = order.CreatedTime,
                    Status = order.Status.ToString(),
                    TotalPrice = order.TotalPrice
                };
            }).ToList();

            return orderInfos;
        }
        public Address? Address { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;
        public CreditCard? PaymentInformation { get; set; } = null!;

        public CustomerInfo()
        {
        }

        public CustomerInfo(Customer customer)
        {
            Id = customer.Id;
            FirstName = customer.FirstName;
            LastName = customer.LastName;
            Email = customer.Email;
            Address = customer.Address;
            PhoneNumber = customer.PhoneNumber;
            PaymentInformation = customer.PaymentInformation;
        }
    }

    public class BasketInfo
    {
        public Guid CustomerId { get; set; }

        public async Task<List<BasketItemInfo>> GetItems([Service] CustomerService customerService, ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return new List<BasketItemInfo>();
            }

            Basket? basket = await customerService.GetBasketByCustomerId(id.Value);

            if (basket == null)
            {
                throw new Exception("Basket not found in GetBasketInfo");
            }

            List<BasketItemInfo> basketItemInfos = basket.BasketItems.Select(basketItem =>
            {
                return new BasketItemInfo
                {
                    Id = basketItem.Id,
                    MerchandiseId = basketItem.MerchandiseId,
                    Quantity = basketItem.Quantity,
                };
            }).ToList();

            return basketItemInfos;
        }

        public async Task<int> GetBasketItemCount([Service] CustomerService customerService)
        {
            return await customerService.GetBasketItemCount(CustomerId);
        }
    }

    public class BasketItemInfo
    {
        public Guid Id { get; set; }
        public Guid MerchandiseId { get; set; }
        public int Quantity { get; set; }

        public async Task<MerchandiseInfo> GetMerchandise([Service] MerchandiseService merchandiseService)
        {
            Merchandise? merchandise = await merchandiseService.GetMerchandiseById(MerchandiseId);

            if (merchandise == null)
            {
                throw new Exception("Merchandise not found");
            }

            return new MerchandiseInfo
            {
                Id = merchandise.Id,
                Name = merchandise.Name,
                Description = merchandise.Description,
                Price = merchandise.Price,
                CategoryId = merchandise.Category.Id,
                CategoryName = merchandise.Category.Name,
                Stock = merchandise.InStockCount
            };
        }
    }

    [ExtendObjectType(typeof(Query))]
    public class CustomerQuery
    {
        private readonly CustomerService _customerService;
        private readonly ILogger<CustomerQuery> _logger;

        public CustomerQuery(CustomerService customerService, ILogger<CustomerQuery> logger)
        {
            _customerService = customerService;
            _logger = logger;
        }

        public async Task<CustomerInfo?> GetCustomerInfo(ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return null;
            }

            Customer? customer = await _customerService.GetCustomerById(id.Value);

            if (customer == null)
            {
                // Not a customer (an admin or manager)
                Console.WriteLine("GetCustomerInfo: Not a customer -- return null");
                return null;
            }

            return new CustomerInfo
            {
                Id = customer.Id,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Address = customer.Address,
                PhoneNumber = customer.PhoneNumber,
                PaymentInformation = customer.PaymentInformation,
            };
        }

        [Authorize("Admin")]
        public async Task<IEnumerable<CustomerInfo>> GetCustomers()
        {
            var all = await _customerService.GetCustomers();

            return all.Select(account => new CustomerInfo
            {
                Id = account.Id,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Email = account.Email,
                Address = account.Address,
                PhoneNumber = account.PhoneNumber,
                PaymentInformation = account.PaymentInformation,
            });
        }

        public async Task<BasketInfo?> GetBasketInfo(ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return null;
            }

            // Check if the user is a customer or anonymous customer
            bool isCustomer = await _customerService.IsCustomer(id.Value);

            if (!isCustomer)
            {
                // Not a customer (an admin or manager)
                _logger.LogInformation($"{id} is not a customer, but role: {claimsPrincipal.FindFirstValue(ClaimTypes.Role)}");
                return null;
            }

            return new BasketInfo
            {
                CustomerId = id.Value
            };
        }

    }
}