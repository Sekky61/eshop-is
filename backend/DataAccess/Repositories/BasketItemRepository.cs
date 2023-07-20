using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IBasketItemRepository
    {
        Task<BasketItem> Create(BasketItem BasketItem);
        Task<bool> Delete(Guid id);
        Task<bool> DeleteBasket(Guid id);
        Task<IEnumerable<BasketItem>> GetAll();
        Task<BasketItem?> GetById(Guid id);
        Task<BasketItem> Update(BasketItem BasketItem);
    }

    public class BasketItemRepository : IBasketItemRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public BasketItemRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<BasketItem?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.BasketItems.FindAsync(id);
            }
        }

        public async Task<IEnumerable<BasketItem>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.BasketItems.ToListAsync();
            }
        }

        public async Task<BasketItem> Create(BasketItem BasketItem)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.BasketItems.Add(BasketItem);
                await dbContext.SaveChangesAsync();

                return BasketItem;
            }
        }

        public async Task<BasketItem> Update(BasketItem BasketItem)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.BasketItems.Update(BasketItem);
                await dbContext.SaveChangesAsync();

                return BasketItem;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var BasketItem = new BasketItem { Id = id };
                dbContext.BasketItems.Remove(BasketItem);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }

        // Delete all items in basket
        public async Task<bool> DeleteBasket(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                var BasketItems = dbContext.BasketItems.Where(bi => bi.BasketId == id);
                dbContext.BasketItems.RemoveRange(BasketItems);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }

}