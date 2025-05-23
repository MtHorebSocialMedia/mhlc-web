// Utilities
import { defineStore } from 'pinia';
import { getEvents } from '@/utils/auditService';
import { addMocks } from '../utils/httpUtils';

export const useAnalyticsStore = defineStore('analytics', () => {

    async function getEventsData(monthId) {

        const events = await getEvents(monthId);

        const startDateTime = events[0].dateTime;
        const endDateTime = events[events.length-1].dateTime;

        const uncategorized = [];
        const unknownAgents = [];
        const unknownCmsResources = [];

        const dailyTraffic = {};
        const dailyCmsTraffic = {};

        const categoryData = [];

        const categories = getCategories();
        const platforms = getPlatforms();
        const cmsResources = getCmsResources();

        events.forEach(event => {
            const [path] = event.resource.split('?');
            const [ eventDate ] = event.dateTime.split('T');
            if (event.resourceType === 'cms') {
                const cmsResourceFound = cmsResources.some(resource => resource.analyze(path, resource));
                if (!cmsResourceFound) {
                    unknownCmsResources.push(path);
                }
                if (!dailyCmsTraffic[eventDate]) {
                    dailyCmsTraffic[eventDate] = 0;
                }
                dailyCmsTraffic[eventDate]++;
            } else {
                const categoryFound = categories.some(category => category.analyze(path, category));
                if (!categoryFound) {
                    uncategorized.push(path);
                }
                const platformFound = platforms.some(platform => platform.analyze(event.agent, platform));
                if (!platformFound) {
                    unknownAgents.push(event.agent);
                }
                if (!dailyTraffic[eventDate]) {
                    dailyTraffic[eventDate] = 0;
                }
                dailyTraffic[eventDate]++;
            }
        });

        categories.forEach((category) => {
            if (category.subcategories) {
                Object.values(category.subcategories).forEach((subCategory) => {
                    if (subCategory.count > 0) {
                        categoryData.push({
                            label: subCategory.name,
                            data: subCategory.count
                        });
                    }
                });
            } else {
                if (category.count > 0) {
                    categoryData.push({
                        label: category.name,
                        data: category.count
                    });
                }
            }
        });

        categoryData.sort((a, b) => {
            return b.data - a.data;
        });

        const platformsData = platforms.map(({ name, color, count }) => ({
            label: name,
            backgroundColor: color,
            data: count
        })).sort((a, b) => {
            return b.data - a.data;
        });

        const dailyTrafficData = Object.keys(dailyTraffic).map(date => ({
            label: date,
            data: dailyTraffic[date]
         }));

         const dailyCmsTrafficData = Object.keys(dailyCmsTraffic).map(date => ({
            label: date,
            data: dailyCmsTraffic[date]
         }));

        return { startDateTime, endDateTime, categoryData, platformsData, uncategorized, unknownAgents, dailyTrafficData, dailyCmsTrafficData };

    }

    return { getEventsData };
});

function getCmsResources() {
    return [
        {
            name: 'MenuItem',
            analyze: (path, resource) => {
                if (['menuItem'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'ContentPage',
            analyze: (path, resource) => {
                if (['contentPage'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'ContentBlock',
            analyze: (path, resource) => {
                if (['contentBlock'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'NewsType',
            analyze: (path, resource) => {
                if (['newsType'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'News',
            analyze: (path, resource) => {
                if (['news'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'NewsEntry',
            analyze: (path, resource) => {
                if (['newsEntry'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'BlogPost',
            analyze: (path, resource) => {
                if (['blogPost'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'BlogPostEntry',
            analyze: (path, resource) => {
                if (['blogPostEntry'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Staff',
            analyze: (path, resource) => {
                if (['staff'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Council',
            analyze: (path, resource) => {
                if (['council'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'ChurchInfo',
            analyze: (path, resource) => {
                if (['churchInfo'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'SpecialAnnouncement',
            analyze: (path, resource) => {
                if (['specialAnnouncement'].includes(path)) {
                    resource.count++;
                    return true;
                }
            },
            count: 0
        }
    ];
}
function getCategories() {
    return [
        {
            name: 'Home',
            analyze: (path, category) => {
                if (['/', '/home'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'News',
            analyze: (path, category) => {
                if (['/news'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'News Entry',
            analyze: (path, category) => {
                if (path.startsWith('/news/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Events',
            analyze: (path, category) => {
                if (['/events'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Event Entry',
            analyze: (path, category) => {
                if (path.startsWith('/event/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Blogs',
            analyze: (path, category) => {
                if (['/blog-posts'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Blogs Entry',
            analyze: (path, category) => {
                if (path.startsWith('/blog-posts/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Live Streams',
            analyze: (path, category) => {
                if (['/live-streams'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Live Stream Video',
            analyze: (path, category) => {
                if (path.startsWith('/live-streams/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Leaders',
            analyze: (path, category) => {
                if (['/leaders', '/leaders/'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Contact',
            analyze: (path, category) => {
                if (['/contact'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Newsletter Signup',
            analyze: (path, category) => {
                if (['/newsletter'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Donate',
            analyze: (path, category) => {
                if (['/donate'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Donate Paypal Complete',
            analyze: (path, category) => {
                if (['/donate/paypal-complete'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Content',
            analyze: (path, category) => {
                if (path.startsWith('/content')) {
                    if (!category.subcategories[path]) {
                        category.subcategories[path] = {
                            name: path.replace('/content/', '').replaceAll('-', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase()),
                            count: 0
                        };
                    }
                    category.subcategories[path].count++;
                    return true;
                }
            },
            subcategories: {}
        }
    ];
}
function getPlatforms() {
    return [{
        name: 'Android',
        color: 'green',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('android')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'iPhone/iPad',
        color: 'blue',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('iphone') || agent.toLowerCase().includes('ipad')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Mac',
        color: 'purple',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('macintosh')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Windows',
        color: 'red',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('windows nt')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Chromebook',
        color: 'yellow',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('cros')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Linux',
        color: 'orange',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('x11; linux x86_64') || agent.toLowerCase().includes('x11; ubuntu; linux x86_64')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }];
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for analytics');


}
