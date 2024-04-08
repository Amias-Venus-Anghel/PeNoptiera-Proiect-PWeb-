using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Form : BaseEntity
{
    public FormSubjectEnum Subject { get; set; } = default!;
    public string Body { get; set; } = default!;
    public float Rating { get; set; } = default!;

    public Guid UserID { get; set; }

    public User User { get; set; } = default!;

}

