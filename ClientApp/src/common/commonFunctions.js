export function formatId(id) {
    let formattedId = "ID" + id;
    return formattedId;
}

function formatSavePercentage(svpct) {
    let formattedSvPct = svpct * .01;
    return parseFloat(formattedSvPct).toFixed(3).replace(/^0+/, '');
}

function getSkaterTypeHeading(skaterType) {
    let skaterTypeHeading = '';
    if (skaterType === "Forward") {
        skaterTypeHeading = "Forwards";
    }
    else if (skaterType === "Defenseman") {
        skaterTypeHeading = "Defensemen";
    }

    return skaterTypeHeading;
}

function getTotalPoints(skaterStats) {
    return skaterStats.goals + 
           skaterStats.assists;
}

export function mapPosition(position) {
    let mappedPosition = position;
    switch (position) {
        case "L":
            mappedPosition = "LW";
            break;
        case "R":
            mappedPosition = "RW";
            break;
    }

    return mappedPosition;
}

export function getDateOfBirth(dateOfBirth, monthType) {
    var options = { year: 'numeric', month: monthType, day: 'numeric' };
    var date = new Date(dateOfBirth);
    return date.toLocaleDateString("en-US", options);
}

export const getGoalieData = (ids, goalies) => {
    const goalieData = [];
    ids.map(function (id, index) {
        if (goalies[formatId(id)].position.type === "Goalie") {
            return (
                goalieData.push({
                    id: id,
                    jerseyNumber: goalies[formatId(id)].jerseyNumber,
                    fullName: goalies[formatId(id)].person.fullName,
                    saves: goalies[formatId(id)].stats.goalieStats.saves,
                    shotsFaced: goalies[formatId(id)].stats.goalieStats.shots,
                    evSaves: goalies[formatId(id)].stats.goalieStats.evenSaves + "/" + goalies[formatId(id)].stats.goalieStats.evenShotsAgainst,
                    ppSaves: goalies[formatId(id)].stats.goalieStats.powerPlaySaves + "/" + goalies[formatId(id)].stats.goalieStats.powerPlayShotsAgainst,
                    shSaves: goalies[formatId(id)].stats.goalieStats.shortHandedSaves + "/" + goalies[formatId(id)].stats.goalieStats.shortHandedSaves,
                    savePercentage: formatSavePercentage(goalies[formatId(id)].stats.goalieStats.savePercentage),
                    timeOnIce: goalies[formatId(id)].stats.goalieStats.timeOnIce,
                })
            );
        }
    }, this)
    return goalieData;
}

export const getGoalieThreeStarsData = (goalie) => {
    const goalieData = [];
    goalieData.push({
        jerseyNumber: goalie.jerseyNumber,
        fullName: goalie.person.fullName,
        saves: goalie.stats.goalieStats.saves,
        shotsFaced: goalie.stats.goalieStats.shots,
        evSaves: goalie.stats.goalieStats.evenSaves + "/" + goalie.stats.goalieStats.evenShotsAgainst,
        ppSaves: goalie.stats.goalieStats.powerPlaySaves + "/" + goalie.stats.goalieStats.powerPlayShotsAgainst,
        shSaves: goalie.stats.goalieStats.shortHandedSaves + "/" + goalie.stats.goalieStats.shortHandedSaves,
        savePercentage: formatSavePercentage(goalie.stats.goalieStats.savePercentage),
        timeOnIce: goalie.stats.goalieStats.timeOnIce,
    });

    return goalieData;
}

export const getGoalieColumnHeaders = (isThreeStars) => {
    let headers = [];
    if (isThreeStars) {
        headers = [
            { name: "Saves", selector: row => row.saves, center: true }, 
            { name: "Shots Faced", selector: row => row.shotsFaced, center: true, },
            { name: "EV", selector: row => row.evSaves, center: true, width: "80px" },
            { name: "PP", selector: row => row.ppSaves, center: true, width: "80px" },
            { name: "SH", selector: row => row.shSaves, center: true, width: "80px" },
            { name: "SV%", selector: row => row.savePercentage, center: true, },
            { name: "TOI", selector: row => row.timeOnIce, center: true, },
        ]
    }
    else {
        headers = [
            { name: "#", selector: row => row.jerseyNumber, sortable: true, width: "30px" },
            { name: "Goalies", selector: row => row.fullName, grow: 5 },  
            { name: "Saves", selector: row => row.saves, sortable: true, right: true, }, 
            { name: "Shots Faced", selector: row => row.shotsFaced, sortable: true, right: true, },
            { name: "EV", selector: row => row.evSaves, sortable: true, right: true, width: "80px" },
            { name: "PP", selector: row => row.ppSaves, sortable: true, right: true, width: "80px" },
            { name: "SH", selector: row => row.shSaves, sortable: true, right: true, },
            { name: "SV%", selector: row => row.savePercentage, sortable: true, right: true, },
            { name: "TOI", selector: row => row.timeOnIce, sortable: true, right: true, },
        ]
    }
    return headers;
}

