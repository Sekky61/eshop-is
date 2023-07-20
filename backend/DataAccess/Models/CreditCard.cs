using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models
{
    public class CreditCard
    {
        public Guid Id { get; set; }
        public string CardNumber { get; set; } = null!;
        public string CardHolderName { get; set; } = null!;
        public string ExpirationDate { get; set; } = null!;
        public string Ccv { get; set; } = null!;
    }
}