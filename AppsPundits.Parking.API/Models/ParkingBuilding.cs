using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPundits.Parking.Models
{
    [Table("parkingbuilding")]
    public class ParkingBuilding
    {
        [Key]
        public int Id { set; get; }
        public string BuildingName { set; get; }
        public string StreetName { set; get; }
        public string City { set; get; }
    }
}
