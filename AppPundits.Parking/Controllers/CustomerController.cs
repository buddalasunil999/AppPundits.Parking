using AppPundits.Parking.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace AppPundits.Parking.Controllers
{
    public class CustomerController : ApiController
    {
        CustomerRepository _rep = new CustomerRepository();

        public IEnumerable<Customer> Get()
        {
            return _rep.GetAll();
        }

        public string Get(int id)
        {
            return _rep.Get(id);
        }

        public void Post([FromBody]Customer value)
        {
            _rep.Add(value);
        }

        public void Put(int id, [FromBody]Customer value)
        {
            _rep.Update(id, value);
        }

        public void Delete(int id)
        {
            _rep.Delete(id);
        }
    }
}
