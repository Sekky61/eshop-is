using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Merchandise
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public ICollection<ImageUri> Images { get; set; } = null!;
        public decimal Price { get; set; }
        public int InStockCount { get; set; }
        public int CurrentlyWatching { get; set; }

        // For the many-to-many relationship between Merchandise and Order
        public virtual ICollection<Order> Orders { get; set; } = null!;

        // For the many-to-many relationship between Merchandise and Customer
        public virtual ICollection<Basket> Baskets { get; set; } = null!;

        public Merchandise()
        {
            Images = new HashSet<ImageUri>();
            Orders = new HashSet<Order>();
            Baskets = new HashSet<Basket>();
        }
    }
}