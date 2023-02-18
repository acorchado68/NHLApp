import React, { Component } from "react";
import DataTableBase from "../common/DataTableBase";

export class PlayerSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getPlayerData = this.getPlayerData.bind(this);
        this.getColumnHeaders = this.getColumnHeaders.bind(this);
    }

    componentDidMount() {

    }

    getColumnHeaders() {
        return [
            { name: "Name", selector: row => row.fullName },
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
                playerId: player.playerId, 
                fullName: player.firstName + ' ' + player.lastName, 
                height: player.height,
                weight: player.weight, 
                birthplace: player.birthProvinceState !== "" ? 
                            player.birthCity + ', ' + player.birthProvinceState :
                            player.birthCity, 
                birthCountry: player.birthCountry,
                lastTeam: player.lastTeamOfPlay
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
                />
            </div>
        )
    }
}