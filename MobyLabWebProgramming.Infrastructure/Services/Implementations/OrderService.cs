using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using System.Net;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Diagnostics;
using System.Threading;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;
public class OrderService : IOrderService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IShoppingCartService _shoppingCart;

    public OrderService(IRepository<WebAppDatabaseContext> repository, IShoppingCartService shoppingCart)
    {
        _repository = repository;
        _shoppingCart = shoppingCart;
    }


    public async Task<ServiceResponse> AddOrder(OrderAddDTO order, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var cart = await  _shoppingCart.GetShoppingCartOfUser(requestingUser.Id, requestingUser, cancellationToken);

        var products = cart.Result.Products;
        float cost = 0;
        int count = products.Count();

        foreach (var prod in products) {
            cost += prod.Product.Price;
            await _shoppingCart.RemoveProductFromCart(prod.Product.Id, requestingUser, cancellationToken);
        }

        await _repository.AddAsync(new Order
        {
            DeliveryAddress = order.DeliveryAddress,
            DeliveryMethod = order.DeliveryMethod,
            Status = OrderStatusEnum.Registered,
            ClientId = requestingUser.Id,
            TotalCost = cost,
            NumberOfItems = count
        }, cancellationToken); // A new entity is created and persisted in the database.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteOrder(Guid id, UserDTO? requestingUser = null, CancellationToken cancellationToken = default)
    { 
        var result = await _repository.GetAsync(new OrderProjectionSpec(id), cancellationToken);

        if (result == null)
        {
            return ServiceResponse<OrderDTO>.FromError(new (HttpStatusCode.Forbidden, "Order doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != result.Client.Id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<OrderDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a own client can delete orders!", ErrorCodes.AccessDenied));
        }

        await _repository.DeleteAsync<Order>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<OrderDTO>> GetOrder(Guid id, UserDTO requestingUser,  CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new OrderProjectionSpec(id), cancellationToken);

        if (result == null)
        {
            return ServiceResponse<OrderDTO>.FromError(new(HttpStatusCode.Forbidden, "Order doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != result.Client.Id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<OrderDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a own client can view orders!", ErrorCodes.AccessDenied));
        }

        return ServiceResponse<OrderDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<OrderDTO>>> GetOrders(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin &&  requestingUser.Email != pagination.Search)
        {
            return ServiceResponse<PagedResponse<OrderDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can view orders!", ErrorCodes.AccessDenied));
        }

        var result = await _repository.PageAsync(pagination, new OrderProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<OrderDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateOrder(OrderUpdateDTO orderUpdate, UserDTO? requestingUser = null, CancellationToken cancellationToken = default)
    {

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the order!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new OrderSpec(orderUpdate.Id), cancellationToken);

        if (entity != null) 
        {
            entity.Status = orderUpdate.Status;
            await _repository.UpdateAsync(entity, cancellationToken); 
        }

        return ServiceResponse.ForSuccess();
    }
}
