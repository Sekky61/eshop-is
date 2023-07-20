using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IAddressRepository
    {
        Task<Address> Create(Address Address);
        Task<bool> Delete(Guid id);
        Task<IEnumerable<Address>> GetAll();
        Task<Address?> GetById(Guid id);
        Task<Address> Update(Address Address);
    }

    public class AddressRepository : IAddressRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public AddressRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<Address?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Addresses.FindAsync(id);
            }
        }

        public async Task<IEnumerable<Address>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Addresses.ToListAsync();
            }
        }

        public async Task<Address> Create(Address Address)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Addresses.Add(Address);
                await dbContext.SaveChangesAsync();

                return Address;
            }
        }

        public async Task<Address> Update(Address Address)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Addresses.Update(Address);
                await dbContext.SaveChangesAsync();

                return Address;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {

                var Address = new Address { Id = id };
                dbContext.Addresses.Remove(Address);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }
    }

}