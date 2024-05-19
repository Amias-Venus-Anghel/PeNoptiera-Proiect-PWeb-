using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace MobyLabWebProgramming.Core.Specifications;

public class FormProjectionSpec : BaseSpec<FormProjectionSpec, Form, FormDTO>
{
    protected override Expression<Func<Form, FormDTO>> Spec => e => new()
    {
        Id = e.Id,
        Subject = e.Subject,
        Body = e.Body,
        Rating = e.Rating,

        User = new()
        {
            Id = e.User.Id,
            Email = e.User.Email,
            Name = e.User.Name,
            Role = e.User.Role
        },

        CreatedAt = e.CreatedAt,
        UpdatedAt = e.UpdatedAt
    };

    public FormProjectionSpec(Guid id) : base(id)
    {
    }

    public FormProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.User.Name, searchExpr) ||
                         EF.Functions.ILike(e.User.Email, searchExpr) ||
                         EF.Functions.ILike(e.Subject, searchExpr));
    }
}
