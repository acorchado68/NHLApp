using Microsoft.AspNetCore.Mvc;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;
using PlayerStats = Nhl.Api.Models.Enumerations.Player.PlayerStatisticEnum;
using GoalieStats = Nhl.Api.Models.Enumerations.Player.GoalieStatisticEnum;

namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly ILogger<StatisticsController> _logger;

    public StatisticsController(ILogger<StatisticsController> logger)
    {
        _logger = logger;
    }

    #region Types

    [HttpGet, Route("GetStatisticsTypes")]
    public async Task<List<NhlModels.Statistics.StatisticTypes>> GetStatisticsTypes()
    {
        var api = new NhlApi();
        List<NhlModels.Statistics.StatisticTypes> statsTypes = await api.GetStatisticTypesAsync();
        return statsTypes;
    }

    #endregion

    #region All Skaters

    [HttpGet, Route("GetAllSkatersPoints")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> Get(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats;
        if (numberOfPlayers.HasValue)
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Points, seasonYear, true, numberOfPlayers.Value);
        }
        else
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Points, seasonYear);
        }
        return stats;
    }

    [HttpGet, Route("GetAllSkatersGoals")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> GetAllSkatersGoals(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats;
        if (numberOfPlayers.HasValue)
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Goals, seasonYear, true, numberOfPlayers.Value);
        }
        else
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Goals, seasonYear);
        }

        return stats;
    }

    [HttpGet, Route("GetAllSkatersAssists")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> GetAllSkatersAssists(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats;
        if (numberOfPlayers.HasValue)
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Assists, seasonYear, true, numberOfPlayers.Value);
        }
        else
        {
            stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Assists, seasonYear);
        }

        return stats;
    }
    #endregion

    #region Goalies

    [HttpGet, Route("GetGoalieGaa")]
    public async Task<List<NhlModels.Player.GoalieStatisticResult>> GetGoalieGaa(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        NhlModels.Season.Season season = await api.GetSeasonByYearAsync(seasonYear);
        int numberOfGames = season.RegularSeasonEndDate < DateTime.Now ? 25 : CalculateNumberOfWeeksInSeason(season);
        List<NhlModels.Player.GoalieStatisticResult> stats = await api.GetGoaliesByStatisticTypeBySeasonAsync(GoalieStats.GoalAgainstAverage, seasonYear, false, 100);
        List<NhlModels.Player.GoalieStatisticResult> goalieStats = stats.Where(g => g.GoalieStatisticsData.Games >= numberOfGames)
                                                                        .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                        .ToList();
        return goalieStats;
    }

    [HttpGet, Route("GetGoalieSavePercentage")]
    public async Task<List<NhlModels.Player.GoalieStatisticResult>> GetGoalieSavePercentage(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        NhlModels.Season.Season season = await api.GetSeasonByYearAsync(seasonYear);
        int numberOfGames = season.RegularSeasonEndDate < DateTime.Now ? 25 : CalculateNumberOfWeeksInSeason(season);
        List<NhlModels.Player.GoalieStatisticResult> stats = await api.GetGoaliesByStatisticTypeBySeasonAsync(GoalieStats.SavePercentage, seasonYear, true, 100);
        List<NhlModels.Player.GoalieStatisticResult> goalieStats = stats.Where(g => g.GoalieStatisticsData.Games >= numberOfGames)
                                                                        .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                        .ToList();
        return goalieStats;
    }

    [HttpGet, Route("GetGoalieShutouts")]
    public async Task<List<NhlModels.Player.GoalieStatisticResult>> GetGoalieShutouts(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        NhlModels.Season.Season season = await api.GetSeasonByYearAsync(seasonYear);
        int numberOfGames = season.RegularSeasonEndDate < DateTime.Now ? 25 : CalculateNumberOfWeeksInSeason(season);
        List<NhlModels.Player.GoalieStatisticResult> stats = await api.GetGoaliesByStatisticTypeBySeasonAsync(GoalieStats.Shutouts, seasonYear, true, 100);
        List<NhlModels.Player.GoalieStatisticResult> goalieStats = stats.Where(g => g.GoalieStatisticsData.Games >= numberOfGames)
                                                                        .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                        .ToList();
        return goalieStats;
    }
    #endregion

    #region Defensemen

    [HttpGet, Route("GetDefensemenPoints")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> GetDefensemenPoints(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Points, seasonYear, true, 500);
        List<NhlModels.Player.PlayerStatisticResult> defensemenStats = stats.Where(s => s.Player.PrimaryPosition.Type == "Defenseman")
                                                                            .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                            .ToList();
        return defensemenStats;
    }

    [HttpGet, Route("GetDefensemenGoals")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> GetDefensemenGoals(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Goals, seasonYear, true, 500);
        List<NhlModels.Player.PlayerStatisticResult> defensemenStats = stats.Where(s => s.Player.PrimaryPosition.Type == "Defenseman")
                                                                            .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                            .ToList();
        return defensemenStats;
    }

    [HttpGet, Route("GetDefensemenAssists")]
    public async Task<List<NhlModels.Player.PlayerStatisticResult>> GetDefensemenAssists(string seasonYear, int? numberOfPlayers)
    {
        var api = new NhlApi();
        List<NhlModels.Player.PlayerStatisticResult> stats = await api.GetPlayersByStatisticTypeBySeasonAsync(PlayerStats.Assists, seasonYear, true, 500);
        List<NhlModels.Player.PlayerStatisticResult> defensemenStats = stats.Where(s => s.Player.PrimaryPosition.Type == "Defenseman")
                                                                            .Take(numberOfPlayers.HasValue ? numberOfPlayers.Value : 10)
                                                                            .ToList();
        return defensemenStats;
    }

    #endregion

    #region Helpers
    private int CalculateNumberOfWeeksInSeason(NhlModels.Season.Season season)
    {
        return (int)(DateTime.Now - season.RegularSeasonStartDate).TotalDays / 7;
    }
    #endregion

    #region Teams
    [HttpGet, Route("GetTeamStatsById")]
    public async Task<NhlModels.Statistics.Statistic> GetTeamStatistics(int id)
    {
        var api = new NhlApi();
        NhlModels.Statistics.TeamStatistics stats = await api.GetTeamStatisticsByIdAsync(id, "20222023");
        return stats.Statistics[0];
    }
    #endregion
}