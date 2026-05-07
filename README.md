# whatap-chat-project

A complete realtime chat project (WhatsApp-style basic version) with:

- Node.js + Express REST API
- Socket.IO realtime messaging
- Simple web frontend
- Automated API tests (Jest + Supertest)

## Project Structure

- `src/server.js` - server bootstrap + Socket.IO
- `src/app.js` - Express app + API routes
- `public/` - frontend UI files
- `tests/` - API tests

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open: `http://localhost:3000`

## Production Run

```bash
npm start
```

## API Endpoints

- `GET /api/health`
- `GET /api/messages`
- `POST /api/messages`

Payload for POST:

```json
{
  "user": "Ali",
  "text": "Hello"
}
```

## Tests

```bash
npm test
```
