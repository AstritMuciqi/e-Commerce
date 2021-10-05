using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Sector> Sector{get;set;}

        public DbSet<Brand> Brand{get;set;}

        public DbSet<Product> Product{get;set;}

        public DbSet<AdresaFaturimit> AdresaF{get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }





    }
}
