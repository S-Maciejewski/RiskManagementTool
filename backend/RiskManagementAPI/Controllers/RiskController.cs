using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Controllers
{
    [Route("[controller]")]
    public class RiskController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public RiskController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Risk
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Risk.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: Risk/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var risk = await _context.Risk
                .FirstOrDefaultAsync(m => m.Id == id);
            if (risk == null)
            {
                return NotFound();
            }

            return Json(risk);
        }

        // POST: Risk/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,RegisterId,DateRaised,Name,Description,Status,ImpactId,ProbabilityId,SeverityId")] [FromBody] Risk risk)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.Risk.FirstOrDefault(r => r.Id == risk.Id);
                    if (existingProject != null)
                    {
                        risk.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(risk);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(risk);
        }

        [HttpGet("edit/{id}")]
        // GET: Risk/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var risk = await _context.Risk.FindAsync(id);
            if (risk == null)
            {
                return NotFound();
            }
            return Json(risk);
        }

        // POST: Risk/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RegisterId,DateRaised,Name,Description,Status,ImpactId,ProbabilityId,SeverityId")] [FromBody] Risk risk)
        {
            if (id != risk.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(risk);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RiskExists(risk.Id))
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
            return Json(risk);
        }

        [HttpGet("delete/{id}")]
        // GET: Risk/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var risk = await _context.Risk
                .FirstOrDefaultAsync(m => m.Id == id);
            if (risk == null)
            {
                return NotFound();
            }

            return Json(risk);
        }

        // POST: Risk/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var risk = await _context.Risk.FindAsync(id);
            _context.Risk.Remove(risk);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RiskExists(int id)
        {
            return _context.Risk.Any(e => e.Id == id);
        }
    }
}
