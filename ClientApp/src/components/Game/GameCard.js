import React, { Component } from "react";
import { default as TeamAbbreviation } from '../../common/teamAbbreviation.js';
import '../Main.css'

export class GameCard extends Component {
    static displayName = GameCard.name;
    constructor(props) {
        super(props);
        this.state = { game: [], homeTeam: [], awayTeam: [], loading: true, random: 0 };
        this.getTeamInformation = this.getTeamInformation.bind(this);
        this.calculatePenaltyKill = this.calculatePenaltyKill.bind(this);
        this.str_pad_left = this.str_pad_left.bind(this);
        this.handleGameDetailsClick = this.handleGameDetailsClick.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        this.populate();
    }

    handleRefreshClick(event) {
        event.preventDefault();
        this.setState({ loading: true, random: Math.random() }, this.populate);
        this.props.refreshCallback(this.state.game, this.state.homeTeam, this.state.awayTeam);
    }

    getTimeRemaining(gameData, periodTimeRemaining, period, intermissionInfo) {
        let remaining = '';
        if (period === null || gameData.status.detailedState === "Scheduled") {
            var localDate = new Date(gameData.datetime.dateTime);
            remaining = localDate.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        }
        else if (gameData.isGameCompleted) {
            if (period === "OT") {
                remaining = "Final/OT";
            }
            else if (period === "SO") {
                remaining = "Final/SO";
            }
            else {
                remaining = "Final";
            }
        }
        else if (intermissionInfo.inIntermission) {
            var minutes = Math.floor(intermissionInfo.intermissionTimeRemaining / 60);
            var seconds = (intermissionInfo.intermissionTimeRemaining % 60);
            var finalTime = this.str_pad_left(minutes, '0', 2) + ":" + this.str_pad_left(seconds, '0', 2);
            remaining = period + ' ' + periodTimeRemaining + ' - ' + ' Int ' + finalTime;  
        }
        else {
            remaining = period + ' ' + periodTimeRemaining;
        }

        return remaining;
    }

    handleGameDetailsClick(event) {
        event.preventDefault();
        this.props.callback(this.state.game, this.state.homeTeam, this.state.awayTeam);
    }

