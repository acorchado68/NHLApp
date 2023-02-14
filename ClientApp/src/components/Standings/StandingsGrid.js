import { Component } from "react";
import DataTableBase from "../common/DataTableBase";

export class StandingsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.getColumnHeaders = this.getColumnHeaders.bind(this);
        this.getStandingsData = this.getStandingsData.bind(this);
        this.calculateGoalDiff = this.calculateGoalDiff.bind(this);
    }

    componentDidMount() {

    }

    calculateGoalDiff(goalsScored, goalsAgainst) {
        const diff = goalsScored - goalsAgainst;
        return (diff <= 0 ? "" : "+") + diff;
    }

    getColumnHeaders() {
        return [
            { name: "", 
              selector: row => row.teamName,
              width: "250px",
              cell: row => <div>
                                <div className="d-inline standingsPosition">{row.index + 1}</div>
                                <img className="standingsLogo" 
                                     height={28}
                                     src={row.logo}
                                     alt={row.teamName}
                                >
                                </img>
                                {row.teamName}{row.clinchIndicator !== undefined && 
                                               row.clinchIndicator !== null ? 
                                               "-" + row.clinchIndicator : 
                                               ""}
                           </div>,
            },
            { name: "GP", selector: row => row.gamesPlayed, sortable: true, right: true, width: "85px" },
            { name: "W", selector: row => row.wins, sortable: true, right: true, width: "85px" },
            { name: "L", selector: row => row.losses, sortable: true, right: true, width: "85px" },
            { name: "OTL", selector: row => row.ot, sortable: true, right: true, width: "85px" },
            { name: "PTS", selector: row => row.points, sortable: true, right: true, width: "85px" },
            { name: "P%", selector: row => row.pointsPercentage, sortable: true, right: true, width: "85px" },
            { name: "RW", selector: row => row.regulationWins, sortable: true, right: true, width: "85px" },
            { name: "ROW", selector: row => row.row, sortable: true, right: true, width: "85px" },
            { name: "GF", selector: row => row.goalsScored, sortable: true, right: true, width: "85px" },
            { name: "GA", selector: row => row.goalsAgainst, sortable: true, right: true, width: "85px" },
            { name: "DIFF", 
              selector: row => row.diff, 
              sortable: true,
              width: "85px",
              right: true, 
              cell: row => <div className="d-inline"
                                style={{color: (row.goalsScored - row.goalsAgainst > 0) ? "green" : "red"}}>
                            {this.calculateGoalDiff(row.goalsScored, row.goalsAgainst)}
                           </div> 
            },
            { name: "STRK", selector: row => row.streak, sortable: true, right: true, width: "85px" },
        ];
    }

    getStandingsData(teamRecords) {
        const standings = [];
        teamRecords.map(function(record, index) {
            standings.push({
                index: index, clinchIndicator: record.clinchIndicator, teamName: record.team.name, gamesPlayed: record.gamesPlayed, wins: record.leagueRecord.wins,
                losses: record.leagueRecord.losses, ot: record.leagueRecord.ot, points: record.points,
                pointsPercentage: parseFloat(record.pointsPercentage).toFixed(3).replace(/^0+/, ''), regulationWins: record.regulationWins,
                row: record.row, goalsScored: record.goalsScored, goalsAgainst: record.goalsAgainst, 
                diff: this.calculateGoalDiff(record.goalsScored, record.goalsAgainst), streak: record.streak.streakCode,
                logo: record.team.officialLightTeamLogoUrl,
            })
        }, this);

        return standings;
    }

    render() {
        const headers = this.getColumnHeaders();
        const data = this.getStandingsData(this.props.data.teamRecords);
        return (
            <div>
                <DataTableBase columns={headers} 
                               data={data}
                               highlightOnHover={true} 
                               responsive={true}
                               selectableRows={false}
                />
                <br></br>
            </div>
        )
    }
} 