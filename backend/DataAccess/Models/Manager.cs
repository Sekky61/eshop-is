using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Manager : Account
    {
        public override string GetRole()
        {
            return "Manager";
        }
    }
}