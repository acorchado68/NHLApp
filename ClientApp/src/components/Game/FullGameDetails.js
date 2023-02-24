import React, { Component } from "react";
import { ThreeStars } from "./ThreeStars";
import { TeamStatCompareGrid } from "../Statistics/TeamStatCompareGrid";
import { TeamStatGoalieStats } from "../Statistics/TeamStatGoalieStats";
import { TeamStatSkaterStats } from "../Statistics/TeamStatSkaterStats";
import { ScoreGrid } from "./ScoreGrid";
import '../Main.css';


export class FullGameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { loadFullStats: true,
                       loadHomeStats: false,
                       loadThreeStars: false,
                       forwardKey: 0,
                       defenseKey: 1,
                       goalieKey: 2 };
        this.handleTeamSelectionClick = this.handleTeamSelectionClick.bind(this);
        this.handleDetailSelectionClick = this.handleDetailSelectionClick.bind(this);
        this.getIsItemActive = this.getIsItemActive.bind(this);
    }

    componentDidMount() {
        
    }

    handleTeamSelectionClick(event, isHomeTeam) {
        event.preventDefault();
        this.setState({ loadFullStats: true,
                        loadHomeStats: isHomeTeam,
                        loadThreeStars: false,
                        forwardKey: Math.random(),
                        defenseKey: Math.random(),
                        goalieKey: Math.random() });
    }

    handleDetailSelectionClick(event) {
        event.preventDefault();
        this.setState({ loadFullStats: false,
                        loadHomeStats: false,
                        loadThreeStars: true });
    }

    getIsItemActive(isHome) {
        let isActive = false;
        if (this.state.loadFullStats) {
            if (this.state.loadHomeStats && isHome) {
                isActive = true;
            }
            else if (!this.state.loadHomeStats && !isHome) {
                isActive = true;
            }
        }

        return isActive;
    }
    
    render() {
        return (
            <div className='card mb-3 fullDetails'>
                <div className='row'>
                    <div className='col-8 mainDetailsPanel'>
                        <div className="selectionContainer">
                            <a href="#" 
                               className={"selectionItem " + (this.getIsItemActive(false) ? 'active' : '')} 
                               onClick={(e) => this.handleTeamSelectionClick(e, false)}
                            >
                            {this.props.awayTeam.splits[0].team.name}
                            </a>
                            <a href="#" 
                               className={"selectionItem " + (this.getIsItemActive(true) ? 'active' : '')}
                               onClick={(e) => this.handleTeamSelectionClick(e, true)}
                            >
                            {this.props.homeTeam.splits[0].team.name}
                            </a>
                            {
                                this.props.game.liveGameFeed.gameData.isGameCompleted &&
                                <a href="#"
                                   className={"detailSelectionItem " + (this.state.loadThreeStars ? 'active' : '')}
                                   onClick={(e) => this.handleDetailSelectionClick(e)}
                                >
                                3 Stars
                                </a>
                            }
                        </div>
                        {
                            this.state.loadFullStats && Object.keys(this.props.game.liveGameFeed.gameData.players).length > 0 &&
                            <div>
                                <br></br>
                                <TeamStatSkaterStats key={this.state.forwardKey}
                                                    skaterType="Forward"
                                                    skaters={this.state.loadHomeStats ? 
                                                            this.props.game.liveGameFeed.liveData.boxscore.teams.home.players :
                                                            this.props.game.liveGameFeed.liveData.boxscore.teams.away.players} 
                                                    ids={this.state.loadHomeStats ?
                                                        this.props.game.liveGameFeed.liveData.boxscore.teams.home.skaters :
                                                        this.props.game.liveGameFeed.liveData.boxscore.teams.away.skaters}
                                />
                                <TeamStatSkaterStats key={this.state.defenseKey}
                                                     skaterType="Defenseman"
                                                     skaters={this.state.loadHomeStats ? 
                                                              this.props.game.liveGameFeed.liveData.boxscore.teams.home.players :
                                                              this.props.game.liveGameFeed.liveData.boxscore.teams.away.players} 
                                                     ids={this.state.loadHomeStats ?
                                                          this.props.game.liveGameFeed.liveData.boxscore.teams.home.skaters :
                                                          this.props.game.liveGameFeed.liveData.boxscore.teams.away.skaters}
                                />
                                <br></br>
                                <TeamStatGoalieStats key={this.state.goalieKey}
                                                     goalies={this.state.loadHomeStats ?
                                                              this.props.game.liveGameFeed.liveData.boxscore.teams.home.players :
                                                              this.props.game.liveGameFeed.liveData.boxscore.teams.away.players} 
                                                     ids={this.state.loadHomeStats ?
                                                          this.props.game.liveGameFeed.liveData.boxscore.teams.home.goalies :
                                                          this.props.game.liveGameFeed.liveData.boxscore.teams.away.goalies}
                                />
                            </div>
                        }
                        {
                            this.state.loadThreeStars &&
                            <ThreeStars homeSkaters={this.props.game.liveGameFeed.liveData.boxscore.teams.home.players}
                                        awaySkaters={this.props.game.liveGameFeed.liveData.boxscore.teams.away.players}
                                        firstStar={this.props.game.liveGameFeed.liveData.decisions.firstStar}
                                        secondStar={this.props.game.liveGameFeed.liveData.decisions.secondStar}
                                        thirdStar={this.props.game.liveGameFeed.liveData.decisions.thirdStar}
                            />
                        }
                    </div>
                    <div className='col-4 rightPanelDetails'>
                        <ScoreGrid liveGameFeed={this.props.game.liveGameFeed} homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam} />
                        <TeamStatCompareGrid statHeader="Shots on Goal"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.shots}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.shots}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="Faceoffs" 
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage + '%'}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage + '%'}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="PP"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayGoals + "/" +
                                                           this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayGoals + "/" +
                                                           this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="PIM"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.pim}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.pim}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="Hits"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.hits}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.hits}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="Blocked Shots"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.blocked}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.blocked}
                        />
                        <hr></hr>
                        <TeamStatCompareGrid statHeader="Giveaways"
                                             awayTeamName={this.props.awayTeam.splits[0].team.name}
                                             homeTeamName={this.props.homeTeam.splits[0].team.name}
                                             awayTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.giveaways}
                                             homeTeamStat={this.props.game.liveGameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.giveaways}
                        />
                    </div>
                </div>
            </div>
        )
    }
}