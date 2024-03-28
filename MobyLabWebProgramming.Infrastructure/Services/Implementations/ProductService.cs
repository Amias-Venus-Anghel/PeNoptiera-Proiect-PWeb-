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

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public ProductService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }


    public async Task<ServiceResponse> AddProduct(ProductAddDTO product, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Producer) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a producer can add products!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new Product
        {
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            ProductType = product.ProductType,
            ProducerId = requestingUser.Id

        }, cancellationToken); // A new entity is created and persisted in the database.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteProduct(Guid id, UserDTO? requestingUser = null, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetAsync(new ProductProjectionSpec(id), cancellationToken);

        if (product == null) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist!", ErrorCodes.CannotDelete));
        }
        
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != product.Producer.Id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the owner can delete the product!", ErrorCodes.CannotDelete));
        }

        if (requestingUser == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Requesting User is Null!", ErrorCodes.CannotDelete));
        }


        await _repository.DeleteAsync<Product>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<ProductDTO>> GetProduct(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new ProductProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<ProductDTO>.ForSuccess(result) :
            ServiceResponse<ProductDTO>.FromError(new(HttpStatusCode.Forbidden, "Product doesn't exist!", ErrorCodes.EntityNotFound)); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<ProductDTO>>> GetProducts(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new ProductProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse<PagedResponse<ProductDTO>>.ForSuccess(result);
    }
}
