using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Queries.AccountQueries
{
    public class AuthenticationStatus
    {
        public bool IsAuthenticated { get; set; }
        public string Role { get; set; } = null!;
    }
}