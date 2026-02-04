require('dotenv').config();
const express = require('express');
const apiRouter = require('./apiRouter');
const bodyParser = require('body-parser');
const rssFeed = require('./rssFeed');
const { getLogger } = require('./utils/logger');
const { getAuditHandler } = require('./middleware/auditHandler');
const { initialize: initializeGoogleApis } = require('./utils/googleApisUtil');
const { getPaypalDonationConfirmationEmailTemplate, getSystemStartupEmailTemplate } = require('./utils/mailTemplates');
const { sendMail } = require('./services/mailService');

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION', err);
    try {
        const adminEmailAddress = process.env.MAIL_TO_ADDRESS_ADMIN;
        if (adminEmailAddress) {
            sendMail(
                adminEmailAddress,
                'mhlc-web UNCAUGHT EXCEPTION',
                `An uncaught exception was encountered:\n\n${err.stack || err}`
            );
        } else {
            console.warn('An email address has not been configured for the admin.  Cannot send crash notification emails.');
        }
    } catch (mailErr) {
        console.error('Error sending uncaught exception email', mailErr);
    }
    // delay exit just long enough for mail to send out
    setTimeout(() => process.exit(1), 100);
});

process.on('unhandledRejection', err => {
    console.error('UNHANDLED PROMISE REJECTION', err);
    try {
        const adminEmailAddress = process.env.MAIL_TO_ADDRESS_ADMIN;
        if (adminEmailAddress) {
            sendMail(
                adminEmailAddress,
                'mhlc-web UNHANDLED PROMISE REJECTION',
                `An unhandled promise rejection was encountered:\n\n${err.stack || err}`
            );
        } else {
            console.warn('An email address has not been configured for the admin.  Cannot send crash notification emails.');
        }
    } catch (mailErr) {
        console.error('Error sending unhandled promise rejection email', mailErr);
    }
    // delay exit just long enough for mail to send out
    setTimeout(() => process.exit(1), 100);
});

const app = express();
const port = 3000;

const logger = getLogger('index');

// automatically parse request bodies into JSON if content-type is application/json
app.use(bodyParser.json());

// automatically parse url-encoded (form data)
app.use(express.urlencoded({ extended: true }));

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

app.use('/donate/paypal-complete', async (req, res, next) => {
    try {
        const { subject, body } = getPaypalDonationConfirmationEmailTemplate({
            ...req.body,
            ...req.query
        });
        const treasurerEmailAddress = process.env.MAIL_TO_ADDRESS_TREASURER;
        if (treasurerEmailAddress) {
            await sendMail(treasurerEmailAddress, subject, body);
        } else {
            logger.warn('An email address has not been configured for the treasurer.  Cannot send donation emails.');
        }
        res.sendFile(indexPath);
    } catch(err) {
        next(err);
    }
});

// Default handler - if unknown path, just respond with the default html
app.use('/*splat', (req, res) => {
    res.sendFile(indexPath);
});

app.use((err, req, res, next) => {
    logger.error('Unhandled error: ', err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send('Internal Server Error');
});

(async function() {
    await initializeGoogleApis();
    app.listen(port, () => {
        logger.info(`mhlc-web traffic tracking is ${process.env.DISABLE_TRAFFIC_TRACKING === 'true' ? 'disabled' : 'enabled'}`);
        logger.info(`mhlc-web app listening on port ${port}`);
        logger.info(`mhlc-web app is available at http://localhost:${port}`);

        const { NODE_ENV } = process.env;
        if (NODE_ENV && NODE_ENV.toLowerCase().startsWith('prod')) {
            const { subject, body } = getSystemStartupEmailTemplate();
            const adminEmailAddress = process.env.MAIL_TO_ADDRESS_ADMIN;
            if (adminEmailAddress) {
                logger.info('Sending startup notification email.');
                sendMail(adminEmailAddress, subject, body);
            } else {
                logger.warn('An email address has not been configured for the admin.  Cannot send startup notification emails.');
            }
        }
    });
})();
