using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class SeasonsController : ControllerBase
{
    private readonly ILogger<SeasonsController> _logger;

    public SeasonsController(ILogger<SeasonsController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("IsPlayoffsActive")]
    public async Task<bool> IsPlayoffsActive(string seasonYear)
    {
        var api = new NhlApi();
        NhlModels.Season.Season season = await api.GetSeasonByYearAsync(seasonYear);
        return season.RegularSeasonEndDate < DateTime.Now;
    }
}