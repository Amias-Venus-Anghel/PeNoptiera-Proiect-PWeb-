using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ProductAddDTO
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public float Price { get; set; } = default!;

    public ProductTypeEnum ProductType { get; set; } = default!;
}

