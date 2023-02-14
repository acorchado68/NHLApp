import React, { Component } from "react";
import DataTableBase from "../common/DataTableBase";
import { getSkaterData, getSkaterColumnHeaders, getStatGridCustomStyles } from "../../common/commonFunctions.js"

export class TeamStatSkaterStats extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {

    }

    render() {
        const headers = getSkaterColumnHeaders(this.props.skaterType);
        const skaterData = getSkaterData(this.props.ids, this.props.skaters, this.props.skaterType);
        const customStyles = getStatGridCustomStyles();
        return (
            <DataTableBase columns={headers} 
                           data={skaterData} 
                           customStyles={customStyles} 
                           highlightOnHover={true} 
                           responsive={true}
                           dense={true} 
                           selectableRows={false} 
                           defaultSortFieldId={5}
                           defaultSortAsc={false}
            />
        )
    }
}