using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.Entities;

public class Order : BaseEntity
{
    public string DeliveryAddress { get; set; } = default!;
    public float TotalCost { get; set; } = default!;
    public int NumberOfItems { get; set; } = default!;
    public OrderDeliveryEnum DeliveryMethod { get; set; } = default!;
    public OrderStatusEnum Status { get; set; } = default!;

    public Guid ClientId { get; set; }

    public User Client { get; set; } = default!;
}
