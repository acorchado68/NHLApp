import { Component } from "react";
import DataTableBase from "../common/DataTableBase";

export class PlayerStats extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getColumnHeaders = this.getColumnHeaders.bind(this);
        this.getStatData = this.getStatData.bind(this);
    }

    getColumnHeaders() {
        return [];
    }

    getStatData() {
        return [];
    }

    render() {
        const headers = this.getColumnHeaders();
        const data = this.getStatData(this.props.stats);
        return (
            <DataTableBase 
                headers={headers}
                data={data}
            />
        )
    }
}