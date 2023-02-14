import React, { Component } from 'react';
import '../Main.css';
import { default as TeamAbbreviation } from '../../common/teamAbbreviation.js';

export class TeamStatCompareGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="rightPanelHeading">{this.props.statHeader}</div>
                <div className="row row-cols-2 rightPanelGrid">
                    <div className="col statHeader">{TeamAbbreviation(this.props.awayTeamName)}</div>
                    <div className="col statHeader">{TeamAbbreviation(this.props.homeTeamName)}</div>
                    <div className="col">{this.props.awayTeamStat}</div>
                    <div className="col">{this.props.homeTeamStat}</div>
                </div>
            </div>
        )
    }
}