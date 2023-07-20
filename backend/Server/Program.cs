
using DataAccess.DataAccess;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using JWT;
using PasswordHasher;

namespace ApiServer
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = CreateHostBuilder(args);
            IHost host = builder.Build();

            // Seed the database with initial data
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                // Get an instance of the DbContextFactory for the EshopDBContext
                var dbContextFactory = services.GetRequiredService<IDbContextFactory<EshopDBContext>>();

                // Use the DbContextFactory to create an instance of the EshopDBContext
                using (var context = dbContextFactory.CreateDbContext())
                {
                    // Get an instance of the PasswordHashingService
                    var passwordHashingService = services.GetRequiredService<PasswordHashingService>();

                    // Seed the database using the DbInitializer
                    DbInitializer.Initialize(context, passwordHashingService);
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureLogging(c => c.AddConsole())
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}