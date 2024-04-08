using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class OrderController : AuthorizedController
{
    private readonly IOrderService _orderService;

    public OrderController(IUserService userService, IOrderService orderService) : base(userService)
    {
        _orderService = orderService;  
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<OrderDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.GetOrder(id, currentUser.Result)) :
            this.ErrorMessageResult<OrderDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet] 
    public async Task<ActionResult<RequestResponse<PagedResponse<OrderDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)   {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.GetOrders(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<OrderDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost] 
    public async Task<ActionResult<RequestResponse>> PlaceOrder([FromBody] OrderAddDTO orderDetails)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.AddOrder(orderDetails, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> UpdateOrder([FromBody] OrderUpdateDTO orderDetails)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.UpdateOrder(orderDetails, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")] 
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.DeleteOrder(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}

