import { Component } from 'react';

export class SeasonPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], loading: true };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.populate();
    }

    handleOnChange(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        this.props.callback(event.target.value, selectedOption.dataset.id);
    }

    renderPicker(data) {
        return (
            <div className="dropdown">
                <select className='form-select' onChange={this.handleOnChange}>
                    {data.map(function(item, i) {
                        return (
                            <option className="dropdown-item" 
                                    key={item.seasonId} 
                                    data-id={item.seasonId} 
                                    value={item.regularSeasonEndDate} 
                                    selected={item.seasonId === this.props.selectedValue}>
                                {item.seasonId.replace(/(\d{4})/, "$1-")}
                            </option>
                        )
                    }, this)}
                </select>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderPicker(this.state.data);

        return (
            <div>
                {contents}
            </div>
        )
    }

    async populate() {
        const response = await fetch('years');
        const data = await response.json();
        this.setState({data: data, loading: false});
    }
}