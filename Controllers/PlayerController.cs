using Microsoft.AspNetCore.Mvc;
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
}