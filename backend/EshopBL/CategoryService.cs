using DataAccess.Models;
using DataAccess.Repositories;

namespace EshopBL;

public class CategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetCategories()
    {
        IEnumerable<Category> categories = await _categoryRepository.GetAll();

        return categories;
    }

    public async Task<Category?> GetCategoryById(Guid id)
    {
        Category? category = await _categoryRepository.GetById(id);

        return category;
    }

    public async Task<Category> Create(Category category)
    {
        category = await _categoryRepository.Create(category);

        return category;
    }

    public async Task<Category> Update(Category category)
    {
        category = await _categoryRepository.Update(category);

        return category;
    }

    public async Task<bool> Delete(Guid id)
    {
        return await _categoryRepository.Delete(id);
    }

    public async Task<Category?> GetCategoryByName(string name)
    {
        Category? category = await _categoryRepository.GetByName(name);

        return category;
    }
}
