using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Controllers
{
    [Route("[controller]")]
    public class ProbabilityController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public ProbabilityController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Probability
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Probability.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: Probability/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var probability = await _context.Probability
                .FirstOrDefaultAsync(m => m.Id == id);
            if (probability == null)
            {
                return NotFound();
            }

            return Json(probability);
        }

        // POST: Probability/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,Name,Value")] [FromBody] Probability probability)
        {
            if (ModelState.IsValid)
            {
                _context.Add(probability);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            return Json(probability);
        }

        [HttpGet("edit/{id}")]
        // GET: Probability/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var probability = await _context.Probability.FindAsync(id);
            if (probability == null)
            {
                return NotFound();
            }

            return Json(probability);
        }

        // POST: Probability/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Value")] [FromBody] Probability probability)
        {
            if (id != probability.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(probability);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProbabilityExists(probability.Id))
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

            return Json(probability);
        }

        [HttpGet("delete/{id}")]
        // GET: Probability/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var probability = await _context.Probability
                .FirstOrDefaultAsync(m => m.Id == id);
            if (probability == null)
            {
                return NotFound();
            }

            return Json(probability);
        }

        // POST: Probability/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var probability = await _context.Probability.FindAsync(id);
            _context.Probability.Remove(probability);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProbabilityExists(int id)
        {
            return _context.Probability.Any(e => e.Id == id);
        }
    }
}