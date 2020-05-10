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
    public class RiskPropertyController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public RiskPropertyController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: RiskProperty
        public async Task<IActionResult> Index()
        {
            return View(await _context.RiskProperty.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: RiskProperty/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskProperty = await _context.RiskProperty
                .FirstOrDefaultAsync(m => m.Id == id);
            if (riskProperty == null)
            {
                return NotFound();
            }

            return View(riskProperty);
        }

        [HttpGet("create")]
        // GET: RiskProperty/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: RiskProperty/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,RiskId,Name,Description,QuantitativeValue")] RiskProperty riskProperty)
        {
            if (ModelState.IsValid)
            {
                _context.Add(riskProperty);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(riskProperty);
        }

        [HttpGet("edit/{id}")]
        // GET: RiskProperty/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskProperty = await _context.RiskProperty.FindAsync(id);
            if (riskProperty == null)
            {
                return NotFound();
            }
            return View(riskProperty);
        }

        // POST: RiskProperty/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RiskId,Name,Description,QuantitativeValue")] RiskProperty riskProperty)
        {
            if (id != riskProperty.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(riskProperty);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RiskPropertyExists(riskProperty.Id))
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
            return View(riskProperty);
        }

        [HttpGet("delete/{id}")]
        // GET: RiskProperty/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var riskProperty = await _context.RiskProperty
                .FirstOrDefaultAsync(m => m.Id == id);
            if (riskProperty == null)
            {
                return NotFound();
            }

            return View(riskProperty);
        }

        // POST: RiskProperty/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var riskProperty = await _context.RiskProperty.FindAsync(id);
            _context.RiskProperty.Remove(riskProperty);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RiskPropertyExists(int id)
        {
            return _context.RiskProperty.Any(e => e.Id == id);
        }
    }
}
