using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using DataAccess.Models;
using EshopBL;
using HotChocolate;
using HotChocolate.Data.Filters;

namespace API.Schema.Queries.MerchandiseQueries
{
    public class MerchandiseInfo
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        // First image is the main image
        public async Task<List<string>> GetImagesUrl([Service] MerchandiseService merchandiseService)
        {
            return await merchandiseService.GetImagesUri(Id);
        }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }

        public string CategoryName { get; set; } = null!;

        public async Task<string> GetCategory([Service] CategoryService categoryService)
        {
            Category? c = await categoryService.GetCategoryById(CategoryId);

            if (c == null)
            {
                throw new Exception("Category not found");
            }

            return c.Name;
        }
    }
}