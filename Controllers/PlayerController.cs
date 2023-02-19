using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayerController : ControllerBase
{
    private readonly ILogger<PlayerController> _logger;

    public PlayerController(ILogger<PlayerController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("GetPlayerById")]
    public async Task<NhlModels.Player.Player> GetPlayerById(int id)
    {
        var api = new NhlPlayerApi();
        NhlModels.Player.Player player = await api.GetPlayerByIdAsync(id);
        return player;
    }

    [HttpGet, Route("SearchAllPlayers")]
    public async Task<List<CustomPlayerSearchResult>> SearchAllPlayers(string query, bool activePlayersOnly)
    {
        var api = new NhlPlayerApi();
        List<NhlModels.Player.PlayerSearchResult> response;
        if (activePlayersOnly)
        {
            response = await api.SearchAllActivePlayersAsync(query);
        }
        else
        {
            response = await api.SearchAllPlayersAsync(query);
        }

        List<CustomPlayerSearchResult> customResults = new List<CustomPlayerSearchResult>();
        foreach (NhlModels.Player.PlayerSearchResult nhlResult in response)
        {
            NhlModels.Player.Player player = await api.GetPlayerByIdAsync(nhlResult.PlayerId);
            customResults.Add(new CustomPlayerSearchResult 
                                  {
                                    PlayerHeadshotLink = player.PlayerHeadshotImageLink,
                                    PlayerSearchResult = nhlResult,
                                  });
        }

        return customResults;
    }

    [HttpGet, Route("GetFullPlayerDetails")]
    public async Task<FullPlayerDetails> GetFullPlayerDetails(int playerId)
    {
        FullPlayerDetails fullDetails = new FullPlayerDetails();
        NhlModels.Player.Player player = await GetPlayerById(playerId);
        if (player != null)
        {
            fullDetails.Player = player;
        }

        var api = new NhlApi();
        NhlModels.Player.PlayerSeasonStatisticsYearByYear stats = await api.GetPlayerStatisticsYearByYearAsync(playerId);
        if (stats != null)
        {
            fullDetails.PlayerStatsByYear = stats.Statistics[0].Splits;
        }

        return fullDetails;
    }
}

#region Helper Classes
public class CustomPlayerSearchResult
{
    [JsonProperty("playerHeadshotLink")]
    public string PlayerHeadshotLink { get; set; }

    [JsonProperty("playerSearchResult")]
    public NhlModels.Player.PlayerSearchResult PlayerSearchResult { get; set; }
}

public class FullPlayerDetails
{
    [JsonProperty("player")]
    public NhlModels.Player.Player Player { get; set; }

    [JsonProperty("playerStats")]
    public List<NhlModels.Player.PlayerSeasonStatisticsSplitYearByYear> PlayerStatsByYear { get; set; }
}

#endregion