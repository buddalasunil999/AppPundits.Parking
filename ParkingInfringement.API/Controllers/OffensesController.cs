using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ParkingInfringement.API.Models;
using ParkingInfringement.API.Models.Repositories;

namespace ParkingInfringement.API.Controllers
{
    public class OffensesController : ApiController
    {
        private OffenseRepository rep = new OffenseRepository();

        // GET: api/Offenses
        public IEnumerable<Offense> GetOffenses()
        {
            return rep.GetOffenses();
        }

        // GET: api/Offenses/5
        [ResponseType(typeof(Offense))]
        public IHttpActionResult GetOffense(int id)
        {
            Offense Offense = rep.GetOffense(id);
            if (Offense == null)
            {
                return NotFound();
            }

            return Ok(Offense);
        }

        // PUT: api/Offenses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOffense(int id, Offense offense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != offense.Id)
            {
                return BadRequest();
            }

            try
            {
                rep.Update(id, offense);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!rep.OffenseExists(id))
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

        // POST: api/Offenses
        [ResponseType(typeof(Offense))]
        public IHttpActionResult PostOffense(Offense offense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.Add(offense);

            return CreatedAtRoute("DefaultApi", new { id = offense.Id }, offense);
        }

        // DELETE: api/Offenses/5
        [ResponseType(typeof(Offense))]
        public IHttpActionResult DeleteOffense(int id)
        {
            Offense Offense = rep.GetOffense(id);
            if (Offense == null)
            {
                return NotFound();
            }

            rep.Delete(Offense);

            return Ok(Offense);
        }
    }
}