const RSS = require('rss');
const xmlFormat = require('xml-formatter');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const {
    getNewsEntries,
    getBlogPosts
} = require('./contentService');

module.exports = (req, res, next) =>{

    (async function() {
        try {
            /* lets create an rss feed */
            const feed = new RSS({
                title: 'Mt. Horeb Lutheran Church | Chapin, SC',
                description: 'Lutheran Church Chapin SC &#124; Preschool Chapin SC',
                feed_url: 'https://mthoreb.net/feed/',
                site_url: 'https://mthoreb.net',
                image_url: 'https://images.ctfassets.net/3wcsgs8fznel/6nl0jBtkrinaLFuICgwOxN/3b5e873cc4fefe762c7c11ca3e1e33fb/cropped-favicon-32x32.png',
                copyright: `${new Date().getFullYear()} Mt. Horeb Lutheran Church`,
                language: 'en',
                categories: ['News','Blogs'],
            });
            const { news } = await getNewsEntries(1);
            const { blogs } = await getBlogPosts(1);

            const feedItems = (
                news.map((item) => ({
                    title: item.title,
                    description: documentToHtmlString(item.description),
                    url: 'https://mthoreb.net/news/'+item.id,
                    guid: item.id,
                    author: 'Mt. Horeb Lutheran Church',
                    date: item.datetime
                }))
            ).concat(
                blogs.map((item) => ({
                    title: item.title,
                    description: documentToHtmlString(item.content),
                    url: 'https://mthoreb.net/blog-posts/'+item.id,
                    guid: item.id,
                    author: item.author.name,
                    date: item.publishDate
                }))
            );
            feedItems.sort((a, b) => {
                if (a.date > b.date) {
                    return -1;
                } else if (a.date < b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
            // Truncate to the last 10 items
            feedItems.length = 10;

            /* loop over data and add to feed */
            feedItems.forEach((item) => {
                feed.item(item);
            });

            // generate the xml to send to clients
            const xml = feed.xml();
            res.set('Content-Type', 'application/rss+xml; charset=UTF-8');
            res.send(xmlFormat(xml));
        } catch (error) {
            next(error);
        }
    })();

};
