import React, { Component } from 'react';
import { StatisticsLeadersDisplay } from "./StatisticsLeadersDisplay";
import { StatisticsGrid } from './StatisticsGrid';
import '../Main.css';

export class Statistics extends Component {
    static displayName = Statistics.name;
    constructor(props) {
        super(props);
        this.state = { skaterType: '', fullStatType: '', seasonPickerValue: '20222023', random: 0, };
        this.seasonPickerChanged = this.seasonPickerChanged.bind(this);
        this.allLeadersCallback = this.allLeadersCallback.bind(this);
    }

    componentDidMount() {
        
    }

    seasonPickerChanged(date, value) {
        this.setState({ seasonPickerValue: value });
    }

    allLeadersCallback(skaterType, statType, sortId) {
        this.setState({ skaterType: skaterType,
                        fullStatType: statType,
                        random: Math.random() }, this.renderStatistics)
    }

    renderStatistics() {
        return (
            <div id="statsWrapper">
                <div className='container'>
                    <div className='row'>
                        <div className='col statsWrapper'>
                            <StatisticsLeadersDisplay callback={this.allLeadersCallback} 
                                                      statHeader="Points" 
                                                      skaterType="all" 
                                                      season={this.state.seasonPickerValue} />
                        </div>
                        <div className='col statsWrapper'>
                            <StatisticsLeadersDisplay callback={this.allLeadersCallback} 
                                                      statHeader="Points" 
                                                      skaterType="defensemen" 
                                                      season={this.state.seasonPickerValue} />
                        </div>
                        <div className='col statsWrapper'>
                            <StatisticsLeadersDisplay callback={this.allLeadersCallback} 
                                                      statHeader="GAA" 
                                                      skaterType="goalie" 
                                                      season={this.state.seasonPickerValue} 
                            />
                        </div>
                    </div>
                    {this.state.skaterType !== '' && this.state.statType !== '' && 
                        <StatisticsGrid key={this.state.random} 
                                        seasonYear={this.state.seasonPickerValue} 
                                        skaterType={this.state.skaterType} 
                                        statType={this.state.fullStatType} 
                        />
                    }
                </div>
            </div>
        )
    }

    render() {
        let contents = this.renderStatistics();

        return (
            <div>
                {contents}
            </div>
        )
    }
}