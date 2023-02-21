import { Component } from "react";
import DataTableBase from "../common/DataTableBase";
import { default as TeamAbbreviation } from "../../common/teamAbbreviation";

export class PlayerStats extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getSkaterColumnHeaders = this.getSkaterColumnHeaders.bind(this);
        this.getGoalieColumnHeaders = this.getGoalieColumnHeaders.bind(this);
        this.getSkaterStatData = this.getSkaterStatData.bind(this);
        this.getGoalieStatData = this.getGoalieStatData.bind(this);
    }

    getSkaterColumnHeaders() {
        return [
            { name: "Season", selector: row => row.season, sortable: true, width: "100px", format: row => row.season.replace(/(\d{4})/, "$1-")},
            { name: "Team", selector: row => row.team, sortable: false, center: true, width: "65px" },
            { name: "GP", selector: row => row.gamesPlayed, sortable: true, right: true, width: "70px" },
            { name: "G", selector: row => row.goals, sortable: true, right: true, width: "65px" },
            { name: "A", selector: row => row.assists, sortable: true, right: true, width: "65px" },
            { name: "P", selector: row => row.points, sortable: true, right: true, width: "65px" },
            { name: "+/-", selector: row => row.plusMinus, sortable: true, right: true, width: "70px" },
            { name: "PIM", selector: row => row.pim, sortable: true, right: true, width: "75px" },
            { name: "PPG", selector: row => row.ppg, sortable: true, right: true, width: "75px" },
            { name: "PPP", selector: row => row.ppp, sortable: true, right: true, width: "75px" },
            { name: "SHG", selector: row => row.shg, sortable: true, right: true, width: "75px" },
            { name: "SHP", selector: row => row.shp, sortable: true, right: true, width: "75px" },
            { name: "GWG", selector: row => row.gwg, sortable: true, right: true, width: "80px" },
            { name: "OTG", selector: row => row.otg, sortable: true, right: true, width: "80px" },
            { name: "SH", selector: row => row.shots, sortable: true, right: true, width: "85px" },
            { name: "SH%", selector: row => row.shotPercentage, sortable: true, right: true, width: "80px" },
        ];
    }

    getGoalieColumnHeaders() {
        return [
            { name: "Season", selector: row => row.season, sortable: true, width: "100px", format: row => row.season.replace(/(\d{4})/, "$1-")},
            { name: "Team", selector: row => row.team, sortable: false, center: true, width: "65px" },
            { name: "GS", selector: row => row.gamesStarted, sortable: true, right: true },
            { name: "W", selector: row => row.wins, sortable: true, right: true },
            { name: "L", selector: row => row.losses, sortable: true, right: true },
            { name: "OT", selector: row => row.ot, sortable: true, right: true },
            { name: "SA", selector: row => row.shotsAgainst, sortable: true, right: true },
            { name: "GA", selector: row => row.goalsAgainst, sortable: true, right: true },
            { name: "SV%", selector: row => row.savePercentage, sortable: true, right: true, format: row => parseFloat(row.savePercentage).toFixed(3).replace(/^0+/, '') },
            { name: "GAA", selector: row => row.goalsAgainstAverage, sortable: true, right: true, format: row => parseFloat(row.goalsAgainstAverage).toFixed(2) },
            { name: "SO", selector: row => row.shutouts, sortable: true, right: true },
            { name: "TOI", selector: row => row.timeOnIce, sortable: true, right: true, 
                format: row => parseInt(row.timeOnIce.slice(0, 4)) > 1000 ? row.timeOnIce.replace(/(\d{1})/, "$1,") : row.timeOnIce 
            },
        ];
    }

    getSkaterStatData(stats) {
        const mappedStats = [];
        stats.map(function(stat, index) {
            mappedStats.push({
                index: index, season: stat.season, team: TeamAbbreviation(stat.team.name), gamesPlayed: stat.playerStatisticsData.games, goals: stat.playerStatisticsData.goals,
                assists: stat.playerStatisticsData.assists, points: stat.playerStatisticsData.points, plusMinus: stat.playerStatisticsData.plusMinus,
                pim: stat.playerStatisticsData.pim, ppg: stat.playerStatisticsData.powerPlayGoals, ppp: stat.playerStatisticsData.powerPlayPoints,
                shg: stat.playerStatisticsData.shortHandedGoals, shp: stat.playerStatisticsData.shortHandedPoints, gwg: stat.playerStatisticsData.gameWinningGoals,
                otg: stat.playerStatisticsData.overTimeGoals, shots: stat.playerStatisticsData.shots, shotPercentage: stat.playerStatisticsData.shotPct
            })
        }, this);
        
        return mappedStats;
    }

    getGoalieStatData(stats) {
        const mappedStats = [];
        stats.map(function(stat, index) {
            mappedStats.push({
                index: index, season: stat.season, team: TeamAbbreviation(stat.team.name), gamesStarted: stat.goalieStatisticsData.gamesStarted, wins: stat.goalieStatisticsData.wins,
                losses: stat.goalieStatisticsData.losses, ot: stat.goalieStatisticsData.ot, shotsAgainst: stat.goalieStatisticsData.shotsAgainst, goalsAgainst: stat.goalieStatisticsData.goalsAgainst,
                savePercentage: stat.goalieStatisticsData.savePercentage, goalsAgainstAverage: stat.goalieStatisticsData.goalAgainstAverage, shutouts: stat.goalieStatisticsData.shutouts,
                timeOnIce: stat.goalieStatisticsData.timeOnIce,
            })
        }, this);

        return mappedStats;
    }

    render() {
        let headers = [];
        let data = [];
        if (this.props.stats[0].playerStatisticsData !== undefined) {
            headers = this.getSkaterColumnHeaders();
            data = this.getSkaterStatData(this.props.stats);
        }
        else if (this.props.stats[0].goalieStatisticsData !== undefined) {
            headers = this.getGoalieColumnHeaders();
            data = this.getGoalieStatData(this.props.stats);
        }
        return (
            <DataTableBase 
                columns={headers}
                data={data}
                highlightOnHover={true}
                dense={true}
            />
        )
    }
}