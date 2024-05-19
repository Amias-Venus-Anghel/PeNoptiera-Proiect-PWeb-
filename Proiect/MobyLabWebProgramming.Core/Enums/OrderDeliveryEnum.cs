using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<OrderDeliveryEnum, string>))]
public sealed class OrderDeliveryEnum : SmartEnum<OrderDeliveryEnum, string>
{
    public static readonly OrderDeliveryEnum Courier = new(nameof(Courier), "Courier");
    public static readonly OrderDeliveryEnum Post = new(nameof(Post), "Post");

    private OrderDeliveryEnum(string name, string value) : base(name, value)
    {
    }
}

