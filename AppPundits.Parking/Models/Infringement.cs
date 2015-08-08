using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppPundits.Parking.Models
{
    [Table("infringement")]
    public class Infringement
    {
        [Key]
        public string BreachNo { set; get; }
        public string CarRegNo { set; get; }
        public string CarTpye { set; get; }
        public int CustomerId { set; get; }
        public double OffenseAmount { set; get; }
        public int ParkingBuildingId { set; get; }
        public DateTime BreachDate { set; get; }
        public string TransactionId { set; get; }
        public string Photo { set; get; }
        public int OfficerId { set; get; }
        public string Comments { set; get; }
        public int OffenseId { set; get; }
    }
}

