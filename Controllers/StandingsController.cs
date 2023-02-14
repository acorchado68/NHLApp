using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class StandingsController : ControllerBase
{
    private readonly ILogger<StandingsController> _logger;

    public StandingsController(ILogger<StandingsController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("GetCurrent")]
    public async Task<List<NhlModels.Standing.Records>> Get()
    {
        var api = new NhlApi();
        List<NhlModels.Standing.Records> standings = await api.GetLeagueStandingsByDivisionAsync();
        return standings;
    }

    [HttpGet, Route("GetDivisionStandingsByDate")]
    public async Task<List<NhlModels.Standing.Records>> GetDivisionStandingsByDate(DateTime? date)
    {
        var api = new NhlApi();
        List<NhlModels.Standing.Records> standings = await api.GetLeagueStandingsByDivisionAsync(date);
        return standings;
    }

    [HttpGet, Route("GetConferenceStandingsByDate")]
    public async Task<List<NhlModels.Standing.Records>> GetConferenceStandingsByDate(DateTime? date)
    {
        var api = new NhlApi();
        List<NhlModels.Standing.Records> standings = await api.GetLeagueStandingsByConferenceAsync(date);
        return standings;
    }
}
