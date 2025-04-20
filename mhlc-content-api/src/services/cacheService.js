const { readJsonFile, writeJsonFile, deleteJsonFile, deleteAllFiles } = require('../utils/googleApisUtil');

async function setCacheEntry(key, value, ttlMs) {
    const cacheEntry = {
        expiration: ttlMs ? new Date().getTime() + ttlMs : 0,
        value
    };
    await writeJsonFile(getCacheFolderId(), `${key}.json`, cacheEntry);
}

async function getCacheEntry(key) {
    const currentTime = new Date().getTime();
    let response = null;
    const cacheEntry = await readJsonFile(getCacheFolderId(), `${key}.json`);
    if (cacheEntry && cacheEntry.value) {
        if (cacheEntry.expiration <= currentTime) {
            await removeCacheEntry(key);
        } else {
          response = cacheEntry.value;
        }
    }
    return response;
}

async function removeCacheEntry(key) {
    await deleteJsonFile(`${key}.json`);
}

async function clearCache() {
    await deleteAllFiles(getCacheFolderId());
}

function getCacheFolderId() {
    return process.env.GOOGLE_APIS_CONTENT_CACHE_FOLDER_ID;
}

module.exports = { setCacheEntry, getCacheEntry, removeCacheEntry, clearCache };
