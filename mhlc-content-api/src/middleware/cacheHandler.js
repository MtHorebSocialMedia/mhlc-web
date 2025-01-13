const { getLogger } = require('../utils/logger');
const { getCacheEntry, setCacheEntry } = require('../services/cacheService');

const logger = getLogger('mid/cache');

const getCacheHandler = (ttlMs) => {
    return (
        req,
        res,
        next
    ) => {
        const cachedResponse = getCacheEntry(req.originalUrl);
        if (cachedResponse) {
            logger.trace('Returning cached response: ', cachedResponse);
            res.send(cachedResponse);
        } else {
            const oldSend = res.send;
            res.send = function(data) {
              setCacheEntry(req.originalUrl, data, ttlMs);
              oldSend.apply(res, arguments);
            };
            next();
        }
    };
};

module.exports = { getCacheHandler };
