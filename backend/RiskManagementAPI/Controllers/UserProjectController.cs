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
    public class UserProjectController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public UserProjectController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: UserProject
        public async Task<IActionResult> Index()
        {
            return Json(await _context.UserProject.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: UserProject/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userProject = await _context.UserProject
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (userProject == null)
            {
                return NotFound();
            }

            return Json(userProject);
        }

        // POST: UserProject/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("UserId,ProjectId")] [FromBody] UserProject userProject)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userProject);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(userProject);
        }

        [HttpGet("edit/{id}")]
        // GET: UserProject/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userProject = await _context.UserProject.FindAsync(id);
            if (userProject == null)
            {
                return NotFound();
            }
            return Json(userProject);
        }

        // POST: UserProject/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("UserId,ProjectId")] [FromBody] UserProject userProject)
        {
            if (id != userProject.UserId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userProject);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserProjectExists(userProject.UserId))
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
            return Json(userProject);
        }

        [HttpGet("delete/{id}")]
        // GET: UserProject/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userProject = await _context.UserProject
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (userProject == null)
            {
                return NotFound();
            }

            return Json(userProject);
        }

        // POST: UserProject/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var userProject = await _context.UserProject.FindAsync(id);
            _context.UserProject.Remove(userProject);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserProjectExists(int id)
        {
            return _context.UserProject.Any(e => e.UserId == id);
        }
    }
}
