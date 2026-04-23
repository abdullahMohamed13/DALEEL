# Daleel Backend

Express backend for Daleel with Supabase auth, services APIs, categories APIs, and the chatbot logic.

## Current Features

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`
- `GET /services`
- `GET /services/my-services`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`
- `GET /categories`
- `GET /chat`
- `POST /chat`

## Chatbot

The chatbot now runs fully inside the backend.

It uses:

- dataset file: `data/egypt_government_services.json`
- retrieval layer: `lib/chatDataset.js`
- answer generation layer: `lib/chatService.js`
- Groq optional enhancement through `GROQ_API_KEY`

If Groq is not configured, the chatbot still works using local retrieval and deterministic answers from the dataset.

## Environment Variables

Create a local `.env` file from `.env.example`.

Required:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

Recommended for chatbot:

```env
GROQ_API_KEY=your-groq-api-key
CHAT_MODEL=llama3-70b-8192
CHAT_TEMPERATURE=0.1
FRONTEND_ORIGIN=https://your-frontend-domain.vercel.app
```

For local frontend development you can use:

```env
FRONTEND_ORIGIN=http://localhost:5173
```

## Supabase Setup

Run `supabase/setup.sql` in the Supabase SQL editor to:

- create missing tables
- seed categories and services
- enable public reads
- allow authenticated writes on services

## Run Locally

```bash
npm install
npm run dev
```

## Deploy

The backend is ready for Vercel deployment through `vercel.json`.

Before deploying, make sure these variables are set in Vercel:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `GROQ_API_KEY` if you want Groq answers
- `CHAT_MODEL`
- `CHAT_TEMPERATURE`
- `FRONTEND_ORIGIN`

After deployment, point the frontend to the backend URL using:

```env
VITE_API_BASE=https://your-backend-domain.vercel.app
```
