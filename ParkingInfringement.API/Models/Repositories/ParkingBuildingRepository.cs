using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingInfringement.API.Models.Repositories
{
    public class ParkingBuildingRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;


        public IEnumerable<ParkingBuilding> GetParkingBuildings()
        {
            return db.ParkingBuildings.ToList();
        }

        public ParkingBuilding GetParkingBuilding(int id)
        {
            return db.ParkingBuildings.Find(id);
        }

        public void Update(int id, ParkingBuilding parkingBuilding)
        {
            db.Entry(parkingBuilding).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(ParkingBuilding ParkingBuilding)
        {
            db.ParkingBuildings.Add(ParkingBuilding);
            db.SaveChanges();
        }

        public void Delete(ParkingBuilding parkingBuilding)
        {
            db.ParkingBuildings.Remove(parkingBuilding);
            db.SaveChanges();
        }

        public bool ParkingBuildingExists(int id)
        {
            return db.ParkingBuildings.Count(e => e.Id == id) > 0;
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
