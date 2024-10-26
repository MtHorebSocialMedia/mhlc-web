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
    getSpecialAnnouncements
} = require('./contentService');
const { getPaypalUrl } = require('./donationService');
const { getVideosList } = require('./youtubeService');
const { addMemberToNewsletter } = require('./mailService');
const { getValidationHandler } = require('./validationHandler');
const { getErrorHandler } = require('./errorHandler');
const paypalRequestSchema = require('../schemas/paypalRequest.json');
const newsletterSignupSchema = require('../schemas/newsletterSignupRequest.json');
const { getLogger } = require('./logger');

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

router.get('/church-info', (req, res, next) => {
    (async function() {
        try {
            const info = await getChurchInfo();
            res.send(info);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/menu-items', (req, res, next) => {
    (async function() {
        try {
            const items = await getMenuItems();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

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

router.get('/staff', (req, res, next) => {
    (async function() {
        try {
            const items = await getStaff();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

router.get('/council', (req, res, next) => {
    (async function() {
        try {
            const items = await getCouncil();
            res.send(items);
        } catch(err) {
            next(err);
        }
    })();
});

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
    res.send();
});

router.use(getErrorHandler());

module.exports = router;
