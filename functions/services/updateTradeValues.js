const { google } = require('googleapis');
const { authorize } = require('../google-api/authorize');
const { getPlayerInfo } = require('../espn-api/getPlayerInfo');
const { updateTable } = require('../firebase-api/realtime-database');

async function getTradeValues(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1k8_RX8VEwlV4L9SIERrcrS5iGUkMsM-3ekYf7vqVrBM',
        range: '1 QB 1.0 PPR 4 PT!B5:M154',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }

    const players = {};
    const tiers = {};
    const positions = {};

    const positionByColumn = {
        2: 'RB',
        4: 'WR',
        6: 'QB',
        8: 'TE',
    };

    const rowPromises = rows.map(async (row) => {
        if (!row[0]) return;

        for (const column of [2, 4, 6, 8]) {
            const name = row[column];
            if (name) {
                const playerInfo = await getPlayerInfo(name);

                if (playerInfo) {
                    const tier = row[0];
                    const position = positionByColumn[column];

                    tiers[tier] = tiers[tier] || [];
                    tiers[tier].push(playerInfo.uuid);

                    positions[position] = positions[position] || [];
                    positions[position].push(playerInfo.uuid);

                    players[playerInfo.uuid] = {
                        name,
                        position: positionByColumn[column],
                        tier: row[0],
                        value: row[1],
                        trend: row[column + 1],
                        ...playerInfo,
                    };
                } else {
                    console.log('PLAYER NOT FOUND: ', name);
                }
            }
        }
    });

    await Promise.all(rowPromises);
    console.log(`Processed ${Object.keys(players).length} players`);
    return { players, tiers, positions };
}

async function updateTradeValues() {
    const tradeValues = await authorize().then(getTradeValues);
    await updateTable('players', tradeValues.players);
    await updateTable('tiers', tradeValues.tiers);
    await updateTable('positions', tradeValues.positions);
}

function handler(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    updateTradeValues().catch((error) => {
        console.error(error);

        res.status(404).json({
            msg: 'Update failed',
        });
    });

    res.status(200).json({
        msg: 'Successful update',
    });
}

module.exports = {
    updateTradeValues,
    handler,
};
