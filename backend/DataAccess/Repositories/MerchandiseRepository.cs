using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IMerchandiseRepository : IRepository<Merchandise>
    {

    }

    public class MerchandiseRepository : IMerchandiseRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public MerchandiseRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<Merchandise> Create(Merchandise merch)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Merchandises.Add(merch);
                await dbContext.SaveChangesAsync();

                return merch;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                var merch = await dbContext.Merchandises.FindAsync(id);
                if (merch == null)
                {
                    return false;
                }

                dbContext.Merchandises.Remove(merch);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }

        public async Task<IEnumerable<Merchandise>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                // return await dbContext.Merchandises.ToListAsync();
                return await dbContext.Merchandises
                    .Include(m => m.Images)
                    .Include(m => m.Category)
                    .ToListAsync(); // Need to include images explicitly
            }
        }

        public async Task<Merchandise?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Merchandises
                    .Include(m => m.Images)
                    .Include(m => m.Category)
                    .FirstOrDefaultAsync(m => m.Id == id);
            }
        }

        public async Task<Merchandise> Update(Merchandise merch)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Merchandises.Update(merch);
                await dbContext.SaveChangesAsync();

                return merch;
            }
        }
    }
}