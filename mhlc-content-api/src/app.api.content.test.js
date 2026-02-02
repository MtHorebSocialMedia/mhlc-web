Error.stackTraceLimit = 100;

// Shared mock client for contentful
const mockClient = {
  getEntries: jest.fn(),
  getEntry: jest.fn(),
  getAsset: jest.fn(),
};

// Mock the contentful module
jest.mock('contentful', () => ({
  createClient: jest.fn(() => mockClient),
}));

// Shared mock parser for rss-parser
const mockRssParser = {
  parseURL: jest.fn(),
};

// Mock rss-parser
jest.mock(
  'rss-parser',
  () => jest.fn().mockImplementation(() => mockRssParser)
);

// Shared mock S3 utils functions
const mockS3ReadJsonFile = jest.fn();
const mockS3WriteJsonFile = jest.fn();

// Mock s3Utils (lowest level for S3 operations in your app)
jest.mock('./utils/s3Utils.js', () => ({
  readJsonFile: mockS3ReadJsonFile,
  writeJsonFile: mockS3WriteJsonFile,
}));

jest.mock('./services/analyticsService.js', () => ({
  writeEvent: jest.fn(),
}));

jest.mock('./utils/logger.js', () => ({
  getLogger: jest.fn(() => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  })),
}));

const request = require('supertest');
const { getApp } = require('./app');

