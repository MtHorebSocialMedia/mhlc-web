// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHttpClient, getMockClient, addMocks } from '../utils/httpUtils';

export const useContentStore = defineStore('content', () => {
    const menuItems = ref([]);
    const contentPages = ref({});
    const contentBlocks = ref({});
    const newsTypes = ref([]);
    const recentNews = ref({});
    const upcomingEvents = ref({});
    const churchInfo = ref({});
    const staff = ref([]);
    const council = ref([]);
    const videoList = ref([]);
    const specialAnnouncements = ref([]);
    const contentAssistEnabled = ref(false);

    async function fetchContent() {

        const [
            churchInfoResp,
            menuItemsResp,
            contentPagesResp,
            contentBlocksResp,
            newsTypesResp,
            videoListResp,
            councilResp,
            staffResp,
            specialAnnouncementsResp
        ] = await Promise.all([
            getChurchInfo(),
            getMenuItems(),
            getContentPages(),
            getContentBlocks(),
            getNewsTypes(),
            getVideoList(),
            getCouncil(),
            getStaff(),
            getSpecialAnnouncements(),
            loadNews(1),
            loadUpcomingEvents(1)
        ]);

        menuItems.value = menuItemsResp;
        contentPages.value = contentPagesResp;
        contentBlocks.value = contentBlocksResp;
        newsTypes.value = newsTypesResp;
        churchInfo.value = churchInfoResp;
        videoList.value = videoListResp;
        council.value = councilResp;
        staff.value = staffResp;
        specialAnnouncements.value = specialAnnouncementsResp;
    }

    async function loadNews(page) {
        const newsResults = await getNews(page);
        if (page === 1) {
            recentNews.value = newsResults;
        }
        return newsResults;
    }

    async function loadUpcomingEvents(page) {
        const events = await getUpcomingEvents(page);
        if (page === 1) {
            upcomingEvents.value = events;
        }
        return events;
    }

    // Toggle the content assist with content block keys by pressing the back-tick (`) key
    window.document.addEventListener('keypress', (event) => {
        if(event.key === '`') {
            contentAssistEnabled.value = !contentAssistEnabled.value;
        }
    });

    return {
        menuItems, contentPages, contentBlocks, newsTypes, recentNews, upcomingEvents, churchInfo, council, staff, videoList, specialAnnouncements, contentAssistEnabled,
        fetchContent, getNews, getNewsEntry, getBlogPosts, getBlogPost, getUpcomingEvents
    };
});

async function getMenuItems() {
    const menuItems = (await getHttpClient().get('/api/menu-items')).data;
    menuItems.sort((a, b) => {
        return a.sequence - b.sequence;
    });
    menuItems.forEach(item => {
        menuItems[item.id] = item;
        item.children = [];
    });
    const menuItemsTree = menuItems.filter(item => !item.parent);
    menuItems.filter(item => item.parent).forEach(child => {
        menuItems[child.parent].children.push(child);
    });
    return menuItemsTree;
}

async function getContentPages() {
    const contentPages = (await getHttpClient().get('/api/content-pages')).data;
    contentPages.forEach(page => {
        contentPages[page.contentPath] = page;
    })
    return contentPages;
}

async function getContentBlocks() {
    const contentBlocks = (await getHttpClient().get('/api/content-blocks')).data;
    contentBlocks.forEach(block => {
        contentBlocks[block.key] = block;
    })
    return contentBlocks;
}

async function getNewsTypes() {
    return (await getHttpClient().get('/api/news-types')).data;
}

async function getNews(page) {
    return (await getHttpClient().get('/api/news', { params: { page } })).data;
}

async function getUpcomingEvents(page) {
    return (await getHttpClient().get('/api/events', { params: { page } })).data;
}

async function getNewsEntry(newsId) {
    return (await getHttpClient().get(`/api/news/${newsId}`)).data;
}

async function getChurchInfo() {
    return (await getHttpClient().get('/api/church-info')).data;
}

async function getCouncil() {
    return (await getHttpClient().get('/api/council')).data;
}

async function getStaff() {
    return (await getHttpClient().get('/api/staff')).data;
}

async function getVideoList() {
    return (await getHttpClient().get('/api/video-list')).data;
}

async function getSpecialAnnouncements() {
    return (await getHttpClient().get('/api/special-announcements')).data;
}

async function getBlogPosts(page) {
    return (await getHttpClient().get('/api/blog-posts', { params: { page } })).data;
}

async function getBlogPost(blogId) {
    return (await getHttpClient().get(`/api/blog-posts/${blogId}`)).data;
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for content store');

    const mockClient = getMockClient();

    addMocks((mock) => {
        mock.onGet("/api/menu-items").reply(() => {
            return mockClient.get('./mock/menu-items.json');
        });

        mock.onGet("/api/content-pages").reply(() => {
            return mockClient.get(`./mock/content-pages.json`);
        });

        mock.onGet("/api/content-blocks").reply(() => {
            return mockClient.get('./mock/content-blocks.json');
        });

        mock.onGet("/api/news-types").reply(() => {
            return mockClient.get('./mock/news-types.json');
        });

        mock.onGet("/api/news").reply((config) => {
            const page = config.params ? config.params.page : 1;
            return mockClient.get(`./mock/news-entries-${page}.json`);
        });

        mock.onGet(/\/api\/news\/\w+/).reply(async () => {
            const { news } = (await mockClient.get(`./mock/news-entries-1.json`)).data;
            return [200, news[0]];
        });

        mock.onGet("/api/church-info").reply(() => {
            return mockClient.get('./mock/church-info.json');
        });

        mock.onGet("/api/staff").reply(() => {
            return mockClient.get('./mock/staff.json');
        });

        mock.onGet("/api/special-announcements").reply(() => {
            return mockClient.get('./mock/special-announcements.json');
        });

        mock.onGet("/api/council").reply(() => {
            return mockClient.get('./mock/council.json');
        });

        mock.onGet("/api/video-list").reply(() => {
            return mockClient.get('./mock/video-list.json');
        });

        mock.onGet("/api/blog-posts").reply((config) => {
            const page = config.params ? config.params.page : 1;
            return mockClient.get(`./mock/blog-posts-${page}.json`);
        });

        mock.onGet(/\/api\/blog-posts\/\w+/).reply(async () => {
            const { blogs } = (await mockClient.get(`./mock/blog-posts-1.json`)).data;
            return [200, blogs[0]];
        });
    });

}
