using Microsoft.EntityFrameworkCore;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Models
{
    public class RiskManagementDbContext : DbContext
    {
        public RiskManagementDbContext(DbContextOptions<RiskManagementDbContext> options) : base(options)
        {
            
        }
        
        public DbSet<Probability> Probability { get; set; }
        
        public DbSet<RiskManagementAPI.Models.Impact> Impact { get; set; }
        
        public DbSet<RiskManagementAPI.Models.Severity> Severity { get; set; }
        
        public DbSet<RiskManagementAPI.Models.RiskRegister> RiskRegister { get; set; }
        
        public DbSet<RiskManagementAPI.Models.UserProject> UserProject { get; set; }
        
        public DbSet<RiskManagementAPI.Models.User> User { get; set; }
        
        public DbSet<RiskManagementAPI.Models.Project> Project { get; set; }
        
        public DbSet<RiskManagementAPI.Models.RiskProperty> RiskProperty { get; set; }
    }
}