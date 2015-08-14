using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPundits.Parking.Models
{
    [Table("offense")]
    public class Offense
    {
        [Key]
        public int Id { set; get; }
        public string Description { set; get; }
        public double FineAmount { set; get; }
    }
}
