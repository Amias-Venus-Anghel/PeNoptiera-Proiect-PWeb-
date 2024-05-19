using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IOrderService
{
    public Task<ServiceResponse<OrderDTO>> GetOrder(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<OrderDTO>>> GetOrders(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddOrder(OrderAddDTO order, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteOrder(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateOrder(OrderUpdateDTO orderUpdate ,UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
