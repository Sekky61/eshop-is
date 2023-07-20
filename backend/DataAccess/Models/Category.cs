using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
    }
}