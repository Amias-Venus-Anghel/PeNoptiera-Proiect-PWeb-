using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Specifications
{
    public class CartProductSpec: BaseSpec<CartProductSpec, CartProduct>
    {
        public CartProductSpec(Guid shoppingCartId, Guid productId)
        {
            Query.Where(e => e.ShoppingCartId == shoppingCartId && e.ProductId == productId);
        }

        public CartProductSpec(string? search)
        {
            search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

            if (search == null)
            {
                return;
            }

            var searchExpr = $"%{search.Replace(" ", "%")}%";

            Query.Where(e => EF.Functions.ILike(e.ShoppingCart.Client.Name, searchExpr) ||
                            EF.Functions.ILike(e.ShoppingCart.Client.Email, searchExpr));
        }
    }
}
