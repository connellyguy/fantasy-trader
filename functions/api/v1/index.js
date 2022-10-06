var router = require('express').Router();
const { readPlayers } = require('./readPlayers');
// const updateTradeValues = require('../../services/updateTradeValues');

router.get('/', (req, res) => {
    res.status(200).send({
        msg: 'Hello, world!',
    });
});

router.get('/players', readPlayers);
// router.get('/updateTradeValues', updateTradeValues.httpHandler);

module.exports = router;
