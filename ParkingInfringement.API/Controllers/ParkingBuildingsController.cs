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
    public class ParkingBuildingsController : ApiController
    {
        private ParkingBuildingRepository rep = new ParkingBuildingRepository();

        // GET: api/ParkingBuildings
        public IEnumerable<ParkingBuilding> GetParkingBuildings()
        {
            return rep.GetParkingBuildings();
        }

        // GET: api/ParkingBuildings/5
        [ResponseType(typeof(ParkingBuilding))]
        public IHttpActionResult GetParkingBuilding(int id)
        {
            ParkingBuilding ParkingBuilding = rep.GetParkingBuilding(id);
            if (ParkingBuilding == null)
            {
                return NotFound();
            }

            return Ok(ParkingBuilding);
        }

        // PUT: api/ParkingBuildings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutParkingBuilding(int id, ParkingBuilding parkingBuilding)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != parkingBuilding.Id)
            {
                return BadRequest();
            }

            try
            {
                rep.Update(id, parkingBuilding);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!rep.ParkingBuildingExists(id))
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

        // POST: api/ParkingBuildings
        [ResponseType(typeof(ParkingBuilding))]
        public IHttpActionResult PostParkingBuilding(ParkingBuilding parkingBuilding)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.Add(parkingBuilding);

            return CreatedAtRoute("DefaultApi", new { id = parkingBuilding.Id }, parkingBuilding);
        }

        // DELETE: api/ParkingBuildings/5
        [ResponseType(typeof(ParkingBuilding))]
        public IHttpActionResult DeleteParkingBuilding(int id)
        {
            ParkingBuilding ParkingBuilding = rep.GetParkingBuilding(id);
            if (ParkingBuilding == null)
            {
                return NotFound();
            }

            rep.Delete(ParkingBuilding);

            return Ok(ParkingBuilding);
        }
    }
}