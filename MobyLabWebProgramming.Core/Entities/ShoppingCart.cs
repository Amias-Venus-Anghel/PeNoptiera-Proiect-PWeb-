using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class ShoppingCart : BaseEntity
{
    public Guid ClientId { get; set; }

    public User Client { get; set; } = default!;
    public ICollection<ShoppingCartProduct> Products { get; set; } = default!;
}
