export default function getTeamAbbreviation(teamName) {
    let abbr = ''
    switch (teamName) {
        case "Atlanta Flames":
            abbr = 'AFM';
            break;
        case "Mighty Ducks of Anaheim":
        case "Anaheim Ducks":
            abbr = 'ANA';
            break;
        case "Arizona Coyotes":
            abbr = "ARI";
            break;
        case "Atlanta Thrashers":
            abbr = "ATL";
            break;
        case "Boston Bruins":
            abbr = "BOS";
            break;
        case "Brooklyn Americans":
            abbr = "BRK";
            break;
        case "Buffalo Sabres":
            abbr = "BUF";
            break;
        case "Carolina Hurricanes":
            abbr = "CAR";
            break;
        case "Columbus Blue Jackets":
            abbr = "CBJ";
            break;
        case "Bay Area Seals":
        case "California Golden Seals":
            abbr = "CGS";
            break;
        case "Calgary Flames":
            abbr = "CGY";
            break;
        case "Chicago Blackhawks":
        case "Chicago Black Hawks":
            abbr = "CHI";
            break;
        case "Cleveland Barons":
            abbr = "CLE";
            break;
        case "Colorado Rockies":
            abbr = "CLR";
            break;
        case "Colorado Avalanche":
            abbr = "COL";
            break;
        case "Dallas Stars":
            abbr = "DAL";
            break;
        case "Detroit Cougars":
            abbr = "DCG";
            break;
        case "Detroit Red Wings":
            abbr = "DET";
            break;
        case "Detroit Falcons":
            abbr = "DFL";
            break;
        case "Edmonton Oilers":
            abbr = "EDM";
            break;
        case "Florida Panthers":
            abbr = "FLA";
            break;
        case "Hamilton Tigers":
            abbr = "HAM";
            break;
        case "Hartford Whalers":
            abbr = "HFD";
            break;
        case "Kansas City Scouts":
            abbr = "KCS";
            break;
        case "Los Angeles Kings":
            abbr = "LAK";
            break;
        case "Minnesota Wild":
            abbr = "MIN";
            break;
        case "Montreal Maroons":
            abbr = "MMR";
            break;
        case "Minnesota North Stars":
            abbr = "MNS";
            break;
        case "Montréal Canadiens":
            abbr = "MTL";
            break;
        case "Montreal Wanderers":
            abbr = "MWN";
            break;
        case "New Jersey Devils":
            abbr = "NJD";
            break;
        case "New York Americans":
            abbr = "NYA";
            break;
        case "New York Rangers":
            abbr = "NYR";
            break;
        case "New York Islanders":
            abbr = "NYI";
            break;
        case "Nashville Predators":
            abbr = "NSH";
            break;
        case "Ottawa Senators":
            abbr = "OTT"
            break;
        case "Philadelphia Flyers":
            abbr = "PHI";
            break;
        case "Philadelphia Quakers":
            abbr = "QUA";
            break;
        case "Phoenix Coyotes":
            abbr = "PHX";
            break;
        case "Pittsburgh Pirates":
        case "Pittsburgh Penguins":
            abbr = "PIT";
            break;
        case "Quebec Bulldogs":
            abbr = "QBD";
            break;
        case "Quebec Nordiques":
            abbr = "QUE";
            break;
        case "Seattle Kraken":
            abbr = "SEA";
            break;
        case "St. Louis Eagles":
            abbr = "SLE";
            break;
        case "St. Louis Blues":
            abbr = "STL";
            break;
        case "San Jose Sharks":
            abbr = "SJS";
            break;
        case "Toronto Arenas":
            abbr = "TAN";
            break;
        case "Toronto Maple Leafs":
            abbr = "TOR";
            break;
        case "Toronto St. Patricks":
            abbr = "TSP";
            break;
        case "Tampa Bay Lightning":
            abbr = "TBL";
            break;
        case "Vancouver Canucks":
            abbr = "VAN";
            break;
        case "Vegas Golden Knights":
            abbr = "VGK";
            break;
        case "Winnipeg Jets":
            abbr = "WPG";
            break;
        case "Washington Capitals":
            abbr = "WSH";
            break;
        default:
            abbr = teamName;
            break; 
    }

    return abbr;
}