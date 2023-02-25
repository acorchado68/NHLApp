import React, { Component } from 'react';
import { StatisticsLeadersDisplay } from "./StatisticsLeadersDisplay";
import { StatisticsGrid } from './StatisticsGrid';
import '../Main.css';

export class Statistics extends Component {
    static displayName = Statistics.name;
    constructor(props) {
        super(props);
        this.state = { skaterType: '', fullStatType: '', random: 0, };
        this.allLeadersCallback = this.allLeadersCallback.bind(this);
    }

    componentDidMount() {
        
    }

    allLeadersCallback(skaterType, statType) {
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
                                                      season='20222023' />
                        </div>
                        <div className='col statsWrapper'>
                            <StatisticsLeadersDisplay callback={this.allLeadersCallback} 
                                                      statHeader="Points" 
                                                      skaterType="defensemen" 
                                                      season='20222023' />
                        </div>
                        <div className='col statsWrapper'>
                            <StatisticsLeadersDisplay callback={this.allLeadersCallback} 
                                                      statHeader="GAA" 
                                                      skaterType="goalie" 
                                                      season='20222023' 
                            />
                        </div>
                    </div>
                    {this.state.skaterType !== '' && this.state.statType !== '' && 
                        <StatisticsGrid key={this.state.random} 
                                        seasonYear='20222023'  
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