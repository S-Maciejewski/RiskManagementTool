using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskManagementAPI.Models
{
    [Table("project")]
    public class Project
    {
        [Column("id")] public int Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 1)]
        [Column("name")]
        public string Name { get; set; }

        [Required] [Column("description")] public string Description { get; set; }
    }
}