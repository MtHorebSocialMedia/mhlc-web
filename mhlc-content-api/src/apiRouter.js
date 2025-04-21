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
    getEventDetails
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
const { clearCache } = require('./services/cacheService');

const logger = getLogger('apiRouter');

const router = express.Router();

// error handler middleware that is specific to this api router
router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    logger.error(err);
    res.sendStatus(500);
});

router.get('/church-info',
    (req, res, next) => {
        (async function() {
            try {
                const info = await getChurchInfo();
                res.send(info);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.get('/menu-items',
    (req, res, next) => {
        (async function() {
            try {
                const items = await getMenuItems();
                res.send(items);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.get('/content-pages', (req, res, next) => {
    (async function() {
        try {
            const items = await getContentPages();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/content-blocks', (req, res, next) => {
    (async function() {
        try {
            const items = await getContentBlocks();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/news-types', (req, res, next) => {
    (async function() {
        try {
            const items = await getNewsTypes();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/events', (req, res, next) => {
    (async function() {
        try {
            const page = req.query.page || 1;
            const results = await getUpcomingEvents(page);
            res.send(results);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/events/:eventId', (req, res, next) => {
    (async function() {
        try {
            const eventDetails = await getEventDetails(req.params.eventId);
            res.send(eventDetails);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/news', (req, res, next) => {
    (async function() {
        try {
            const page = req.query.page || 1;
            const results = await getNewsEntries(page);
            res.send(results);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/news/:newsId', (req, res, next) => {
    (async function() {
        try {
            const newsEntry = await getNewsEntry(req.params.newsId);
            res.send(newsEntry);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/blog-posts', (req, res, next) => {
    (async function() {
        try {
            const items = await getBlogPosts();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/blog-posts/:blogId', (req, res, next) => {
    (async function() {
        try {
            const blogPost = await getBlogPost(req.params.blogId);
            res.send(blogPost);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/staff',
    (req, res, next) => {
        (async function() {
            try {
                const items = await getStaff();
                res.send(items);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.get('/council',
    (req, res, next) => {
        (async function() {
            try {
                const items = await getCouncil();
                res.send(items);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.get('/video-list',
    (req, res, next) => {
        (async function() {
            try {
                const videos = await getVideosList();
                res.send(videos);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.get('/special-announcements',
    (req, res, next) => {
        (async function() {
            try {
                const announcements = await getSpecialAnnouncements();
                res.send(announcements);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.post('/donations/paypal',
    getValidationHandler({ bodySchema: paypalRequestSchema }),
    (req, res, next) => {
        (async function() {
            try {
                const url = await getPaypalUrl(req.body);
                const { subject, body } = getDonationRequestEmailTemplate(req.body);
                const treasurerEmailAddress = process.env.SENDGRID_TO_ADDRESS_TREASURER;
                if (treasurerEmailAddress) {
                    await sendMail(treasurerEmailAddress, subject, body);
                } else {
                    logger.warn('An email address has not been configured for the treasurer.  Cannot send donation emails.');
                }
                res.send({ url });
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.post('/newsletter/signup',
    getValidationHandler({ bodySchema: newsletterSignupSchema }),
    (req, res, next) => {
        (async function() {
            try {
                const results = await addMemberToNewsletter(req.body);
                res.send(results);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.post('/audit', (req, res) => {
    // logic for this route is consolidated in the auditHandler middleware
    res.send();
});

router.get('/audit/events',
    getAuthenticationHandler({ authRequired: true }),
    (req, res, next) => {
        (async function() {
            try {
                const results = await getEvents(req.query.monthId);
                res.send(results);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.delete('/cache',
    getAuthenticationHandler({ authRequired: true }),
    (req, res, next) => {
        (async function() {
            try {
                await clearCache();
                res.send(true);
            } catch(err) {
                next(err);
            }
        })();
    }
);

router.post('/authenticate',
    getValidationHandler({ bodySchema: authenticationRequestSchema }),
    (req, res, next) => {
        (async function() {
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
        })();
    }
);

router.use(getErrorHandler());

module.exports = router;
