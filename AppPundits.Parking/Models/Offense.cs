using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPundits.Parking.Models
{
    [Table("infringement")]
    public class Offense
    {
        [Key]
        public int OffenseId { set; get; }
        public string OffenseDesc { set; get; }
        public double FineAmount { set; get; }
    }
}
