using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<ProductTypeEnum, string>))]
public sealed class ProductTypeEnum: SmartEnum<ProductTypeEnum, string>
{
    public static readonly ProductTypeEnum Book = new(nameof(Book), "Book");
    public static readonly ProductTypeEnum BoardGame = new(nameof(BoardGame), "BoardGame");
    public static readonly ProductTypeEnum Puzzle = new(nameof(Puzzle), "Puzzle");

    private ProductTypeEnum(string name, string value) : base(name, value)
    {
    }
}

