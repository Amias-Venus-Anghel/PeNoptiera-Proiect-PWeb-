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
using Ardalis.Specification;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class ShoppingCartService : IShoppingCartService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public ShoppingCartService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }


    public async Task<ServiceResponse> AddProductToCart(Guid productId, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetAsync(new ProductSpec(productId), cancellationToken);

        if (product == null) { 
            return ServiceResponse<ProductDTO>.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist!", ErrorCodes.EntityNotFound));
        }
        
        var user = await _repository.GetAsync(new UserSpec(requestingUser.Id), cancellationToken);

        if (user == null)
        {
            return ServiceResponse<ProductDTO>.FromError(CommonErrors.UserNotFound);
        }
      
        var cartSpec = new ShoppingCartSpec(user.Email);
        var cart = await _repository.GetAsync(cartSpec, cancellationToken);

        if (cart == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "ShoppingCart doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        await _repository.AddAsync(new ShoppingCartProduct
        {
            ShoppingCartId = cart.Id, 
            ProductId = productId
        }, cancellationToken);

        return ServiceResponse.ForSuccess();

    }

    public async Task<ServiceResponse<ShoppingCartDTO>> GetShoppingCart(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new ShoppingCartProjectionSpec(id), cancellationToken);

        if (result == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "ShoppingCart doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != result.ClientId) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a own client can view shopping cart!", ErrorCodes.AccessDenied));
        }


        return ServiceResponse<ShoppingCartDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<ShoppingCartDTO>>> GetShoppingCarts(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<PagedResponse<ShoppingCartDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can view shopping carts!", ErrorCodes.AccessDenied));
        }

        var result = await _repository.PageAsync(pagination, new ShoppingCartProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse<PagedResponse<ShoppingCartDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> RemoveProductFromCart(Guid productId, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetAsync(new ProductSpec(productId), cancellationToken);

        if (product == null) { 
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist!", ErrorCodes.EntityNotFound));
        }
        
        var user = await _repository.GetAsync(new UserSpec(requestingUser.Id), cancellationToken);
        if (user == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(CommonErrors.UserNotFound);
        }

        var cart = await _repository.GetAsync(new ShoppingCartProjectionSpec(user.Email), cancellationToken);


        if (cart == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "ShoppingCart doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        var cartProduct = await _repository.GetAsync(new ShoppingCartProductSpec(cart.Id, product.Id), cancellationToken);

        if (cartProduct == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist in the cart!", ErrorCodes.EntityNotFound));
        }

        await _repository.DeleteAsync<ShoppingCartProduct>(cartProduct.Id,  cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> CreateShoppingCart(Guid requestingUser, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(new ShoppingCart
        {
            ClientId = requestingUser

        }, cancellationToken); // A new entity is created and persisted in the database.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<ShoppingCartDTO>> GetShoppingCartOfUser(Guid userId, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var userSpec = new UserSpec(userId);
        var user = await _repository.GetAsync(userSpec, cancellationToken);

        if (user == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(CommonErrors.UserNotFound);
        }

        var cartSpec = new ShoppingCartProjectionSpec(user.Email);
        var result = await _repository.GetAsync(cartSpec, cancellationToken);


        if (result == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "ShoppingCart doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != result.ClientId) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a own client can view shopping cart!", ErrorCodes.AccessDenied));
        }


        return ServiceResponse<ShoppingCartDTO>.ForSuccess(result);
    }

}
