using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class AnonymousCustomer
    {
        public Guid Id { get; set; }

        public Guid BasketId { get; set; }
        public Basket Basket { get; set; } = null!;

        public AnonymousCustomer()
        {
            Basket = new Basket();
        }
    }
}
