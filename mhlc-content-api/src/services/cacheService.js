// Super simple memory cache
const cacheEntries = {};

function setCacheEntry(key, value, ttlMs) {
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
            removeCacheValue(key);
        } else {
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
