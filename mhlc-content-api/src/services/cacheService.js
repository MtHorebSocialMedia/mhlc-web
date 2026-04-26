const { readJsonFile, writeJsonFile, deleteJsonFile, deleteAllFiles } = require('../utils/s3Utils');
const { getLogger } = require('../utils/logger');
const { writeFile, readFile, unlink, readdir, mkdir } = require('node:fs/promises');

const logger = getLogger('services/cacheService');

class CacheProviderS3 {
    async setCacheEntry(key, value, ttlMs) {
        const cacheEntry = {
            expiration: ttlMs ? new Date().getTime() + ttlMs : 0,
            value
        };
        await writeJsonFile(getCacheFolderId(), key, cacheEntry);
    }
    async getCacheEntry(key) {
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
    async removeCacheEntry(key, fuzzy=false) {
        if (fuzzy) {
            await deleteAllFiles(getCacheFolderId(), key);
        } else {
            await deleteJsonFile(getCacheFolderId(), key);
        }
    }
    async clearCache() {
        await deleteAllFiles(getCacheFolderId());
    }
    getCacheFolderId() {
        return process.env.S3_CONTENT_CACHE_FOLDER_ID;
    }
}

class CacheProviderFileSystem {
    async initCacheDirectory() {
        await mkdir(getCacheFolderId(), { recursive: true });
    }
    async setCacheEntry(key, value, ttlMs) {
        await this.initCacheDirectory();
        await writeFile(`${getCacheFolderId()}/${key}.json`, JSON.stringify({
            expiration: ttlMs ? new Date().getTime() + ttlMs : 0,
            value
        }), null, 4);
    }
    async getCacheEntry(key) {
        await this.initCacheDirectory();
        const currentTime = new Date().getTime();
        let response = null;
        let cacheEntry = null;
        try {
            cacheEntry = JSON.parse(await readFile(`${getCacheFolderId()}/${key}.json`, 'utf-8'));
        } catch (err) {
            if (err.code === 'ENOENT') {
                logger.debug(`No cache file found for key: ${key}`);
            } else {
                throw err;
            }
        }
        if (cacheEntry && cacheEntry.value) {
            if (cacheEntry.expiration > 0 && cacheEntry.expiration <= currentTime) {
                await this.removeCacheEntry(key);
            } else {
                response = cacheEntry.value;
            }
        }
        return response;
    }
    async removeCacheEntry(key, fuzzy=false) {
        await this.initCacheDirectory();
        if (fuzzy) {
            const files = await readdir(getCacheFolderId());
            await Promise.all(files
                .filter(file => file.startsWith(key))
                .map(file => unlink(`${getCacheFolderId()}/${file}`))
            );
        } else {
            await unlink(`${getCacheFolderId()}/${key}.json`);
        }
    }
    async clearCache() {
        await this.initCacheDirectory();
        const files = await readdir(getCacheFolderId());
        await Promise.all(files.map(file => unlink(`${getCacheFolderId()}/${file}`)));
    }
    getCacheFolderId() {
        return process.env.FILE_SYSTEM_CONTENT_CACHE_FOLDER_ID;
    }
}

class CacheProviderNoCache {
    async setCacheEntry(key, value, ttlMs) {
        // No-op
    }
    async getCacheEntry(key) {
        return null;
    }
    async removeCacheEntry(key, fuzzy=false) {
        // No-op
    }
    async clearCache() {
        // No-op
    }
    getCacheFolderId() {
        return null;
    }
}

const cacheProviders = {
    s3: new CacheProviderS3(),
    filesystem: new CacheProviderFileSystem(),
    none: new CacheProviderNoCache()
};

function getCacheProvider() {
    let cacheProviderKey = process.env.CACHE_PROVIDER;
    if (!cacheProviderKey || !cacheProviders[cacheProviderKey]) {
        logger.warn(`Invalid or missing CACHE_PROVIDER value: [${cacheProviderKey}]. Falling back to 'none'.`);
        cacheProviderKey = 'none';
    }
    return cacheProviders[cacheProviderKey];
}

async function setCacheEntry(key, value, ttlMs) {
    await getCacheProvider().setCacheEntry(key, value, ttlMs);
}

async function getCacheEntry(key) {
    return await getCacheProvider().getCacheEntry(key);
}

async function removeCacheEntry(key, fuzzy=false) {
    await getCacheProvider().removeCacheEntry(key, fuzzy);
}

async function clearCache() {
    await getCacheProvider().clearCache();
}

function getCacheFolderId() {
    return getCacheProvider().getCacheFolderId();
}

module.exports = { setCacheEntry, getCacheEntry, removeCacheEntry, clearCache };
