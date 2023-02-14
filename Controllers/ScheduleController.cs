using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly ILogger<ScheduleController> _logger;

    public ScheduleController(ILogger<ScheduleController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("GetByDate")]
    public async Task<NhlModels.Game.GameSchedule> GetByDate(int year, int month, int day)
    {
        var gameApi = new NhlGameApi();
        NhlModels.Game.GameSchedule schedule = await gameApi.GetGameScheduleByDateAsync(year, month, day, 
                                               new NhlModels.Game.GameScheduleConfiguration 
                                                    {
                                                        IncludeLinescore = true,
                                                        IncludeTicketPurchasingOptions = false
                                                    });
        return schedule;
    }

    [HttpGet, Route("GetLiveFeedById")]
    public async Task<NhlModels.Game.LiveGameFeedResult> GetLiveFeedById(int id)
    {
        var gameApi = new NhlGameApi();
        NhlModels.Game.LiveGameFeedResult feed = await gameApi.GetLiveGameFeedByIdAsync(id, 
                                                 new NhlModels.Game.LiveGameFeedConfiguration
                                                 {
                                                    IncludeContent = true,
                                                 });
        return feed;
    }
}