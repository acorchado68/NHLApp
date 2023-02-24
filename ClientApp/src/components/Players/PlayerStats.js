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
        this.getTotal = this.getTotal.bind(this);
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
            { name: "SH%", selector: row => row.shotPercentage, sortable: true, right: true, width: "80px", format: row => parseFloat(row.shotPercentage).toFixed(1) + '%' },
        ];
    }

    getGoalieColumnHeaders() {
        return [
            { name: "Season", selector: row => row.season, sortable: true, width: "100px", format: row => row.season.replace(/(\d{4})/, "$1-")},
            { name: "Team", selector: row => row.team, sortable: false, center: true, width: "65px" },
            { name: "GS", selector: row => row.gamesStarted, sortable: true, right: true, width: "95px" },
            { name: "W", selector: row => row.wins, sortable: true, right: true, width: "95px" },
            { name: "L", selector: row => row.losses, sortable: true, right: true, width: "95px" },
            { name: "OT", selector: row => row.ot, sortable: true, right: true, width: "95px" },
            { name: "W%", selector: row => row.winPercentage, sortable: true, right: true, format: row => parseFloat(row.winPercentage).toFixed(3).replace(/^0+/, ''), width: "90px"  },
            { name: "SA", selector: row => row.shotsAgainst, sortable: true, right: true, width: "90px" },
            { name: "GA", selector: row => row.goalsAgainst, sortable: true, right: true, width: "90px" },
            { name: "SV%", selector: row => row.savePercentage, sortable: true, right: true, format: row => parseFloat(row.savePercentage).toFixed(3).replace(/^0+/, ''), width: "90px" },
            { name: "GAA", selector: row => row.goalsAgainstAverage, sortable: true, right: true, format: row => parseFloat(row.goalsAgainstAverage).toFixed(2), width: "90px" },
            { name: "SO", selector: row => row.shutouts, sortable: true, right: true, width: "90px" },
            { name: "TOI", selector: row => row.timeOnIce, sortable: true, right: true, 
                format: row => parseInt(row.timeOnIce.slice(0, 4)) > 1000 ? row.timeOnIce.replace(/(\d{1})/, "$1,").slice(0, -3) : row.timeOnIce.slice(0, -3), width: "90px"
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
                timeOnIce: stat.goalieStatisticsData.timeOnIce, winPercentage: stat.goalieStatisticsData.wins / stat.goalieStatisticsData.gamesStarted
            })
        }, this);

        return mappedStats;
    }

    getTotal(stats, statToTotal, isGoalie) {
        var total = 0;
        stats.map(function(stat, index) {
            if (isGoalie) {
                if (statToTotal === "timeOnIce") {
                    total += parseInt(stat.goalieStatisticsData[statToTotal].slice(0, -3));
                }
                else {
                    total += stat.goalieStatisticsData[statToTotal];
                }
            }
            else {
                total += stat.playerStatisticsData[statToTotal];
            }
        });

        return total;
    }

    getAverage(stats, statToAverage, isGoalie) {
        var total = 0;
        stats.map(function(stat, index) {
            if (isGoalie) {
                total += stat.goalieStatisticsData[statToAverage];
            }
            else {
                total += stat.playerStatisticsData[statToAverage];
            }
        });

        var average = total / stats.length;
        return average;
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
            <div>
                <DataTableBase 
                    columns={headers}
                    data={data}
                    highlightOnHover={true}
                    dense={true}
                />
                {
                    this.props.showCareerTotals && this.props.showPlayerTotals &&
                    this.getPlayerTotalsRow()
                }
                {
                    this.props.showCareerTotals && !this.props.showPlayerTotals &&
                    this.getGoalieTotalsRow()
                }
            </div>
        )
    }

    getPlayerTotalsRow() {
        return (
            <div id={"row-" + this.props.stats.length} className="sc-jrcTuL cCiha-d rdt_TableRow" style={{"borderTop": "1px solid"}} role="row">
                <div id="cell-1-undefined" data-column-id="1" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF hDNqJV dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="100px">
                    <div data-tag="allowRowEvents">Career</div>
                </div>
                <div id="cell-2-undefined" data-column-id="2" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fXKuKG dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="65px">
                    <div data-tag="allowRowEvents"></div>
                </div>
                <div id="cell-3-undefined" data-column-id="3" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF dmzOxc dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="70px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "games", false)}</div>
                </div>
                <div id="cell-4-undefined" data-column-id="4" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF jBRnNY dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="65px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "goals", false)}</div>
                </div>
                <div id="cell-5-undefined" data-column-id="5" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF jBRnNY dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="65px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "assists", false)}</div>
                </div>
                <div id="cell-6-undefined" data-column-id="6" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF jBRnNY dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="65px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "points", false)}</div>
                </div>
                <div id="cell-7-undefined" data-column-id="7" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF dmzOxc dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="70px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "plusMinus", false)}</div>
                </div>
                <div id="cell-8-undefined" data-column-id="8" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF ibLMyU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="75px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "pim", false)}</div>
                </div>
                <div id="cell-9-undefined" data-column-id="9" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF ibLMyU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="75px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "powerPlayGoals", false)}</div>
                </div>
                <div id="cell-10-undefined" data-column-id="10" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF ibLMyU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="75px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "powerPlayPoints", false)}</div>
                </div>
                <div id="cell-11-undefined" data-column-id="11" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF ibLMyU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="75px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "shortHandedGoals", false)}</div>
                </div>
                <div id="cell-12-undefined" data-column-id="12" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF ibLMyU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="75px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "shortHandedPoints", false)}</div>
                </div>
                <div id="cell-13-undefined" data-column-id="13" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fuoDeo dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="80px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "gameWinningGoals", false)}</div>
                </div>
                <div id="cell-14-undefined" data-column-id="14" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fuoDeo dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="80px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "overTimeGoals", false)}</div>
                </div>
                <div id="cell-15-undefined" data-column-id="15" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF cWAwvk dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="85px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "shots", false)}</div>
                </div>
                <div id="cell-16-undefined" data-column-id="16" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fuoDeo dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="80px">
                    <div data-tag="allowRowEvents">{this.getAverage(this.props.stats, "shotPct", false).toFixed(1) + '%'}</div>
                </div>
            </div>
        )
    }

    getGoalieTotalsRow() {
        return (
            <div id={"row-" + this.props.stats.length} className="sc-jrcTuL cCiha-d rdt_TableRow" style={{"borderTop": "1px solid"}} role="row">
                <div id="cell-1-undefined" data-column-id="1" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF hDNqJV dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="100px">
                    <div data-tag="allowRowEvents">Career</div>
                </div>
                <div id="cell-2-undefined" data-column-id="2" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fXKuKG dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="65px">
                    <div data-tag="allowRowEvents"></div>
                </div>
                <div id="cell-3-undefined" data-column-id="3" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF bwuVgg dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="95px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "gamesStarted", true)}</div>
                </div>
                <div id="cell-4-undefined" data-column-id="4" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF bwuVgg dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="95px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "wins", true)}</div>
                </div>
                <div id="cell-5-undefined" data-column-id="5" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF bwuVgg dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="95px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "losses", true)}</div>
                </div>
                <div id="cell-6-undefined" data-column-id="6" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF bwuVgg dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="95px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "ot", true)}</div>
                </div>
                <div id="cell-7-undefined" data-column-id="7" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{(this.getTotal(this.props.stats, "wins", true) / this.getTotal(this.props.stats, "gamesStarted", true)).toFixed(3).replace(/^0+/, '')}</div>
                </div>
                <div id="cell-8-undefined" data-column-id="8" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "shotsAgainst", true)}</div>
                </div>
                <div id="cell-9-undefined" data-column-id="9" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "goalsAgainst", true)}</div>
                </div>
                <div id="cell-10-undefined" data-column-id="10" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{parseFloat(this.getAverage(this.props.stats, "savePercentage", true)).toFixed(3).replace(/^0+/, '')}</div>
                </div>
                <div id="cell-11-undefined" data-column-id="11" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{parseFloat(this.getAverage(this.props.stats, "goalAgainstAverage", true)).toFixed(2)}</div>
                </div>
                <div id="cell-12-undefined" data-column-id="12" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "shutouts", true)}</div>
                </div>
                <div id="cell-13-undefined" data-column-id="13" role="cell" className="sc-hLBbgP sc-eDvSVe sc-jSUZER eVPPvF fGuBuU dtqzBx rdt_TableCell" data-tag="allowRowEvents" width="90px">
                    <div data-tag="allowRowEvents">{this.getTotal(this.props.stats, "timeOnIce", true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
            </div>
        )
    }
}