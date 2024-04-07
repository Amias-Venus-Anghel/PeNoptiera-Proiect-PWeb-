using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class CartProduct : BaseEntity
{
    public Guid ShoppingCartId { get; set; }
    public ShoppingCart ShoppingCart { get; set; } = default!;

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = default!;
}
