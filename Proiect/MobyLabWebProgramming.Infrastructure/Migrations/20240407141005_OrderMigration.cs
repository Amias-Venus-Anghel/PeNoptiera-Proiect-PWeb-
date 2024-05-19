using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class OrderMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Order_OrderId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_OrderId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Product");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Order",
                newName: "TotalCost");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryMethod",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfItems",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryMethod",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "NumberOfItems",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "TotalCost",
                table: "Order",
                newName: "TotalPrice");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "Product",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_OrderId",
                table: "Product",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Order_OrderId",
                table: "Product",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");
        }
    }
}
