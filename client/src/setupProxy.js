const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1/',
        createProxyMiddleware({
            target: 'https://fantasy-trade-values.web.app',
            changeOrigin: true,
        })
    );
};
