using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Schema.Mutations;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using HotChocolate;
using HotChocolate.Authorization;
using Server.QueryHelpers;

namespace API.Schema.Queries.AccountQueries
{

    [ExtendObjectType(typeof(Query))]
    public class AccountQuery
    {

        private readonly AccountService _accountService;
        private readonly CustomerService _customerService;

        public AccountQuery(AccountService accountService, CustomerService customerService)
        {
            _accountService = accountService;
            _customerService = customerService;
        }

        // Get authentication status based on the provided token
        public AuthenticationStatus Authentication(ClaimsPrincipal claimsPrincipal)
        {
            bool isAuthenticated = claimsPrincipal.Identity?.IsAuthenticated == true;
            string role = claimsPrincipal.FindFirstValue(ClaimTypes.Role) ?? "None";
            return new AuthenticationStatus
            {
                IsAuthenticated = isAuthenticated,
                Role = role
            };
        }

        // Return account info if logged in
        public async Task<AccountInfo?> GetAccountInfo(ClaimsPrincipal claimsPrincipal)
        {
            Guid? id = QueryHelpers.getIdFromClaims(claimsPrincipal);

            if (id == null)
            {
                return null;
            }

            Account? account = await _accountService.GetAccountById(id.Value);

            if (account == null)
            {
                // User has a token, but no account with that id. The token must be from previous session
                return null;
            }

            return new AccountInfo
            {
                Id = account.Id,
                Email = account.Email,
                Role = account.GetType().Name
            };
        }

        public async Task<IEnumerable<AccountInfo>> GetAccounts()
        {
            var all = await _accountService.GetAccounts();

            return all.Select(account => new AccountInfo
            {
                Id = account.Id,
                Email = account.Email,
                Role = account.GetType().Name
            });
        }
    }
}