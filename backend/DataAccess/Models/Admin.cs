using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Admin : Manager
    {
        public override string GetRole()
        {
            return "Admin";
        }
    }
}