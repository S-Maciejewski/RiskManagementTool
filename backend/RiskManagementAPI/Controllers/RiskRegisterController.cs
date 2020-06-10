using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class RiskRegisterController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public RiskRegisterController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: RiskRegister
        public async Task<IActionResult> Index(int projectId)
        {
            return Json(await _context.RiskRegister.Where(rr => rr.ProjectId == projectId).ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: RiskRegister/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskRegister = await _context.RiskRegister
                .FirstOrDefaultAsync(m => m.Id == id);
            if (riskRegister == null)
            {
                return NotFound();
            }

            return Json(riskRegister);
        }
        
        // POST: RiskRegister/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,ProjectId,Name,Description")] [FromBody] RiskRegister riskRegister)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.RiskRegister.FirstOrDefault(r => r.Id == riskRegister.Id);
                    if (existingProject != null)
                    {
                        riskRegister.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(riskRegister);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(riskRegister);
        }

        [HttpGet("edit/{id}")]
        // GET: RiskRegister/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskRegister = await _context.RiskRegister.FindAsync(id);
            if (riskRegister == null)
            {
                return NotFound();
            }
            return Json(riskRegister);
        }

        // POST: RiskRegister/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ProjectId,Name,Description")] [FromBody] RiskRegister riskRegister)
        {
            if (id != riskRegister.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(riskRegister);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RiskRegisterExists(riskRegister.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Json(riskRegister);
        }

        [HttpGet("delete/{id}")]
        // GET: RiskRegister/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskRegister = await _context.RiskRegister
                .FirstOrDefaultAsync(m => m.Id == id);
            if (riskRegister == null)
            {
                return NotFound();
            }

            return Json(riskRegister);
        }

        // POST: RiskRegister/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var riskRegister = await _context.RiskRegister.FindAsync(id);
            _context.RiskRegister.Remove(riskRegister);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RiskRegisterExists(int id)
        {
            return _context.RiskRegister.Any(e => e.Id == id);
        }
    }
}
