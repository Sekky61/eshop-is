using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Schema.Types;
using DataAccess.DataAccess;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using FileStorageService;
using HotChocolate;
using HotChocolate.Authorization;
using JWT;
using Server.Controllers;

namespace API.Schema.Mutations.MerchandiseMutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class MerchandiseMutation
    {
        private readonly MerchandiseService _merchandiseService;
        private readonly OrderService _orderService;
        private readonly CategoryService _categoryService;
        private readonly IFileUploadController _fileUploadController;
        private readonly ILogger<CustomerService> _logger;

        public MerchandiseMutation(
            MerchandiseService merchandiseService,
            CategoryService categoryService,
            IFileUploadController fileUploadController,
            OrderService orderService,
            ILogger<CustomerService> logger)
        {
            _merchandiseService = merchandiseService;
            _fileUploadController = fileUploadController;
            _logger = logger;
            _categoryService = categoryService;
            _orderService = orderService;
        }

        [Authorize("Employees")]
        public async Task<MerchandiseEditResult> CreateMerchandise(NewMerchandiseInput merchandise)
        {
            Category? category = await _categoryService.GetCategoryByName(merchandise.Category);

            if (category == null)
            {
                _logger.LogWarning($"Category with name {merchandise.Category} not found");
                return new MerchandiseEditResult
                {
                    Id = Guid.Empty,
                    success = false,
                    Name = string.Empty,
                    ImageUploadUrl = string.Empty
                };
            }

            Merchandise newMerchandise = new Merchandise
            {
                Id = Guid.NewGuid(),
                Name = merchandise.Name,
                Description = merchandise.Description,
                Price = merchandise.Price,
                CategoryId = category.Id
            };
            newMerchandise = await _merchandiseService.Create(newMerchandise);

            string presignedUrl = _fileUploadController.GeneratePresignedUrl(newMerchandise.Id);

            MerchandiseEditResult merchandiseResult = new MerchandiseEditResult
            {
                Id = newMerchandise.Id,
                success = true,
                Name = newMerchandise.Name,
                ImageUploadUrl = presignedUrl
            };

            return merchandiseResult;
        }

        [Authorize("Employees")]
        public async Task<MerchandiseEditResult> UpdateMerchandise(MerchandiseUpdateInput merchUpdate)
        {
            Merchandise? merchandise = await _merchandiseService.GetMerchandiseById(merchUpdate.Id);

            if (merchandise == null)
            {
                _logger.LogWarning($"Merchandise with id {merchUpdate.Id} not found");
                return new MerchandiseEditResult
                {
                    Id = merchUpdate.Id,
                    success = false,
                };
            }

            merchandise.Name = merchUpdate.Name ?? merchandise.Name;
            merchandise.Description = merchUpdate.Description ?? merchandise.Description;
            merchandise.Price = merchUpdate.Price ?? merchandise.Price;
            merchandise.InStockCount = merchUpdate.InStockCount ?? merchandise.InStockCount;

            if (merchUpdate.Category != null)
            {
                Category? category = await _categoryService.GetCategoryByName(merchUpdate.Category);

                if (category == null)
                {
                    _logger.LogWarning($"Category with name {merchUpdate.Category} not found");
                    return new MerchandiseEditResult
                    {
                        Id = merchUpdate.Id,
                        success = false,
                    };
                }

                merchandise.Category = category;
            }

            await _merchandiseService.Update(merchandise);

            string presignedUrl = _fileUploadController.GeneratePresignedUrl(merchUpdate.Id);

            MerchandiseEditResult merchandiseResult = new MerchandiseEditResult
            {
                Id = merchandise.Id,
                success = true,
                Name = merchandise.Name,
                ImageUploadUrl = presignedUrl
            };

            return merchandiseResult;
        }

        public async Task<bool> UpdateOrderStatus(Guid orderId, string status)
        {
            Order? order = await _orderService.GetOrderById(orderId);

            if (order == null)
            {
                _logger.LogWarning($"Order with id {orderId} not found");
                return false;
            }

            // convert
            OrderStatus statusEnum = (OrderStatus)Enum.Parse(typeof(OrderStatus), status);
            // check if valid
            if (!Enum.IsDefined(typeof(OrderStatus), statusEnum))
            {
                _logger.LogWarning($"Order status {status} not found");
                return false;
            }

            order.Status = statusEnum;
            await _orderService.Update(order);

            return true;
        }
    }
}
