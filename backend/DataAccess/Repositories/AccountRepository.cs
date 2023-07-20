using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

// Build on top of this for specific roles (Customer, Admin, etc.)
namespace DataAccess.Repositories
{
    public interface IAccountRepository
    {
        Task<T> Create<T>(T account) where T : Account;
        Task<bool> Delete<T>(Guid id) where T : Account;
        Task<IEnumerable<T>> GetAll<T>() where T : Account;
        Task<T?> GetByEmail<T>(string email) where T : Account;
        Task<T?> GetById<T>(Guid id) where T : Account;
        Task<T> Update<T>(T account) where T : Account;
    }

    public class AccountRepository : IAccountRepository
    {
        protected readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public AccountRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<T?> GetById<T>(Guid id) where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Set<T>().FindAsync(id);
            }
        }

        public async Task<T?> GetByEmail<T>(string email) where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Set<T>().FirstOrDefaultAsync(a => a.Email == email);
            }
        }

        public async Task<IEnumerable<T>> GetAll<T>() where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Set<T>().ToListAsync();
            }
        }

        public async Task<T> Create<T>(T account) where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Set<T>().Add(account);
                await dbContext.SaveChangesAsync();

                return account;
            }
        }

        public async Task<T> Update<T>(T account) where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Set<T>().Update(account);
                await dbContext.SaveChangesAsync();

                return account;
            }
        }

        public async Task<bool> Delete<T>(Guid id) where T : Account
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var account = await dbContext.Set<T>().FindAsync(id);
                if (account == null)
                {
                    return false;
                }

                dbContext.Set<T>().Remove(account);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }

}