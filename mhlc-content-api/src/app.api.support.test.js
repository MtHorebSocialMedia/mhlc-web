import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import apiRouter from './apiRouter.js';

// Mock all the services
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

import { getEvents } from './services/analyticsService.js';
import { authenticate } from './services/securityService.js';
import { jwtSign } from './utils/jwtUtils.js';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('API Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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