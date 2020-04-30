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
    }
}