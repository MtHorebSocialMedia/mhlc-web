const RssParser = require('rss-parser');
const rssParser = new RssParser();

async function getVideosList() {

    const feed = await rssParser.parseURL(process.env.YOUTUBE_RSS_FEED);

    return feed.items
        .filter((video) => {
            // TODO filter out non live streams
            // Filter out Celebrations of Life (funerals)
            return !video.title.toLowerCase().includes('celebration of life');
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
