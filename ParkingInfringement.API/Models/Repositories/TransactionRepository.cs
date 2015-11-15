using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingInfringement.API.Models.Repositories
{
    public class TransactionRepository : IDisposable
    {
        private ParkingDbContext db = new ParkingDbContext();
        private bool disposed = false;


        public IEnumerable<Transaction> GetTransactions()
        {
            return db.Transactions.ToList();
        }

        public Transaction GetTransaction(string id)
        {
            return db.Transactions.Find(id);
        }

        public void Update(string id, Transaction Transaction)
        {
            db.Entry(Transaction).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Add(Transaction transaction)
        {
            db.Transactions.Add(transaction);
            db.SaveChanges();
        }

        public void Delete(Transaction transaction)
        {
            db.Transactions.Remove(transaction);
            db.SaveChanges();
        }

        public bool TransactionExists(string id)
        {
            return db.Transactions.Count(e => e.Reference == id) > 0;
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
