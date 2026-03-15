using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10_Yorgason.Models;

namespace Mission10_Yorgason.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BowlersController : ControllerBase
{
    private readonly BowlingLeagueContext _context;

    public BowlersController(BowlingLeagueContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BowlerDto>>> Get()
    {
        var bowlers = await _context.Bowlers
            .AsNoTracking()
            .Include(b => b.Team)
            .Where(b => b.Team != null &&
                        (b.Team.TeamName == "Marlins" || b.Team.TeamName == "Sharks"))
            .Select(b => new BowlerDto
            {
                FirstName = b.BowlerFirstName,
                MiddleInit = b.BowlerMiddleInit,
                LastName = b.BowlerLastName,
                TeamName = b.Team!.TeamName,
                Address = b.BowlerAddress,
                City = b.BowlerCity,
                State = b.BowlerState,
                Zip = b.BowlerZip,
                PhoneNumber = b.BowlerPhoneNumber
            })
            .ToListAsync();

        return Ok(bowlers);
    }
}

public sealed class BowlerDto
{
    public string? FirstName { get; set; }
    public string? MiddleInit { get; set; }
    public string? LastName { get; set; }
    public string TeamName { get; set; } = null!;
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    public string? PhoneNumber { get; set; }
}
