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
        ClientId = e.ClientId,

        Products = e.Products.Select(p => new CartProductDTO
        {
            Id = p.Id,

            Product = new ProductDTO {
                Id = p.Product.Id,
                Name = p.Product.Name,
                Description = p.Product.Description,
                Price = p.Product.Price,
                ProductType = p.Product.ProductType,

                Producer = new()
                {
                    Id = p.Product.Producer.Id,
                    Email = p.Product.Producer.Email,
                    Name = p.Product.Producer.Name,
                    Role = p.Product.Producer.Role
                },

                CreatedAt = p.Product.CreatedAt,
                UpdatedAt = p.Product.UpdatedAt
            }

        }).ToList()

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
