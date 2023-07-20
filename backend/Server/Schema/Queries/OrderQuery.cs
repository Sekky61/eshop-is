
using API.Schema.Queries.MerchandiseQueries;
using DataAccess.Models;
using DataAccess.Repositories;
using EshopBL;
using HotChocolate.Authorization;

namespace API.Schema.Queries
{
    public class OrderItemInfo
    {
        public Guid Id { get; set; }
        public Guid MerchandiseId { get; set; }
        public async Task<MerchandiseInfo> GetMerchandise([Service] MerchandiseService merchandiseService)
        {
            Merchandise? merchandise = await merchandiseService.GetMerchandiseById(MerchandiseId);

            if (merchandise == null)
            {
                throw new Exception("Merchandise not found");
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
        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }

    public class OrderInfo
    {
        public Guid Id { get; set; }
        public async Task<ICollection<OrderItemInfo>> GetMerchandises([Service] OrderService orderService)
        {
            Order? order = await orderService.GetOrderById(Id);

            if (order == null)
            {
                throw new Exception("Order not found");
            }

            var merchandises = order.Items.Select(item => new OrderItemInfo
            {
                Id = item.Id,
                MerchandiseId = item.MerchandiseId,
                Quantity = item.Quantity,
                Price = item.Price
            }).ToList();

            return merchandises;
        }
        public Address Address { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = null!;
        public decimal TotalPrice { get; set; }
    }

    [ExtendObjectType(typeof(Query))]
    public class OrderQuery
    {
        private readonly OrderService _orderService;

        public OrderQuery(OrderService orderService)
        {
            _orderService = orderService;
        }

        [UsePaging(IncludeTotalCount = true)]
        [UseFiltering]
        [UseSorting]
        [Authorize("Employees")]
        public async Task<List<OrderInfo>> GetOrders()
        {
            ICollection<Order> orders = await _orderService.GetOrders();

            if (orders == null)
            {
                throw new Exception("No orders found");
            }

            // Map the order to the order info
            List<OrderInfo> orderInfos = orders.Select(order =>
            {
                return new OrderInfo
                {
                    Id = order.Id,
                    Address = order.Address,
                    OrderDate = order.CreatedTime,
                    Status = order.Status.ToString(),
                    TotalPrice = order.TotalPrice
                };
            }).ToList();

            return orderInfos;
        }
    }
}