const { getLogger } = require('../utils/logger');

const logger = getLogger('svc/cache');

// Super simple memory cache
const cacheEntries = {};

function setCacheEntry(key, value, ttlMs) {
    logger.trace('Setting cache entry: ', { key, ttlMs })
    cacheEntries[key] = {
        expiration: new Date().getTime() + ttlMs,
        value
    };
}

function getCacheEntry(key) {
    const currentTime = new Date().getTime();
    let response = null;
    if (cacheEntries[key]) {
        const cacheEntry = cacheEntries[key];
        if (cacheEntry.expiration <= currentTime) {
            logger.trace('Cache entry has expired: ', { key });
            removeCacheEntry(key);
        } else {
            logger.trace('Returning cache entry: ', { key });
            response = cacheEntry.value;
        }
    }
    return response;
}

function removeCacheEntry(key) {
    delete cacheEntries[key];
}

function clearCache() {
    Object.keys(cacheEntries).forEach(key => removeCacheValue(key));
}

module.exports = { setCacheEntry, getCacheEntry, removeCacheEntry, clearCache };
