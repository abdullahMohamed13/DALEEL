# Daleel

Daleel is a multi-part project for Egyptian government services.

## Current Structure

```text
DALEEL/
|- frontend/   React web app and chatbot UI
|- backend/    Express API, auth, services, categories, and chatbot logic
|- mobile/     Mobile app workspace
```

The chatbot logic now lives inside `backend/`. The old standalone `ai/` service is no longer part of the project flow.

## Backend Summary

The backend currently provides:

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`
- `GET /services`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`
- `GET /categories`
- `GET /chat`
- `POST /chat`

### Chatbot

The chatbot uses:

- local dataset in `backend/data/egypt_government_services.json`
- retrieval logic inside `backend/lib/chatDataset.js` and `backend/lib/chatService.js`
- optional Groq enhancement through `GROQ_API_KEY`
- JSON-mode style response handling in the backend before sending data to the frontend
- session-based chat history plus clarification prompts and quick reply suggestions

If `GROQ_API_KEY` is missing, the chatbot still works with deterministic retrieval from the local dataset.

## Frontend Summary

The frontend chatbot sends requests to the backend instead of the old external AI endpoint. Set:

```env
VITE_API_BASE=http://localhost:3000
```

or your deployed backend URL.

## Backend Environment

Create `backend/.env` from `backend/.env.example`.

Example:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
GROQ_API_KEY=your_groq_api_key
CHAT_MODEL=llama-3.3-70b-versatile
CHAT_TEMPERATURE=0.6
FRONTEND_ORIGIN=http://localhost:5173
```

## Running Locally

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Git Workflow

- Work on your own branch
- Do not push directly to `main`
- Open a pull request when your part is ready
