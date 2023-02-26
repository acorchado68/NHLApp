using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;
namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class TeamController : ControllerBase
{
    private readonly ILogger<TeamController> _logger;

    public TeamController(ILogger<TeamController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("GetActiveTeams")]
    public async Task<List<NhlModels.Team.Team>> GetActiveTeams()
    {
        var api = new NhlLeagueApi();
        List<NhlModels.Team.Team> teams = await api.GetActiveTeamsAsync();
        teams = teams.OrderBy(team => team.Name).ToList();
        return teams;
    }
}