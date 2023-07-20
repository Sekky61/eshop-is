using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Customer : Account
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public ICollection<Order> Orders { get; set; } = null!;

        public Guid AddressId { get; set; }
        public Address Address { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public Guid? PaymentInformationId { get; set; }
        public CreditCard? PaymentInformation { get; set; } = null!;

        public Guid BasketId { get; set; }
        public Basket Basket { get; set; } = null!;

        public override string GetRole()
        {
            return "Customer";
        }

        public string GetFullName() => $"{FirstName} {LastName}";

        public Customer()
        {
            Orders = new HashSet<Order>();
            Basket = new Basket();
        }
    }
}