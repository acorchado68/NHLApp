import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCard } from "../Game/GameCard";

export default function Team() {
    const { id } = useParams();
    const [teamInformation, setTeamInformation] = useState([]);
    const [teamGameSchedule, setTeamSchedule] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
    const [scheduleKey, setScheduleKey] = useState(1);
    const [teamStatsKey, setTeamStatsKey] = useState(2);
    useEffect(() => {
        async function getTeam() {
            const response = await fetch('team/GetTeamById?id=' + id);
            const data = await response.json();
            setTeamInformation(data.teamInformation);
            setTeamSchedule(data.teamGameSchedule);
            setTeamStats(data.teamStatisticsDetails);
            setScheduleKey(Math.random());
            setTeamStatsKey(Math.random());
        }

        getTeam();
    }, [id]);
    return (
        <div className="card fullDetails mainDetailsPanel">
            <TeamInformation teamInformation={teamInformation} />
            <h2 style={{"textAlign": "center", "paddingTop": "20px"}}>2022-2023</h2>
            <hr></hr>
            <div className="container">
                {
                    teamGameSchedule.dates && teamStats.statistics && 
                    <div className="row">
                        <Schedule key={scheduleKey} schedule={teamGameSchedule} />
                        <TeamStats key={teamStatsKey} stats={teamStats} />
                    </div>
                }
            </div>
        </div>
    )
}

function TeamStats(props) {
    const teamStats = props.stats.statistics[0].splits[0].teamStatisticsDetails;
    const leagueRankings = props.stats.statistics[1].splits[0].teamStatisticsDetails;
    return (
        <div className="col-4" style={{"margin": "0 auto"}}>
            <h3 style={{"textAlign": "center"}}>League Rankings</h3>
            <div className="fullDetailsCenterAlignment">
                <ul className="list-group" style={{"width": "100%"}}>
                    <TeamStat label="Record" 
                              stat={teamStats.wins + '-' + 
                                    teamStats.losses + '-' + 
                                    teamStats.ot} 
                              leagueRanking={leagueRankings.wins} 
                    />
                    <TeamStat label="GF / G"
                              stat={parseFloat(teamStats.goalsPerGame).toFixed(2)}
                              leagueRanking={leagueRankings.goalsPerGame}
                    />
                </ul>
            </div>
        </div>
    )
}

function TeamStat(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.label}: {props.stat}
            <span className="badge bg-primary rounded-pill">{props.leagueRanking}</span>
        </li>
    )
}

function Schedule(props) {
    const schedule = props.schedule;
    useEffect(() => {
        const carousel = document.getElementById('carousel');
        if (carousel !== null) {
            carousel.addEventListener('slide.bs.carousel', event => {
                if (event.direction === 'right' && event.to === 0) {
                    document.getElementsByClassName('carousel-control-prev')[0].classList.add('hidden');
                }
                else if (event.direction === 'left' && event.to === 7) {
                    document.getElementsByClassName('carousel-control-next')[0].classList.add('hidden');
                }
                else {
                    document.getElementsByClassName('carousel-control-prev')[0].classList.remove('hidden');
                    document.getElementsByClassName('carousel-control-next')[0].classList.remove('hidden');
                }
            });
        }
    }, []);
    return (
        <div className="col-4" style={{"margin": "0 auto"}}>
            <h3 style={{"textAlign": "center"}}>Schedule</h3>
            <div id="carousel" className="carousel slide" data-bs-wrap={false} data-bs-interval={false}>
                <div className="carousel-inner mx-auto">
                    {
                        schedule.dates.map(function(item, i) {
                            return (
                                <div key={i}
                                        className={'carousel-item ' + (i === 3 ? 'active' : '')}
                                >
                                    <GameCard showGameDate={true} gameId={item.games[0].gamePk}></GameCard>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='carousel-control-prev' style={{"marginLeft": "-75px"}} type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' style={{"marginRight": "-75px"}} type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className='carousel-control-next-icon' aria-hidden="true"></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>
        </div>
    )
}

function TeamInformation(props) {
    return (
        <div>
            <AboutTeam teamInformation={props.teamInformation} />
        </div>
    )
}

function AboutTeam(props) {
    const teamInformation = props.teamInformation;
    return (
        teamInformation.id &&
        <div className="container">
            <div className="row" style={{"alignItems": "center"}}>
                <div className="col-6">
                    <div style={{"float": "right"}}>
                        <img height={150} src={teamInformation.officialLightTeamLogoUrl} />
                    </div>
                </div>
                <div className="col-6">
                    <h3>{teamInformation.name}</h3>
                    <div>{teamInformation.conference.name} Conference | {teamInformation.division.name} Division</div>
                    <div>{teamInformation.venue.name}</div>
                    <div>Established: {teamInformation.firstYearOfPlay}</div>
                </div>
            </div>
        </div>
    )
}