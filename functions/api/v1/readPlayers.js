const { readTable } = require('../../firebase-api/realtime-database');

async function readPlayers(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');

    const playerData = await readTable('players').catch((error) => {
        console.error(error);

        res.status(500).json({
            msg: 'Error',
            data: {},
        });
    });

    res.status(200).json(playerData);
}

module.exports = {
    readPlayers,
};
