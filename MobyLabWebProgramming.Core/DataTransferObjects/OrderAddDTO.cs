
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class OrderAddDTO
{
    public string DeliveryAddress { get; set; }
    public OrderDeliveryEnum DeliveryMethod { get; set; }

}

