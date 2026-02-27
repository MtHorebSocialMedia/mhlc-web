const contentful = require('contentful');
const { writeEvent } = require('./analyticsService');
const { getCacheEntry, setCacheEntry, removeCacheEntry, clearCache } = require('./cacheService');
const { getLogger } = require('../utils/logger');

const logger = getLogger('contentService');

const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_API_KEY
} = process.env;

const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_DELIVERY_API_KEY
});

async function getEntries(requestConfig, cacheId, ttlMsCallback) {
    const contentType = requestConfig.content_type;
    cacheId = cacheId || contentType;
    let entries = await getCacheEntry(cacheId);
    if (!entries) {
        entries = await client.getEntries(requestConfig);
        let ttlMs = 0;
        if (ttlMsCallback) {
            ttlMs = await ttlMsCallback();
        }
        writeContentfulAuditEvent(contentType);
        setCacheEntry(cacheId, entries, ttlMs);
    } else {
        logger.debug('Returning cached response.')
    }
    return entries;
}

async function getEntry(contentType, entryId) {
    const cacheId = `entry-${entryId}`;
    let entry = await getCacheEntry(cacheId);
    if (!entry) {
        entry = await client.getEntry(entryId);
        writeContentfulAuditEvent(`${contentType}Entry`);
        await setCacheEntry(cacheId, entry);
    }
    return entry;
}

async function getAsset(assetId) {
    return client.getAsset(assetId);
}

function writeContentfulAuditEvent(resource) {
    writeEvent({
        dateTime: new Date().toISOString(),
        method: 'GET',
        resourceType: 'cms',
        resource
    });
}

async function clearCachedContent(contentId) {
    if (contentId) {
        await removeCacheEntry(contentId.id);
        await removeCacheEntry(contentId.contentType, true);
    } else {
        await clearCache();
    }
}

let eventNewsTypeId = null;

async function getMenuItems() {
    const { items } = await getEntries({
        content_type: 'menuItem'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            label: item.fields.label,
            sequence: item.fields.sequence,
            path: item.fields.path,
            parent: item.fields.parent ? item.fields.parent.sys.id : null
        };
    });
}

async function getContentPages() {
    const { items } = await getEntries({
        content_type: 'contentPage'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            contentPath: item.fields.contentPath,
            headerImage: item.fields.headerImage ? item.fields.headerImage.fields.file : null,
            contentBlocks: (item.fields.contentBlocks || []).map(block => ({
                key: block.fields.key
            }))
        };
    });
}

async function getContentBlocks() {
    const { items } = await getEntries({
        content_type: 'contentBlock'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            key: item.fields.key,
            title: item.fields.title,
            content: item.fields.content,
            image: item.fields.image ? item.fields.image.fields.file : null,
            imageAlignment: item.fields.imageAlignment,
            imageLink: item.fields.imageLink,
            videoUrl: item.fields.videoUrl,
            videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null,
            jotformFormId: item.fields.jotformFormId
        };
    });
}

async function getNewsTypes() {
    const { items } = await getEntries({
        content_type: 'newsType'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            type: item.fields.type
        };
    });
}

