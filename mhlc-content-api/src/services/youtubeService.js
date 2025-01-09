const RssParser = require('rss-parser');
const rssParser = new RssParser();

async function getVideosList() {

    const feed = await rssParser.parseURL(process.env.YOUTUBE_RSS_FEED);

    return feed.items
        .filter((video) => {
            // All live stream titles start with "Mt. Horeb Lutheran Church"
            // Filter out Celebrations of Life (funerals)
            return video.title.toLowerCase().startsWith('mt. horeb lutheran church')
                && !video.title.toLowerCase().includes('celebration of life');
        })
        .map((video) => {
            const [,,id] = video.id.split(':');
            return {
                id,
                title: video.title,
                link: video.link,
                embedLink: getEmbedLink(video.link),
                date: video.pubDate,
                author: video.author
            }
        });
}

// Turn this: https://www.youtube.com/watch?v=GsCZC3hsjwk
// Into this: https://www.youtube.com/embed/GsCZC3hsjwk
function getEmbedLink(link) {
    if (link.includes('/watch')) {
        const [ query ] = link.split('?');
        const [ , videoId ] = query.split('=');
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        return link;
    }
}

module.exports = {
    getVideosList
};
