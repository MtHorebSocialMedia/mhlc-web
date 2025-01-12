const { getLogger } = require('../utils/logger');
const { getCacheEntry, setCacheEntry } = require('../services/cacheService');

const logger = getLogger('middleware/cache');

const getCacheHandler = (ttlMs) => {
    return (
        req,
        res,
        next
    ) => {
        const cachedResponse = getCacheEntry(req.originalUrl);
        if (cachedResponse) {
            res.send(cachedResponse);
        } else {
            res.on('finish', () => {
                setCacheEntry(req.originalUrl, res.body, ttlMs);
            });
            next();
        }
    };
};

module.exports = { getCacheHandler };
