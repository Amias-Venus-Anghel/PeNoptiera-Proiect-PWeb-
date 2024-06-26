﻿using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace MobyLabWebProgramming.Core.Specifications;

public class ProductProjectionSpec : BaseSpec<ProductProjectionSpec, Product, ProductDTO>
{
    protected override Expression<Func<Product, ProductDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Description = e.Description,
        Price = e.Price,
        ProductType = e.ProductType,

        Producer = new()
        {
            Id = e.Producer.Id,
            Email = e.Producer.Email,
            Name = e.Producer.Name,
            Role = e.Producer.Role
        },

        CreatedAt = e.CreatedAt,
        UpdatedAt = e.UpdatedAt
    };

    public ProductProjectionSpec(Guid id) : base(id)
    {
    }

    public ProductProjectionSpec(string? search, Guid? producerId)
    {
        if (producerId != null)
        {
            Query.Where(e => e.Producer.Id == producerId);
        }

        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr) ||
                         EF.Functions.ILike(e.Description, searchExpr) ||
                         EF.Functions.ILike(e.ProductType, searchExpr));
    }

}
