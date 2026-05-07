const express = require('express');
const cors = require('cors');

function createApp(store) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/messages', (_req, res) => {
    res.json({ messages: store.messages });
  });

  app.post('/api/messages', (req, res) => {
    const { user, text } = req.body || {};

    if (!user || !text) {
      return res.status(400).json({ error: 'user and text are required' });
    }

    const message = {
      id: Date.now().toString(),
      user: String(user).trim(),
      text: String(text).trim(),
      createdAt: new Date().toISOString(),
    };

    if (!message.user || !message.text) {
      return res.status(400).json({ error: 'user and text cannot be empty' });
    }

    store.messages.push(message);
    return res.status(201).json({ message });
  });

  return app;
}

module.exports = { createApp };
