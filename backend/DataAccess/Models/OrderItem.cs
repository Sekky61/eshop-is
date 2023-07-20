
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class OrderItem
    {
        [Key]
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public Guid MerchandiseId { get; set; }
        public Merchandise Item { get; set; } = null!;

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public OrderItem()
        {
        }

        public OrderItem(Merchandise item, int quantity, decimal price)
        {
            Item = item;
            Quantity = quantity;
            Price = price;
        }
    }
}
