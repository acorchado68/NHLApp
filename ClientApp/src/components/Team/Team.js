import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTableBase from "../common/DataTableBase";
import { GameCard } from "../Game/GameCard";
import { mapPosition, getDateOfBirth } from "../../common/commonFunctions";

export default function Team() {
    const { id } = useParams();
    const [teamInformation, setTeamInformation] = useState([]);
    const [teamGameSchedule, setTeamSchedule] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
    const [teamRoster, setTeamRoster] = useState([]);
    const [season, setSeason] = useState('');
    const [scheduleKey, setScheduleKey] = useState(1);
    const [teamStatsKey, setTeamStatsKey] = useState(2);
    useEffect(() => {
        async function getTeam() {
            const response = await fetch('team/GetTeamById?id=' + id);
            const data = await response.json();
            setTeamInformation(data.teamInformation);
            setTeamSchedule(data.teamGameSchedule);
            setTeamStats(data.teamStatisticsDetails);
            setTeamRoster(data.teamRoster);
            setSeason(data.season);
            setScheduleKey(Math.random());
            setTeamStatsKey(Math.random());
        }

        getTeam();
    }, [id]);
    return (
        <div className="card fullDetails mainDetailsPanel">
            <TeamInformation teamInformation={teamInformation} />
            <h2 style={{"textAlign": "center", "paddingTop": "20px"}}>{season.replace(/(\d{4})/, "$1-")}</h2>
            <hr></hr>
                {
                    teamGameSchedule.dates && teamStats.statistics && 
                    <div className="container">
                        <div className="row">
                            <Schedule key={scheduleKey} schedule={teamGameSchedule} />
                            <TeamStats key={teamStatsKey} stats={teamStats} />
                        </div>
                        {
                            teamRoster &&
                            <div className="row">
                                <TeamRoster roster={teamRoster} />
                            </div>       
                        }
                    </div>
                }
        </div>
    )
}

function TeamRoster(props) {
    const roster = props.roster;
    const forwardHeaders = getColumnHeaders("Forwards");
    const defenseHeaders = getColumnHeaders("Defensemen");
    const goalieHeaders = getColumnHeaders("Goalies");
    const forwardPlayerData = getPlayerData(roster.filter(p => p.primaryPosition.type === "Forward").sort((a, b) => a.lastName.localeCompare(b.lastName)));
    const defensePlayerData = getPlayerData(roster.filter(p => p.primaryPosition.type === "Defenseman").sort((a, b) => a.lastName.localeCompare(b.lastName)));
    const goaliePlayerData = getPlayerData(roster.filter(p => p.primaryPosition.type === "Goalie").sort((a, b) => a.lastName.localeCompare(b.lastName)));
    return (
        <div className="col mx-auto pt-4">
            <h3 style={{"textAlign": "center"}}>Roster</h3>
            <DataTableBase title="Forwards" responsive={true} highlightOnHover={true} columns={forwardHeaders} data={forwardPlayerData} />
            <br></br>
            <DataTableBase title="Defensemen" responsive={true} highlightOnHover={true} columns={defenseHeaders} data={defensePlayerData} />
            <br></br>
            <DataTableBase title="Goalies" responsive={true} highlightOnHover={true} columns={goalieHeaders} data={goaliePlayerData} />
        </div>
    )
}

function getBirthplace(birthCity, birthStateProvince, birthCountry) {
    let birthPlace = '';
    if (birthStateProvince == null || birthStateProvince === '') {
        birthPlace = birthCity + ', ' + birthCountry;
    }
    else {
        birthPlace = birthCity + ', ' + birthStateProvince + ', ' + birthCountry;
    }
    
    return birthPlace;
}

function getColumnHeaders(skaterType) {
    return [
        { name: '', 
          cell: row => <div>
                            <img height={50}
                                 src={row.headshot}
                                 className="playerSearchHeadshot"
                            />
                       </div>,
          width: "60px", 
        },
        { name: '', selector: row => row.fullName, grow: 1.5, },
        { name: "#", selector: row => row.jerseyNumber, },
        { name: "Position", selector: row => mapPosition(row.position) },
        { name: "Shoots", selector: row => row.shoots, omit: skaterType === "Goalies" },
        { name: "Height", selector: row => row.height },
        { name: "Weight", selector: row => row.weight },
        { name: "Birthdate", selector: row => row.birthdate, format: row => getDateOfBirth(row.birthdate, 'numeric')},
        { name: "Birthplace", selector: row => row.birthplace, grow: 2 },
    ]
}

