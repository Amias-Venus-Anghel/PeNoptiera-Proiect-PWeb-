using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ProductAddDTO
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public float Price { get; set; }
}

