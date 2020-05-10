using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskManagementAPI.Models
{
    [Table("risk")]
    public class Risk
    {
        [Column("id")] public int Id { get; set; }

        [Required] [Column("register_id")] public int RegisterId { get; set; }
        
        [Required] [Column("date_raised")] public DateTime DateRaised { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 1)]
        [Column("name")]
        public string Name { get; set; }

        [Required] [Column("description")] public string Description { get; set; }

        [Required] [Column("status")] public string Status { get; set; }

        [Required] [Column("impact_id")] public int ImpactId { get; set; }
        [Required] [Column("probability_id")] public int ProbabilityId { get; set; }
        [Required] [Column("severity_id")] public int SeverityId { get; set; }

    }
}