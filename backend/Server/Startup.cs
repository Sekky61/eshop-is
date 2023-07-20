using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.Logging;

using DataAccess.DataAccess;
using Microsoft.EntityFrameworkCore;
using API.Schema.Queries;
using API.Schema.Mutations;
using DataAccess.Repositories;
using JWT;
using API.Schema.Queries.CategoryQueries;
using API.Schema.Queries.AccountQueries;
using API.Schema.Queries.MerchandiseQueries;
using API.Schema.Mutations.AccountMutations;
using API.Schema.Mutations.CategoryMutations;
using EshopBL;
using PasswordHasher;
using FileStorageService;
using Server.Controllers;
using API.Schema.Mutations.CustomerMutations;
using API.Schema.Queries.CustomerQueries;
using API.Schema.Mutations.MerchandiseMutations;
using Microsoft.AspNetCore.Authorization;

public class Startup
{

    public string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {
        // loggerFactory.AddConsole();

        app.UseRouting();

        app.UseCors(MyAllowSpecificOrigins);

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGraphQL();
            endpoints.MapControllers();
        });

        var mode = env.EnvironmentName;
        var af = app.ServerFeatures.Get<IServerAddressesFeature>();

        if (af == null)
        {
            // logger.LogError("Server not started");
            return;
        }

        var port = af.Addresses
            .Select(a => new Uri(a).Port).First();

        // logger.LogInformation($"Server starting on http://localhost:{port}/graphql - {mode} mode");
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // Runs before Configure
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddLogging(builder =>
        {
            builder.AddConsole();
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("CustomerOrAdmin", policy => policy.RequireRole(new string[] { "Admin", "Customer" }));
            options.AddPolicy("Employees", policy => policy.RequireRole(new string[] { "Admin", "Manager" }));
            options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            options.AddPolicy("Manager", policy => policy.RequireRole("Manager"));
            options.AddPolicy("ManagerAndCustomer", policy => policy.RequireRole(new string[] { "Customer", "Manager" }));
            options.AddPolicy("Customers", policy => policy.RequireRole(new string[] { "Customer", "AnonymousCustomer" }));
            options.AddPolicy("AnonymousCustomersOnly", policy => policy.RequireRole("AnonymousCustomer"));
            options.AddPolicy("RegisteredCustomersOnly", policy => policy.RequireRole("Customer"));
        });

        // Add cors
        services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                            "http://127.0.0.1:3000",
                                              "http://www.todofrontendurl.com");
                          policy.AllowAnyHeader();
                      });
        });

        // Warning: The correct order is UsePaging > UseProjections > UseFiltering > UseSorting
        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddMutationConventions(applyToAllMutations: false)
            .AddFiltering()
            .AddSorting()
            .AddQueryType<Query>()
            .AddTypeExtension<CategoryQuery>()
            .AddTypeExtension<AccountQuery>()
            .AddTypeExtension<MerchandiseQuery>()
            .AddTypeExtension<CustomerQuery>()
            .AddTypeExtension<OrderQuery>()
            .AddMutationType<Mutation>()
            .AddTypeExtension<AccountMutation>()
            .AddTypeExtension<CategoryMutation>()
            .AddTypeExtension<CustomerMutation>()
            .AddTypeExtension<MerchandiseMutation>()
            .AddDiagnosticEventListener<ErrorLoggingDiagnosticsEventListener>()
            .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true);

        var serverVersion = new MySqlServerVersion(new Version(8, 0, 32));

        services.AddPooledDbContextFactory<EshopDBContext>(options =>
        {
            // If in development mode, use in-memory database
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                // logger.LogInformation("Using in-memory database");
                options.UseInMemoryDatabase("Eshop");
            }
            else
            {
                // logger.LogInformation("Using MySQL database");
                // Use the connection string from appsettings.json
                options.UseMySql(Configuration.GetConnectionString("DefaultConnection"), serverVersion);
            }
        });

        // Get new one for each request
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IMerchandiseRepository, MerchandiseRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IBasketItemRepository, BasketItemRepository>();
        services.AddScoped<IAnonymousCustomerRepository, AnonymousCustomerRepository>();
        services.AddScoped<IBasketRepository, BasketRepository>();
        services.AddScoped<IAddressRepository, AddressRepository>();
        services.AddScoped<ICreditCardRepository, CreditCardRepository>();

        // Add BL services
        services.AddScoped<AuthenticationService>();
        services.AddScoped<CategoryService>();
        services.AddScoped<MerchandiseService>();
        services.AddScoped<CustomerService>();
        services.AddScoped<AccountService>();
        services.AddScoped<OrderService>();

        services.AddScoped<IFileUploadController, FileUploadController>();

        // Add file storage service
        string? fileStoragePath = Configuration["FileStoragePath"];

        if (fileStoragePath == null)
        {
            throw new Exception("FileStoragePath not set in appsettings.json");
        }

        services.AddSingleton<IFileStorageService>(new LocalFileStorage(fileStoragePath));

        var appBaseUrl = Configuration.GetValue<string>("AppBaseUrl");
        if (appBaseUrl == null)
        {
            throw new Exception("AppBaseUrl not set in appsettings.json");
        }
        services.AddSingleton(appBaseUrl);

        services.AddControllers();

        // Add password hashing service
        services.AddSingleton<PasswordHashingService>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var salt = Configuration["salt"];
    if (salt == null)
    {
        throw new Exception("Salt not set in appsettings.json");
    }

    var cfg = new PasswordHasherConfig
    {
        SaltString = salt
    };
    return new PasswordHashingService(cfg);
});

        // Add jwt authentication service
        services.AddSingleton<JSONWebToken>();

        string? issuerCfg = Configuration["JWT:Issuer"];
        string? audienceCfg = Configuration["JWT:Audience"];
        string? secretKeyCfg = Configuration["JWT:SecretKey"];

        if (issuerCfg == null || audienceCfg == null || secretKeyCfg == null)
        {
            throw new Exception("JWT not set in appsettings.json");
        }

        var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKeyCfg));

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidIssuer = issuerCfg,
                        ValidAudience = audienceCfg,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey
                    };
            });
    }


}

