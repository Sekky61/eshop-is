using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Types
{
    public class CategoryResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
    }
}