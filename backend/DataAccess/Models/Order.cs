using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Order
    {
        public Guid Id { get; set; }

        public Guid? CustomerId { get; set; }
        public Customer? Customer { get; set; }

        public ICollection<OrderItem> Items { get; set; } = null!;

        // When the order was created
        public DateTime CreatedTime { get; set; }

        public decimal TotalPrice { get; set; }

        public Guid AddressId { get; set; }
        public Address Address { get; set; } = null!;

        public Guid PaymentInformationId { get; set; }
        public CreditCard PaymentInformation { get; set; } = null!;
        public OrderStatus Status { get; set; }

        public Order()
        {
            Items = new HashSet<OrderItem>();
        }

        public Order(ICollection<OrderItem> items)
        {
            decimal total = 0;
            foreach (var item in items)
            {
                total += item.Price * item.Quantity;
            }

            Items = items;
            TotalPrice = total;
        }
    }
}