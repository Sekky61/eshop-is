using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IAnonymousCustomerRepository : IRepository<AnonymousCustomer>
    {

    }

    public class AnonymousCustomerRepository : IAnonymousCustomerRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public AnonymousCustomerRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<AnonymousCustomer> Create(AnonymousCustomer customer)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.AnonymousCustomers.Add(customer);
                await dbContext.SaveChangesAsync();

                return customer;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                var customer = await dbContext.AnonymousCustomers.FindAsync(id);
                if (customer == null)
                {
                    return false;
                }

                dbContext.AnonymousCustomers.Remove(customer);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }

        public async Task<IEnumerable<AnonymousCustomer>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.AnonymousCustomers.ToListAsync();
            }
        }

        public async Task<AnonymousCustomer?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.AnonymousCustomers
                .Include(c => c.Basket)
                .ThenInclude(b => b.BasketItems)
                .ThenInclude(bi => bi.Item)
                .FirstOrDefaultAsync(c => c.Id == id);
            }
        }

        public async Task<AnonymousCustomer> Update(AnonymousCustomer category)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.AnonymousCustomers.Update(category);
                await dbContext.SaveChangesAsync();

                return category;
            }
        }
    }
}