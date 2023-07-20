using DataAccess.Models;
using DataAccess.Repositories;

namespace EshopBL;

public class OrderService
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMerchandiseRepository _merchandiseRepository;
    private readonly IOrderRepository _orderRepository;

    public OrderService(ICustomerRepository customerRepository, IMerchandiseRepository merchandiseRepository, IOrderRepository orderRepository)
    {
        _customerRepository = customerRepository;
        _merchandiseRepository = merchandiseRepository;
        _orderRepository = orderRepository;
    }

    public async Task<ICollection<Order>> GetOrdersByCustomerId(Guid id)
    {
        var orders = await _orderRepository.GetByCustomerId(id);

        return orders.ToList();
    }

    public async Task<Order?> GetOrderById(Guid id)
    {
        var order = await _orderRepository.GetById(id);

        return order;
    }

    public async Task<List<Order>> GetOrders()
    {
        var orders = await _orderRepository.GetAll();

        return orders.ToList();
    }

    public async Task<Order> Update(Order order)
    {
        var updatedOrder = await _orderRepository.Update(order);

        return updatedOrder;
    }
}
