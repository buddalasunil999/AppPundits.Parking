using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using AppPundits.Parking.Models;
using AppPundits.Parking.Models.Repositories;

namespace AppPundits.Parking.Controllers
{
    public class InfringementsController : ApiController
    {
        private InfringementRepository rep = new InfringementRepository();

        // GET: api/Infringements
        public IEnumerable<Infringement> GetInfringements()
        {
            return rep.GetInfringements();
        }

        [ResponseType(typeof(Infringement))]
        public IHttpActionResult GetInfringement(bool isnew)
        {
            return Ok(new Infringement());
        }

        // GET: api/Infringements/5
        [ResponseType(typeof(Infringement))]
        public IHttpActionResult GetInfringement(int id)
        {
            Infringement Infringement = rep.GetInfringement(id);
            if (Infringement == null)
            {
                return NotFound();
            }

            return Ok(Infringement);
        }

        // PUT: api/Infringements/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInfringement(string id, Infringement infringement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != infringement.BreachNo)
            {
                return BadRequest();
            }

            try
            {
                rep.Update(id, infringement);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!rep.InfringementExists(id))
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

        // POST: api/Infringements
        [ResponseType(typeof(Infringement))]
        public IHttpActionResult PostInfringement(Infringement infringement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.Add(infringement);

            return CreatedAtRoute("DefaultApi", new { id = infringement.BreachNo }, infringement);
        }

        // DELETE: api/Infringements/5
        [ResponseType(typeof(Infringement))]
        public IHttpActionResult DeleteInfringement(int id)
        {
            Infringement Infringement = rep.GetInfringement(id);
            if (Infringement == null)
            {
                return NotFound();
            }

            rep.Delete(Infringement);

            return Ok(Infringement);
        }
    }
}