using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Mutations.CategoryMutations
{
    public class CategoryInputType
    {
        public string Name { get; set; } = null!;
    }
}