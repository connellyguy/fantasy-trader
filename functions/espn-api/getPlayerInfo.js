const ESPN_API_URL = 'https://site.web.api.espn.com/apis';
const ESPN_FANTASY_API_URL = 'https://fantasy.espn.com/apis';
const SEARCH_ENDPOINT = '/common/v3/search';
const PLAYER_LIST_ENDPOINT =
    '/v3/games/ffl/seasons/2022/segments/0/leaguedefaults/3?scoringPeriodId=0&view=kona_player_info';
const axios = require('axios');
const { get } = require('lodash');

async function searchPlayerName(name) {
    const encodedName = encodeURIComponent(name);
    return axios.get(
        `${ESPN_API_URL}${SEARCH_ENDPOINT}?region=us&lang=en&limit=3&page=1&query=${encodedName}}&type=player&league=nfl`
    );
}

async function getPlayerInfo(name) {
    const { data } = await searchPlayerName(name);
    if (data.count === 0) return;

    const player = data.items[0];

    return {
        id: player.id,
        displayName: player.displayName,
        shortName: player.shortName,
        jersey: player.jersey,
        team: get(player, 'teamRelationships[0].displayName'),
        teamAbbreviation: get(player, 'teamRelationships[0].core.abbreviation'),
        headshotHref: get(player, 'headshot.href'),
    };
}

async function getPlayerList() {
    const jsonFilter = {
        players: {
            filterSlotIds: { value: [0, 1, 2, 3, 4, 5, 6, 23, 24] },
            sortAppliedStatTotal: { sortAsc: false, sortPriority: 3, value: '1120222' },
            sortDraftRanks: { sortPriority: 2, sortAsc: true, value: 'PPR' },
            sortPercOwned: { sortAsc: false, sortPriority: 4 },
            limit: 200,
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

    return data;
}

module.exports = {
    getPlayerInfo,
    getPlayerList,
};
