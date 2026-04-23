# Daleel Auth Login API

Backend API for the Daleel project built with Express and Supabase.

## Project Overview

This project provides authentication and service-related endpoints for the Daleel app.

The API currently includes:

- user signup
- user login
- getting the currently logged-in user
- listing services
- listing the authenticated user's services
- creating, updating, and deleting services
- listing categories

## Current Project Structure

- `server.js`
  Main Express app and route registration.
- `routes/auth.js`
  Authentication endpoints.
- `routes/services.js`
  Services endpoints and request normalization.
- `routes/categories.js`
  Categories endpoint.
- `middleware/auth.js`
  Bearer token validation using Supabase Auth.
- `supabaseClient.js`
  Base Supabase client and request-scoped authenticated client.
- `data/fallbackData.js`
  Sample fallback data for services and categories.
- `supabase/setup.sql`
  SQL setup for categories, seed data, and RLS policies.

## Fixes Applied

The repository had a few structural and runtime issues. These were fixed as follows:

- fixed protected routes so authenticated requests use the logged-in user's token with Supabase
- fixed `DELETE /services/:id`, which was incorrectly nested inside the update route
- added a real `GET /categories` route
- connected `/categories` in the main server
- improved validation in `signup` and `login`
- improved route-level error messages
- added local server startup while keeping Vercel compatibility
- added fallback sample data so empty or missing tables do not break public reads
- documented the required Supabase SQL setup

## Current API Behavior

### Auth

- `POST /auth/signup`
  Creates a new user in Supabase Auth.
- `POST /auth/login`
  Logs in the user and returns the session with `access_token`.
- `GET /auth/me`
  Returns the authenticated user.

### Services

- `GET /services`
  Returns data from the `services` table if available.
  If the table is empty, it returns fallback sample data.
- `GET /services/my-services`
  Requires a token.
  Returns the authenticated view of services.
- `POST /services`
  Requires a token.
  Accepts `name` or `title`, plus `description`, `price`, and optional `image_url`.
- `PUT /services/:id`
  Requires a token.
  Updates allowed service fields.
- `DELETE /services/:id`
  Requires a token.
  Deletes a service by id.

### Categories

- `GET /categories`
  Returns data from the `categories` table if available.
  If the table does not exist or is empty, it returns fallback sample data.

## Current Supabase State

The connected Supabase project currently exposes a `services` table with these working columns:

- `id`
- `name`
- `description`
- `price`
- `image_url`
- `created_at`

Important notes about the current database state:

- the `categories` table is not available yet
- the `services` table is publicly readable, but currently empty
- authenticated writes to `services` are blocked by Supabase row-level security unless the SQL setup is applied

Because of that, the API now handles the current state safely:

- public reads do not fail when tables are empty or missing
- protected service writes return a clear message when blocked by Supabase policies

## Required Supabase Setup

Run the SQL in [supabase/setup.sql](C:/Users/pc/Documents/Codex/2026-04-23-https-github-com-abdullahMohamed13-daleel/repo/backend/supabase/setup.sql) inside the Supabase SQL editor.

That script will:

- create the `categories` table if it does not exist
- seed categories data
- seed services data when the table is empty
- allow public read access for services and categories
- allow authenticated insert, update, and delete for services

## Authentication

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

Use the `access_token` returned from `POST /auth/login`.

Protected endpoints:

- `GET /auth/me`
- `GET /services/my-services`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Install and Run

```bash
npm install
npm start
```

Default local server:

```text
http://localhost:3000
```

## Endpoints Summary

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`

### Services

- `GET /services`
- `GET /services/my-services`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`

### Categories

- `GET /categories`

## Example Requests

### Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123456!\",\"name\":\"Test User\",\"phone\":\"01000000000\"}"
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123456!\"}"
```

### Get Services

```bash
curl http://localhost:3000/services
```

### Create Service

```bash
curl -X POST http://localhost:3000/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d "{\"name\":\"Home Cleaning\",\"description\":\"Cleaning service\",\"price\":250,\"image_url\":\"https://example.com/image.jpg\"}"
```

### Get Categories

```bash
curl http://localhost:3000/categories
```

## Deployment

The project is configured for deployment on Vercel using `vercel.json`.
