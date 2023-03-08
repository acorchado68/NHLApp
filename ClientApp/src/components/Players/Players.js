import React, { Component } from "react";
import { FullPlayerDetails } from "./FullPlayerDetails";
import { PlayerSearchResults } from "./PlayerSearchResults";

export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            players: [],
            searchValue: '',
            searchTextInvalid: false,
            searchExecuted: false,
            selectedPlayerId: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) ?? '',
        }
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.loadFullPlayerData = this.loadFullPlayerData.bind(this);
        this.fullDetailsScroll = this.fullDetailsScroll.bind(this);
        this.searchRef = React.createRef();
        this.checkedRef = React.createRef();
    }

    componentDidMount() {
    
    }

    loadFullPlayerData(playerId) {
        this.setState({ selectedPlayerId: playerId, searchExecuted: false }, this.fullDetailsScroll);
    }

    fullDetailsScroll() {
        const fullDetails = document.querySelector('.fullDetails');
        if (fullDetails !== null) {
            fullDetails.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }

    handleSearchClick() {
        var searchText = this.searchRef.current.value;
        if (searchText.length < 3) {
            this.setState({ searchTextInvalid: true });
        }
        else {
            var activePlayersOnly = this.checkedRef.current.checked;
            this.queryPlayer(searchText, activePlayersOnly);
        }
    }

    renderPlayers(players) {
        return (
            <div>
                <div className="row filters">
                    <div className="col-4">
                        <input type="text" 
                            id="playerSearch" 
                            className={"form-control " + ((this.state.searchTextInvalid) ? "is-invalid" : "") }
                            placeholder="Search Players"
                            ref={this.searchRef}>
                        </input>
                        <div className="invalid-feedback">
                            Please provide at least 3 characters.
                        </div>
                    </div>
                    <div className="col-3">
                        <input type="checkbox" 
                            className="form-check-input"
                            ref={this.checkedRef}
                            defaultChecked>
                        </input>
                        <span style={{"paddingLeft": "10px"}}>Active Players Only</span>
                    </div>
                    <div className="col-4">
                        <button onClick={this.handleSearchClick} 
                                className="btn btn-primary"
                                type="submit">Search
                        </button>
                    </div>
                </div>
                <hr></hr>
                {
                    this.state.searchExecuted &&
                    <PlayerSearchResults players={players} callback={this.loadFullPlayerData} />
                    
                }
                {
                    this.state.selectedPlayerId !== '' && !isNaN(this.state.selectedPlayerId) &&
                    <div style={{"paddingTop": "20px"}}>
                        <FullPlayerDetails playerId={this.state.selectedPlayerId} />
                    </div>
                }
            </div>
        )
    }

    render() {
        let contents = this.renderPlayers(this.state.players);
        return (
            <div>
                {contents}
            </div>
        )
    }

    async queryPlayer(searchText, activeOnly) {
        var query = encodeURIComponent(searchText);
        var activePlayersOnly = encodeURIComponent(activeOnly);
        const playerQueryResponse = await fetch('player/SearchAllPlayers?query=' + query + '&activePlayersOnly=' + activePlayersOnly);
        const playerData = await playerQueryResponse.json();
        this.setState({ players: playerData, searchTextInvalid: false, searchExecuted: true });
    }
}