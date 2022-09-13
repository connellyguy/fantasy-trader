var router = require('express').Router();
const { readPlayers } = require('./readPlayers');

router.get('/', (req, res) => {
    res.status(200).send({
        msg: 'Hello, world!',
    });
});

router.get('/players', readPlayers);

module.exports = router;
