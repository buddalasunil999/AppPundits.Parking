using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using ParkingInfringement.API.Models;
using ParkingInfringement.API.Models.Repositories;

namespace ParkingInfringement.API.Controllers
{
    public class TransactionsController : ApiController
    {
        private TransactionRepository rep = new TransactionRepository();

        // GET: api/Transactions
        public IEnumerable<Transaction> GetTransactions()
        {
            return rep.GetTransactions();
        }

        // GET: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult GetTransaction(string id)
        {
            Transaction Transaction = rep.GetTransaction(id);
            if (Transaction == null)
            {
                return NotFound();
            }

            return Ok(Transaction);
        }

        // PUT: api/Transactions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaction(string id, Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transaction.Reference)
            {
                return BadRequest();
            }

            try
            {
                rep.Update(id, transaction);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!rep.TransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Transactions
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransaction(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.Add(transaction);

            return CreatedAtRoute("DefaultApi", new { id = transaction.Reference }, transaction);
        }

        // DELETE: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult DeleteTransaction(string id)
        {
            Transaction Transaction = rep.GetTransaction(id);
            if (Transaction == null)
            {
                return NotFound();
            }

            rep.Delete(Transaction);

            return Ok(Transaction);
        }
    }
}