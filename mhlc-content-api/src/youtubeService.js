const RssParser = require('rss-parser');
const rssParser = new RssParser();

async function getVideosList() {

    const feed = await rssParser.parseURL(process.env.YOUTUBE_RSS_FEED);
    // TODO filter out non live streams?
    return feed.items;
}

module.exports = {
    getVideosList
};
