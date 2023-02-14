import { Component } from "react";
import { StarPlayer } from "./StarPlayer";
import '../Main.css';

export class ThreeStars extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, firstStarPlayer: [], secondStarPlayer: [], thirdStarPlayer: [] };
        this.formatId = this.formatId.bind(this);
    }

    componentDidMount() {
        this.getThreeStars();        
    }

    formatId(id) {
        let formattedId = "ID" + id;
        return formattedId;
    }

    renderThreeStars() {
        const allSkaters = [this.props.homeSkaters];
        const awaySkaters = [this.props.awaySkaters];
        Array.prototype.push.apply(allSkaters, awaySkaters);

        return (
            <div className="threeStarsContainer">
                <div>
                    <div className="stars">
                        <i className="bi bi-star"></i>
                    </div>
                    {
                        allSkaters[0][this.formatId(this.props.firstStar.id)] === undefined ? 
                        (
                            <StarPlayer starGameData={allSkaters[1][this.formatId(this.props.firstStar.id)]}
                                        starPlayerData={this.state.firstStarPlayer}
                            />
                        ) : 
                        (
                            <StarPlayer starGameData={allSkaters[0][this.formatId(this.props.firstStar.id)]}
                                starPlayerData={this.state.firstStarPlayer}
                            />
                        )
                    }
                    <div className="stars">
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                    </div>
                    {
                        allSkaters[0][this.formatId(this.props.secondStar.id)] === undefined ? 
                        (
                            <StarPlayer starGameData={allSkaters[1][this.formatId(this.props.secondStar.id)]}
                                        starPlayerData={this.state.secondStarPlayer}
                            />
                        ) :
                        (
                            <StarPlayer starGameData={allSkaters[0][this.formatId(this.props.secondStar.id)]}
                                        starPlayerData={this.state.secondStarPlayer}
                            />
                        )
                    }
                    <div className="stars">
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                    </div>
                    {
                        allSkaters[0][this.formatId(this.props.thirdStar.id)] === undefined ? 
                        (
                            <StarPlayer starGameData={allSkaters[1][this.formatId(this.props.thirdStar.id)]}
                                        starPlayerData={this.state.thirdStarPlayer}
                            />
                        ) :
                        (
                            <StarPlayer starGameData={allSkaters[0][this.formatId(this.props.thirdStar.id)]}
                                        starPlayerData={this.state.thirdStarPlayer}
                            />
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
        ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        : this.renderThreeStars();

        return (
            <div>{contents}</div>
        )
    }

    async getThreeStars() {
        let id = encodeURIComponent(this.props.firstStar.id);
        const firstStarPlayerResponse = await fetch('player/GetPlayerById?id=' + id);
        let data = await firstStarPlayerResponse.json();
        this.setState({ firstStarPlayer: data });

        id = this.props.secondStar.id;
        const secondStarPlayerResponse = await fetch('player/GetPlayerById?id=' + id);
        data = await secondStarPlayerResponse.json();
        this.setState({ secondStarPlayer: data });

        id = this.props.thirdStar.id;
        const thirdStarPlayerResponse = await fetch('player/GetPlayerById?id=' + id);
        data = await thirdStarPlayerResponse.json();
        this.setState({ thirdStarPlayer: data, loading: false });
    }
}