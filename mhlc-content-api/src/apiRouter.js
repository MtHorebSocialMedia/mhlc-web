const express = require('express');
const {
    getMenuItems,
    getContentPages,
    getContentBlocks,
    getNewsTypes,
    getNewsEntries,
    getChurchInfo,
    getCouncil,
    getStaff
} = require('./contentService');
const { getPaypalUrl } = require('./donationService');
const { getValidationHandler } = require('./validationHandler');
const { getErrorHandler } = require('./errorHandler');
const paypalRequestSchema = require('../schemas/paypalRequest.json');

const router = express.Router();

// error handler middleware that is specific to this api router
router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.error(err);
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
            const items = await getNewsEntries();
            res.send(items);
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

router.use(getErrorHandler());

module.exports = router;
