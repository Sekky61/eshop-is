using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Schema.Mutations;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using HotChocolate;
using HotChocolate.Authorization;

namespace API.Schema.Queries.CategoryQueries
{

    [ExtendObjectType(typeof(Query))]
    public class CategoryQuery
    {
        private readonly CategoryService _categoryService;

        public CategoryQuery(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public async Task<IEnumerable<CategoryResult>> GetCategories()
        {
            IEnumerable<Category> categories = await _categoryService.GetCategories();

            return categories.Select(category => new CategoryResult
            {
                Id = category.Id,
                Name = category.Name
            });
        }

        public async Task<CategoryResult?> GetCategoryById(Guid id)
        {
            Category? category = await _categoryService.GetCategoryById(id);

            if (category == null)
            {
                return null;
            }

            return new CategoryResult
            {
                Id = category.Id,
                Name = category.Name
            };
        }
    }
}