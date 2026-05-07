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
  });

  test('POST /api/messages creates message', async () => {
    const res = await request(app).post('/api/messages').send({ user: 'Ali', text: 'Hello' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message.user).toBe('Ali');
    expect(res.body.message.text).toBe('Hello');
  });

  test('GET /api/messages lists messages', async () => {
    await request(app).post('/api/messages').send({ user: 'Ali', text: 'Hello' });
    const res = await request(app).get('/api/messages');
    expect(res.statusCode).toBe(200);
    expect(res.body.messages).toHaveLength(1);
  });
});
