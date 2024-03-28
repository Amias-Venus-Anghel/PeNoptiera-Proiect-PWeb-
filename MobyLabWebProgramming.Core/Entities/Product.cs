using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class Product: BaseEntity
{
    public string Name { get; set; } = default!;
    public float Price { get; set; } = default!;
    public string Description { get; set; }
    public ProductTypeEnum ProductType { get; set; } = default!;

    public Guid ProducerId { get; set; }

    public User Producer { get; set; } = default!;
}
