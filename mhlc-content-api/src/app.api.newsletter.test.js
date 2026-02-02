import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import apiRouter from './apiRouter.js';

// Mock all the services
vi.mock('../src/services/contentService.js', () => ({
  getMenuItems: vi.fn(),
  getContentPages: vi.fn(),
  getContentBlocks: vi.fn(),
  getNewsTypes: vi.fn(),
  getNewsEntries: vi.fn(),
  getNewsEntry: vi.fn(),
  getBlogPosts: vi.fn(),
  getBlogPost: vi.fn(),
  getChurchInfo: vi.fn(),
  getCouncil: vi.fn(),
  getStaff: vi.fn(),
  getSpecialAnnouncements: vi.fn(),
  getUpcomingEvents: vi.fn(),
  getEventDetails: vi.fn(),
  clearCachedContent: vi.fn(),
}));

vi.mock('../src/services/donationService.js', () => ({
  getPaypalUrl: vi.fn(),
}));

vi.mock('../src/services/youtubeService.js', () => ({
  getVideosList: vi.fn(),
}));

vi.mock('../src/services/mailService.js', () => ({
  addMemberToNewsletter: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('../src/services/analyticsService.js', () => ({
  getEvents: vi.fn(),
}));

vi.mock('../src/services/securityService.js', () => ({
  authenticate: vi.fn(),
}));

vi.mock('../src/utils/jwtUtils.js', () => ({
  jwtSign: vi.fn(),
}));

vi.mock('../src/utils/mailTemplates.js', () => ({
  getDonationRequestEmailTemplate: vi.fn(),
}));

vi.mock('../src/utils/logger.js', () => ({
  getLogger: vi.fn(() => ({
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  })),
}));

import {
  getMenuItems,
  getContentPages,
  getContentBlocks,
  getNewsTypes,
  getNewsEntries,
  getNewsEntry,
  getBlogPosts,
  getBlogPost,
  getChurchInfo,
  getCouncil,
  getStaff,
  getSpecialAnnouncements,
  getUpcomingEvents,
  getEventDetails,
  clearCachedContent,
} from './services/contentService.js';
import { getPaypalUrl } from './services/donationService.js';
import { getVideosList } from './services/youtubeService.js';
import { addMemberToNewsletter, sendMail } from './services/mailService.js';
import { getEvents } from './services/analyticsService.js';
import { authenticate } from './services/securityService.js';
import { jwtSign } from './utils/jwtUtils.js';
import { getDonationRequestEmailTemplate } from './utils/mailTemplates.js';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('API Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/church-info', () => {
    it('should return church info', async () => {
      const mockInfo = { name: 'Test Church' };
      getChurchInfo.mockResolvedValue(mockInfo);

      const response = await request(app).get('/api/church-info');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockInfo);
      expect(getChurchInfo).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      getChurchInfo.mockRejectedValue(new Error('Test error'));

      const response = await request(app).get('/api/church-info');

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/menu-items', () => {
    it('should return menu items', async () => {
      const mockItems = [{ id: 1, name: 'Home' }];
      getMenuItems.mockResolvedValue(mockItems);

      const response = await request(app).get('/api/menu-items');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockItems);
      expect(getMenuItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/content-pages', () => {
    it('should return content pages', async () => {
      const mockPages = [{ id: 1, title: 'About' }];
      getContentPages.mockResolvedValue(mockPages);

      const response = await request(app).get('/api/content-pages');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPages);
      expect(getContentPages).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/content-blocks', () => {
    it('should return content blocks', async () => {
      const mockBlocks = [{ id: 1, content: 'Block' }];
      getContentBlocks.mockResolvedValue(mockBlocks);

      const response = await request(app).get('/api/content-blocks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBlocks);
      expect(getContentBlocks).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/news-types', () => {
    it('should return news types', async () => {
      const mockTypes = [{ id: 1, name: 'Announcement' }];
      getNewsTypes.mockResolvedValue(mockTypes);

      const response = await request(app).get('/api/news-types');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTypes);
      expect(getNewsTypes).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/events', () => {
    it('should return upcoming events with default page', async () => {
      const mockEvents = { events: [], total: 0 };
      getUpcomingEvents.mockResolvedValue(mockEvents);

      const response = await request(app).get('/api/events');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(getUpcomingEvents).toHaveBeenCalledWith(1);
    });

    it('should return upcoming events with specified page', async () => {
      const mockEvents = { events: [], total: 0 };
      getUpcomingEvents.mockResolvedValue(mockEvents);

      const response = await request(app).get('/api/events?page=2');

      expect(response.status).toBe(200);
      expect(getUpcomingEvents).toHaveBeenCalledWith('2');
    });
  });

  describe('GET /api/events/:eventId', () => {
    it('should return event details', async () => {
      const mockDetails = { id: '123', title: 'Event' };
      getEventDetails.mockResolvedValue(mockDetails);

      const response = await request(app).get('/api/events/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDetails);
      expect(getEventDetails).toHaveBeenCalledWith('123');
    });
  });

  describe('GET /api/news', () => {
    it('should return news entries with default page', async () => {
      const mockNews = { entries: [], total: 0 };
      getNewsEntries.mockResolvedValue(mockNews);

      const response = await request(app).get('/api/news');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews);
      expect(getNewsEntries).toHaveBeenCalledWith(1);
    });

    it('should return news entries with specified page', async () => {
      const mockNews = { entries: [], total: 0 };
      getNewsEntries.mockResolvedValue(mockNews);

      const response = await request(app).get('/api/news?page=3');

      expect(response.status).toBe(200);
      expect(getNewsEntries).toHaveBeenCalledWith('3');
    });
  });

  describe('GET /api/news/:newsId', () => {
    it('should return news entry', async () => {
      const mockEntry = { id: '456', title: 'News' };
      getNewsEntry.mockResolvedValue(mockEntry);

      const response = await request(app).get('/api/news/456');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntry);
      expect(getNewsEntry).toHaveBeenCalledWith('456');
    });
  });

  describe('GET /api/blog-posts', () => {
    it('should return blog posts with default page', async () => {
      const mockPosts = { posts: [], total: 0 };
      getBlogPosts.mockResolvedValue(mockPosts);

      const response = await request(app).get('/api/blog-posts');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPosts);
      expect(getBlogPosts).toHaveBeenCalledWith(1);
    });

    it('should return blog posts with specified page', async () => {
      const mockPosts = { posts: [], total: 0 };
      getBlogPosts.mockResolvedValue(mockPosts);

      const response = await request(app).get('/api/blog-posts?page=2');

      expect(response.status).toBe(200);
      expect(getBlogPosts).toHaveBeenCalledWith('2');
    });
  });

  describe('GET /api/blog-posts/:blogId', () => {
    it('should return blog post', async () => {
      const mockPost = { id: '789', title: 'Blog' };
      getBlogPost.mockResolvedValue(mockPost);

      const response = await request(app).get('/api/blog-posts/789');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPost);
      expect(getBlogPost).toHaveBeenCalledWith('789');
    });
  });

  describe('GET /api/staff', () => {
    it('should return staff', async () => {
      const mockStaff = [{ id: 1, name: 'John' }];
      getStaff.mockResolvedValue(mockStaff);

      const response = await request(app).get('/api/staff');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockStaff);
      expect(getStaff).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/council', () => {
    it('should return council', async () => {
      const mockCouncil = [{ id: 1, name: 'Jane' }];
      getCouncil.mockResolvedValue(mockCouncil);

      const response = await request(app).get('/api/council');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCouncil);
      expect(getCouncil).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/video-list', () => {
    it('should return video list', async () => {
      const mockVideos = [{ id: 'vid1', title: 'Video' }];
      getVideosList.mockResolvedValue(mockVideos);

      const response = await request(app).get('/api/video-list');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVideos);
      expect(getVideosList).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/special-announcements', () => {
    it('should return special announcements', async () => {
      const mockAnnouncements = [{ id: 1, message: 'Announcement' }];
      getSpecialAnnouncements.mockResolvedValue(mockAnnouncements);

      const response = await request(app).get('/api/special-announcements');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAnnouncements);
      expect(getSpecialAnnouncements).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/donations/paypal', () => {
    it('should create paypal donation url and send email', async () => {
      const mockBody = { amount: 100 };
      const mockUrl = 'https://paypal.com/donate';
      getPaypalUrl.mockResolvedValue(mockUrl);
      getDonationRequestEmailTemplate.mockReturnValue({ subject: 'Donation', body: 'Body' });
      sendMail.mockResolvedValue();

      const response = await request(app)
        .post('/api/donations/paypal')
        .send(mockBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ url: mockUrl });
      expect(getPaypalUrl).toHaveBeenCalledWith(mockBody);
      expect(getDonationRequestEmailTemplate).toHaveBeenCalledWith(mockBody);
      expect(sendMail).toHaveBeenCalledWith(process.env.MAIL_TO_ADDRESS_TREASURER, 'Donation', 'Body');
    });

    it('should handle errors', async () => {
      getPaypalUrl.mockRejectedValue(new Error('Paypal error'));

      const response = await request(app)
        .post('/api/donations/paypal')
        .send({ amount: 100 });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/newsletter/signup', () => {
    it('should add member to newsletter', async () => {
      const mockBody = { email: 'test@example.com' };
      const mockResult = { success: true };
      addMemberToNewsletter.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/api/newsletter/signup')
        .send(mockBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(addMemberToNewsletter).toHaveBeenCalledWith(mockBody);
    });
  });

  describe('POST /api/audit', () => {
    it('should return ok', async () => {
      const response = await request(app).post('/api/audit');

      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/audit/events', () => {
    it('should return audit events', async () => {
      const mockEvents = [{ id: 1, event: 'login' }];
      getEvents.mockResolvedValue(mockEvents);

      const response = await request(app).get('/api/audit/events?monthId=202401');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(getEvents).toHaveBeenCalledWith('202401');
    });
  });

  describe('POST /api/authenticate', () => {
    it('should authenticate user and return token', async () => {
      const mockBody = { userName: 'admin', password: 'pass' };
      authenticate.mockResolvedValue(true);
      jwtSign.mockResolvedValue('token123');

      const response = await request(app)
        .post('/api/authenticate')
        .send(mockBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ authenticated: true });
      expect(response.headers['x-authorization']).toBe('token123');
      expect(authenticate).toHaveBeenCalledWith(mockBody);
      expect(jwtSign).toHaveBeenCalledWith({ userName: 'admin', admin: true });
    });

    it('should return not authenticated', async () => {
      authenticate.mockResolvedValue(false);

      const response = await request(app)
        .post('/api/authenticate')
        .send({ userName: 'admin', password: 'wrong' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ authenticated: false });
      expect(jwtSign).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/content/cache', () => {
    it('should clear cached content', async () => {
      clearCachedContent.mockResolvedValue();

      const response = await request(app).delete('/api/content/cache');

      expect(response.status).toBe(200);
      expect(response.body).toBe(true);
      expect(clearCachedContent).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/content/webhook', () => {
    it('should handle contentful webhook', async () => {
      const mockBody = {
        sys: {
          id: '123',
          contentType: { sys: { id: 'blogPost' } }
        }
      };
      clearCachedContent.mockResolvedValue();

      const response = await request(app)
        .post('/api/content/webhook')
        .send(mockBody);

      expect(response.status).toBe(200);
      expect(response.body).toBe(true);
      expect(clearCachedContent).toHaveBeenCalledWith({ id: '123', contentType: 'blogPost' });
    });
  });
});