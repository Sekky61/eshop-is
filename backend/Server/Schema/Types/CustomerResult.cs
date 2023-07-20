using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Types
{
    public class CustomerResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = null!;

        public Guid Id { get; set; }
    }
}