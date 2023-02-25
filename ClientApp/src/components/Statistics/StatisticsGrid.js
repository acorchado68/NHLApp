import { Component } from "react";
import '../../components/Main.css';
import { default as TeamAbbreviation } from '../../common/teamAbbreviation.js';
import { getStatGridCustomStyles } from "../../common/commonFunctions.js";
import DataTableBase from "../common/DataTableBase.js";

export class StatisticsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, stats: [], filteredStats: [], defaultSortFieldId: 0, areStatsFiltered: false };
        this.getSkaterColumnHeaders = this.getSkaterColumnHeaders.bind(this);
        this.getSkaterStatisticsData = this.getSkaterStatisticsData.bind(this);
        this.getGoalieColumnHeaders = this.getGoalieColumnHeaders.bind(this);
        this.getGoalieStatisticsData = this.getGoalieStatisticsData.bind(this);
        this.formatPlusMinus = this.formatPlusMinus.bind(this);
        this.formatPercentage = this.formatPercentage.bind(this);
        this.getStatHeader = this.getStatHeader.bind(this);
        this.handleStatSearch = this.handleStatSearch.bind(this);
    }

    componentDidMount() {
        this.getFullStatistics();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.skaterType !== this.props.skaterType) || 
            (prevProps.statType !== this.props.statType)) {
                this.getFullStatistics();
            }
    }

    handleStatSearch(event, stats) {
        let filterText = event.target.value;
        if (stats === undefined || 
            stats.length === 0 ||
            event.key === 'Backspace') {
            stats = this.state.stats;
        }
        const filteredStats = stats.filter(stat => stats.length === 0 || event.key === 'Backspace' ? 
                                                   stat.player.fullName.toLowerCase().includes(filterText.toLowerCase()) :
                                                   stat.fullName.toLowerCase().includes(filterText.toLowerCase()));
        this.setState({ filteredStats: filteredStats, areStatsFiltered: filterText !== '' }, this.renderFullStatistics);
    }

    getStatHeader() {
        let skaterType = this.props.skaterType;
        if (this.props.skaterType === 'all') {
            skaterType = 'all Skaters';
        }
        skaterType = skaterType.charAt(0).toUpperCase() + skaterType.slice(1);
        return skaterType;
    }

    formatPlusMinus(plusMinus) {
        let formattedPlusMinus = plusMinus;
        if (plusMinus > 0) {
            formattedPlusMinus = "+" + plusMinus;
        }

        return formattedPlusMinus;
    }

    formatPercentage(percentage) {
        return percentage + "%";
    }

    getGoalieColumnHeaders() {
        return [
            { name: "", selector: row => row.fullName, sortable: false, width: "225px" },
            { name: "Team", selector: row => row.team, sortable: false, width: "65px" },
            { name: "GP", selector: row => row.games, sortable: true, right: true, width: "55px", },
            { name: "GS", selector: row => row.gamesStarted, sortable: true, right: true, width: "55px", },
            { name: "W", selector: row => row.wins, sortable: true, right: true, width: "55px" },
            { name: "L", selector: row => row.losses, sortable: true, right: true, width: "55px" },
            { name: "OTL", selector: row => row.ot, sortable: true, right: true, width: "55px" },
            { name: "SA", selector: row => row.shotsAgainst, sortable: true, right: true, width: "65px" },
            { name: "Saves", selector: row => row.saves, sortable: true, right: true, width: "75px" },
            { name: "GA", selector: row => row.goalsAgainst, sortable: true, right: true, width: "65px" },
            { name: "GAA", selector: row => row.goalsAgainstAverage, sortable: true, right: true, width: "65px", format: row => parseFloat(row.goalsAgainstAverage).toFixed(2) },
            { name: "SO", selector: row => row.shutouts, sortable: true, right: true, width: "60px", },
            { name: "SV%", selector: row => row.savePercentage, sortable: true, right: true, width: "65px", format: row => parseFloat(row.savePercentage).toFixed(3).replace(/^0+/, '') },
            { name: "EVSV%", selector: row => row.evenSavePercentage, sortable: true, right: true, width: "75px", format: row => parseFloat(row.evenSavePercentage * .01).toFixed(3).replace(/^0+/, '') },
            { name: "SHSV%", selector: row => row.shSavePercentage, sortable: true, right: true, width: "75px", format: row => parseFloat(row.shSavePercentage * .01).toFixed(3).replace(/^0+/, '') },
            { name: "PPSV%", selector: row => row.ppSavePercentage, sortable: true, right: true, width: "75px", format: row => parseFloat(row.ppSavePercentage * .01).toFixed(3).replace(/^0+/, '') },
        ]
    }

    getGoalieStatisticsData(stats) {
        const mappedStats = [];
        stats.map(function(stat, index) {
            mappedStats.push({
                index: index, fullName: stat.player.fullName, team: TeamAbbreviation(stat.player.currentTeam.name), games: stat.goalieStatisticsData.games, 
                gamesStarted: stat.goalieStatisticsData.gamesStarted, wins: stat.goalieStatisticsData.wins, losses: stat.goalieStatisticsData.losses, 
                ot: stat.goalieStatisticsData.ot, shotsAgainst: stat.goalieStatisticsData.shotsAgainst, saves: stat.goalieStatisticsData.saves,
                goalsAgainst: stat.goalieStatisticsData.goalsAgainst, savePercentage: stat.goalieStatisticsData.savePercentage, goalsAgainstAverage: stat.goalieStatisticsData.goalAgainstAverage,
                shutouts: stat.goalieStatisticsData.shutouts, evenSavePercentage: stat.goalieStatisticsData.evenStrengthSavePercentage, shSavePercentage: stat.goalieStatisticsData.shortHandedSavePercentage, 
                ppSavePercentage: stat.goalieStatisticsData.powerPlaySavePercentage,
            })
        }, this);

        return mappedStats;
    }

    getSkaterColumnHeaders() {
        return [
            { name: "", selector: row => row.fullName, sortable: false, width: "225px", },
            { name: "Team", selector: row => row.team, sortable: false, width: "60px" },
            { name: "POS", selector: row => row.position, sortable: false, center: true, width: "45px" },
            { name: "GP", selector: row => row.games, sortable: true, right: true, width: "55px" },
            { name: "G", selector: row => row.goals, sortable: true, right: true, width: "50px" },
            { name: "A", selector: row => row.assists, sortable: true, right: true, width: "50px" },
            { name: "P", selector: row => row.points, sortable: true, right: true, width: "50px" },
            { name: "+/-", selector: row => row.plusMinus, sortable: true, right: true, width: "55px" },
            { name: "S", selector: row => row.shots, sortable: true, right: true, width: "55px" },
            { name: "S%", selector: row => row.shotPercentage, sortable: true, right: true, width: "70px" },
            { name: "GWG", selector: row => row.gameWinningGoals, sortable: true, right: true, width: "65px" },
            { name: "PIMs", selector: row => row.pim, sortable: true, right: true, width: "65px" },
            { name: "BLKS", selector: row => row.blocked, sortable: true, right: true, width: "65px" },
            { name: "HITS", selector: row => row.hits, sortable: true, right: true, width: "65px" },
            { name: "FO%", selector: row => row.faceoffPercentage, sortable: true, right: true, width: "75px" },
            { name: "TOI", selector: row => row.timeOnIce, sortable: true, right: true, width: "70px" },
            { name: "PP TOI", selector: row => row.ppTimeOnIce, sortable: true, right: true, width: "75px" },
            { name: "SH TOI", selector: row => row.shTimeOnIce, sortable: true, right: true, width: "75px" },
        ]
    }

    getSkaterStatisticsData(stats) {
        const mappedStats = [];
        stats.map(function(stat, index) {
            mappedStats.push({
                index: index, fullName: stat.player.fullName, team: stat.player.currentTeam !== null ? TeamAbbreviation(stat.player.currentTeam.name) : "", position: stat.player.primaryPosition.abbreviation,
                games: stat.playerStatisticsData.games, goals: stat.playerStatisticsData.goals, assists: stat.playerStatisticsData.assists,
                points: stat.playerStatisticsData.points, plusMinus: this.formatPlusMinus(stat.playerStatisticsData.plusMinus), shots: stat.playerStatisticsData.shots,
                shotPercentage: this.formatPercentage(stat.playerStatisticsData.shotPct), gameWinningGoals: stat.playerStatisticsData.gameWinningGoals,
                pim: stat.playerStatisticsData.pim, blocked: stat.playerStatisticsData.blocked, hits: stat.playerStatisticsData.hits, 
                faceoffPercentage: this.formatPercentage(stat.playerStatisticsData.faceOffPct), timeOnIce: stat.playerStatisticsData.timeOnIcePerGame, 
                shTimeOnIce: stat.playerStatisticsData.shortHandedTimeOnIcePerGame, ppTimeOnIce: stat.playerStatisticsData.powerPlayTimeOnIcePerGame
            })
        }, this);

        return mappedStats;
    }

    renderFullStatistics() {
        let headers = [];
        let data = [];
        if (this.state.areStatsFiltered) {
            data = this.state.filteredStats;
        }
        const customStyles = getStatGridCustomStyles();
        if (this.props.skaterType === "goalie") {
            headers = this.getGoalieColumnHeaders();
            if ((!this.state.areStatsFiltered) || (this.state.areStatsFiltered && data[0].player !== undefined)) {
                data = this.getGoalieStatisticsData(this.state.stats);
            }
        }
        else {
            headers = this.getSkaterColumnHeaders();
            if (!this.state.areStatsFiltered) {
                data = this.getSkaterStatisticsData(this.state.stats);
            }
            else if (this.state.areStatsFiltered && data[0] !== undefined && data[0].player !== undefined) {
                data = this.getSkaterStatisticsData(this.state.filteredStats);
            }
        }
        return (
            <div>
                <hr></hr>
                <div className="card mb-3">
                    <div className="card-header statHeader">
                        <div className="row">
                            <div className="col-9" style={{margin: "auto"}}>Season Stats - {this.getStatHeader()}&nbsp;{this.props.statType}</div>
                            <div className="col-3"><input placeholder="Name" 
                                                          type="text" 
                                                          className="form-control" 
                                                          onKeyUp={(e) => this.handleStatSearch(e, data)}
                                                    />
                            </div>
                        </div>
                    </div>
                    <DataTableBase columns={headers}
                                   data={data}
                                   highlightOnHover={true}
                                   selectableRows={false}
                                   pagination={true}
                                   dense={true}
                                   customStyles={customStyles}
                                   defaultSortFieldId={this.state.defaultSortFieldId}
                                   defaultSortAsc={this.props.skaterType === 'goalie' && this.props.statType === 'GAA'}
                    />
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderFullStatistics();

        return (
            <div>
                {contents}
            </div>
        )
    }

    getFullStatistics() {
        switch (this.props.statType) {
            case "Points":
                switch (this.props.skaterType) {
                    case "all":
                        this.getAllSkatersPoints();
                        break;
                    case "defensemen":
                        this.getDefensemenPoints();
                        break;
                }
                break;
            case "Goals":
                switch (this.props.skaterType) {
                    case "all":
                        this.getAllSkatersGoals();
                        break;
                    case "defensemen":
                        this.getDefensemenGoals();
                        break;
                }
                break;
            case "Assists":
                switch (this.props.skaterType) {
                    case "all":
                        this.getAllSkatersAssists();
                        break;
                    case "defensemen":
                        this.getDefensemenAssists();
                        break;
                }
                break;
            case "GAA":
                this.getGoalieGaa();
                break;
            case "SV%":
                this.getGoalieSavePercentage();
                break;
            case "Shutouts":
                this.getGoalieShutouts();
                break;
        }
    }

    async getAllSkatersPoints() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersPoints?seasonYear=' + year + '&numberOfPlayers=' + 300);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 7, loading: false });
    }

    async getAllSkatersGoals() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersGoals?seasonYear=' + year + '&numberOfPlayers=' + 300);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 5, loading: false });
    }

    async getAllSkatersAssists() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersAssists?seasonYear=' + year + '&numberOfPlayers=' + 300);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 6, loading: false });
    }

    async getDefensemenPoints() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenPoints?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 7, loading: false });
    }

    async getDefensemenGoals() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenGoals?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 5, loading: false });
    }

    async getDefensemenAssists() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenAssists?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 6, loading: false });
    }

    async getGoalieGaa() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieGaa?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 11, loading: false });
    }

    async getGoalieSavePercentage() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieSavePercentage?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 13, loading: false });
    }

    async getGoalieShutouts() {
        var year = encodeURIComponent(this.props.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieShutouts?seasonYear=' + year + '&numberOfPlayers=' + 100);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, defaultSortFieldId: 12, loading: false });
    }
}