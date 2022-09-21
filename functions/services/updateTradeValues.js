const { google } = require('googleapis');
const { authorize } = require('../google-api/authorize');
const { getPlayerInfo, getPlayerList } = require('../espn-api/getPlayerInfo');
const { updateTable, readTable } = require('../firebase-api/realtime-database');

async function getTradeValues(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const scoringKeys = {
        ppr: '1.0 PPR',
        'half-ppr': '0.5 PPR',
        std: 'STD',
    };

    const valueRows = {};

    const { spreadsheetId = '' } = await readTable('tradeValuesSheet');

    const valueRequests = Object.keys(scoringKeys).map(async (key) => {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `1 QB ${scoringKeys[key]} 4 PT!B5:M154`,
        });

        valueRows[key] = res.data.values;
        if (!valueRows[key] || valueRows[key].length === 0) {
            console.error(`No data found for scoring key: ${key}`);
        }
    });

    await Promise.all(valueRequests);

    const players = {};

    const positionByColumn = {
        2: 'RB',
        4: 'WR',
        6: 'TE',
        8: 'QB',
    };

    const keyPromises = Object.keys(valueRows).map(async (scoringKey) => {
        const rows = valueRows[scoringKey];
        const rowPromises = rows.map(async (row) => {
            if (!row[0]) return;

            for (const column of [2, 4, 6, 8]) {
                const name = row[column];
                if (name) {
                    const playerInfo = await getPlayerInfo(name);

                    if (playerInfo) {
                        const existingPlayer = players[playerInfo.id];
                        if (existingPlayer) {
                            existingPlayer.values[scoringKey] = row[1];
                        } else {
                            players[playerInfo.id] = {
                                name,
                                position: positionByColumn[column],
                                tier: row[0],
                                values: {
                                    [scoringKey]: row[1],
                                },
                                trend: row[column + 1],
                                ...playerInfo,
                            };
                        }
                    } else {
                        console.log('PLAYER NOT FOUND: ', name);
                    }
                }
            }
        });

        await Promise.all(rowPromises);
    });

    await Promise.all(keyPromises);

    // const { players: espnPlayers } = await getPlayerList();
    // const player = espnPlayers[0];
    // console.log('player: ', player);
    // espnPlayers.forEach((bigPlayer) => {
    //     const { player } = bigPlayer;
    //     console.log('player: ', player);
    //     return player;
    // });

    console.log(`Processed ${Object.keys(players).length} players`);
    return { players };
}

async function updateTradeValues() {
    const tradeValues = await authorize().then(getTradeValues);
    await updateTable('players', tradeValues.players);
}

function handler() {
    return updateTradeValues().catch((error) => {
        console.error(error);
    });
}

async function httpHandler(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');

    updateTradeValues()
        .then(() => {
            res.status(200).json({ msg: 'Update successful' });
        })
        .catch((error) => {
            console.error(error);

            res.status(500).json({
                msg: 'Error',
            });
        });
}

module.exports = {
    updateTradeValues,
    handler,
    httpHandler,
};
