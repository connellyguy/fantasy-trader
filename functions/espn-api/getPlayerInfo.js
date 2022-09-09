const ESPN_API_URL = 'https://site.web.api.espn.com/apis';
const SEARCH_ENDPOINT = '/common/v3/search';
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
        uuid: player.uuid,
        displayName: player.displayName,
        shortName: player.shortName,
        jersey: player.jersey,
        team: get(player, 'teamRelationships[0].displayName'),
        teamAbbreviation: get(player, 'teamRelationships[0].core.abbreviation'),
        headshotHref: get(player, 'headshot.href'),
    };
}

module.exports = {
    getPlayerInfo,
};
