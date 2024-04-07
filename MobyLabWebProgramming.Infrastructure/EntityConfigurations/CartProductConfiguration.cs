using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;
public class CartProductConfiguration
{
    public void Configure(EntityTypeBuilder<CartProduct> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.ShoppingCart)
            .WithMany(u => u.Products)
            .HasForeignKey(e => e.ShoppingCartId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Product)
            .WithMany(u => u.InCarts)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

