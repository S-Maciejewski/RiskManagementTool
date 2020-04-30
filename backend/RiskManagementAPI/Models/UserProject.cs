using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskManagementAPI.Models
{
    [Table("user_project")]
    public class UserProject
    {
        [Key] [Column("user_id")] public int UserId { get; set; }
        [Column("project_id")] public int ProjectId { get; set; }
    }
}