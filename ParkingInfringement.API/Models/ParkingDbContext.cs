using System.Data.Entity;

namespace ParkingInfringement.API.Models
{
    class ParkingDbContext : DbContext
    {
        public ParkingDbContext() : base(nameOrConnectionString: "DefaultConnection") {

            this.Configuration.LazyLoadingEnabled = false;
        }
        
        public DbSet<CarType> CarTypes { get; set; }

        public DbSet<Infringement> Infringements { get; set; }

        public DbSet<Offense> Offenses { get; set; }

        public DbSet<ParkingBuilding> ParkingBuildings { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Customer> Customers { get; set; }
    }
}
