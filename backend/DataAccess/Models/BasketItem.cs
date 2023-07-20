
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class BasketItem
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("BasketId")]
        public Guid BasketId { get; set; }
        public Basket Basket { get; set; } = null!;

        public Guid MerchandiseId { get; set; }
        public Merchandise Item { get; set; } = null!;

        public int Quantity { get; set; }

        public BasketItem()
        {
        }

        public BasketItem(Merchandise item, int quantity)
        {
            Item = item;
            Quantity = quantity;
        }
    }
}
