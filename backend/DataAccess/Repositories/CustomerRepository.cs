using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{

    public interface ICustomerRepository : IRepository<Customer>
    {

    }

    public class CustomerRepository : ICustomerRepository
    {
        IDbContextFactory<EshopDBContext> contextFactory;

        public CustomerRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            contextFactory = _contextFactory;
        }

        public async Task<Customer?> GetById(Guid id)
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {
                return await dbContext.Accounts.OfType<Customer>()
                    .Include(c => c.Address)
                    .Include(c => c.PaymentInformation)
                    .Include(c => c.Orders)
                    .ThenInclude(o => o.Items)
                    .Include(c => c.Basket)
                    .ThenInclude(b => b.BasketItems)
                    .ThenInclude(bi => bi.Item) // Basket is as deep as we will go
                    .FirstOrDefaultAsync(a => a.Id == id);

                // To load more about basket items, use basket query
            }
        }

        public async Task<Customer?> GetByEmail(string email)
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {
                return await dbContext.Set<Customer>().FirstOrDefaultAsync(a => a.Email == email);
            }
        }

        public async Task<IEnumerable<Customer>> GetAll()
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {
                return await dbContext.Set<Customer>()
                    .Include(c => c.Address)
                    .Include(c => c.PaymentInformation)
                    .Include(c => c.Orders)
                    .ThenInclude(o => o.Items)
                    .Include(c => c.Basket)
                    .ThenInclude(b => b.BasketItems)
                    .ThenInclude(bi => bi.Item) // Basket is as deep as we will go
                    .ToListAsync();
            }
        }

        public async Task<Customer> Create(Customer account)
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {
                dbContext.Accounts.Add(account);
                await dbContext.SaveChangesAsync();

                return account;
            }
        }

        public async Task<Customer> Update(Customer account)
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {
                dbContext.Accounts.Update(account);
                await dbContext.SaveChangesAsync();

                return account;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = contextFactory.CreateDbContext())
            {

                var account = await dbContext.Accounts.FindAsync(id);
                if (account == null)
                {
                    return false;
                }

                dbContext.Accounts.Remove(account);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }
}