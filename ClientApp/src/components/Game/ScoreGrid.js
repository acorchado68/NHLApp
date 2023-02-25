import React, { Component } from 'react';
import '../Main.css';

export class ScoreGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getTimeRemaining = this.getTimeRemaining.bind(this);
    }

    getPeriodGoals(index, isHome) {
        let goals = ''
        const period = this.props.liveGameFeed.liveData.linescore.periods[index];
        if (period !== undefined && period !== null) {
            goals = isHome ? this.props.liveGameFeed.liveData.linescore.periods[index].home.goals : this.props.liveGameFeed.liveData.linescore.periods[index].away.goals;
        }
        else {
            goals = '0';
        }
        
        return goals;
    }

    getTimeRemaining(gameData, periodTimeRemaining, period, intermissionInfo) {
        let remaining = '';
        if (period === null || gameData.status.detailedState === "Scheduled") {
            var localDate = new Date(gameData.datetime.dateTime);
            remaining = localDate.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        }
        else if (gameData.isGameCompleted) {
            remaining = period === "OT" ? "Final/OT" : "Final";
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

    str_pad_left(string, pad, length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="">
                            {this.getTimeRemaining(this.props.liveGameFeed.gameData, 
                                                    this.props.liveGameFeed.liveData.linescore.currentPeriodTimeRemaining, 
                                                    this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal,
                                                    this.props.liveGameFeed.liveData.linescore.intermissionInfo)}
                        </th>
                        <th scope="col" className="text-muted">1ST</th>
                        <th scope="col" className="text-muted">2ND</th>
                        <th scope="col" className="text-muted">3RD</th>
                        {
                            (this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "OT" ||
                             this.props.liveGameFeed.liveData.linescore.hasShootout) &&
                            <th scope="col" className="text-muted">OT</th>
                        }
                        {
                            this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "SO" &&
                            <th scope="col" className="text-muted">SO</th>
                        }
                        <th scope="col" className="text-muted">T</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='scoreGridFirstCell' scope="row">
                            <div className='logoCell'>
                                <img className="fullDetails-team-logo" src={this.props.awayTeam.splits[0].team.officialLightTeamLogoUrl}></img>
                                <div className="team-indicators">
                                    {
                                        (!this.props.liveGameFeed.gameData.isGameCompleted &&
                                          this.props.liveGameFeed.liveData.linescore.teams.away.goaliePulled) &&
                                        <span>EN</span>
                                    }
                                    {
                                        (!this.props.liveGameFeed.gameData.isGameCompleted &&
                                          this.props.liveGameFeed.liveData.linescore.teams.away.powerPlay) &&
                                        <span>PP</span>
                                    }
                                </div>
                            </div>
                        </td>
                        <td>{this.getPeriodGoals(0, false)}</td>
                        <td>{this.getPeriodGoals(1, false)}</td>
                        <td>{this.getPeriodGoals(2, false)}</td>
                        {
                            (this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "OT" ||
                             this.props.liveGameFeed.liveData.linescore.hasShootout) &&
                            <td>{this.getPeriodGoals(3, false)}</td>
                        }
                        {
                            this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "SO" &&
                            <td>
                                {this.props.liveGameFeed.liveData.linescore.shootoutInfo.away.scores > 
                                 this.props.liveGameFeed.liveData.linescore.shootoutInfo.home.scores ? "1" : "0"}
                                <span className='shootoutScore'>
                                      ({this.props.liveGameFeed.liveData.linescore.shootoutInfo.away.scores}/
                                       {this.props.liveGameFeed.liveData.linescore.shootoutInfo.away.attempts})
                                </span>
                            </td>
                        }
                        <td className="active">{this.props.liveGameFeed.liveData.linescore.teams.away.goals}</td>
                    </tr>
                    <tr>
                        <td className="scoreGridFirstCell" scope="row">
                            <div className='logoCell'>
                                <img className="fullDetails-team-logo" src={this.props.homeTeam.splits[0].team.officialLightTeamLogoUrl}></img>
                                <div className="team-indicators">
                                    {
                                        (!this.props.liveGameFeed.gameData.isGameCompleted &&
                                          this.props.liveGameFeed.liveData.linescore.teams.home.goaliePulled) &&
                                        <span>EN</span>
                                    }
                                    {
                                        (!this.props.liveGameFeed.gameData.isGameCompleted &&
                                          this.props.liveGameFeed.liveData.linescore.teams.home.powerPlay) &&
                                        <span>PP</span>
                                    }
                                </div>
                            </div>
                        </td>
                        <td>{this.getPeriodGoals(0, true)}</td>
                        <td>{this.getPeriodGoals(1, true)}</td>
                        <td>{this.getPeriodGoals(2, true)}</td>
                        {
                            (this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "OT" ||
                            this.props.liveGameFeed.liveData.linescore.hasShootout) &&
                            <td>{this.getPeriodGoals(3, true)}</td>
                        }
                        {
                            this.props.liveGameFeed.liveData.linescore.currentPeriodOrdinal === "SO" &&
                            <td>
                                {this.props.liveGameFeed.liveData.linescore.shootoutInfo.home.scores > 
                                 this.props.liveGameFeed.liveData.linescore.shootoutInfo.away.scores ? "1" : "0"}
                                <span className='shootoutScore'>
                                      ({this.props.liveGameFeed.liveData.linescore.shootoutInfo.home.scores}/
                                       {this.props.liveGameFeed.liveData.linescore.shootoutInfo.home.attempts})
                                </span>
                            </td>
                        }
                        <td className="active">{this.props.liveGameFeed.liveData.linescore.teams.home.goals}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}