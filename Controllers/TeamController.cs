using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Nhl.Api;
using NhlModels = Nhl.Api.Models;
namespace Hockey.Client.Controllers;

[ApiController]
[Route("[controller]")]
public class TeamController : ControllerBase
{
    private readonly ILogger<TeamController> _logger;
    private HttpClient _client;

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

    [HttpGet, Route("GetTeamById")]
    public async Task<CustomTeam> GetTeamById(int id)
    {
        var api = new NhlApi();
        NhlModels.Team.Team team = await api.GetTeamByIdAsync(id);
        NhlModels.Season.Season season = await api.GetCurrentSeasonAsync();
        NhlModels.Game.GameSchedule schedule = await api.GetGameScheduleForTeamByDateAsync(id, 
                                                season.RegularSeasonStartDate, season.RegularSeasonEndDate, 
                                                new NhlModels.Game.GameScheduleConfiguration { IncludeLinescore = true });
        NhlModels.Game.GameSchedule trimmedSchedule = GetTrimmedSchedule(schedule);
        NhlModels.Statistics.TeamStatistics stats = await api.GetTeamStatisticsByIdAsync(id, season.SeasonId);
        NhlModels.Team.TeamRoster roster = await GetTeamRosterById(id);
        List<NhlModels.Player.Player> players = new List<NhlModels.Player.Player>();
        PlayerController controller = new PlayerController();
        foreach (NhlModels.Team.TeamRosterMember rosterMember in roster.Roster)
        {
            NhlModels.Player.Player player = await controller.GetPlayerById(rosterMember.Person.Id);
            if (player != null)
            {
                players.Add(player);
            }
        }

        CustomTeam customTeam = new CustomTeam
        {
            Season = season.SeasonId,
            TeamInformation = team,
            TeamGameSchedule = trimmedSchedule,
            TeamStatisticsDetails = stats,
            TeamRoster = players,
        };
        return customTeam;
    }

    public async Task<NhlModels.Team.TeamRoster> GetTeamRosterById(int id)
    {
        NhlModels.Team.TeamRoster roster = new NhlModels.Team.TeamRoster();
        _client = new HttpClient();
        _client.BaseAddress = new Uri("https://statsapi.web.nhl.com/api/v1/");
        using (HttpResponseMessage _message = await _client.GetAsync($"teams/{id}/roster"))
        {
            var contentResponse = await _message.Content.ReadAsStringAsync();
            if (!string.IsNullOrWhiteSpace(contentResponse))
            {
                roster = JsonConvert.DeserializeObject<NhlModels.Team.TeamRoster>(contentResponse);
            }
        }

        return roster;
    }

    public NhlModels.Game.GameSchedule GetTrimmedSchedule(NhlModels.Game.GameSchedule fullSchedule)
    {
        NhlModels.Game.GameSchedule trimmedSchedule = new NhlModels.Game.GameSchedule();
        List<NhlModels.Game.GameDate> pastGames = new List<NhlModels.Game.GameDate>();
        List<NhlModels.Game.GameDate> futureGames = new List<NhlModels.Game.GameDate>();
        futureGames = fullSchedule.Dates.Where(d => d.Date >= DateTime.Now.Date).ToList();
        pastGames = fullSchedule.Dates.Where(d => d.Date < DateTime.Now.Date).OrderByDescending(d => d.Date).ToList();
        trimmedSchedule.Dates = pastGames.Take(3).ToList();
        trimmedSchedule.Dates.AddRange(futureGames.Take(5).ToList());
        trimmedSchedule.Dates = trimmedSchedule.Dates.OrderBy(d => d.Date).ToList();
        return trimmedSchedule;
    }
}

#region Helper Classes

public class CustomTeam
{
    [JsonProperty("season")]
    public string Season { get; set; }

    [JsonProperty("teamInformation")]
    public NhlModels.Team.Team TeamInformation { get; set; }

    [JsonProperty("teamGameSchedule")]
    public NhlModels.Game.GameSchedule TeamGameSchedule { get; set; }

    [JsonProperty("teamStatisticsDetails")]
    public NhlModels.Statistics.TeamStatistics TeamStatisticsDetails { get; set; }

    [JsonProperty("teamRoster")]
    public List<NhlModels.Player.Player> TeamRoster { get; set; }
}

#endregion