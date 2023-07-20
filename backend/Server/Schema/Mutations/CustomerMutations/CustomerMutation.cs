using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using HotChocolate;
using JWT;
using EshopBL;
using HotChocolate.Authorization;
using System.Security.Claims;
using Server.QueryHelpers;
using API.Schema.Queries.CustomerQueries;

namespace API.Schema.Mutations.CustomerMutations
{
    public class UpdateCustomerInput
    {
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public string? PhoneNumber { get; set; } = null!;
        public AddressInput? Address { get; set; } = null!;
        public CreditCardInput? PaymentInformation { get; set; } = null!;
    }

    public class CartManipInput
    {
        public Guid MerchandiseId { get; set; }
        public int Quantity { get; set; }
    }

    public class AddressInput
    {
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
    }

    public class CreditCardInput
    {
        public string CardNumber { get; set; } = null!;
        public string CardHolderName { get; set; } = null!;
        public string ExpirationDate { get; set; } = null!;
        public string Ccv { get; set; } = null!;
    }

    public class SendOrderInput
    {
        // If address is present, it will be used instead of the one in the database
        public AddressInput? Address { get; set; }

        // If credit card is present, it will be used instead of the one in the database
        public CreditCardInput? CreditCard { get; set; }
    }

    [ExtendObjectType(typeof(Mutation))]
    public class CustomerMutation
    {
        private readonly CustomerService _customerService;

        public CustomerMutation(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [Authorize("CustomerOrAdmin")]
        [UseMutationConvention]
        public async Task<CustomerInfo?> UpdateCustomer(ClaimsPrincipal claimsPrincipal, Guid customerId, UpdateCustomerInput input)
        {
            // Check permissions
            bool canEdit = _customerService.CanEditCustomer(claimsPrincipal, customerId);
            Console.WriteLine(canEdit);

            if (!canEdit)
            {
                return null;
            }

            Customer? customer = await _customerService.GetCustomerById(customerId);

            if (customer == null)
            {
                return null;
            }

            customer.FirstName = input.FirstName ?? customer.FirstName;
            customer.LastName = input.LastName ?? customer.LastName;
            customer.PhoneNumber = input.PhoneNumber ?? customer.PhoneNumber;
            customer.Address = input.Address != null ? new Address
            {
                Street = input.Address.Street,
                City = input.Address.City,
                State = input.Address.State,
                PostalCode = input.Address.PostalCode
            } : customer.Address;
            customer.PaymentInformation = input.PaymentInformation != null ? new CreditCard
            {
                CardNumber = input.PaymentInformation.CardNumber,
                CardHolderName = input.PaymentInformation.CardHolderName,
                ExpirationDate = input.PaymentInformation.ExpirationDate,
                Ccv = input.PaymentInformation.Ccv
            } : customer.PaymentInformation;


            Customer updatedCustomer = await _customerService.UpdateCustomer(customer);

            return new CustomerInfo(updatedCustomer);
        }

        // Set the quantity of a merchandise item in the cart
        // Can be used to add, remove or set the quantity of an item
        [Authorize("Customers")]
        public async Task<bool> SetCartItem(ClaimsPrincipal claimsPrincipal, CartManipInput input)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return false;
            }

            return await _customerService.SetCartItem(id.Value, input.MerchandiseId, input.Quantity);
        }

        [Authorize("Customers")]
        public async Task<bool> ClearCart(ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return false;
            }

            return await _customerService.ClearCart(id.Value);
        }

        [Authorize("Customers")]
        public async Task<bool> OrderBasket(ClaimsPrincipal claimsPrincipal, SendOrderInput input)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return false;
            }

            Address? address = input.Address == null ? null : new Address
            {
                Street = input.Address.Street,
                City = input.Address.City,
                State = input.Address.State,
                PostalCode = input.Address.PostalCode
            };

            CreditCard? creditCard = input.CreditCard == null ? null : new CreditCard
            {
                CardNumber = input.CreditCard.CardNumber,
                CardHolderName = input.CreditCard.CardHolderName,
                ExpirationDate = input.CreditCard.ExpirationDate,
                Ccv = input.CreditCard.Ccv
            };

            return await _customerService.OrderBasket(id.Value, address, creditCard);
        }

        [Authorize("Customers")]
        public async Task<bool> DeleteSelf(ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return false;
            }

            return await _customerService.DeleteCustomer(id.Value);
        }
    }
}