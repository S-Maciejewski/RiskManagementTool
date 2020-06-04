using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public UserController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            Console.WriteLine(model.Username, model.Password);
            var authenticationResponse = AuthenticateUser(model.Username, model.Password);
                
            if (!authenticationResponse.Success)
                return Unauthorized(authenticationResponse);

            return Ok(authenticationResponse);
        }
        
        [HttpGet]
        // GET: User
        public async Task<IActionResult> Index()
        {
            return Json(await _context.User.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: User/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Json(user);
        }

        // POST: User/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,Login,Password")] [FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.User.FirstOrDefault(r => r.Id == user.Id);
                    if (existingProject != null)
                    {
                        user.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(user);
        }

        [HttpGet("edit/{id}")]
        // GET: User/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Json(user);
        }

        // POST: User/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Login,Password")] [FromBody] User user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.Id))
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
            return Json(user);
        }

        [HttpGet("delete/{id}")]
        // GET: User/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Json(user);
        }

        // POST: User/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var user = await _context.User.FindAsync(id);
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    
        private AuthenticationResponse AuthenticateUser(string modelUsername, string modelPassword)
        {
            var user = _context.User.SingleOrDefault(x => x.Login == modelUsername && x.Password == modelPassword);

            if (user == null)
            {
                return new AuthenticationResponse(modelUsername, modelPassword, "", false);
            }
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("This is super extra secret JWT generator key");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new AuthenticationResponse(modelUsername, modelPassword, tokenHandler.WriteToken(token), true);
        }
    }
}
