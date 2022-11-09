const ESPN_API_URL = 'https://site.web.api.espn.com/apis';
const ESPN_FANTASY_API_URL = 'https://fantasy.espn.com/apis';
// const SEARCH_ENDPOINT = '/common/v3/search';
const PLAYER_LIST_ENDPOINT =
    '/v3/games/ffl/seasons/2022/segments/0/leaguedefaults/3?view=kona_player_info';
    const PLAYER_BY_ID_ENDPOINT = '/common/v3/sports/football/nfl/athletes'
const axios = require('axios');
const { get } = require('lodash');

// async function searchPlayerName(name) {
//     const encodedName = encodeURIComponent(name);
//     return axios.get(
//         `${ESPN_API_URL}${SEARCH_ENDPOINT}?region=us&lang=en&limit=3&page=1&query=${encodedName}}&type=player&league=nfl`
//     );
// }

async function getPlayerById(id) {
    const encodedId = encodeURIComponent(id);
    return axios.get(
        `${ESPN_API_URL}${PLAYER_BY_ID_ENDPOINT}/${encodedId}`
    );
}

async function getPlayerInfo(id) {
    const { data } = await getPlayerById(id);

    const player = data.athlete;

    return {
        id: player.id,
        displayName: get(player, 'displayName', '--'),
        jersey: get(player, 'jersey', '--'),
        team: get(player, 'team.displayName', 'Unknown'),
        teamAbbreviation: get(player, 'team.abbreviation', 'UNK'),
        headshotHref: get(player, 'headshot.href', ''),
    };
}

async function getPlayerList(limit = 400) {
    const jsonFilter = {
        players: {
            filterSlotIds: { value: [0, 1, 2, 3, 4, 5, 6, 23, 24] },
            sortAppliedStatTotal: { sortAsc: false, sortPriority: 3, value: '1120222' },
            sortDraftRanks: { sortPriority: 2, sortAsc: true, value: 'PPR' },
            sortPercOwned: { sortAsc: false, sortPriority: 1 },
            limit,
            offset: 0,
        },
    };

    const axiosConfig = {
        method: 'GET',
        url: `${ESPN_FANTASY_API_URL}${PLAYER_LIST_ENDPOINT}`,
        headers: {
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'x-fantasy-filter': JSON.stringify(jsonFilter),
        },
    };

    const { data } = await axios(axiosConfig);
    const { players } = data;

    return players.map(player => {
        return {
            id: player.id,
            fullName: player.player.fullName,
        }
    });
}

module.exports = {
    getPlayerInfo,
    getPlayerList,
};
