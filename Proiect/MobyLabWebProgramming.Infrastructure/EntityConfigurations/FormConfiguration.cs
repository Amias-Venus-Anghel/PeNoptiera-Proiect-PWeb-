using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class FormConfiguration : IEntityTypeConfiguration<Form>
{
    public void Configure(EntityTypeBuilder<Form> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Subject)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Body)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Rating)
            .HasPrecision(2)
            .IsRequired();
        builder.Property(e => e.UserID)
            .IsRequired();

        builder.Property(e => e.CreatedAt)
           .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.User)
            .WithMany(e => e.Forms)
            .HasForeignKey(e => e.UserID)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
