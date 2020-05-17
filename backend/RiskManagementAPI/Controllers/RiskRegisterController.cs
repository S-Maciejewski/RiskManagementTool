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
    public class RiskRegisterController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public RiskRegisterController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: RiskRegister
        public async Task<IActionResult> Index()
        {
            return Json(await _context.RiskRegister.ToListAsync());
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ProjectId,Name,Description")] RiskRegister riskRegister)
        {
            if (ModelState.IsValid)
            {
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ProjectId,Name,Description")] RiskRegister riskRegister)
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
        [ValidateAntiForgeryToken]
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
