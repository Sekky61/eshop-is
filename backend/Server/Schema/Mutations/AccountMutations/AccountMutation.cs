using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using HotChocolate;
using JWT;
using EshopBL;
using HotChocolate.Authorization;

namespace API.Schema.Mutations.AccountMutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class AccountMutation
    {
        private readonly AccountService _accountService;
        private readonly AuthenticationService _authservice;
        private readonly CustomerService _customerService;

        public AccountMutation(AuthenticationService authservice, CustomerService customerService, AccountService accountService)
        {
            _authservice = authservice;
            _customerService = customerService;
            _accountService = accountService;
        }

        // Generate a new session as an AnonymousCustomer
        public async Task<SessionInfo> GetNewSession()
        {
            // Create new anonymous customer
            AnonymousCustomer anon = await _customerService.CreateAnonymousCustomer();

            // Generate token
            string token = _authservice.GetNewSessionToken(anon.Id);

            SessionInfo result = new SessionInfo
            {
                Token = token
            };
            return result;
        }

        // Register a new customer
        // Returns a new session token with the role Customer
        // Fails if email is already in use
        public async Task<SessionInfo?> RegisterCustomer(RegisterCustomerInput input)
        {
            // Remap input to RegisterData
            AccountData accData = new AccountData
            {
                Email = input.Email,
                Password = input.Password,
            };

            CustomerData custData = new CustomerData
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                Street = input.Street,
                City = input.City,
                State = input.State,
                PostalCode = input.PostalCode,
                PhoneNumber = input.PhoneNumber,
            };

            // Call BL
            try
            {
                RegisterResult<Customer> res = await _authservice.Register<Customer>(accData, custData); // todo do not use string, but BL enum

                // Return token
                return new SessionInfo
                {
                    Token = res.Token
                };
            }
            catch (Exception e)
            {
                // Log exception
                Console.WriteLine(e.ToString());
                throw new GraphQLException(new ErrorBuilder().SetMessage(e.Message).Build());
            }
        }

        // Login as any type of user
        // Returns a new session token with the correct role
        // Fails if email or password is incorrect
        public async Task<SessionInfo> Login(string email, string password)
        {
            try
            {
                // Call BL
                string token = await _authservice.Login(email, password);
                // Return token
                return new SessionInfo
                {
                    Token = token
                };
            }
            catch (Exception e)
            {
                // Log exception
                Console.WriteLine(e.ToString());
                // Return error message to client
                throw new GraphQLException(new ErrorBuilder().SetMessage(e.Message).Build());
            }
        }

        // Register a new Manager
        // Returns a new session token with the role Manager
        // Fails if email is already in use
        // TODO do not return session token
        [Authorize("Admin")]
        public async Task<SessionInfo?> RegisterManager(RegisterAccountInput input)
        {
            // Remap input to RegisterData
            AccountData accData = new AccountData
            {
                Email = input.Email,
                Password = input.Password,
            };

            // Call BL
            try
            {
                RegisterResult<Manager> res = await _authservice.Register<Manager>(accData); // todo do not use string, but BL enum

                // Return token
                return new SessionInfo
                {
                    Token = res.Token
                };
            }
            catch (Exception e)
            {
                // Log exception
                Console.WriteLine(e.ToString());
                throw new GraphQLException(new ErrorBuilder().SetMessage(e.Message).Build());
            }
        }

        [Authorize("Admin")]
        public async Task<bool> DeleteAccount(string email)
        {
            Account? acc = await _accountService.GetAccountByEmail(email);

            if (acc == null)
            {
                return false;
            }

            bool result = await _accountService.DeleteAccount(acc.Id);

            return result;
        }
    }
}