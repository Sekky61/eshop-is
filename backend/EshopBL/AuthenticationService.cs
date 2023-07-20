using System.Security.Claims;
using DataAccess.Models;
using DataAccess.Repositories;
using JWT;
using Microsoft.Extensions.Logging;
using PasswordHasher;

namespace EshopBL;

public class AccountData
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class CustomerData
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string PostalCode { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
}

public class RegisterResult<T> where T : Account
{
    public string Token { get; } = null!;
    public T Account { get; } = null!;

    public RegisterResult(string Token, T Account)
    {
        this.Token = Token;
        this.Account = Account;
    }
}

public class AuthenticationService
{
    private readonly AccountService _accountService;
    private readonly JSONWebToken _jsonWebToken;
    private readonly PasswordHashingService _passwordHasher;
    private readonly ILogger<AuthenticationService> _logger;

    public AuthenticationService(JSONWebToken jsonWebToken, AccountService accountService, PasswordHashingService passwordHasher, ILogger<AuthenticationService> logger)
    {
        _accountService = accountService;
        _jsonWebToken = jsonWebToken;
        _passwordHasher = passwordHasher;
        _logger = logger;
    }

    // Generate a new session as an AnonymousCustomer
    public string GetNewSessionToken(Guid id)
    {
        // Generate token
        string token = _jsonWebToken.GenerateToken(id, "AnonymousCustomer");

        return token;
    }

    public async Task<RegisterResult<T>> Register<T>(AccountData accData, CustomerData? custData = null)
    where T : Account, new()
    {
        // Check if email is already in use
        Account? accountByEmail = await _accountService.GetAccountByEmail(accData.Email);

        if (accountByEmail != null)
        {
            //fail
            throw new Exception("Email is already in use");
        }

        // get password hash
        string passwordHash = _passwordHasher.HashPassword(accData.Password);

        // Create Customer, todo CustomerRepositoryCustomer customer = new Customer
        Account account;

        if (typeof(T) == typeof(Customer))
        {
            account = new Customer
            {
                FirstName = custData!.FirstName,
                LastName = custData.LastName,
                Email = accData.Email,
                PasswordHash = passwordHash,
                Address = new Address
                {
                    Street = custData.Street,
                    City = custData.City,
                    State = custData.State,
                    PostalCode = custData.PostalCode,
                },
                PhoneNumber = custData.PhoneNumber,
            } as Account;
        }
        else
        {
            account = new T
            {
                Email = accData.Email,
                PasswordHash = passwordHash,
            };
        }

        T? acc_retyped = account as T;
        if (acc_retyped == null)
        {
            throw new Exception("Account is null");
        }

        T acc = await _accountService.CreateAccount<T>(acc_retyped);
        _logger.LogInformation($"Created account with id {acc.Id} - type {acc.GetType()}");

        // Generate token
        string role = acc.GetRole();
        string token = _jsonWebToken.GenerateToken(acc.Id, role);

        return new RegisterResult<T>(token, acc);
    }

    // Login as any type of user
    // Returns a new session token with the correct role
    // Fails if email or password is incorrect
    public async Task<string> Login(string email, string password)
    {
        // Get customer by email
        Account? accountByEmail = await _accountService.GetAccountByEmail(email);
        if (accountByEmail == null)
        {
            //fail
            throw new Exception("Email or password is incorrect");
        }

        // Check password
        bool passwordCorrect = _passwordHasher.VerifyPassword(password, accountByEmail.PasswordHash);
        if (!passwordCorrect)
        {
            //fail
            throw new Exception("Email or password is incorrect");
        }

        // Generate token
        string role = accountByEmail.GetRole();
        Console.WriteLine("Account role: " + role + "");
        string token = _jsonWebToken.GenerateToken(accountByEmail.Id, role);

        // Return token
        return token;
    }

    // Get role from claim
    public string? GetRoleFromClaim(ClaimsPrincipal claimsPrincipal)
    {
        string? role = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        return role;
    }

    internal Guid? GetUserIdFromClaim(ClaimsPrincipal claimsPrincipal)
    {
        Guid? userId = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value switch
        {
            string userIdString => Guid.Parse(userIdString),
            _ => null,
        };

        return userId;
    }
}
