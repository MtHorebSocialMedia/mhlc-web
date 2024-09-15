// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHttpClient, getMockClient } from '../utils/httpUtils';

const httpClient = getHttpClient();

export const useContentStore = defineStore('content', () => {
    const menuItems = ref([]);
    const contentPages = ref([]);
    const contentBlocks = ref([]);
    const newsTypes = ref([]);
    const recentNews = ref({});
    const churchInfo = ref({});
    const staff = ref([]);
    const council = ref([]);
    const videoList = ref([]);
    const blogPosts = ref([]);
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
            blogPostsResp
        ] = await Promise.all([
            getChurchInfo(),
            getMenuItems(),
            getContentPages(),
            getContentBlocks(),
            getNewsTypes(),
            getVideoList(),
            getCouncil(),
            getStaff(),
            getBlogPosts(),
            loadNews(1)
        ]);

        menuItems.value = menuItemsResp;
        contentPages.value = contentPagesResp;
        contentBlocks.value = contentBlocksResp;
        newsTypes.value = newsTypesResp;
        churchInfo.value = churchInfoResp;
        videoList.value = videoListResp;
        council.value = councilResp;
        staff.value = staffResp;
        blogPosts.value = blogPostsResp;
    }

    async function loadNews(page) {
        const newsResults = await getNews(page);
        if (page === 1) {
            recentNews.value = newsResults;
        }
        return newsResults;
    }

    // Toggle the content assist with content block keys by pressing the back-tick (`) key
    window.document.addEventListener('keypress', (event) => {
        if(event.key === '`') {
            contentAssistEnabled.value = !contentAssistEnabled.value;
        }
    });

    return {
        menuItems, contentPages, contentBlocks, newsTypes, recentNews, churchInfo, council, staff, videoList, contentAssistEnabled,
        fetchContent, getNews, getBlogPosts
    };
});

async function getMenuItems() {
    const menuItems = (await httpClient.get('/api/menu-items')).data;
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
    const contentPages = (await httpClient.get('/api/content-pages')).data;
    contentPages.forEach(page => {
        contentPages[page.contentPath] = page;
    })
    return contentPages;
}

async function getContentBlocks() {
    const contentBlocks = (await httpClient.get('/api/content-blocks')).data;
    contentBlocks.forEach(block => {
        contentBlocks[block.key] = block;
    })
    return contentBlocks;
}

async function getNewsTypes() {
    return (await httpClient.get('/api/news-types')).data;
}

async function getNews(page) {
    return (await httpClient.get('/api/news', { params: { page } })).data;
}

async function getChurchInfo() {
    return (await httpClient.get('/api/church-info')).data;
}

async function getCouncil() {
    return (await httpClient.get('/api/council')).data;
}

async function getStaff() {
    return (await httpClient.get('/api/staff')).data;
}

async function getVideoList() {
    return (await httpClient.get('/api/video-list')).data;
}

async function getBlogPosts(page) {
    return (await httpClient.get('/api/blog-posts', { params: { page } })).data;
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for content store');

    const mockClient = getMockClient();

    httpClient.addMocks((mock) => {
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

        mock.onGet("/api/church-info").reply(() => {
            return mockClient.get('./mock/church-info.json');
        });

        mock.onGet("/api/staff").reply(() => {
            return mockClient.get('./mock/staff.json');
        });

        mock.onGet("/api/council").reply(() => {
            return mockClient.get('./mock/council.json');
        });

        mock.onGet("/api/video-list").reply(() => {
            return mockClient.get('./mock/video-list.json');
        });

        mock.onGet("/api/blog-posts").reply(() => {
            return mockClient.get('./mock/blog-posts.json');
        });
    });

}
