using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class OrderUpdateDTO
{
    public Guid Id { get; set; }
    public OrderStatusEnum Status { get; set; }
}

