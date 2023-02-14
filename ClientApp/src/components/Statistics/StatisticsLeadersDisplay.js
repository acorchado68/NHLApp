import { Component } from "react";
import { StatisticsLeaderInformation } from "./StatisticsLeaderInformation"
import '../Main.css';

export class StatisticsLeadersDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { stats: [], 
            selectedStatsIndex: 0, 
            firstItemActive: true, 
            statTypeSelectedIndex: 0, 
            loading: true,
            statType: this.props.statHeader,
            seasonYear: this.props.season
        };
        this.handleStatTypeClick = this.handleStatTypeClick.bind(this);
        this.handleAllLeadersClick = this.handleAllLeadersClick.bind(this);
        this.populate = this.populate.bind(this);
    }

    componentDidMount() {
        this.populate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.season !== this.props.season) {
            this.setState({ stats: [], 
                            loading: true, 
                            seasonYear: this.props.season }, this.populate);
        }
    }

    handleHover(index) {
        this.setState({ selectedStatsIndex: index, firstItemActive: index === 0 });
    }

    handleStatTypeClick(event, index) {
        event.preventDefault();
        this.setState({ stats: [], 
                        loading: true, 
                        statType: event.target.text, 
                        statTypeSelectedIndex: index }, this.populate);
    }

    handleAllLeadersClick(event, skaterType) {
        event.preventDefault();
        this.props.callback(skaterType, this.state.statType);
    }

    getStat(statsData) {
        let stat = '';
        switch (this.state.statType) {
            case "Points":
                stat = statsData.points;
                break;
            case "Goals":
                stat = statsData.goals;
                break;
            case "Assists":
                stat = statsData.assists;
                break;
            case "GAA":
                stat = parseFloat(statsData.goalAgainstAverage).toFixed(2);
                break;
            case "SV%":
                stat = parseFloat(statsData.savePercentage).toFixed(3).replace(/^0+/, '');
                break;
            case "Shutouts":
                stat = statsData.shutouts;
                break;
        }

        return stat;
    }

    getSkaterTypeHeader(skaterType) {
        let header = ''
        if (skaterType === 'all') {
            header = 'All Skaters'
        }
        else if (skaterType === 'defensemen') {
            header = 'Defensemen'
        }
        else if (skaterType === 'goalie') {
            header = 'Goalies'
        }

        return header;
    }

    renderStats() {
        const skaterType = this.props.skaterType;
        return (
            <div className="card text-center">
                <div className="card-header active">
                    { this.getSkaterTypeHeader(skaterType) }
                </div>
                <div className="statsHeader">
                    {
                        skaterType === "goalie"
                        ? <div className="statsTypeSelectionContainer">
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 0)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 0) ? 'active' : '')}>GAA</a>
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 1)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 1) ? 'active' : '')}>SV%</a>
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 2)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 2) ? 'active' : '')}>Shutouts</a>
                          </div>
                        : <div className="statsTypeSelectionContainer">
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 0)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 0) ? 'active' : '')}>Points</a>
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 1)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 1) ? 'active' : '')}>Goals</a>
                            <a href="#" onClick={(e) => this.handleStatTypeClick(e, 2)} className={"statsTypeItem " + ((this.state.statTypeSelectedIndex === 2) ? 'active' : '')}>Assists</a>
                          </div>
                    }
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <StatisticsLeaderInformation 
                                data={this.state.stats[this.state.selectedStatsIndex]} 
                                statHeader={this.state.statType}
                                skaterType={skaterType} 
                            />
                        </div>
                        <div className="col-8">
                            <div className="statsList">
                                <ul className="statsLeadersList" 
                                    onMouseLeave={() => this.handleHover(0)}>
                                    {this.state.stats.map((item, i) =>
                                        <li key={item.player.id} 
                                            onMouseEnter={() => this.handleHover(i)}
                                            className={"statsLeadersListItem " + (this.state.firstItemActive && i === 0 ? 'active' : '')}>
                                            <span>{item.player.fullName}</span>
                                            {
                                                skaterType === "goalie"
                                                ? <span>{this.getStat(item.goalieStatisticsData)}</span>
                                                : <span>{this.getStat(item.playerStatisticsData)}</span>
                                            }
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <a className="statsLeadersLink" onClick={(e) => this.handleAllLeadersClick(e, skaterType)} href="#">Show More</a>
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderStats();

        return (
            <div>
                {contents}
            </div>
        )
    }

    async populate() {
        switch (this.state.statType) {
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
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersPoints?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getAllSkatersGoals() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersGoals?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getAllSkatersAssists() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetAllSkatersAssists?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getDefensemenPoints() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenPoints?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getDefensemenGoals() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenGoals?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getDefensemenAssists() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetDefensemenAssists?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getGoalieGaa() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieGaa?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getGoalieSavePercentage() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieSavePercentage?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }

    async getGoalieShutouts() {
        var year = encodeURIComponent(this.state.seasonYear);
        const statsResponse = await fetch('statistics/GetGoalieShutouts?seasonYear=' + year);
        const statsData = await statsResponse.json();
        this.setState({ stats: statsData, loading: false });
    }
}