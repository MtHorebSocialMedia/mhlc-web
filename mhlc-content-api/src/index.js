require('dotenv').config();
const express = require('express');
const apiRouter = require('./apiRouter');
const bodyParser = require('body-parser');
const rssFeed = require('./rssFeed');
const { getLogger } = require('./logger');
const { getAuditHandler } = require('./auditHandler');
const { initialize: initializeAnalytics } = require('./analyticsService');

const app = express();
const port = 3000;

const logger = getLogger('index');

// automatically parse request bodies into JSON if content-type is application/json
app.use(bodyParser.json());

app.use(getAuditHandler());

// To get the path to our build ui code, we'll use a little hack
// First resolve the absolute path to the index.html file in the ui module
// Then remove the index.html portion of the path to get the reference to just the directory
const indexPath = require.resolve('@mhlc/ui/dist/index.html');
const uiPath = indexPath.replace('index.html', '');
app.use(express.static(uiPath, {
    cacheControl: true,
    maxAge: 0,
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Expires', new Date(0).getTime());
    }
}));

app.use('/api', apiRouter);

app.use('/feed', rssFeed);

app.use('/donate/paypal-complete', (req, res) => {
    res.sendFile(indexPath);
});

// Default handler - if unknown path, just respond with the default html
app.use('*', (req, res) => {
    res.sendFile(indexPath);
});

(async function() {
    await initializeAnalytics();
    app.listen(port, () => {
        logger.info(`mhlc-web app listening on port ${port}`);
    });
})();