describe('mhlc-content-api - content', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/church-info', () => {
    it('should return church info', async () => {
      mockClient.getEntries.mockResolvedValue({ items: [{
        sys: { id: '1' },
        fields: { name: 'Test Church' }
      }] });

      const response = await request(getApp()).get('/api/church-info');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: '1',
        name: 'Test Church'
      });
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'churchInfo' });
    });

    it('should handle errors', async () => {
      mockClient.getEntries.mockRejectedValue(new Error('Test error'));

      const response = await request(getApp()).get('/api/church-info');

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/menu-items', () => {
    it('should return menu items', async () => {
      const mockItems = [{ id: 1, label: 'Home', sequence: 1, path: '/', parent: null }];
      mockClient.getEntries.mockResolvedValue({ items: mockItems.map(item => ({ sys: { id: item.id }, fields: { label: item.label, sequence: item.sequence, path: item.path, parent: item.parent ? { sys: { id: item.parent } } : null } })) });

      const response = await request(getApp()).get('/api/menu-items');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockItems);
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'menuItem' });
    });
  });

  describe('GET /api/content-pages', () => {
    it('should return content pages', async () => {
      const mockPages = [{ id: 1, title: 'About', contentPath: '/about', headerImage: null, contentBlocks: [] }];
      mockClient.getEntries.mockResolvedValue({ items: mockPages.map(item => ({ sys: { id: item.id }, fields: { title: item.title, contentPath: item.contentPath, headerImage: item.headerImage ? { fields: { file: item.headerImage } } : null, contentBlocks: item.contentBlocks.map(block => ({ fields: { key: block.key } })) } })) });

      const response = await request(getApp()).get('/api/content-pages');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPages);
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'contentPage' });
    });
  });

  describe('GET /api/content-blocks', () => {
    it('should return content blocks', async () => {
      const mockBlocks = [{ id: 1, key: 'block1', title: 'Block', content: 'Content', image: null, imageAlignment: null, imageLink: null, videoUrl: null, videoId: null, jotformFormId: null }];
      mockClient.getEntries.mockResolvedValue({ items: mockBlocks.map(item => ({ sys: { id: item.id }, fields: { key: item.key, title: item.title, content: item.content, image: item.image ? { fields: { file: item.image } } : null, imageAlignment: item.imageAlignment, imageLink: item.imageLink, videoUrl: item.videoUrl, jotformFormId: item.jotformFormId } })) });

      const response = await request(getApp()).get('/api/content-blocks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBlocks);
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'contentBlock' });
    });
  });

  describe('GET /api/news-types', () => {
    it('should return news types', async () => {
      const mockTypes = [{ id: 1, type: 'Announcement' }];
      mockClient.getEntries.mockResolvedValue({ items: mockTypes.map(item => ({ sys: { id: item.id }, fields: { type: item.type } })) });

      const response = await request(getApp()).get('/api/news-types');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTypes);
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'newsType' });
    });
  });

  // describe('GET /api/events', () => {
  //   it('should return upcoming events with default page', async () => {
  //     const mockEvents = { events: [], total: 0 };
  //     getUpcomingEvents.mockResolvedValue(mockEvents);

  //     const response = await request(getApp()).get('/api/events');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockEvents);
  //     expect(getUpcomingEvents).toHaveBeenCalledWith(1);
  //   });

  //   it('should return upcoming events with specified page', async () => {
  //     const mockEvents = { events: [], total: 0 };
  //     getUpcomingEvents.mockResolvedValue(mockEvents);

  //     const response = await request(getApp()).get('/api/events?page=2');

  //     expect(response.status).toBe(200);
  //     expect(getUpcomingEvents).toHaveBeenCalledWith('2');
  //   });
  // });

  // describe('GET /api/events/:eventId', () => {
  //   it('should return event details', async () => {
  //     const mockDetails = { id: '123', title: 'Event' };
  //     getEventDetails.mockResolvedValue(mockDetails);

  //     const response = await request(getApp()).get('/api/events/123');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockDetails);
  //     expect(getEventDetails).toHaveBeenCalledWith('123');
  //   });
  // });

  describe('GET /api/news', () => {
    it('should return news entries with default page', async () => {
      const mockNews = { news: [], page: 1, totalPages: 0 };
      mockClient.getEntries.mockResolvedValue({ items: [], total: 0 });

      const response = await request(getApp()).get('/api/news');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(2);
    });

    it('should return news entries with specified page', async () => {
      const mockNews = { news: [], page: '3', totalPages: 0 };
      mockClient.getEntries.mockResolvedValue({ items: [], total: 0 });

      const response = await request(getApp()).get('/api/news?page=3');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(2);
    });
  });

  describe('GET /api/news/:newsId', () => {
    it('should return news entry', async () => {
      const mockEntry = { id: '456', datetime: '2023-01-01', title: 'News', description: 'Desc', type: [], image: null, attachments: [], videoUrl: null, videoId: null };
      mockClient.getEntry.mockResolvedValue({ sys: { id: '456' }, fields: { datetime: '2023-01-01', title: 'News', description: 'Desc', type: [], image: null, attachments: [], videoUrl: null } });

      const response = await request(getApp()).get('/api/news/456');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntry);
      expect(mockClient.getEntry).toHaveBeenCalledWith('456');
    });
  });

  // describe('GET /api/blog-posts', () => {
  //   it('should return blog posts with default page', async () => {
  //     const mockPosts = { posts: [], total: 0 };
  //     getBlogPosts.mockResolvedValue(mockPosts);

  //     const response = await request(getApp()).get('/api/blog-posts');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockPosts);
  //     expect(getBlogPosts).toHaveBeenCalledWith(1);
  //   });

  //   it('should return blog posts with specified page', async () => {
  //     const mockPosts = { posts: [], total: 0 };
  //     getBlogPosts.mockResolvedValue(mockPosts);

  //     const response = await request(getApp()).get('/api/blog-posts?page=2');

  //     expect(response.status).toBe(200);
  //     expect(getBlogPosts).toHaveBeenCalledWith('2');
  //   });
  // });

  // describe('GET /api/blog-posts/:blogId', () => {
  //   it('should return blog post', async () => {
  //     const mockPost = { id: '789', title: 'Blog' };
  //     getBlogPost.mockResolvedValue(mockPost);

  //     const response = await request(getApp()).get('/api/blog-posts/789');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockPost);
  //     expect(getBlogPost).toHaveBeenCalledWith('789');
  //   });
  // });

  // describe('GET /api/staff', () => {
  //   it('should return staff', async () => {
  //     const mockStaff = [{ id: 1, name: 'John' }];
  //     getStaff.mockResolvedValue(mockStaff);

  //     const response = await request(getApp()).get('/api/staff');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockStaff);
  //     expect(getStaff).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('GET /api/council', () => {
    it('should return council', async () => {
      const mockCouncil = [{ id: 1, role: 'Role', name: 'Jane', sequence: 1 }];
      mockClient.getEntries.mockResolvedValue({ items: mockCouncil.map(item => ({ sys: { id: item.id }, fields: { role: item.role, name: item.name, sequence: item.sequence } })) });

      const response = await request(getApp()).get('/api/council');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCouncil);
      expect(mockClient.getEntries).toHaveBeenCalledWith({ content_type: 'council' });
    });
  });

  // describe('GET /api/video-list', () => {
  //   it('should return video list', async () => {
  //     const mockVideos = [{ id: 'vid1', title: 'Mt. Horeb Lutheran Church Service', link: 'https://www.youtube.com/watch?v=vid1', embedLink: 'https://www.youtube.com/embed/vid1', date: '2023-01-01', author: 'Author' }];
  //     mockRssParser.parseURL.mockResolvedValue({ items: [{ id: 'yt:video:vid1', title: 'Mt. Horeb Lutheran Church Service', link: 'https://www.youtube.com/watch?v=vid1', pubDate: '2023-01-01', author: 'Author' }] });

  //     const response = await request(getApp()).get('/api/video-list');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockVideos);
  //     expect(mockRssParser.parseURL).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('GET /api/special-announcements', () => {
    beforeEach(() => {
        // Set a fixed "current" date for testing (e.g., Jan 1, 2023)
        mockDate = new Date('2023-01-01T00:00:00Z');
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    });
    it('should return special announcements', async () => {
      const mockAnnouncements = [{ id: 1, publishBeginDate: '2023-01-01', publishEndDate: '2023-01-02', title: 'Announcement', description: 'Desc', type: 'Type', image: null, videoUrl: null, videoId: null }];
      mockClient.getEntries.mockResolvedValue({ items: mockAnnouncements.map(item => ({ sys: { id: item.id }, fields: { publishBeginDate: item.publishBeginDate, publishEndDate: item.publishEndDate, title: item.title, description: item.description, type: item.type, image: item.image ? { fields: { file: item.image } } : null, videoUrl: item.videoUrl } })) });

      const response = await request(getApp()).get('/api/special-announcements');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAnnouncements);
      expect(mockClient.getEntries).toHaveBeenCalledTimes(1);
    });
  });

});