export const getSkaterData = (ids, skaters, skaterType) => {
    const skaterData = [];
    ids.map(function (id, index) {
        if (skaters[formatId(id)].position.type === skaterType) {
            skaterData.push({
                    id: id,
                    jerseyNumber: skaters[formatId(id)].jerseyNumber,
                    fullName: skaters[formatId(id)].person.fullName,
                    goals: skaters[formatId(id)].stats.skaterStats.goals,
                    assists: skaters[formatId(id)].stats.skaterStats.assists,
                    points: getTotalPoints(skaters[formatId(id)].stats.skaterStats),
                    plusMinus: skaters[formatId(id)].stats.skaterStats.plusMinus,
                    shots: skaters[formatId(id)].stats.skaterStats.shots,
                    blocked: skaters[formatId(id)].stats.skaterStats.blocked,
                    hits: skaters[formatId(id)].stats.skaterStats.hits,
                    giveaways: skaters[formatId(id)].stats.skaterStats.giveaways,
                    takeaways: skaters[formatId(id)].stats.skaterStats.takeaways,
                    faceoffPercentage: skaters[formatId(id)].stats.skaterStats.faceOffPct.toFixed(0) + '%',
                    timeOnIce: skaters[formatId(id)].stats.skaterStats.timeOnIce,
                    ppTimeOnIce: skaters[formatId(id)].stats.skaterStats.powerPlayTimeOnIce,
                    shTimeOnIce: skaters[formatId(id)].stats.skaterStats.shortHandedTimeOnIce,
            })
        }
    }, this)
    return skaterData;
}

export const getSkaterThreeStarsData = (skater) => {
    const skaterData = [];
    skaterData.push({
        goals: skater.stats.skaterStats.goals,
        assists: skater.stats.skaterStats.assists,
        points: getTotalPoints(skater.stats.skaterStats),
        plusMinus: skater.stats.skaterStats.plusMinus,
        shots: skater.stats.skaterStats.shots,
        blocked: skater.stats.skaterStats.blocked,
        hits: skater.stats.skaterStats.hits,
        giveaways: skater.stats.skaterStats.giveaways,
        takeaways: skater.stats.skaterStats.takeaways,
        faceoffPercentage: skater.stats.skaterStats.faceOffPct.toFixed(0) + '%',
        timeOnIce: skater.stats.skaterStats.timeOnIce,
        ppTimeOnIce: skater.stats.skaterStats.powerPlayTimeOnIce,
        shTimeOnIce: skater.stats.skaterStats.shortHandedTimeOnIce,
    });
    return skaterData;
}

export const getSkaterColumnHeaders = (skaterType) => {
    let headers = [];
    if (skaterType === null) {
        headers = [
            { name: "G", selector: row => row.goals, width: "40px", center: true, }, 
            { name: "A", selector: row => row.assists, width: "40px", center: true, },
            { name: "P", selector: row => row.points, width: "40px", center: true, },
            { name: "+/-", selector: row => row.plusMinus, width: "50px", center: true, },
            { name: "SOG", selector: row => row.shots, width: "55px", center: true, },
            { name: "BLKS", selector: row => row.blocked, width: "60px", center: true, },
            { name: "HITS", selector: row => row.hits, width: "60px", center: true, },
            { name: "GVA", selector: row => row.giveaways, width: "55px", center: true, },
            { name: "TKA", selector: row => row.takeaways, width: "55px", center: true, },
            { name: "FO%", selector: row => row.faceoffPercentage, width: "55px", center: true, },
            { name: "TOI", selector: row => row.timeOnIce, width: "55px", center: true, },
            { name: "PP TOI", selector: row => row.ppTimeOnIce, width: "70px", center: true, },
            { name: "SH TOI", selector: row => row.shTimeOnIce, width: "70px", center: true, },    
        ];
    }
    else {
        headers = [
            { name: "#", selector: row => row.jerseyNumber, sortable: true, width: "30px", },
            { name: getSkaterTypeHeading(skaterType), selector: row => row.fullName, },  
            { name: "G", selector: row => row.goals, sortable: true, width: "40px", right: true, }, 
            { name: "A", selector: row => row.assists, sortable: true, width: "40px", right: true, },
            { name: "P", selector: row => row.points, sortable: true, width: "40px", right: true, },
            { name: "+/-", selector: row => row.plusMinus, sortable: true, width: "50px", right: true, },
            { name: "SOG", selector: row => row.shots, sortable: true, width: "55px", right: true, },
            { name: "BLKS", selector: row => row.blocked, sortable: true, width: "60px", right: true, },
            { name: "HITS", selector: row => row.hits, sortable: true, width: "60px", right: true, },
            { name: "GVA", selector: row => row.giveaways, sortable: true, width: "55px", right: true, },
            { name: "TKA", selector: row => row.takeaways, sortable: true, width: "55px", right: true, },
            { name: "FO%", selector: row => row.faceoffPercentage, sortable: true, width: "55px", right: true, },
            { name: "TOI", selector: row => row.timeOnIce, sortable: true, width: "55px", right: true, },
            { name: "PP TOI", selector: row => row.ppTimeOnIce, sortable: true, width: "70px", right: true, },
            { name: "SH TOI", selector: row => row.shTimeOnIce, sortable: true, width: "70px", right: true, },
        ];
    }
    return headers;
}

export const getStatGridCustomStyles = () => {
    return {
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        }
    };
}