import React, { Component } from "react";
import fallbackImage from "./images/headshot.jpg";
import { PlayerInformation } from "./PlayerInformation";
import { PlayerStats } from "./PlayerStats";

export class FullPlayerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                       loading: true, 
                       fullPlayerDetails: [] 
                     };
        this.getDefaultSrc = this.getDefaultSrc.bind(this);
    }

    componentDidMount() {
        this.getFullPlayerDetails(this.props.playerId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.playerId !== this.props.playerId) {
            this.getFullPlayerDetails(this.props.playerId);
        }
    }

    getDefaultSrc(event) {
        event.target.src = fallbackImage;
    }

    renderPlayerDetails(fullPlayerDetails) {
        return (
            <div className="card fullDetails mainDetailsPanel">
                <PlayerInformation player={fullPlayerDetails.player} />
                <div style={{"paddingTop": "20px"}}>
                    <div className="accordion" id="statsAccordion">
                        {
                            fullPlayerDetails.player.active && 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="seasonStats">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeasonStats" aria-expanded="true" aria-controls="collapseSeasonStats">
                                    Current Season
                                </button>
                                </h2>
                                <div id="collapseSeasonStats" className="accordion-collapse collapse show" aria-labelledby="seasonStats" data-bs-parent="#statsAccordion">
                                    <div className="accordion-body">
                                        <PlayerStats stats={fullPlayerDetails.playerStatsByYear.slice(-1)} />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="careerStats">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCareerStats" aria-expanded="false" aria-controls="collapseCareerStats">
                                Career
                            </button>
                            </h2>
                            <div id="collapseCareerStats" className="accordion-collapse collapse" aria-labelledby="careerStats" data-bs-parent="#statsAccordion">
                                <div className="accordion-body">
                                    Career Stats Go Here
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="nonNhlStats">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNonNhlStats" aria-expanded="false" aria-controls="collapseNonNhlStats">
                                Outside the NHL
                            </button>
                            </h2>
                            <div id="collapseNonNhlStats" className="accordion-collapse collapse" aria-labelledby="nonNhlStats" data-bs-parent="#statsAccordion">
                                <div className="accordion-body">
                                    Non-NHL Stats Go Here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderPlayerDetails(this.state.fullPlayerDetails);

        return (
            <div>
                {contents}
            </div>
        )
    }

    async getFullPlayerDetails(playerId) {
        var playerIdParam = encodeURIComponent(playerId);
        const playerResponse = await fetch('player/GetFullPlayerDetails?playerId=' + playerIdParam);
        const playerData = await playerResponse.json();
        this.setState({ loading: false, fullPlayerDetails: playerData });
    }
}