using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public abstract class Account
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        // Get the role of the account
        public abstract string GetRole();
    }
}