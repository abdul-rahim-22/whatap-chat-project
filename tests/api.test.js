const request = require('supertest');
const { createApp } = require('../src/app');

describe('Chat API', () => {
  let app;
  const store = { messages: [] };

  beforeEach(() => {
    store.messages = [];
    app = createApp(store);
  });

  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/messages validates input', async () => {
    const res = await request(app).post('/api/messages').send({ user: '', text: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('user and text are required');
  });

  test('POST /api/messages creates message', async () => {
    const res = await request(app).post('/api/messages').send({ user: 'Ali', text: 'Hello' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message.user).toBe('Ali');
    expect(res.body.message.text).toBe('Hello');
    expect(res.body.message.id).toEqual(expect.any(String));
    expect(res.body.message.createdAt).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(res.body.message.createdAt))).toBe(false);
  });

  test('GET /api/messages lists messages', async () => {
    await request(app).post('/api/messages').send({ user: 'Ali', text: 'Hello' });
    const res = await request(app).get('/api/messages');
    expect(res.statusCode).toBe(200);
    expect(res.body.messages).toHaveLength(1);
  });
});
