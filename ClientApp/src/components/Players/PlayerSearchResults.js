import React, { Component } from "react";
import DataTableBase from "../common/DataTableBase";
import fallbackImage from "./images/headshot.jpg";
import { mapPosition } from "../../common/commonFunctions";

export class PlayerSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getPlayerData = this.getPlayerData.bind(this);
        this.getColumnHeaders = this.getColumnHeaders.bind(this);
        this.getDefaultSrc = this.getDefaultSrc.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }

    componentDidMount() {

    }

    getDefaultSrc(event) {
        event.target.src = fallbackImage;
    }

    handlePlayerClick(event, playerId) {
        event.preventDefault();
        this.props.callback(playerId);
    }

    getColumnHeaders() {
        return [
            { 
                name: "", 
                selector: row => row.headshot,  
                cell: row => <div>
                                <a href="#"
                                   className="playerSearchAnchor"
                                   onClick={(e) => this.handlePlayerClick(e, row.playerId)}
                                >
                                    <img
                                        height={65}
                                        src={row.headshot}
                                        className="playerSearchHeadshot"
                                        onError={(e) => this.getDefaultSrc(e)}
                                    />
                                    <div className="playerSearchPlayerContainer">
                                        <div style={{"paddingLeft": "15px", "paddingBottom": "5px"}}>
                                            {row.fullName}
                                        </div>
                                        <div style={{"paddingLeft": "10px"}}>
                                            #{row.playerNumber} - {mapPosition(row.position)}
                                        </div>
                                    </div>
                                </a>
                             </div>,
                grow: 1.5
            },
            { name: "Last Team", selector: row => row.lastTeam },
            { name: "Height", selector: row => row.height },
            { name: "Weight", selector: row => row.weight },
            { name: "Birthplace", selector: row => row.birthplace },
            { name: "Country", selector: row => row.birthCountry},
        ];
    }

    getPlayerData(players) {
        const mappedPlayers = [];
        players.map(function(player, index) {
            mappedPlayers.push({
                headshot: player.playerHeadshotLink,
                playerId: player.playerSearchResult.playerId, 
                fullName: player.playerSearchResult.firstName + ' ' + player.playerSearchResult.lastName, 
                position: player.playerSearchResult.position,
                playerNumber: player.playerSearchResult.playerNumber,
                height: player.playerSearchResult.height,
                weight: player.playerSearchResult.weight, 
                birthplace: player.playerSearchResult.birthProvinceState !== "" ? 
                            player.playerSearchResult.birthCity + ', ' + player.playerSearchResult.birthProvinceState :
                            player.playerSearchResult.birthCity, 
                birthCountry: player.playerSearchResult.birthCountry,
                lastTeam: player.playerSearchResult.lastTeamOfPlay
            })
        }, this);

        return mappedPlayers;
    }

    render() {
        const headers = this.getColumnHeaders();
        const data = this.getPlayerData(this.props.players);
        return (
            <div className="card">
                <DataTableBase columns={headers}
                               data={data}
                               highlightOnHover={true}
                               dense={true}
                               title="Search Results"
                />
            </div>
        )
    }
}