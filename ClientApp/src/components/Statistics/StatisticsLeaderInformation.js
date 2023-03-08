import { Component } from "react";

export class StatisticsLeaderInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {

    }

    getCurrentHeadshot() {
        return this.props.data.player.playerHeadshotImageLink;
    }

    getCurrentTeamLogo() {
        return this.props.data.player.currentTeam.officialLightTeamLogoUrl;
    }

    getCurrentPlayerNumber() {
        return this.props.data.player.primaryNumber;
    }

    getCurrentPlayerFirstName() {
        return this.props.data.player.firstName;
    }

    getCurrentPlayerLastName() {
        return this.props.data.player.lastName;
    }

    getCurrentPlayerTeam() {
        return this.props.data.player.currentTeam.name;
    }

    getCurrentPlayerPosition() {
        return this.props.data.player.primaryPosition.abbreviation;
    }

    getCurrentPlayerStat() {
        let stat = '';
        switch (this.props.statHeader) {
            case "Points":
                stat = this.props.data.playerStatisticsData.points;
                break;
            case "Goals":
                stat = this.props.data.playerStatisticsData.goals;
                break;
            case "Assists":
                stat = this.props.data.playerStatisticsData.assists;
                break;
            case "GAA":
                stat = parseFloat(this.props.data.goalieStatisticsData.goalAgainstAverage).toFixed(2);
                break;
            case "SV%":
                stat = parseFloat(this.props.data.goalieStatisticsData.savePercentage).toFixed(3).replace(/^0+/, '');
                break;
            case "Shutouts":
                stat = this.props.data.goalieStatisticsData.shutouts;
                break;
        }

        return stat;
    }

    render() {
        return (
            <div className="statsLeaderContent">
                <a className="image-with-floating-item-container">
                    <div className="team-display-container">
                        <div className="team-display">
                            <img className="team-logo" src={this.getCurrentTeamLogo()}></img>
                        </div>
                    </div>
                    <img className="statsLeaderHeadshot" src={this.getCurrentHeadshot()}></img>
                </a>
                <div className="leaderDetails">
                    <a>
                        <div className="leaderNumberContainer">
                            <span className="">#</span>
                            {this.getCurrentPlayerNumber()}
                        </div>
                        <div className="leaderNameContainer">
                            <span>{this.getCurrentPlayerFirstName()}</span>
                            <span>{this.getCurrentPlayerLastName()}</span>
                        </div>
                    </a>
                    <a className="leaderTeamContainer">
                        <span>{this.getCurrentPlayerTeam()}</span>
                        {
                            this.props.skaterType == "all" &&
                            <span>{this.getCurrentPlayerPosition()}</span>
                        }
                    </a>
                </div>
                <div className="statsLeaderStatContainer">
                    <p className="statLeaderStatType">{this.props.statHeader}</p>
                    <p className="statLeaderStat">{this.getCurrentPlayerStat()}</p>
                </div>
            </div>
        )
    }
}