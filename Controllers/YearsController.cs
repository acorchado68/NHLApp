using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class YearsController : ControllerBase
{
    private readonly ILogger<YearsController> _logger;

    public YearsController(ILogger<YearsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<NhlModels.Season.Season>> Get()
    {
        var api = new NhlLeagueApi();
        List<NhlModels.Season.Season> seasons = await api.GetSeasonsAsync();
        return seasons.OrderByDescending(s => s.RegularSeasonEndDate).ToList();
    }
}
