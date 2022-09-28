const functions = require('firebase-functions');
const express = require('express');
const app = express();
const apiV1Router = require('./api/v1');
const updateTradeValues = require('./services/updateTradeValues');

app.use('/api/v1', apiV1Router);

exports.scheduledFunctionCrontab = functions.pubsub
    .schedule('20 12,7,8 * * wed')
    .timeZone('America/New_York')
    .onRun(updateTradeValues.handler);

exports.app = functions.https.onRequest(app);
