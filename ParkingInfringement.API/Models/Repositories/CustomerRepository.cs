using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AppPundits.Parking.Models.Repositories
{
    public class CustomerRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
        }
        public IEnumerable<Customer> GetCustomers()
        {
            return db.Customers.ToList();
        }

        public Customer GetCustomer(int id)
        {
            return db.Customers.Find(id);
        }

        public void Update(int id, Customer customer)
        {
            db.Entry(customer).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(Customer customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
        }

        public void Delete(Customer Customer)
        {
            db.Customers.Remove(Customer);
            db.SaveChanges();
        }

        public bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.Id == id) > 0;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }

                disposed = true;
            }
        }
    }
}
