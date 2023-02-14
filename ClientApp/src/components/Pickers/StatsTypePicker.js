import { Component } from "react";

export class StatsTypePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div className="dropdown">
                <select className="form-select" disabled={true}>
                    <option className="dropdown-item" selected={true}>Regular Season</option>
                </select>
            </div>
        )
    }
}