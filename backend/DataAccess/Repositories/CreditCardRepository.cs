using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface ICreditCardRepository
    {
        Task<CreditCard> Create(CreditCard CreditCard);
        Task<bool> Delete(Guid id);
        Task<IEnumerable<CreditCard>> GetAll();
        Task<CreditCard?> GetById(Guid id);
        Task<CreditCard> Update(CreditCard CreditCard);
    }

    public class CreditCardRepository : ICreditCardRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public CreditCardRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<CreditCard?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.CreditCards.FindAsync(id);
            }
        }

        public async Task<IEnumerable<CreditCard>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.CreditCards.ToListAsync();
            }
        }

        public async Task<CreditCard> Create(CreditCard CreditCard)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.CreditCards.Add(CreditCard);
                await dbContext.SaveChangesAsync();

                return CreditCard;
            }
        }

        public async Task<CreditCard> Update(CreditCard CreditCard)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.CreditCards.Update(CreditCard);
                await dbContext.SaveChangesAsync();

                return CreditCard;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var CreditCard = new CreditCard { Id = id };
                dbContext.CreditCards.Remove(CreditCard);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }

}