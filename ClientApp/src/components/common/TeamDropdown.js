import { Component } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export class TeamDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { metroTeams: [], atlanticTeams: [], centralTeams: [], pacificTeams: [], loading: true };
    }

    componentDidMount() {
        this.getTeams();
    }

    render() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className='text-dark'>
                    Teams
                </DropdownToggle>
                <DropdownMenu>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <DropdownItem header>Metropolitan</DropdownItem>
                                {
                                    this.state.metroTeams.map(function(team, index) {
                                        return (
                                            <DropdownItem key={team.id}>
                                                <img height={20} src={team.officialLightTeamLogoUrl}></img>{team.name}
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-3">
                                <DropdownItem header>Atlantic</DropdownItem>
                                {
                                    this.state.atlanticTeams.map(function(team, index) {
                                        return (
                                            <DropdownItem key={team.id}>
                                                <img height={20} src={team.officialLightTeamLogoUrl}></img>{team.name}
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-3">
                                <DropdownItem header>Central</DropdownItem>
                                {
                                    this.state.centralTeams.map(function(team, index) {
                                        return (
                                            <DropdownItem key={team.id}>
                                                <img height={20} src={team.officialLightTeamLogoUrl}></img>{team.name}
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-3">
                                <DropdownItem header>Pacific</DropdownItem>
                                {
                                    this.state.pacificTeams.map(function(team, index) {
                                        return (
                                            <DropdownItem key={team.id}>
                                                <img height={20} src={team.officialLightTeamLogoUrl}></img>{team.name}
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    async getTeams() {
        const response = await fetch('team/GetActiveTeams');
        const data = await response.json();
        this.setState({ metroTeams: data.filter(team => team.division.name === "Metropolitan"),
                        atlanticTeams: data.filter(team => team.division.name === "Atlantic"),
                        centralTeams: data.filter(team => team.division.name === "Central"),
                        pacificTeams: data.filter(team => team.division.name === "Pacific"),
                        loading: false });
    }
}