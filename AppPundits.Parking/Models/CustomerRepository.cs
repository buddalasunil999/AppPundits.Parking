using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppPundits.Parking.Models
{
    public class CustomerRepository
    {
        public List<Customer> GetAll()
        {
            using (var context = new ParkingDbContext())
            {
                return context.Customer.ToList();
            }
        }

        internal string Get(int id)
        {
            throw new NotImplementedException();
        }

        internal void Add(Customer value)
        {
            throw new NotImplementedException();
        }

        internal void Update(int id, Customer value)
        {
            throw new NotImplementedException();
        }

        internal void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
