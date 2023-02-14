import React, { Component } from 'react';
import '../Main.css';
import { SeasonPicker } from '../Pickers/SeasonPicker.js';
import { StandingsGrid } from './StandingsGrid.js';

export class Standings extends Component {
    static displayName = Standings.name;
    constructor(props) {
        super(props);
        this.state = { standings: [], standingsType: 'Division', seasonPickerValue: '', seasonPickerDateValue: '', loading: true };
        this.seasonPickerChanged = this.seasonPickerChanged.bind(this);
        this.handleStandingsSelectionClick = this.handleStandingsSelectionClick.bind(this);
        this.populateStandings = this.populateStandings.bind(this);
        this.getElementKey = this.getElementKey.bind(this);
    }

    componentDidMount() {
        this.populateCurrentStandings();
    }

    seasonPickerChanged(date, value) {
        this.setState({ loading: true, seasonPickerDateValue: date, seasonPickerValue: value }, this.populateStandings);
    }

    handleStandingsSelectionClick(event, standingsType) {
        event.preventDefault();
        this.setState({ loading: true, standingsType: standingsType }, this.populateStandings);
    }

    getElementKey(item) {
        let key = ''
        switch (this.state.standingsType) {
            case "Division":
                key = item.division.name;
                break;
            case "Conference":
                key = item.conference.name;
                break;
        }

        return key;
    }

    renderStandings(standings) {
        return (
            <div>
                <div className='filters'>
                    <SeasonPicker selectedValue={this.state.seasonPickerValue} callback={this.seasonPickerChanged} />
                </div>
                <hr></hr>
                <div className='selectionContainer'>
                    <a href="#" 
                        className={"selectionItem " + (this.state.standingsType === "Division" ? 'active' : '')} 
                        onClick={(e) => this.handleStandingsSelectionClick(e, "Division")}
                    >
                    Division
                    </a>
                    <a href="#" 
                        className={"selectionItem " + (this.state.standingsType === "Conference" ? 'active' : '')}
                        onClick={(e) => this.handleStandingsSelectionClick(e, "Conference")}
                    >
                    Conference
                    </a>
                </div>
                <div id="carousel" className='carousel slide' data-bs-interval={false}>
                    <div className='carousel-indicators'>
                        {standings.map(function(item, i) {
                            return (
                                <button key={this.getElementKey(item) + i} 
                                        type="button" 
                                        data-bs-target="#carousel" 
                                        data-bs-slide-to={i} 
                                        className={i === 0 ? "active" : ''}  
                                        aria-current="true">
                                {this.getElementKey(item)}
                                </button>
                            )
                        }, this)}
                    </div>
                    <div className='carousel-inner mx-auto'>
                        {standings.map(function(item, i) {
                            return (
                                <div key={i} 
                                     className={'carousel-item ' + (i === 0 ? 'active' : '')}>
                                    <StandingsGrid className="d-block w-100" 
                                                   data={item}
                                    />    
                                </div>
                            )
                        })}
                    </div>
                    <button className='carousel-control-prev carouselButtonLeft' type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next carouselButtonRight' type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span className='carousel-control-next-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>
        )
    }

  render() {
    let contents = this.state.loading
    ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
    : this.renderStandings(this.state.standings);

    return (
        <div>
            {contents}
        </div>
    )
  }

  async populateStandings() {
    switch (this.state.standingsType) {
        case "Division":
            this.populateStandingsByDate("GetDivisionStandingsByDate");
            break;
        case "Conference":
            this.populateStandingsByDate("GetConferenceStandingsByDate");
            break;
        default:
            this.populateStandingsByDate("GetDivisionStandingsByDate");
            break;
    }
  }

  async populateCurrentStandings() {
    const standingsResponse = await fetch('standings/GetCurrent');
    const standingsData = await standingsResponse.json();
    this.setState({ standings: standingsData, loading: false });
  }

  async populateStandingsByDate(method) {
    var encodedDate = encodeURIComponent(this.state.seasonPickerDateValue);
    const standingsResponse = await fetch('standings/' + method + '?date=' + encodedDate);
    const standingsData = await standingsResponse.json();
    this.setState({ standings: standingsData, loading: false });
  }
}