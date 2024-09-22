require('dotenv').config();

const contentService = require('./contentService');
const youtubeService = require('./youtubeService');
const fs = require('node:fs');

const mockIndexPath = require.resolve('@mhlc/ui/public/mock/index.json');
const mockPath = mockIndexPath.replace('/index.json', '');

function saveContent(content, fileName) {
    fs.writeFileSync(`${mockPath}/${fileName}`, JSON.stringify(content, null, 4));
}

(async function() {
    saveContent(await contentService.getChurchInfo(), 'church-info.json');
    saveContent(await contentService.getContentPages(), 'content-pages.json');
    saveContent(await contentService.getContentBlocks(), 'content-blocks.json');
    saveContent(await contentService.getCouncil(), 'council.json');
    saveContent(await contentService.getMenuItems(), 'menu-items.json');
    saveContent(await contentService.getNewsEntries(1), 'news-entries-1.json');
    saveContent(await contentService.getNewsEntries(2), 'news-entries-2.json');
    saveContent(await contentService.getNewsTypes(), 'news-types.json');
    saveContent(await contentService.getStaff(), 'staff.json');
    saveContent(await contentService.getBlogPosts(1), 'blog-posts-1.json');
    saveContent(await youtubeService.getVideosList(), 'video-list.json');
})();
