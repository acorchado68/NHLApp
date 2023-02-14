import React, { Component } from "react";
import DataTableBase from "../common/DataTableBase";
import { getGoalieData, getGoalieColumnHeaders, getStatGridCustomStyles } from "../../common/commonFunctions.js"
 
export class TeamStatGoalieStats extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {

    }

    render() {
        const headers = getGoalieColumnHeaders(false);
        const goalieData = getGoalieData(this.props.ids, this.props.goalies);
        const customStyles = getStatGridCustomStyles();
        return (
            <DataTableBase columns={headers} 
                           data={goalieData} 
                           customStyles={customStyles} 
                           highlightOnHover={true} 
                           responsive={true} 
                           dense={true} 
                           selectableRows={false}
            />
        )
    }
}