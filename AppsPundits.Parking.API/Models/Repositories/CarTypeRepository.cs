using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AppPundits.Parking.Models.Repositories
{
    public class CarTypeRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;

        public IEnumerable<CarType> GetCarTypes()
        {
            return db.CarTypes.ToList();
        }

        public CarType GetCarType(int id)
        {
            return db.CarTypes.Find(id);
        }

        public void Update(int id, CarType carType)
        {
            db.Entry(carType).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(CarType carType)
        {
            db.CarTypes.Add(carType);
            db.SaveChanges();
        }

        public void Delete(CarType carType)
        {
            db.CarTypes.Remove(carType);
            db.SaveChanges();
        }

        public bool CarTypeExists(int id)
        {
            return db.CarTypes.Count(e => e.Id == id) > 0;
        }

        public void Dispose()
        {
            Dispose(true);
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
