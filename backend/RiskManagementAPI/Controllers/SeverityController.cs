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
    public class SeverityController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public SeverityController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Severity
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Severity.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: Severity/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var severity = await _context.Severity
                .FirstOrDefaultAsync(m => m.Id == id);
            if (severity == null)
            {
                return NotFound();
            }

            return Json(severity);
        }

        // POST: Severity/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,Name,Value")] [FromBody] Severity severity)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.Severity.FirstOrDefault(r => r.Id == severity.Id);
                    if (existingProject != null)
                    {
                        severity.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(severity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(severity);
        }

        [HttpGet("edit/{id}")]
        // GET: Severity/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var severity = await _context.Severity.FindAsync(id);
            if (severity == null)
            {
                return NotFound();
            }
            return Json(severity);
        }

        // POST: Severity/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Value")] [FromBody] Severity severity)
        {
            if (id != severity.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(severity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SeverityExists(severity.Id))
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
            return Json(severity);
        }

        [HttpGet("delete/{id}")]
        // GET: Severity/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var severity = await _context.Severity
                .FirstOrDefaultAsync(m => m.Id == id);
            if (severity == null)
            {
                return NotFound();
            }

            return Json(severity);
        }

        // POST: Severity/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var severity = await _context.Severity.FindAsync(id);
            _context.Severity.Remove(severity);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SeverityExists(int id)
        {
            return _context.Severity.Any(e => e.Id == id);
        }
    }
}
