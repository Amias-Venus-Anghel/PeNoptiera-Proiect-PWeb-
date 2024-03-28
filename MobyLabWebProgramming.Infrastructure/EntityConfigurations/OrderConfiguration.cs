using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(e => e.Id);

        builder.Property(e => e.DeliveryAddress)
            .IsRequired();
        builder.Property(e => e.TotalPrice)
            .HasPrecision(2)
            .IsRequired();
        builder.Property(e => e.Status)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(e => e.CreatedAt)
           .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        /*builder.HasOne(e => e.Client)
            .WithMany(e => e.Orders)
            .HasForeignKey(e => e.ClientId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);*/
    }
}
