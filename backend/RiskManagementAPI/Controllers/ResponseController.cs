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
    public class ResponseController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public ResponseController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Response
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Response.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: Response/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var response = await _context.Response
                .FirstOrDefaultAsync(m => m.Id == id);
            if (response == null)
            {
                return NotFound();
            }

            return Json(response);
        }
        
        // POST: Response/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,RiskId,Name,Description,ExpectedResult,Progress")] [FromBody] Response response)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.Response.FirstOrDefault(r => r.Id == response.Id);
                    if (existingProject != null)
                    {
                        response.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(response);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(response);
        }

        [HttpGet("edit/{id}")]
        // GET: Response/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var response = await _context.Response.FindAsync(id);
            if (response == null)
            {
                return NotFound();
            }
            return Json(response);
        }

        // POST: Response/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RiskId,Name,Description,ExpectedResult,Progress")] [FromBody] Response response)
        {
            if (id != response.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(response);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ResponseExists(response.Id))
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
            return Json(response);
        }

        [HttpGet("delete/{id}")]
        // GET: Response/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var response = await _context.Response
                .FirstOrDefaultAsync(m => m.Id == id);
            if (response == null)
            {
                return NotFound();
            }

            return Json(response);
        }

        // POST: Response/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var response = await _context.Response.FindAsync(id);
            _context.Response.Remove(response);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ResponseExists(int id)
        {
            return _context.Response.Any(e => e.Id == id);
        }
    }
}
