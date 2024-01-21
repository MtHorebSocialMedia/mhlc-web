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
            content: item.fields.content,
            contentPath: item.fields.contentPath
        };
    });
}

module.exports = {
    getMenuItems,
    getContentPages
};
