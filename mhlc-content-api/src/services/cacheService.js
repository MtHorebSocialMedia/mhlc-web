// const { readJsonFile, writeJsonFile, deleteJsonFile, deleteAllFiles } = require('../utils/googleApisUtil');
const { readJsonFile, writeJsonFile, deleteJsonFile, deleteAllFiles } = require('../utils/s3Utils');

async function setCacheEntry(key, value, ttlMs) {
    const cacheEntry = {
        expiration: ttlMs ? new Date().getTime() + ttlMs : 0,
        value
    };
    await writeJsonFile(getCacheFolderId(), key, cacheEntry);
}

async function getCacheEntry(key) {
    const currentTime = new Date().getTime();
    let response = null;
    const cacheEntry = await readJsonFile(getCacheFolderId(), key);
    if (cacheEntry && cacheEntry.value) {
        if (cacheEntry.expiration > 0 && cacheEntry.expiration <= currentTime) {
            await removeCacheEntry(key);
        } else {
          response = cacheEntry.value;
        }
    }
    return response;
}

async function removeCacheEntry(key) {
    await deleteJsonFile(getCacheFolderId(), key);
}

async function clearCache() {
    await deleteAllFiles(getCacheFolderId());
}

// function getCacheFolderId() {
//     return process.env.GOOGLE_APIS_CONTENT_CACHE_FOLDER_ID;
// }

function getCacheFolderId() {
    return process.env.S3_CONTENT_CACHE_FOLDER_ID;
}

module.exports = { setCacheEntry, getCacheEntry, removeCacheEntry, clearCache };
