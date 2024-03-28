using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System.Linq.Expressions;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public class ShoppingCartSpec : BaseSpec<ShoppingCartSpec, ShoppingCart>
{
    public ShoppingCartSpec(Guid id) : base(id)
    {
    }

    public ShoppingCartSpec(string? search)
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
