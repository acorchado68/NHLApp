import { Component } from "react";

export class Team extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.getTeam();
    }

    render() {
        return (
            <div>

            </div>
        )
    }

    async getTeam() {
        var url = this.props.location.pathname;
        var id = encodeURIComponent(url.slice(0, -2));
    }
}