import { Component } from "react";

export class PlayerInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.getDateOfBirth = this.getDateOfBirth.bind(this);
        this.getBirthplace = this.getBirthplace.bind(this);
        this.getShootsCatches = this.getShootsCatches.bind(this);
    }

    getDateOfBirth(dateOfBirth) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var date = new Date(dateOfBirth);
        return date.toLocaleDateString("en-US", options);
    }
    
    getBirthplace(birthCity, birthStateProvince, birthCountry) {
        let birthPlace = '';
        if (birthStateProvince == null || birthStateProvince === '') {
            birthPlace = birthCity + ', ' + birthCountry;
        }
        else {
            birthPlace = birthCity + ', ' + birthStateProvince + ', ' + birthCountry;
        }
        
        return birthPlace;
    }

    getShootsCatches(shootsCatchesCode) {
        let shootsCatches = '';
        if (shootsCatchesCode === 'L') {
            shootsCatches = 'Left';
        }
        else {
            shootsCatches = 'Right';
        }
        return shootsCatches;
    }

    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <h3>About</h3>
                        <div style={{"fontWeight": "bold"}}>Born: {this.getDateOfBirth(this.props.player.birthDate)}</div>
                        <div style={{"fontWeight": "bold"}}>Birthplace: {this.getBirthplace(this.props.player.birthCity, this.props.player.birthStateProvince, this.props.player.birthCountry)}</div>
                        {
                            this.props.player.isGoalie ?
                            (
                                <div style={{"fontWeight": "bold"}}>Catches: {this.getShootsCatches(this.props.player.shootsCatches)}</div>
                            ) :
                            (
                                <div style={{"fontWeight": "bold"}}>Shoots: {this.getShootsCatches(this.props.player.shootsCatches)}</div>
                            )
                        }
                    </div>
                    <div className="col-1"></div>
                    <div className="col-5">
                        <div className="playerFullDetailsCenterAlignment">
                            <img src={this.props.player.playerHeadshotImageLink} className="playerHeadshot" onError={(e) => this.getDefaultSrc(e)} />
                        </div>
                        <div className="playerFullDetailsCenterAlignment playerFullDetailsPlayerInfo" style={{"paddingTop": "10px"}}>
                            <span>{this.props.player.fullName}&nbsp;|&nbsp;#{this.props.player.primaryNumber}</span>
                            <span></span>
                        </div>
                        <div className="playerFullDetailsCenterAlignment playerFullDetailsPlayerInfo" style={{"paddingTop": "5px"}}>
                            <span>
                                {this.props.player.primaryPosition.code}&nbsp;|&nbsp;
                                {this.props.player.height}&nbsp;|&nbsp;
                                {this.props.player.weight}
                                {
                                    this.props.player.currentAge > 0 &&
                                    <span>&nbsp;|&nbsp;Age: {this.props.player.currentAge}</span>
                                }
                                {
                                    this.props.player.currentTeam !== null &&
                                    <div style={{"display": "inline-block"}}>
                                        &nbsp;|<img src={this.props.player.currentTeam.officialLightTeamLogoUrl}
                                        height={25} />
                                        <span>{this.props.player.currentTeam.name}</span>
                                    </div>
                                }
                            </span>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}