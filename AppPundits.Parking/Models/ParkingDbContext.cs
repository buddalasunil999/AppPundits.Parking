using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppPundits.Parking.Models
{
    class ParkingDbContext : DbContext
    {
        public ParkingDbContext() : base(nameOrConnectionString: "DefaultConnection") { }

        public DbSet<Customer> Customer { get; set; }
    }
}
