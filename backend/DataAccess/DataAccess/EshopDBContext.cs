using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DataAccess
{
    public class EshopDBContext : DbContext
    {
        public EshopDBContext(DbContextOptions<EshopDBContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; } = null!;
        public DbSet<AnonymousCustomer> AnonymousCustomers { get; set; } = null!;

        public DbSet<Merchandise> Merchandises { get; set; } = null!;
        public DbSet<ImageUri> ImageUris { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Address> Addresses { get; set; } = null!;
        public DbSet<CreditCard> CreditCards { get; set; } = null!;

        public DbSet<Basket> Baskets { get; set; } = null!;
        public DbSet<BasketItem> BasketItems { get; set; } = null!;


        // Override OnModelCreating to define TPH inheritance mapping
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasDiscriminator<string>("AccountType")
                .HasValue<Admin>("Admin")
                .HasValue<Manager>("Manager")
                .HasValue<Customer>("Customer");
        }
    }
}