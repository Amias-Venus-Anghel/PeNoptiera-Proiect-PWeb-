using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class FormController : AuthorizedController
{
    private readonly IFormService _formService;

    public FormController(IUserService userService, IFormService formService) : base(userService)
    {
        _formService = formService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<FormDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _formService.GetForm(id, currentUser.Result)) :
            this.ErrorMessageResult<FormDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<FormDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                            // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _formService.GetForms(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<FormDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost] // This attribute will make the controller respond to a HTTP POST request on the route /api/User/Add.
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FormAddDTO product)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _formService.AddForm(product, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")] // This attribute will make the controller respond to a HTTP DELETE request on the route /api/User/Delete/<some_guid>.
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _formService.DeleteForm(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
