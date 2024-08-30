const RssParser = require('rss-parser');
const rssParser = new RssParser();

async function getVideosList() {

    const feed = await rssParser.parseURL(process.env.YOUTUBE_RSS_FEED);

    return feed.items
        .filter(() => {
            // TODO filter out non live streams
            return true;
        })
        .map((video) => {
            const [,,id] = video.id.split(':');
            return {
                id,
                title: video.title,
                link: video.link,
                date: video.pubDate,
                author: video.author
            }
        });
}

module.exports = {
    getVideosList
};
