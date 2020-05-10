using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskManagementAPI.Models
{
    [Table("risk_property")]
    public class RiskProperty
    {
        [Column("id")] public int Id { get; set; }
        
        [Required]
        [Column("risk_id")] public int RiskId { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 1)]
        [Column("name")]
        public string Name { get; set; }

        [Required] [Column("description")] public string Description { get; set; }

        [Required]
        [Column("quantiative_value")]
        public float QuantitativeValue { get; set; }
    }
}