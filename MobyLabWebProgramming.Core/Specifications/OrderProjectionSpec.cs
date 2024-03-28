using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace MobyLabWebProgramming.Core.Specifications;

public class OrderProjectionSpec : BaseSpec<OrderProjectionSpec, Order, OrderDTO>
{
    protected override Expression<Func<Order, OrderDTO>> Spec => e => new()
    {
        Id = e.Id,
        TotalPrice = e.TotalPrice,
        DeliveryAddress = e.DeliveryAddress,
        Status = e.Status,
        Products = e.Products,

        Client = new()
        {
            Id = e.Client.Id,
            Email = e.Client.Email,
            Name = e.Client.Name,
            Role = e.Client.Role
        },

        CreatedAt = e.CreatedAt,
        UpdatedAt = e.UpdatedAt
    };

    public OrderProjectionSpec(Guid id) : base(id)
    {
    }

    public OrderProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Client.Name, searchExpr) ||
                         EF.Functions.ILike(e.Client.Email, searchExpr));
    }
}
