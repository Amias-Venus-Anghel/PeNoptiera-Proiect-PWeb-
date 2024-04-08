using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IFormService
{
    public Task<ServiceResponse<FormDTO>> GetForm(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<FormDTO>>> GetForms(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddForm(FormAddDTO formAdd, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteForm(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
}
