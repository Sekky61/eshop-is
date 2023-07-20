using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Mutations.AccountMutations
{
    public class RegisterAccountInput
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

    }

    public class RegisterCustomerInput : RegisterAccountInput
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

    }
}