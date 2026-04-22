const { readJsonFile, writeJsonFile, deleteJsonFile, deleteAllFiles } = require('../utils/s3Utils');

async function setCacheEntry(key, value, ttlMs) {
    if (!process.env.DISABLE_CACHING === 'true') {
        const cacheEntry = {
            expiration: ttlMs ? new Date().getTime() + ttlMs : 0,
            value
        };
        await writeJsonFile(getCacheFolderId(), key, cacheEntry);
    }
}

async function getCacheEntry(key) {
    const currentTime = new Date().getTime();
    let response = null;
    if (!process.env.DISABLE_CACHING === 'true') {
        const cacheEntry = await readJsonFile(getCacheFolderId(), key);
        if (cacheEntry && cacheEntry.value) {
            if (cacheEntry.expiration > 0 && cacheEntry.expiration <= currentTime) {
                await removeCacheEntry(key);
            } else {
            response = cacheEntry.value;
            }
        }
    }
    return response;
}

async function removeCacheEntry(key, fuzzy=false) {
    if (!process.env.DISABLE_CACHING === 'true') {
        if (fuzzy) {
            await deleteAllFiles(getCacheFolderId(), key);
        } else {
            await deleteJsonFile(getCacheFolderId(), key);
        }
    }

}

async function clearCache() {
    if (!process.env.DISABLE_CACHING === 'true') {
        await deleteAllFiles(getCacheFolderId());
    }
}

function getCacheFolderId() {
    return process.env.S3_CONTENT_CACHE_FOLDER_ID;
}

module.exports = { setCacheEntry, getCacheEntry, removeCacheEntry, clearCache };
