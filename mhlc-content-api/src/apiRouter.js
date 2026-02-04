const express = require('express');
const {
    getMenuItems,
    getContentPages,
    getContentBlocks,
    getNewsTypes,
    getNewsEntries,
    getNewsEntry,
    getBlogPosts,
    getBlogPost,
    getChurchInfo,
    getCouncil,
    getStaff,
    getSpecialAnnouncements,
    getUpcomingEvents,
    getEventDetails,
    clearCachedContent
} = require('./services/contentService');
const { getPaypalUrl } = require('./services/donationService');
const { getVideosList } = require('./services/youtubeService');
const { addMemberToNewsletter, sendMail } = require('./services/mailService');
const { getEvents } = require('./services/analyticsService');
const { getValidationHandler } = require('./middleware/validationHandler');
const { getAuthenticationHandler } = require('./middleware/authenticationHandler');
const { getErrorHandler } = require('./middleware/errorHandler');
const paypalRequestSchema = require('../schemas/paypalRequest.json');
const newsletterSignupSchema = require('../schemas/newsletterSignupRequest.json');
const authenticationRequestSchema = require('../schemas/authenticationRequest.json');
const { getLogger } = require('./utils/logger');
const { authenticate } = require('./services/securityService');
const { jwtSign } = require('./utils/jwtUtils');
const { getDonationRequestEmailTemplate } = require('./utils/mailTemplates');

const logger = getLogger('apiRouter');

const router = express.Router();

router.get('/church-info', async (req, res, next) => {
    try {
        const info = await getChurchInfo();
        res.send(info);
    } catch(err) {
        next(err);
    }
});

router.get('/menu-items', async (req, res, next) => {
    try {
        const items = await getMenuItems();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/content-pages', async (req, res, next) => {
    try {
        const items = await getContentPages();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/content-blocks', async (req, res, next) => {
    try {
        const items = await getContentBlocks();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/news-types', async (req, res, next) => {
    try {
        const items = await getNewsTypes();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/events', async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const results = await getUpcomingEvents(page);
        res.send(results);
    } catch(err) {
        next(err);
    }
});

router.get('/events/:eventId', async (req, res, next) => {
    try {
        const eventDetails = await getEventDetails(req.params.eventId);
        res.send(eventDetails);
    } catch(err) {
        next(err);
    }
});

router.get('/news', async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const results = await getNewsEntries(page);
        res.send(results);
    } catch(err) {
        next(err);
    }
});

router.get('/news/:newsId', async (req, res, next) => {
    try {
        const newsEntry = await getNewsEntry(req.params.newsId);
        res.send(newsEntry);
    } catch(err) {
        next(err);
    }
});

router.get('/blog-posts', async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const items = await getBlogPosts(page);
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/blog-posts/:blogId', async (req, res, next) => {
    try {
        const blogPost = await getBlogPost(req.params.blogId);
        res.send(blogPost);
    } catch(err) {
        next(err);
    }
});

router.get('/staff', async (req, res, next) => {
    try {
        const items = await getStaff();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/council', async (req, res, next) => {
    try {
        const items = await getCouncil();
        res.send(items);
    } catch(err) {
        next(err);
    }
});

router.get('/video-list', async (req, res, next) => {
    try {
        const videos = await getVideosList();
        res.send(videos);
    } catch(err) {
        next(err);
    }
});

router.get('/special-announcements', async (req, res, next) => {
    try {
        const announcements = await getSpecialAnnouncements();
        res.send(announcements);
    } catch(err) {
        next(err);
    }
});

router.post('/donations/paypal',
    getValidationHandler({ bodySchema: paypalRequestSchema }),
    async (req, res, next) => {
        try {
            const url = await getPaypalUrl(req.body);
            const { subject, body } = getDonationRequestEmailTemplate(req.body);
            const treasurerEmailAddress = process.env.MAIL_TO_ADDRESS_TREASURER;
            if (treasurerEmailAddress) {
                await sendMail(treasurerEmailAddress, subject, body);
            } else {
                logger.warn('An email address has not been configured for the treasurer.  Cannot send donation emails.');
            }
            res.send({ url });
        } catch(err) {
            next(err);
        }
    }
);

router.post('/newsletter/signup',
    getValidationHandler({ bodySchema: newsletterSignupSchema }),
    async (req, res, next) => {
        try {
            const results = await addMemberToNewsletter(req.body);
            res.send(results);
        } catch(err) {
            next(err);
        }
    }
);

router.post('/audit', (req, res) => {
    // logic for this route is consolidated in the auditHandler middleware
    res.send();
});

router.get('/audit/events',
    getAuthenticationHandler({ authRequired: true }),
    async (req, res, next) => {
        try {
            const results = await getEvents(req.query.monthId);
            res.send(results);
        } catch(err) {
            next(err);
        }
    }
);

router.post('/authenticate',
    getValidationHandler({ bodySchema: authenticationRequestSchema }),
    async (req, res, next) => {
        try {
            const authenticated = await authenticate(req.body);
            if (authenticated) {
                req.user = {
                    userName: req.body.userName,
                    admin: true
                };
                res.set('x-authorization', await jwtSign(req.user));
            }
            res.send({ authenticated });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/content/cache',
    getAuthenticationHandler({ authRequired: true }),
    async (req, res, next) => {
        try {
            await clearCachedContent();
            res.send(true);
        } catch(err) {
            next(err);
        }
    }
);

router.post('/content/webhook', async (req, res, next) => {
    try {
        const id = req.body.sys.id;
        const contentType = req.body.sys.contentType.sys.id;
        const contentId = { id, contentType };
        logger.info('Received contentful webhook event: ', contentId);
        await clearCachedContent(contentId);
        res.send(true);
    } catch(err) {
        next(err);
    }
});

router.get('/configuration', async (req, res, next) => {
    try {
        const config = {
            enableTrafficTracking: !(process.env.DISABLE_TRAFFIC_TRACKING === 'true')
        };
        res.send(config);
    } catch(err) {
        next(err);
    }
});

router.use(getErrorHandler());

module.exports = router;
