using System.Security.Claims;
using DataAccess.Models;
using DataAccess.Repositories;

namespace EshopBL;

public class AccountService
{
    private readonly IAccountRepository _accountRepository;

    public AccountService(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    public async Task<IEnumerable<Account>> GetAccounts()
    {
        IEnumerable<Account> accounts = await _accountRepository.GetAll<Account>();

        return accounts;
    }

    public async Task<Account?> GetAccountById(Guid id)
    {
        Account? account = await _accountRepository.GetById<Account>(id);

        return account;
    }

    public async Task<Account?> GetAccountByEmail(string email)
    {
        Account? account = await _accountRepository.GetByEmail<Account>(email);

        return account;
    }

    // T is a type that inherits from Account
    public async Task<T> CreateAccount<T>(T account)
    where T : Account
    {
        Console.WriteLine($"Creating account: {account.Email} with type {account.GetType()}");
        T createdAccount = await _accountRepository.Create<T>(account);

        return createdAccount;
    }

    public async Task<bool> DeleteAccount(Guid id)
    {
        bool success = await _accountRepository.Delete<Account>(id);

        return success;
    }
}
