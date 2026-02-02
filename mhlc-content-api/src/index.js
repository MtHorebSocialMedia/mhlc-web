require('dotenv').config();
const { getApp } = require('./app');
const { getLogger } = require('./utils/logger');
const { initialize: initializeGoogleApis } = require('./utils/googleApisUtil');
const { getSystemStartupEmailTemplate } = require('./utils/mailTemplates');
const { sendMail } = require('./services/mailService');

const port = 3000;

const logger = getLogger('index');

(async function() {
    await initializeGoogleApis();
    const app = getApp();
    app.listen(port, () => {
        logger.info(`mhlc-web app listening on port ${port}`);
        logger.info(`mhlc-web app is now available at http://localhost:${port}`);
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
