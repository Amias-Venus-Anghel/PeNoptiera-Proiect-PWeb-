using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ShoppingCartProductDTO
{
    public Guid Id { get; set; }
    public ProductDTO Product { get; set; } = default!;
}