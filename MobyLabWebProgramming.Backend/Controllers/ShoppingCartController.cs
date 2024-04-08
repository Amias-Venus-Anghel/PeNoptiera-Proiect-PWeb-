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
public class ShoppingCartController : AuthorizedController
{
    private readonly IShoppingCartService _shoppingCartService;

    public ShoppingCartController(IUserService userService, IShoppingCartService shoppingCartService) : base(userService)
    {
        _shoppingCartService = shoppingCartService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<ShoppingCartDTO>>> GetCartOfCurrentUser()
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _shoppingCartService.GetShoppingCartOfUser(currentUser.Result.Id, currentUser.Result)) :
            this.ErrorMessageResult<ShoppingCartDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<ShoppingCartDTO>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _shoppingCartService.GetShoppingCart(id, currentUser.Result)) :
            this.ErrorMessageResult<ShoppingCartDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<ShoppingCartDTO>>> GetByUserId([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _shoppingCartService.GetShoppingCartOfUser(id, currentUser.Result)) :
            this.ErrorMessageResult<ShoppingCartDTO>(currentUser.Error);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetPage.
    public async Task<ActionResult<RequestResponse<PagedResponse<ShoppingCartDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                           // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _shoppingCartService.GetShoppingCarts(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<ShoppingCartDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost("{productId:guid}")] // This attribute will make the controller respond to a HTTP POST request on the route /api/User/Add.
    public async Task<ActionResult<RequestResponse>> AddProductToCart([FromRoute] Guid productId)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _shoppingCartService.AddProductToCart(productId, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{productId:guid}")] // This attribute will make the controller respond to a HTTP DELETE request on the route /api/User/Delete/<some_guid>.
    public async Task<ActionResult<RequestResponse>> RemoveProductFromCart([FromRoute] Guid productId) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
             this.FromServiceResponse(await _shoppingCartService.RemoveProductFromCart(productId, currentUser.Result)) :
             this.ErrorMessageResult(currentUser.Error);
    }
}
