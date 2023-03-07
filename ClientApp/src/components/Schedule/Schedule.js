import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import '../Main.css';
import "react-datepicker/dist/react-datepicker.css";
import { GameCard } from '../Game/GameCard';
import { FullGameDetails } from '../Game/FullGameDetails';

export class Schedule extends Component {
    static displayName = Schedule.name;
    constructor(props) {
        super(props);
        this.state = { schedule: [], 
                       startDate: new Date(), 
                       loadDetails: false,
                       fullGame: [], 
                       fullGameHomeTeam: [], 
                       fullGameAwayTeam: [], 
                       loading: true,
                       key: 0 };
        this.setStartDate = this.setStartDate.bind(this);
        this.loadFullGameDetails = this.loadFullGameDetails.bind(this);
        this.refreshFullGameDetails = this.refreshFullGameDetails.bind(this);
        this.fullDetailsScroll = this.fullDetailsScroll.bind(this);
    }

    componentDidMount() {
        this.getScheduleByDate();
    }

    setStartDate(date) {
        this.setState({ startDate: date, loadDetails: false, loading: true }, this.getScheduleByDate);
    }

    loadFullGameDetails(game, homeTeam, awayTeam) {
        this.setState({ loadDetails: true, key: Math.random(), fullGame: game, fullGameHomeTeam: homeTeam, fullGameAwayTeam: awayTeam }, this.getScheduleByDate);
    }

    refreshFullGameDetails(game, homeTeam, awayTeam) {
        if (this.state.fullGame.liveGameFeed.gamePk === game.liveGameFeed.gamePk) {
            this.loadFullGameDetails(game, homeTeam, awayTeam);
        }
    }

    fullDetailsScroll() {
        const fullDetails = document.querySelector('.fullDetails');
        if (fullDetails !== null) {
            fullDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    renderSchedule(schedule) {
        return (
            <div>
                <DatePicker id="datePicker" popperPlacement="left-start" selected={this.state.startDate} onChange={this.setStartDate} />
                <hr></hr>
                <div className='container'>
                    {
                        schedule.dates.length > 0 ? 
                        (
                            <div className='row'>
                                {schedule.dates.map(function (date, i) {
                                    return (
                                        date.games.map(function(item, i) {
                                            return (
                                                <div key={i} className='col-sm-4 scheduleRow'>
                                                    <GameCard showFullStats={true} callback={this.loadFullGameDetails} refreshCallback={this.refreshFullGameDetails} gameId={item.gamePk} />
                                                </div>
                                            )
                                        }, this)
                                    )
                                }, this)}
                            </div>
                         ) : 
                        (
                            <div className='container'><p>No Games Scheduled</p></div>
                        )
                    }
                </div>
                {
                    this.state.loadDetails && 
                    <div>
                        <hr></hr>
                        <FullGameDetails key={this.state.key} game={this.state.fullGame} homeTeam={this.state.fullGameHomeTeam} awayTeam={this.state.fullGameAwayTeam} />
                    </div>
                }
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderSchedule(this.state.schedule);

        return (
            <div>
                {contents}
            </div>
        )
    }

    async getScheduleByDate() {
        var year = this.state.startDate.getFullYear();
        var month = this.state.startDate.getMonth() + 1;
        var day = this.state.startDate.getDate();
        const scheduleResponse = await fetch('schedule/GetByDate?year=' + year + '&month=' + month + '&day=' + day);
        const scheduleData = await scheduleResponse.json();
        this.setState({ schedule: scheduleData, loading: false }, this.fullDetailsScroll);
    }
}