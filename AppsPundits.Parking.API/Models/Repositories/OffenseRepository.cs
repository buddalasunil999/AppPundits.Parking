using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AppPundits.Parking.Models.Repositories
{
    public class OffenseRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;

        public IEnumerable<Offense> GetOffenses()
        {
            return db.Offenses.ToList();
        }

        public Offense GetOffense(int id)
        {
            return db.Offenses.Find(id);
        }

        public void Update(int id, Offense offense)
        {
            db.Entry(offense).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(Offense offense)
        {
            db.Offenses.Add(offense);
            db.SaveChanges();
        }

        public void Delete(Offense Offense)
        {
            db.Offenses.Remove(Offense);
            db.SaveChanges();
        }

        public bool OffenseExists(int id)
        {
            return db.Offenses.Count(e => e.Id == id) > 0;
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
