require('dotenv').config();

const http = require('http');
const path = require('path');
const express = require('express');
const { randomUUID } = require('crypto');
const { Server } = require('socket.io');
const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const store = { messages: [] };

const app = createApp(store);
app.use(express.static(path.join(__dirname, '..', 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: CORS_ORIGIN },
});

io.on('connection', (socket) => {
  socket.emit('chat:history', store.messages);

  socket.on('chat:message', (payload = {}) => {
    const user = String(payload.user || '').trim();
    const text = String(payload.text || '').trim();

    if (!user || !text) {
      return;
    }

    const message = {
      id: randomUUID(),
      user,
      text,
      createdAt: new Date().toISOString(),
    };

    store.messages.push(message);
    io.emit('chat:message', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
