require('dotenv').config();

const contentService = require('./contentService');
const youtubeService = require('./youtubeService');
const fs = require('node:fs');

const mockIndexPath = require.resolve('@mhlc/ui/public/mock/index.json');
const mockPath = mockIndexPath.replace('/index.json', '');

async function saveContent(contentServiceFunction, fileName) {
    const content = await contentServiceFunction();
    fs.writeFileSync(`${mockPath}/${fileName}`, JSON.stringify(content, null, 4));
}

(async function() {
    await saveContent(contentService.getChurchInfo, 'church-info.json');
    await saveContent(contentService.getContentPages, 'content-pages.json');
    await saveContent(contentService.getContentBlocks, 'content-blocks.json');
    await saveContent(contentService.getCouncil, 'council.json');
    await saveContent(contentService.getMenuItems, 'menu-items.json');
    await saveContent(contentService.getNewsEntries, 'news-entries.json');
    await saveContent(contentService.getNewsTypes, 'news-types.json');
    await saveContent(contentService.getStaff, 'staff.json');
    await saveContent(contentService.getBlogPosts, 'blog-posts.json');
    await saveContent(youtubeService.getVideosList, 'video-list.json');
})();
