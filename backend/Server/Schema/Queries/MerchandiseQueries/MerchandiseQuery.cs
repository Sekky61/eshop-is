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

namespace API.Schema.Queries.MerchandiseQueries
{

    [ExtendObjectType(typeof(Query))]
    public class MerchandiseQuery
    {
        private readonly MerchandiseService _merchandiseService;

        public MerchandiseQuery(MerchandiseService merchandiseService)
        {
            _merchandiseService = merchandiseService;
        }

        [UsePaging(IncludeTotalCount = true)]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<MerchandiseInfo>> GetMerchandise()
        {
            IEnumerable<Merchandise> merchandise = await _merchandiseService.GetMerchandise();

            return merchandise.Select(merchandise => new MerchandiseInfo
            {
                Id = merchandise.Id,
                Name = merchandise.Name,
                Description = merchandise.Description,
                Price = merchandise.Price,
                Stock = merchandise.InStockCount,
                CategoryId = merchandise.Category.Id,
                CategoryName = merchandise.Category.Name,
            });
        }

        public async Task<MerchandiseInfo?> GetMerchandiseById(Guid id)
        {
            Merchandise? merchandise = await _merchandiseService.GetMerchandiseById(id);

            if (merchandise == null)
            {
                return null;
            }

            return new MerchandiseInfo
            {
                Id = merchandise.Id,
                Name = merchandise.Name,
                Description = merchandise.Description,
                Price = merchandise.Price,
                Stock = merchandise.InStockCount,
                CategoryId = merchandise.Category.Id,
                CategoryName = merchandise.Category.Name,
            };
        }
    }
}