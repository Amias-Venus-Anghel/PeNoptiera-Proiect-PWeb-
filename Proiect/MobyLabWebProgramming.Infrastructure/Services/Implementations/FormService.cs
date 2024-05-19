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

public class FormService : IFormService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public FormService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<FormDTO>> GetForm(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse< FormDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can see forms", ErrorCodes.AccessDenied));
        }
        
        var result = await _repository.GetAsync(new FormProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<FormDTO>.ForSuccess(result) :
            ServiceResponse<FormDTO>.FromError(new(HttpStatusCode.Forbidden, "Form doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse<PagedResponse<FormDTO>>> GetForms(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse<PagedResponse<FormDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can see forms", ErrorCodes.AccessDenied));
        }

        var result = await _repository.PageAsync(pagination, new FormProjectionSpec(pagination.Search), cancellationToken); 

        return ServiceResponse<PagedResponse<FormDTO>>.ForSuccess(result);

    }

    public async Task<ServiceResponse> AddForm(FormAddDTO form, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(new Form
        {
            Subject = form.Subject,
            Body = form.Body,
            Rating = form.Rating,
            UserID = requestingUser.Id

        }, cancellationToken); 

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> DeleteForm(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var form = await _repository.GetAsync(new FormProjectionSpec(id), cancellationToken);

        if (form == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Form doesn't exist!", ErrorCodes.CannotDelete));
        }

        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete forms!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Form>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

}
