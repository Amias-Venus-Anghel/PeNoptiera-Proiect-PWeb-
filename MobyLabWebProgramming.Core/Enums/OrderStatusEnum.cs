using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<OrderStatusEnum, string>))]
public sealed class OrderStatusEnum : SmartEnum<OrderStatusEnum, string>
{
    public static readonly OrderStatusEnum Registered = new(nameof(Registered), "Registered");
    public static readonly OrderStatusEnum InTranzit = new(nameof(InTranzit), "InTranzit");
    public static readonly OrderStatusEnum Delivered = new(nameof(Delivered), "Delivered");

    private OrderStatusEnum(string name, string value) : base(name, value)
    {
    }
}