async function getNewsEntries(page) {
    page = page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const currentDate = new Date();
    const currentDateTimeISO = currentDate.toISOString();
    const ttlMsCallback = async () => {
        // There may be entries in the CMS that have a future datetime on them - these will not
        // be included in the cached content.  Look for any future entries, and set a ttl on the
        // cached content to the difference in the current time and the first future entry found.
        // If no future entries are found, default to 0 which is indefinite.  CMS update events
        // will clear out the cache as well, so no need to worry about indefinite entries going stale.
        let ttlMs = 0;
        const futureEntries = await client.getEntries({
            content_type: 'news',
            'fields.datetime[gt]': currentDateTimeISO,
            order: 'fields.datetime'
        });
        if (futureEntries && futureEntries.items && futureEntries.items.length > 0) {
            const firstFutureEntryDateTime = futureEntries.items[0].fields.datetime;
            ttlMs = new Date(firstFutureEntryDateTime).getTime() - currentDate.getTime();
        }
        return ttlMs;
    };
    const { items, total } = await getEntries(
        {
            content_type: 'news',
            limit: itemsPerPage,
            'fields.datetime[lte]': currentDateTimeISO,
            order: '-fields.datetime',
            skip
        },
        `news-${page}`,
        ttlMsCallback
    );
    const news = items.map((item) => {
        return {
            id: item.sys.id,
            datetime: item.fields.datetime,
            title: item.fields.title,
            description: item.fields.description,
            type: item.fields.type ? item.fields.type.map(type => ({
                id: type.sys.id,
                type: type.fields?.type ?? 'General'
            })) : [],
            image: item.fields.image ? item.fields.image.fields.file : null,
            attachments: item.fields.attachments ? item.fields.attachments.map((attachment) => ({
                title: attachment.fields.title,
                file: attachment.fields.file
            })) : [],
            videoUrl: item.fields.videoUrl,
            videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
        };
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { news, page, totalPages };
}

async function getNewsEntry(newsId) {
    const item = await getEntry('news', newsId);
    return {
        id: item.sys.id,
        datetime: item.fields.datetime,
        title: item.fields.title,
        description: item.fields.description,
        type: item.fields.type ? item.fields.type.map(type => ({
            id: type.sys.id,
            type: type.fields.type
        })) : [],
        image: item.fields.image ? item.fields.image.fields.file : null,
        attachments: item.fields.attachments ? item.fields.attachments.map((attachment) => ({
            title: attachment.fields.title,
            file: attachment.fields.file
        })) : [],
        videoUrl: item.fields.videoUrl,
        videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
    };
}


async function getUpcomingEvents(page) {

    if (!eventNewsTypeId) {
        const { items } = await getEntries({
            content_type: 'newsType',
            'fields.type': 'Event'
        }, `newsType-Event`);
        eventNewsTypeId = (items && items.length > 0) ? items[0].sys.id : null;
    }

    page = page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const currentDate = new Date();
    const currentDateTimeISO = currentDate.toISOString();
    const ttlMsCallback = async () => {
        // There may be entries in the CMS that have a future datetime on them - these will not
        // be included in the cached content.  Look for any future entries, and set a ttl on the
        // cached content to the difference in the current time and the first future entry found.
        // If no future entries are found, default to 0 which is indefinite.  CMS update events
        // will clear out the cache as well, so no need to worry about indefinite entries going stale.
        let ttlMs = 0;
        const futureEntries = await client.getEntries({
            content_type: 'news',
            'fields.datetime[gt]': currentDateTimeISO,
            'fields.eventDatetime[gte]': currentDateTimeISO,
            'fields.type.sys.id': eventNewsTypeId,
            order: 'fields.datetime'
        });
        if (futureEntries && futureEntries.items && futureEntries.items.length > 0) {
            const firstFutureEntryDateTime = futureEntries.items[0].fields.datetime;
            ttlMs = new Date(firstFutureEntryDateTime).getTime() - currentDate.getTime();
        }
        return ttlMs;
    };
    const { items, total } = await getEntries(
        {
            content_type: 'news',
            limit: itemsPerPage,
            'fields.datetime[lte]': currentDateTimeISO,
            'fields.eventDatetime[gte]': currentDateTimeISO,
            'fields.type.sys.id': eventNewsTypeId,
            order: 'fields.eventDatetime',
            skip
        },
        `news-upcomingEvents-${page}`,
        ttlMsCallback
    );
    const events = items.map((item) => {
        return {
            id: item.sys.id,
            datetime: item.fields.datetime,
            eventDatetime: item.fields.eventDatetime,
            title: item.fields.title,
            description: item.fields.description,
            type: item.fields.type ? item.fields.type.map(type => ({
                id: type.sys.id,
                type: type.fields.type
            })) : [],
            image: item.fields.image ? item.fields.image.fields.file : null,
            attachments: item.fields.attachments ? item.fields.attachments.map((attachment) => ({
                title: attachment.fields.title,
                file: attachment.fields.file
            })) : [],
            videoUrl: item.fields.videoUrl,
            videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
        };
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { events, page, totalPages };
}

async function getEventDetails(eventId) {
    const item = await getEntry('news', eventId);
    return {
        id: item.sys.id,
        datetime: item.fields.datetime,
        eventDatetime: item.fields.eventDatetime,
        title: item.fields.title,
        description: item.fields.description,
        type: item.fields.type ? item.fields.type.map(type => ({
            id: type.sys.id,
            type: type.fields.type
        })) : [],
        image: item.fields.image ? item.fields.image.fields.file : null,
        attachments: item.fields.attachments ? item.fields.attachments.map((attachment) => ({
            title: attachment.fields.title,
            file: attachment.fields.file
        })) : [],
        videoUrl: item.fields.videoUrl,
        videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
    };
}

async function getBlogPosts(page) {
    page = page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const currentDate = new Date();
    const currentDateTimeISO = currentDate.toISOString();
    const ttlMsCallback = async () => {
        // There may be entries in the CMS that have a future datetime on them - these will not
        // be included in the cached content.  Look for any future entries, and set a ttl on the
        // cached content to the difference in the current time and the first future entry found.
        // If no future entries are found, default to 0 which is indefinite.  CMS update events
        // will clear out the cache as well, so no need to worry about indefinite entries going stale.
        let ttlMs = 0;
        const futureEntries = await client.getEntries({
            content_type: 'blogPost',
            'fields.publishDate[gt]': currentDateTimeISO,
            order: 'fields.publishDate'
        });
        if (futureEntries && futureEntries.items && futureEntries.items.length > 0) {
            const firstFutureEntryDateTime = futureEntries.items[0].fields.datetime;
            ttlMs = new Date(firstFutureEntryDateTime).getTime() - currentDate.getTime();
        }
        return ttlMs;
    };
    const { items, total } = await getEntries(
        {
            content_type: 'blogPost',
            limit: itemsPerPage,
            'fields.publishDate[lte]': currentDateTimeISO,
            order: '-fields.publishDate',
            skip
        },
        `blogPost-${page}`,
        ttlMsCallback
    );
    const blogs = items.map((item) => {
        return {
            id: item.sys.id,
            publishDate: item.fields.publishDate,
            author: {
                name: item.fields.author.fields.name,
                image: item.fields.author.fields.image ? item.fields.author.fields.image.fields.file : null
            },
            title: item.fields.title,
            content: item.fields.content
        };
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { blogs, page, totalPages };
}

async function getBlogPost(newsId) {
    const item = await getEntry('blogPost', newsId);
    return {
        id: item.sys.id,
        publishDate: item.fields.publishDate,
        author: {
            name: item.fields.author.fields.name,
            image: item.fields.author.fields.image ? item.fields.author.fields.image.fields.file : null
        },
        title: item.fields.title,
        content: item.fields.content
    };
}

async function getStaff() {
    const { items } = await getEntries({
        content_type: 'staff'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            name: item.fields.name,
            picture: item.fields.picture ? item.fields.picture.fields.file : null,
            sequence: item.fields.sequence
        };
    });
}

async function getCouncil() {
    const { items } = await getEntries({
        content_type: 'council'
    });
    return items.map((item) => {
        return {
            id: item.sys.id,
            role: item.fields.role,
            name: item.fields.name,
            sequence: item.fields.sequence
        };
    });
}

async function getChurchInfo() {
    const { items } = await getEntries({
        content_type: 'churchInfo'
    });
    const infoItems = items.map((item) => {
        return {
            id: item.sys.id,
            name: item.fields.name,
            streetAddress: item.fields.streetAddress,
            city: item.fields.city,
            state: item.fields.state,
            zipCode: item.fields.zipCode,
            phoneNumber: item.fields.phoneNumber,
            sundaySchoolTime: item.fields.sundaySchoolTime,
            sundayWorshipTime: item.fields.sundayWorshipTime,
            slogan: item.fields.slogan,
            facebook: item.fields.facebook,
            instagram: item.fields.instagram,
            youTube: item.fields.youTube,
            footer: item.fields.footer
        };
    });
    return infoItems.length > 0 ? infoItems[0]: null;
}

async function getSpecialAnnouncements() {
    const currentDate = new Date();
    const currentDateTimeISO = currentDate.toISOString();
    const ttlMsCallback = async () => {
        // There may be entries in the CMS that have a future datetime on them - these will not
        // be included in the cached content.  Look for any future entries, and set a ttl on the
        // cached content to the difference in the current time and the first future entry found.
        // If no future entries are found, default to 0 which is indefinite.  CMS update events
        // will clear out the cache as well, so no need to worry about indefinite entries going stale.
        let ttlMs = 0;
        const futureEntries = await client.getEntries({
            content_type: 'specialAnnouncement',
            'fields.publishBeginDate[gt]': currentDateTimeISO,
            order: 'fields.publishBeginDate'
        });
        if (futureEntries && futureEntries.items && futureEntries.items.length > 0) {
            const firstFutureEntryDateTime = futureEntries.items[0].fields.datetime;
            ttlMs = new Date(firstFutureEntryDateTime).getTime() - currentDate.getTime();
        }
        return ttlMs;
    };
    const { items } = await getEntries(
        {
            content_type: 'specialAnnouncement',
            'fields.publishBeginDate[lte]': currentDateTimeISO,
            'fields.publishEndDate[gte]': currentDateTimeISO,
            order: '-fields.publishBeginDate'
        },
        'specialAnnouncement',
        ttlMsCallback
    );
    // in case there is cached data that has expired, filter those out
    return items.filter(item => item.fields.publishEndDate > currentDateTimeISO).map((item) => {
        return {
            id: item.sys.id,
            publishBeginDate: item.fields.publishBeginDate,
            publishEndDate: item.fields.publishEndDate,
            title: item.fields.title,
            description: item.fields.description,
            type: item.fields.type,
            image: item.fields.image ? item.fields.image.fields.file : null,
            videoUrl: item.fields.videoUrl,
            videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
        };
    });
}

// Watch Url: https://www.youtube.com/watch?v=GsCZC3hsjwk
// Embed Url: https://www.youtube.com/embed/GsCZC3hsjwk
function getVideoId(videoUrl) {
    const [ path, query ] = videoUrl.split('?');
    if (videoUrl.includes('/watch')) {
        const [ , videoId ] = query.split('=');
        return videoId;
    } else if (videoUrl.includes('/embed')) {
        const [ , videoId ] = path.split('/embed/');
        return videoId;
    } else {
        logger.warn('Could not figure out videoId from url: ', videoUrl);
        return null;
    }
}

module.exports = {
    getMenuItems,
    getContentPages,
    getContentBlocks,
    getNewsTypes,
    getNewsEntries,
    getNewsEntry,
    getUpcomingEvents,
    getEventDetails,
    getChurchInfo,
    getCouncil,
    getStaff,
    getBlogPosts,
    getBlogPost,
    getSpecialAnnouncements,
    getAsset,
    clearCachedContent
};
