require('dotenv').config();
const { getLogger } = require('./logger');

const logger = getLogger('refreshMockContent');

const contentService = require('../services/contentService');
const youtubeService = require('../services/youtubeService');
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
    saveContent(await contentService.getUpcomingEvents(), 'upcoming-events.json');
    saveContent(await contentService.getNewsTypes(), 'news-types.json');
    saveContent(await contentService.getStaff(), 'staff.json');
    saveContent(await contentService.getBlogPosts(1), 'blog-posts-1.json');
    saveContent(await youtubeService.getVideosList(), 'video-list.json');
    saveContent(await contentService.getSpecialAnnouncements(), 'special-announcements.json');

    // Asset Urls for fav icons:
    // cropped-favicon-180x180
    logger.debug((await contentService.getAsset('14QTtgiOnGHM8o6373plWL')).fields.file.url);
    // cropped-favicon-32x32
    logger.debug((await contentService.getAsset('6nl0jBtkrinaLFuICgwOxN')).fields.file.url);
    // cropped-favicon-192x192
    logger.debug((await contentService.getAsset('1iIqZfH2BenwbvWvq4rJen')).fields.file.url);
    // cropped-favicon-270x270
    logger.debug((await contentService.getAsset('3Oh1f8DQrlQPu6Ga2OFSEk')).fields.file.url);

})();