function getPlayerData(roster) {
    const players = [];
    roster.map(function(player, index) {
        players.push({
            headshot: player.playerHeadshotImageLink, fullName: player.fullName, lastName: player.lastName, jerseyNumber: player.primaryNumber,
            position: player.primaryPosition.code, shoots: player.shootsCatches, height: player.height, weight: player.weight,
            birthdate: player.birthDate, birthplace: getBirthplace(player.birthCity, player.birthStateProvince, player.birthCountry),
            playerId: player.id,
        })
    });

    return players;
}

function TeamStats(props) {
    const teamStats = props.stats.statistics[0].splits[0].teamStatisticsDetails;
    const leagueRankings = props.stats.statistics[1].splits[0].teamStatisticsDetails;
    return (
        <div className="col-6 mx-auto">
            <h3 style={{"textAlign": "center"}}>League Rankings</h3>
            <div className="fullDetailsCenterAlignment">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ul className="list-group w-100">
                                <TeamStat label="Record" 
                                          stat={teamStats.wins + '-' + 
                                                teamStats.losses + '-' + 
                                                teamStats.ot} 
                                          leagueRanking={leagueRankings.points} 
                                />
                                <TeamStat label="Goals/Game"
                                          stat={parseFloat(teamStats.goalsPerGame).toFixed(2)}
                                          leagueRanking={leagueRankings.goalsPerGame}
                                />
                                <TeamStat label="Goals Against/Game"
                                          stat={parseFloat(teamStats.goalsAgainstPerGame).toFixed(2)}
                                          leagueRanking={leagueRankings.goalsAgainstPerGame}
                                />
                                <TeamStat label="PP%"
                                          stat={parseFloat(teamStats.powerPlayPercentage).toFixed(2) + '%'}
                                          leagueRanking={leagueRankings.powerPlayPercentage}
                                />
                                <TeamStat label="PK%"
                                          stat={parseFloat(teamStats.penaltyKillPercentage).toFixed(2) + '%'}
                                          leagueRanking={leagueRankings.penaltyKillPercentage}
                                />
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="list-group w-100">
                                <TeamStat label="Shots/Game" 
                                          stat={parseFloat(teamStats.shotsPerGame).toFixed(2)} 
                                          leagueRanking={leagueRankings.shotsPerGame} 
                                />
                                <TeamStat label="Shots Allowed/Game"
                                          stat={parseFloat(teamStats.shotsAllowed).toFixed(2)}
                                          leagueRanking={leagueRankings.goalsPerGame}
                                />
                                <TeamStat label="SV%"
                                          stat={parseFloat(teamStats.savePctg).toFixed(3).replace(/^0+/, '')}
                                          leagueRanking={leagueRankings.savePctRank}
                                />
                                <TeamStat label="1st Period Lead W%"
                                          stat={parseFloat(teamStats.winLeadFirstPer).toFixed(2) * 100 + '%'}
                                          leagueRanking={leagueRankings.winLeadFirstPer}
                                />
                                <TeamStat label="2nd Period Lead W%"
                                          stat={parseFloat(teamStats.winLeadSecondPer).toFixed(2) * 100 + '%'}
                                          leagueRanking={leagueRankings.winLeadSecondPer}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TeamStat(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.label}</div>
                {props.stat}
            </div>
            <span className={"badge rounded-pill " + getBadgeClassName(props.leagueRanking)}>{props.leagueRanking}</span>
        </li>
    )
}

function getBadgeClassName(ranking) {
    let className = 'bg-secondary'; 
    var rankInt = ranking.slice(0, -2);
    if (parseInt(rankInt) <= 10) {
        className = 'bg-success';
    }
    else if (parseInt(rankInt) > 22) {
        className = 'bg-danger'
    }

    return className;
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
        <div className="col-4 mx-auto">
            <h3 style={{"textAlign": "center"}}>Schedule</h3>
            <div id="carousel" className="carousel slide" data-bs-wrap={false} data-bs-interval={false}>
                <div className="carousel-inner mx-auto">
                    {
                        schedule.dates.map(function(item, i) {
                            return (
                                <div key={i}
                                     className={'carousel-item ' + (i === 3 ? 'active' : '')}
                                >
                                    <GameCard showFullStats={false} showGameDate={true} gameId={item.games[0].gamePk}></GameCard>
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
            <div className="row align-items-center">
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