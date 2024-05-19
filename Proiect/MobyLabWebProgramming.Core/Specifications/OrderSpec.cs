
using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace MobyLabWebProgramming.Core.Specifications
{
    public class OrderSpec : BaseSpec<OrderSpec, Order>
    {
        public OrderSpec(Guid id) :base(id) { }

        public OrderSpec(string? search)
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

}
