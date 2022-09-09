const functions = require('firebase-functions');
const express = require('express');
const app = express();
const apiV1Router = require('./api/v1');

app.use('/api/v1', apiV1Router);

module.exports = {
    app: functions.https.onRequest(app),
};
