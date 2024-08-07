// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHttpClient, getMockClient } from '../utils/httpUtils';

const httpClient = getHttpClient();

export const useContentStore = defineStore('app', () => {
    const menuItems = ref([]);
    const contentPages = ref([]);
    const newsTypes = ref([]);
    const news = ref([]);
    const churchInfo = ref({});
    const staff = ref([]);
    const council = ref([]);
    const videoList = ref([]);

    async function fetchContent() {
        menuItems.value = await getMenuItems();
        contentPages.value = await getContentPages();
        newsTypes.value = (await httpClient.get('/api/news-types')).data;
        news.value = (await httpClient.get('/api/news')).data;
        churchInfo.value = await getChurchInfo();
        videoList.value = await getVideoList();
        council.value = await getCouncil();
        staff.value = await getStaff();
    }
    return { menuItems, contentPages, newsTypes, news, churchInfo, council, staff, videoList, fetchContent };
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

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for content store');

    const mockClient = getMockClient();

    httpClient.addMocks((mock) => {
        mock.onGet("/api/menu-items").reply(() => {
            return mockClient.get('./mock/menu-items.json');
        });

        mock.onGet("/api/content-pages").reply(() => {
            return mockClient.get('./mock/content-pages.json');
        });

        mock.onGet("/api/news-types").reply(() => {
            return mockClient.get('./mock/news-types.json');
        });

        mock.onGet("/api/news").reply(() => {
            return mockClient.get('./mock/news-entries.json');
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

        mock.onGet('/api/video-list').reply(200, [{
            id: 'LqslxP33w_g',
            date: '2024-07-08',
            title: 'Mt. Horeb Lutheran Church - Seventh Sunday after Pentecost - July 7, 2024',
            thumbnail: 'https://i1.ytimg.com/vi/LqslxP33w_g/hqdefault.jpg',
            link: 'https://www.youtube.com/watch?v=LqslxP33w_g'
        }, {
            id: '5AQpjBf7F5I',
            date: '2024-06-30',
            title: 'Mt. Horeb Lutheran Church - Sixth Sunday after Pentecost - June 30, 2024',
            thumbnail: 'https://i2.ytimg.com/vi/5AQpjBf7F5I/hqdefault.jpg',
            link: 'https://www.youtube.com/watch?v=5AQpjBf7F5I'
        }, {
            id: 'LOAARqhUBDs',
            date: '2024-06-23',
            title: 'Mt. Horeb Lutheran Church - Fifth Sunday after Pentecost - June 23, 2024',
            thumbnail: 'https://i2.ytimg.com/vi/LOAARqhUBDs/hqdefault.jpg',
            link: 'https://www.youtube.com/watch?v=LOAARqhUBDs'
        }, {
            id: 'lJfcyPuX6Vs',
            date: '2024-06-16',
            title: 'Mt. Horeb Lutheran Church - Fourth Sunday after Pentecost - June 16, 2024',
            thumbnail: 'https://i2.ytimg.com/vi/lJfcyPuX6Vs/hqdefault.jpg',
            link: 'https://www.youtube.com/watch?v=lJfcyPuX6Vs'
        }, {
            id: 'XPYIB_4n6zU',
            date: '2024-06-09',
            title: 'Mt. Horeb Lutheran Church - Third Sunday after Pentecost - June 9, 2024',
            thumbnail: 'https://i2.ytimg.com/vi/XPYIB_4n6zU/hqdefault.jpg',
            link: 'https://www.youtube.com/watch?v=XPYIB_4n6zU'
        }]);
    });

}