    str_pad_left(string, pad, length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    calculatePenaltyKill(ppGoals, ppOpportunites) {
        return ppOpportunites - ppGoals;
    }

    renderGame() {
        return (
            <div className='card text-center'>
                <div className='card-header'>
                    {
                        this.state.game.liveGameFeed.gameData.status.detailedState !== "Final" &&
                        this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                        <a className="refresh" onClick={ (e) => this.handleRefreshClick(e) }>
                            <i className="bi bi-arrow-clockwise"></i>
                        </a>
                    }
                    {this.state.game.liveGameFeed.gameData.teams.away.name} @ {this.state.game.liveGameFeed.gameData.teams.home.name}
                </div>
                <div className='cardScheduleGameInfoContainer'>
                    <div className='cardScheduleGameStatus'>
                        <span>{this.getTimeRemaining(this.state.game.liveGameFeed.gameData, 
                                                     this.state.game.liveGameFeed.liveData.linescore.currentPeriodTimeRemaining, 
                                                     this.state.game.liveGameFeed.liveData.linescore.currentPeriodOrdinal,
                                                     this.state.game.liveGameFeed.liveData.linescore.intermissionInfo)}
                        </span>
                    </div>
                    {
                        this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                        <div className='cardScheduleGameStatsHeader'>
                            <span>Game Stats</span>
                        </div>
                    }
                </div>
                <div className='container card-body cardScheduleGameWrapper'>
                    <div className="row">
                        <div className='col cardScheduleGameTeamsScore'>
                            <div className='cardScheduleGameTeamLogo'>
                                <img className='schedule-team-logo' src={this.state.game.liveGameFeed.liveData.linescore.teams.away.team.officialLightTeamLogoUrl}></img>
                            </div>
                            <div className='cardScheduleGameTeamAbbr'>
                                <span className='team-abbr'>{TeamAbbreviation(this.state.game.liveGameFeed.liveData.linescore.teams.away.team.name)}</span>&nbsp;
                            </div>
                            {
                                this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                                <span className='team-score'>{this.state.game.liveGameFeed.liveData.linescore.teams.away.goals}</span>
                            }
                            <div className="team-indicators">
                                {
                                    (!this.state.game.liveGameFeed.gameData.isGameCompleted &&
                                     this.state.game.liveGameFeed.liveData.linescore.teams.away.goaliePulled) &&
                                    <span>EN</span>
                                }
                                {
                                    (!this.state.game.liveGameFeed.gameData.isGameCompleted &&
                                     this.state.game.liveGameFeed.liveData.linescore.teams.away.powerPlay) &&
                                    <span>PP</span>
                                }
                            </div>
                        </div>
                        {
                            this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                            <div className="col cardScheduleGameTeamInformation">
                                <div className="row">
                                    <div className="col teamStatHeader">
                                        Shots
                                    </div>
                                    <div className="col teamStatHeader">
                                        PP
                                    </div>
                                    <div className="col teamStatHeader">
                                        PK
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col">
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.shots}
                                    </div>
                                    <div className="col">
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayGoals}/
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                                    </div>
                                    <div className="col">
                                        {this.calculatePenaltyKill(this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayGoals,
                                                                this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities)}/
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="cardScheduleGameTeamRecord">
                        { this.state.awayTeam.splits[0] !== undefined && 
                          this.state.awayTeam.splits[0].teamStatisticsDetails.wins + "-" + 
                          this.state.awayTeam.splits[0].teamStatisticsDetails.losses + "-" +
                          this.state.awayTeam.splits[0].teamStatisticsDetails.ot}
                    </div>
                    <div className="row">
                        <div className='col cardScheduleGameTeamsScore'>
                            <div className='cardScheduleGameTeamLogo'>
                                <img className='schedule-team-logo' src={this.state.game.liveGameFeed.liveData.linescore.teams.home.team.officialLightTeamLogoUrl}></img>
                            </div>
                            <div className='cardScheduleGameTeamAbbr'>
                                <span className='team-abbr'>{TeamAbbreviation(this.state.game.liveGameFeed.liveData.linescore.teams.home.team.name)}</span>&nbsp;
                            </div>
                            {
                                this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                                <span className='team-score'>{this.state.game.liveGameFeed.liveData.linescore.teams.home.goals}</span>
                            }
                            <div className="team-indicators">
                                {
                                    (!this.state.game.liveGameFeed.gameData.isGameCompleted &&
                                    this.state.game.liveGameFeed.liveData.linescore.teams.home.goaliePulled) &&
                                    <span>EN</span>
                                }
                                {
                                    (!this.state.game.liveGameFeed.gameData.isGameCompleted &&
                                    this.state.game.liveGameFeed.liveData.linescore.teams.home.powerPlay) &&
                                    <span>PP</span>
                                }
                            </div>
                        </div>
                        {
                            this.state.game.liveGameFeed.gameData.status.detailedState !== "Scheduled" &&
                            <div className="col cardScheduleGameTeamInformation">
                                <div className="row">
                                    <div className="col teamStatHeader">
                                        Shots
                                    </div>
                                    <div className="col teamStatHeader">
                                        PP
                                    </div>
                                    <div className="col teamStatHeader">
                                        PK
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col">
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.shots}
                                    </div>
                                    <div className="col">
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayGoals}/
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                                    </div>
                                    <div className="col">
                                        {this.calculatePenaltyKill(this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayGoals,
                                                                    this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities)}/
                                        {this.state.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="cardScheduleGameTeamRecord">
                        { this.state.homeTeam.splits[0] !== undefined && 
                          this.state.homeTeam.splits[0].teamStatisticsDetails.wins + "-" + 
                          this.state.homeTeam.splits[0].teamStatisticsDetails.losses + "-" +
                          this.state.homeTeam.splits[0].teamStatisticsDetails.ot}
                    </div>
                </div>
                <div className='card-footer text-muted'>
                    <a className="gameDetailsLink" onClick={(e) => this.handleGameDetailsClick(e)} href="#">Full Stats</a>
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderGame(this.state.game);

        return (
            <div>
                {contents}
            </div>
        )
    }

    async populate() {
        var id = encodeURIComponent(this.props.gameId)
        const response = await fetch('schedule/GetLiveFeedById?id=' + id);
        const responseData = await response.json();
        this.setState({ game: responseData }, this.getTeamInformation);
    }

    async getTeamInformation() {
        var homeTeamId = encodeURIComponent(this.state.game.liveGameFeed.gameData.teams.home.id);
        const homeResponse = await fetch('statistics/GetTeamStatsById?id=' + homeTeamId);
        const homeTeamData = await homeResponse.json();

        var awayTeamId = encodeURIComponent(this.state.game.liveGameFeed.gameData.teams.away.id);
        const awayResponse = await fetch('statistics/GetTeamStatsById?id=' + awayTeamId);
        const awayTeamData = await awayResponse.json();
        this.setState({ homeTeam: homeTeamData, awayTeam: awayTeamData, loading: false});
    }
}
