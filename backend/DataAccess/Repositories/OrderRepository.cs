using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<IEnumerable<Order>> GetByCustomerId(Guid customerId);
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly IDbContextFactory<EshopDBContext> _contextFactory;

        public OrderRepository(IDbContextFactory<EshopDBContext> _contextFactory)
        {
            this._contextFactory = _contextFactory;
        }

        public async Task<Order> Create(Order order)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Orders.Add(order);
                await dbContext.SaveChangesAsync();

                return order;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                var order = await dbContext.Orders.FindAsync(id);
                if (order == null)
                {
                    return false;
                }

                dbContext.Orders.Remove(order);
                int nOfWritten = await dbContext.SaveChangesAsync();

                return nOfWritten > 0;
            }
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Orders
                    .Include(o => o.Items)
                    .Include(o => o.Address)
                    .Include(o => o.PaymentInformation)
                    .ToListAsync();
            }
        }

        public async Task<Order?> GetById(Guid id)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Orders
                    .Include(o => o.Items)
                    .Include(o => o.Address)
                    .Include(o => o.PaymentInformation)
                    .FirstOrDefaultAsync(a => a.Id == id);
            }
        }

        public async Task<Order> Update(Order order)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                dbContext.Orders.Update(order);
                await dbContext.SaveChangesAsync();

                return order;
            }
        }

        public async Task<IEnumerable<Order>> GetByCustomerId(Guid customerId)
        {
            using (var dbContext = _contextFactory.CreateDbContext())
            {
                return await dbContext.Orders.Where(o => o.CustomerId == customerId)
                .Include(o => o.Items)
                .Include(o => o.Address)
                .Include(o => o.PaymentInformation)
                .ToListAsync();
            }
        }
    }
}