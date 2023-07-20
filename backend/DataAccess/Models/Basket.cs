using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class Basket
    {
        [Key]
        public Guid Id { get; set; }
        public virtual ICollection<BasketItem> BasketItems { get; set; } = null!;

        public Basket()
        {
            BasketItems = new HashSet<BasketItem>();
        }
    }
}
