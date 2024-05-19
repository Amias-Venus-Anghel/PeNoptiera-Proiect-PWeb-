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
using System.Linq;

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

        await _repository.AddAsync(new CartProduct
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

        var cartProduct = await _repository.GetAsync(new CartProductSpec(cart.Id, product.Id), cancellationToken);

        if (cartProduct == null)
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist in the cart!", ErrorCodes.EntityNotFound));
        }

        await _repository.DeleteAsync<CartProduct>(cartProduct.Id,  cancellationToken);

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
            await CreateShoppingCart(userId, cancellationToken);
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "ShoppingCart doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != result.ClientId) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<ShoppingCartDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a own client can view shopping cart!", ErrorCodes.AccessDenied));
        }


        return ServiceResponse<ShoppingCartDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<ProductDTO>>> GetProductsInCartOfUser(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        // Get the shopping cart of the user
        var cart = await GetShoppingCartOfUser(requestingUser.Id, requestingUser, cancellationToken);

        // Get the list of products in the cart
        var cartProducts = cart.Result.Products;

        // Filter products based on the search query if provided
        var filteredProducts = string.IsNullOrEmpty(pagination.Search)
            ? cartProducts
            : cartProducts.Where(cp => cp.Product.Name.Contains(pagination.Search, StringComparison.OrdinalIgnoreCase)).ToList();

        // Calculate pagination details
        var totalItems = filteredProducts.Count();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pagination.PageSize);
        var paginatedProducts = filteredProducts
            .Skip((int)((pagination.Page - 1) * pagination.PageSize))
            .Take((int)pagination.PageSize)
            .ToList();

        // Map the entities to DTOs
        var productDTOs = paginatedProducts.Select(cp => new ProductDTO
        {
            Id = cp.Product.Id,
            Name = cp.Product.Name,
            Description = cp.Product.Description,
            Price = cp.Product.Price,
            ProductType = cp.Product.ProductType,
            Producer = new UserDTO
            {
                Id = cp.Product.Producer.Id,
                Name = cp.Product.Producer.Name,
                Email = cp.Product.Producer.Email,
                // Map other necessary properties from the producer
            },
            CreatedAt = cp.Product.CreatedAt,
            UpdatedAt = cp.Product.UpdatedAt
        }).ToList();

        // Create the paginated response
        var pagedResponse = new PagedResponse<ProductDTO>(
            pagination.Page,
            pagination.PageSize,
            (uint)totalItems,
            productDTOs
        );

        // Return the service response
        return ServiceResponse<PagedResponse<ProductDTO>>.ForSuccess(pagedResponse);
    }


}
