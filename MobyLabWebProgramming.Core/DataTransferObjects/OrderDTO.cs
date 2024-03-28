using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class OrderDTO
{
    public Guid Id { get; set; }


    public UserDTO Client { get; set; } = default!;

    public string DeliveryAddress { get; set; }
    public float TotalPrice { get; set; }
    public OrderStatusEnum Status { get; set; }

    public ICollection<Product> Products { get; set; } = default!;


    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

}

