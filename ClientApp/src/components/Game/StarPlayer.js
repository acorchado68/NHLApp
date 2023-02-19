import { Component } from "react";
import { getGoalieColumnHeaders, getGoalieThreeStarsData, getSkaterColumnHeaders, getSkaterThreeStarsData, getStatGridCustomStyles } from "../../common/commonFunctions";
import DataTableBase from "../common/DataTableBase";
import '../Main.css';

export class StarPlayer extends Component {
    constructor(props) {
        super(props);
        this.getTotalPoints = this.getTotalPoints.bind(this);
    }

    componentDidMount() {

    }

    getTotalPoints(skaterStats) {
        return skaterStats.goals + 
               skaterStats.assists;
    }

    formatSavePercentage(svpct) {
        let formattedSvPct = svpct * .01;
        return parseFloat(formattedSvPct).toFixed(3).replace(/^0+/, '');
    }

    render() {
        const stats = this.props.starPlayerData.isGoalie ? 
                      getGoalieThreeStarsData(this.props.starGameData) : 
                      getSkaterThreeStarsData(this.props.starGameData);
        const columnHeaders = this.props.starPlayerData.isGoalie ? 
                              getGoalieColumnHeaders(true) :
                              getSkaterColumnHeaders(null);
        const customStyles = getStatGridCustomStyles();

        return (
            <div className="container">
                <div className="row threeStarsDetailsContainer">
                    <div className="col-3">
                        <div className="threeStarsHeadshotContainer">
                            <div className="team-display-container">
                                <div className="team-display">
                                    <img className="team-logo" src={this.props.starPlayerData.currentTeam.officialLightTeamLogoUrl} />
                                </div>
                            </div>
                            <img className="playerHeadshot" src={this.props.starPlayerData.playerHeadshotImageLink} />
                        </div>
                        <div className="leaderDetails">
                            <a>
                                <div className="leaderNumberContainer">
                                    <span className="">#</span>
                                    {this.props.starPlayerData.primaryNumber}
                                </div>
                                <div className="leaderNameContainer">
                                    <span>{this.props.starPlayerData.firstName}</span>
                                    <span>{this.props.starPlayerData.lastName}</span>
                                </div>
                            </a>
                            {/* add links to team page */}
                            <a className="leaderTeamContainer">
                                <span>{this.props.starPlayerData.currentTeam.name}</span>
                                <span>{this.props.starPlayerData.primaryPosition.abbreviation}</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="threeStarsStats">
                            {
                                <DataTableBase columns={columnHeaders}
                                               data={stats}
                                               customStyles={customStyles}
                                               responsive={true}
                                               selectableRows={false}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}