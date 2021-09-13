﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("Domain.AdresaFaturimit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Adrersa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Adresa2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Emri")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mbiemri")
                        .HasColumnType("TEXT");

                    b.Property<int>("NrTelefonit")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NrTelefonit2")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Qyteti")
                        .HasColumnType("TEXT");

                    b.Property<string>("Shteti")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AdresaF");
                });

            modelBuilder.Entity("Domain.Brand", b =>
                {
                    b.Property<Guid>("BrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("BrandName")
                        .HasColumnType("TEXT");

                    b.HasKey("BrandId");

                    b.ToTable("Brand");
                });

            modelBuilder.Entity("Domain.Product", b =>
                {
                    b.Property<Guid>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Brand")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ModelYear")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhotoFileName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProductName")
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Sector")
                        .HasColumnType("TEXT");

                    b.Property<float>("ValueOfProduct")
                        .HasColumnType("REAL");

                    b.HasKey("ProductId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("Domain.Sector", b =>
                {
                    b.Property<Guid>("SectorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("SectorName")
                        .HasColumnType("TEXT");

                    b.HasKey("SectorId");

                    b.ToTable("Sector");
                });
#pragma warning restore 612, 618
        }
    }
}
