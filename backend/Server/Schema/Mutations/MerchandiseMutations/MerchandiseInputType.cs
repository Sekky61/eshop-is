using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Mutations.MerchandiseMutations
{
    public class NewMerchandiseInput
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public string Category { get; set; } = null!;
    }

    // Non-null fields will be updated
    // todo images
    public class MerchandiseUpdateInput
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public decimal? Price { get; set; }
        public int? InStockCount { get; set; }
    }
}