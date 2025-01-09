const contentful = require('contentful');
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

async function getMenuItems() {
    const { items } = await client.getEntries({
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
    const { items } = await client.getEntries({
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
    const { items } = await client.getEntries({
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
            videoId: item.fields.videoUrl ? getVideoId(item.fields.videoUrl) : null
        };
    });
}

async function getNewsTypes() {
    const { items } = await client.getEntries({
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
    const { items, total } = await client.getEntries({
        content_type: 'news',
        limit: itemsPerPage,
        'fields.datetime[lte]': new Date().toISOString(),
        order: '-fields.datetime',
        skip
    });
    const news = items.map((item) => {
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
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { news, page, totalPages };
}

async function getNewsEntry(newsId) {
    const item = await client.getEntry(newsId);
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

async function getBlogPosts(page) {
    page = page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const { items, total } = await client.getEntries({
        content_type: 'blogPost',
        limit: itemsPerPage,
        'fields.publishDate[lte]': new Date().toISOString(),
        order: '-fields.publishDate',
        skip
    });
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
    const item = await client.getEntry(newsId);
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
    const { items } = await client.getEntries({
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
    const { items } = await client.getEntries({
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
    const { items } = await client.getEntries({
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

async function getAsset(assetId) {
    const asset = await client.getAsset(assetId);
    return asset;
}

async function getSpecialAnnouncements(page) {
    const currentDate = new Date().toISOString();
    const { items } = await client.getEntries({
        content_type: 'specialAnnouncement',
        'fields.publishBeginDate[lte]': currentDate,
        'fields.publishEndDate[gte]': currentDate,
        order: '-fields.publishBeginDate'
    });
    return items.map((item) => {
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
    getChurchInfo,
    getCouncil,
    getStaff,
    getBlogPosts,
    getBlogPost,
    getSpecialAnnouncements,
    getAsset
};
