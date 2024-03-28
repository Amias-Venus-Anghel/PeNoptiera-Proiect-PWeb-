using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System.Linq.Expressions;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public class ShoppingCartProjectionSpec : BaseSpec<ShoppingCartProjectionSpec, ShoppingCart, ShoppingCartDTO>
{
    protected override Expression<Func<ShoppingCart, ShoppingCartDTO>> Spec => e => new()
    {
        Id = e.Id,

        Client = new()
        {
            Id = e.Client.Id,
            Email = e.Client.Email,
            Name = e.Client.Name,
            Role = e.Client.Role
        },

        Products = e.Products
    };

    public ShoppingCartProjectionSpec(Guid id) : base(id)
    {
    }

    public ShoppingCartProjectionSpec(string? search)
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
