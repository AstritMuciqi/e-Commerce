using System.Collections.Generic;
using System.Linq;
using Domain;
using System;
namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context){
            if(!context.Sector.Any())
            {
                var sectors = new List<Sector>
                {
                    new Sector{
                        SectorName="Laptopa",  
                    },
                    new Sector{
                        SectorName="Kompjutera",  
                    },
                    new Sector{
                        SectorName="Aksesore",  
                    }
                };
                context.Sector.AddRange(sectors);
                context.SaveChanges();
            }

            if(!context.Brand.Any())
            {
                var brands = new List<Brand>
                {
                    new Brand{
                        BrandName="Asus",  
                    },
                    new Brand{
                        BrandName="Dell",  
                    },
                    new Brand{
                        BrandName="Lenovo",  
                    }
                };
                context.Brand.AddRange(brands);
                context.SaveChanges();
            }
            if(!context.Product.Any())
            {
                var products = new List<Product>
                {
                    new Product{
                        
                        ProductName="Gaming Laptop",
                        Sector="Laptop",
                        Brand="Asus",
                        ValueOfProduct=399.99F,
                        ModelYear=DateTime.Parse("2020/10/12"),
                        PhotoFileName="anynomous.png",
                        Quantity=10,
                        Description="Laptop i fuqishem per nje eksperienc ne lojrat ma te reja"

                        

                    },
                    new Product{
                        ProductName="Gaming Laptop",
                        Sector="Laptop",
                        Brand="Lenovo",
                        ValueOfProduct=499.99F,
                        ModelYear=DateTime.Parse("2020/11/12"),
                        PhotoFileName="anynomous.png",
                        Quantity=30,
                        Description="Laptop i fuqishem per nje eksperienc ne lojrat ma te reja"  
                    },
                    new Product{
                        ProductName="Gaming Laptop",
                        Sector="Laptop",
                        Brand="Dell",
                        ValueOfProduct=599.99F,
                        ModelYear=DateTime.Parse("2020/12/12"),
                        PhotoFileName="anynomous.png",
                        Quantity=20,
                        Description="Laptop i fuqishem per nje eksperienc ne lojrat ma te reja"  
                    }
                };
                context.Product.AddRange(products);
                context.SaveChanges();
            }
            if(!context.AdresaF.Any())
            {
                var adresaf = new List<AdresaFaturimit>
                {
                    new AdresaFaturimit
                    {
                        Emri = "Besar",
                        Mbiemri = "Durguti",
                        NrTelefonit = 049334332,
                        NrTelefonit2 = 045334221 ,
                        Adrersa = "Deshmoret e Pashtrikut" ,
                        Adresa2 = "Gzim Piktori",
                        Qyteti = "Rahovec",
                        Shteti = "Kosovo",
                    },
                     new AdresaFaturimit
                    {
                        Emri = "Astrit",
                        Mbiemri = "Muçiçi",
                        NrTelefonit = 049224552,
                        NrTelefonit2 = 045778998 ,
                        Adrersa = "28 Nentori" ,
                        Adresa2 = " ",
                        Qyteti = "Podujevë",
                        Shteti = "Kosovo",
                    }
                };

                context.AdresaF.AddRange(adresaf);
                context.SaveChanges();
            }
            

        }
    }
}