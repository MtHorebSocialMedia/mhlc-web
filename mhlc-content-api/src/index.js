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
const { getContentPages, getContentSection } = require('./services/contentServiceV2');

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

app.use('/content/*splat', async (req, res) => {
    const path = req.path.replace('/content', '');
    logger.info(`Serving content page for path: ${path}`);
    const pages = await getContentPages();

    const matchingPage = pages.find(page => page.paths.includes(path));

    if (matchingPage) {
        logger.info(`Serving content page for path: ${path}`, matchingPage);
        const contentSections = [];
        for (const section of matchingPage.sections) {
            logger.info(`Loading content for section: ${section.name} (${section.id})`);
            const sectionContent = await getContentSection(section.id);
            contentSections.push(sectionContent.sectionContent);
        }
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${matchingPage.title}</title>
                    <link rel="stylesheet" href="/mhlc-v2.css">
                </head>
                <body>
                    <nav class="nav" id="main-nav">
                        <a href="/" class="nav__brand">
                            <img src="/images/mthoreb-logo.jpg" alt="Mt. Horeb Lutheran Church" class="nav__logo">
                            <div class="nav__brand-text"> <span class="nav__brand-name">Mt. Horeb Lutheran</span> <span class="nav__brand-sub">Chapin, SC · Since 1891</span> </div>
                        </a>
                        <button class="nav__toggle" id="nav-toggle" aria-label="Toggle menu"> <span></span><span></span><span></span> </button>
                        <ul class="nav__links" id="nav-links">
                            <li><a href="/" class="active">Home</a></li>
                            <li><a href="/im-new" class="nav__cta-new">I'm New</a></li>
                            <li><a href="/about" class="">About</a></li>
                            <li><a href="/ministries" class="">Ministries</a></li>
                            <li><a href="/preschool" class="">Preschool</a></li>
                            <li><a href="/watch-and-listen" class="">Watch &amp; Listen</a></li>
                            <li><a href="/connect" class="">Connect</a></li>
                            <li><a href="/give" class="nav__cta-give">Give</a></li>
                        </ul>
                    </nav>
                    ${contentSections.join('\n')}
<footer class="footer">
    <div class="footer__grid">
        <div>
            <img src="/images/mthoreb-logo.jpg" alt="Mt. Horeb Lutheran Church" class="footer__logo">
            <p class="footer__mission">"Experiencing &amp; Sharing God's Presence"</p>
            <p class="footer__address">
                101 East Boundary Street<br>
                Chapin, SC 29036<br><br>
                Sunday Worship · 10:00 AM<br>
                Faith Formation · 9:00 AM
            </p>
            <div class="footer__social">
                <a href="https://www.facebook.com/mthoreblutheran" aria-label="Facebook">
                    <svg viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </a>
                <a href="https://www.youtube.com/@MHLCChapinSC" aria-label="YouTube">
                    <svg viewBox="0 0 24 24">
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"></path>
                    </svg>
                </a>
            </div>
        </div>
        <div>
            <p class="footer__col-title">Visit</p>
            <ul class="footer__links">
                <li><a href="/im-new">I'm New Here</a></li>
                <li><a href="/plan-your-visit">Plan Your Visit</a></li>
                <li><a href="/connect">Contact Us</a></li>
                <li><a href="/watch-and-listen">Watch Online</a></li>
            </ul>
        </div>
        <div>
            <p class="footer__col-title">Explore</p>
            <ul class="footer__links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/ministries">Ministries</a></li>
                <li><a href="/preschool">Preschool</a></li>
                <li><a href="/connect#prayer">Prayer Requests</a></li>
            </ul>
        </div>
        <div>
            <p class="footer__col-title">Connect</p>
            <ul class="footer__links">
                <li><a href="/give">Give Online</a></li>
                <li><a href="/connect#enews">eNews Signup</a></li>
                <li><a href="mailto:frontdesk@mthoreb.net">Email Us</a></li>
                <li><a href="https://www.elca.org" target="_blank" rel="noopener">ELCA</a></li>
            </ul>
        </div>
    </div>
    <div class="footer__bottom"> <span>© 2026 Mt. Horeb Lutheran Church · Chapin, SC · Member of the ELCA</span> <span>101 East Boundary Street, Chapin, SC 29036</span> </div>
</footer>
                </body>
            </html>
        `);
    } else {
        logger.warn(`No content page found for path: ${path}`);
        res.status(404).json({ error: 'Content page not found' });
    }
});

// Default handler - if unknown path, just respond with the default html
app.use('/*splat', async (req, res) => {
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
