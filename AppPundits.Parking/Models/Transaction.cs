using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPundits.Parking.Models
{
    [Table("transaction")]
    public class Transaction
    {
        [Key]
        public string Reference { set; get; }
        public double Amount { set; get; }
        public string Status { set; get; }
        public DateTime PaidDate { set; get; }
        public string Type { set; get; }
    }
}
