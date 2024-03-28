using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IShoppingCartService
{
    public Task<ServiceResponse<ShoppingCartDTO>> GetShoppingCart(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<ShoppingCartDTO>>> GetShoppingCarts(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddProductToCart(Guid productId, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> RemoveProductFromCart(Guid productId, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> CreateShoppingCart(Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<ShoppingCartDTO>> GetShoppingCartOfUser(Guid userId, UserDTO requestingUser, CancellationToken cancellationToken = default);
}
