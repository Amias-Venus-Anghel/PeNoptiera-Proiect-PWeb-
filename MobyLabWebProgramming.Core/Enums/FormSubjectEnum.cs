using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<FormSubjectEnum, string>))]
public sealed class FormSubjectEnum : SmartEnum<FormSubjectEnum, string>
{
    public static readonly FormSubjectEnum Other = new(nameof(Other), "Other");
    public static readonly FormSubjectEnum Payment = new(nameof(Payment), "Payment");
    public static readonly FormSubjectEnum Delivery = new(nameof(Delivery), "Delivery");
    public static readonly FormSubjectEnum Products = new(nameof(Products), "Products");
    public static readonly FormSubjectEnum Account = new(nameof(Account), "Account");

    private FormSubjectEnum(string name, string value) : base(name, value)
    {
    }
}

