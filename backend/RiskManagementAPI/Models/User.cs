using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskManagementAPI.Models
{
    [Table("user")]
    public class User
    {
        [Column("id")] public int Id { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 1)]
        [Column("login")]
        public string Login { get; set; }

        [Required] [Column("password")] public string Password { get; set; }
    }
}