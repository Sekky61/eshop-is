using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using HotChocolate;
using HotChocolate.Authorization;
using JWT;

namespace API.Schema.Mutations.CategoryMutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class CategoryMutation
    {
        private readonly CategoryService _categoryService;

        public CategoryMutation(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        // Example
        // mutation AddC($category: String!) {
        //   createCategory(category: {
        //     name: $category
        //   }) {
        //     name
        //   }
        // }
        [Authorize("Employees")]
        public async Task<CategoryResult> CreateCategory(CategoryInputType category)
        {
            Category newCategory = new Category
            {
                Name = category.Name
            };
            newCategory = await _categoryService.Create(newCategory);

            CategoryResult categoryResult = new CategoryResult
            {
                Id = newCategory.Id,
                Name = newCategory.Name
            };

            return categoryResult;
        }

        public async Task<CategoryResult> UpdateCategory(Guid id, CategoryInputType category)
        {
            Category updatedCategory = new Category
            {
                Id = id,
                Name = category.Name
            };

            await _categoryService.Update(updatedCategory);

            CategoryResult categoryResult = new CategoryResult
            {
                Id = updatedCategory.Id,
                Name = updatedCategory.Name
            };

            return categoryResult;
        }

        public async Task<bool> DeleteCategory(Guid id)
        {
            return await _categoryService.Delete(id);
        }

    }
}