const contentful = require('contentful');

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
            imageAlignment: item.fields.imageAlignment
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

// Add paging:
// https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/collection-resources-and-pagination
async function getNewsEntries() {
    const { items } = await client.getEntries({
        content_type: 'news'
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
            })) : []
        };
    });
    news.sort((a, b) => {
        // Sort by publish date, descending (newest first)
        return a.datetime > b.datetime ? -1 : 1;
    });
    return news;
}

async function getBlogPosts() {
    const { items } = await client.getEntries({
        content_type: 'blogPost'
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
    blogs.sort((a, b) => {
        // Sort by publish date, descending (newest first)
        return a.publishDate > b.publishDate ? -1 : 1;
    });
    return blogs;
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

module.exports = {
    getMenuItems,
    getContentPages,
    getContentBlocks,
    getNewsTypes,
    getNewsEntries,
    getChurchInfo,
    getCouncil,
    getStaff,
    getBlogPosts
};
