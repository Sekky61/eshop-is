using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IBasketRepository
    {
        Task<Basket> Create(Basket Basket);
        Task<bool> Delete(Guid id);
        Task<IEnumerable<Basket>> GetAll();
        Task<Basket?> GetById(Guid id);
        Task<Basket> Update(Basket Basket);
    }

    public class BasketRepository : IBasketRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public BasketRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<Basket?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Baskets.FindAsync(id);
            }
        }

        public async Task<IEnumerable<Basket>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Baskets.ToListAsync();
            }
        }

        public async Task<Basket> Create(Basket Basket)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Baskets.Add(Basket);
                await dbContext.SaveChangesAsync();

                return Basket;
            }
        }

        public async Task<Basket> Update(Basket Basket)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Baskets.Update(Basket);
                await dbContext.SaveChangesAsync();

                return Basket;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var Basket = new Basket { Id = id };
                dbContext.Baskets.Remove(Basket);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }

}