using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category?> GetByName(string name);
    }

    public class CategoryRepository : ICategoryRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public CategoryRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<Category?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Categories.FindAsync(id);
            }
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Categories.ToListAsync();
            }
        }

        public async Task<Category> Create(Category category)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Categories.Add(category);
                await dbContext.SaveChangesAsync();

                return category;
            }
        }

        public async Task<Category> Update(Category category)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Categories.Update(category);
                await dbContext.SaveChangesAsync();

                return category;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var category = new Category { Id = id };
                dbContext.Categories.Remove(category);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }

        public Task<Category?> GetByName(string name)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return dbContext.Categories.FirstOrDefaultAsync(c => c.Name == name);
            }
        }
    }

}