using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingInfringement.API.Models.Repositories
{
    public class InfringementRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;

        public IEnumerable<Infringement> GetInfringements()
        {
            return db.Infringements.Include(x => x.Transaction).Include(x => x.Customer).Include(x => x.ParkingBuilding).Include(x => x.Offense).ToList();
        }

        public Infringement GetInfringement(int id)
        {
            return db.Infringements.Find(id);
        }

        public void Update(string id, Infringement infringement)
        {
            DisconnectEntities(infringement);

            db.Entry(infringement).State = EntityState.Modified;
            if (infringement.Customer != null)
                db.Entry(infringement.Customer).State = EntityState.Modified;
            if (infringement.Transaction != null)
                db.Entry(infringement.Transaction).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(Infringement infringement)
        {
            DisconnectEntities(infringement);
            db.Infringements.Add(infringement);
            db.SaveChanges();

            infringement.BreachNo = infringement.Id.ToString();
            Task.Factory.StartNew(() => db.SaveChanges());
        }

        private void DisconnectEntities(Infringement infringement)
        {
            if (infringement.ParkingBuilding != null)
            {
                infringement.ParkingBuildingId = infringement.ParkingBuilding.Id;
                db.Entry(infringement.ParkingBuilding).State = EntityState.Unchanged;
            }
            if (infringement.Offense != null)
            {
                infringement.OffenseId = infringement.Offense.Id;
                db.Entry(infringement.Offense).State = EntityState.Unchanged;
            }
            //if (infringement.Transaction != null)
            //{
            //    infringement.TransactionId = infringement.Transaction.Reference;
            //    db.Entry(infringement.Transaction).State = EntityState.Unchanged;
            //}
        }

        public void Delete(Infringement Infringement)
        {
            db.Infringements.Remove(Infringement);
            db.SaveChanges();
        }

        public bool InfringementExists(string id)
        {
            return db.Infringements.Count(e => e.BreachNo == id) > 0;
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
                    db.Dispose();

                disposed = true;
            }
        }
    }
}
