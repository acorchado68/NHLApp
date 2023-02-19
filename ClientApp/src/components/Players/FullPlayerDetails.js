import React, { Component } from "react";
import fallbackImage from "./images/headshot.jpg";

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
                <div className="playerFullDetailsHeadshotContainer">
                    <img src={fullPlayerDetails.player.playerHeadshotImageLink} className="playerHeadshot" onError={(e) => this.getDefaultSrc(e)} />
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