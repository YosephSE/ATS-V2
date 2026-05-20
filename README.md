# Application Tracking System (ATS)

ATS is a full-stack Next.js application for managing recruitment workflows. It includes candidate registration, admin approval, job posting, application tracking, profile management, statistics, email notifications, file uploads, and Gemini-powered application scoring.

## Features

- Candidate and admin authentication with HTTP-only cookies
- Candidate job browsing, applications, and profile management
- Admin job posting, editing, application review, and statistics
- Super admin approval flow for new admins
- Resume/application scoring with Google Gemini
- Firebase Storage integration for uploaded files
- MongoDB persistence with Mongoose models

## Tech Stack

- Next.js App Router
- React
- Redux Toolkit
- MongoDB with Mongoose
- Firebase Storage
- Gemini application scoring
- Nodemailer email delivery

## Project Structure

```text
app/                 Next.js pages, layouts, and API route handlers
components/          Shared UI components
config/              Client-side service configuration
customHooks/         Shared React hooks
lib/server/          Server-only database, auth, model, email, and scoring code
redux/               Redux store, slices, and API base path
types/               Shared TypeScript types
utils/               Client utilities
public/              Static assets
```

## Local Setup

Install dependencies from the repository root:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build locally:

```bash
pnpm build
```

Type-check locally:

```bash
pnpm typecheck
```

Run a production build locally:

```bash
pnpm start
```

## Environment Variables

Create a root `.env.local` file for local development and configure these values:

```bash
MONGO_URI=your_database_connection_string
SECRET_KEY=your_jwt_secret
API_KEY=your_gemini_api_key
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## API

The backend API now lives in the Next.js App Router under `app/api`. Client code should use same-origin `/api/*` paths.

Main API areas:

- `/api/candidates/*`
- `/api/admins/*`
- `/api/jobs/*`
- `/api/applications/*`

Server-only helpers, database models, auth utilities, email delivery, and scoring logic live under `lib/server`.

## Deployment

Deploy the repository root as a Next.js project on Vercel.

- Install command: `pnpm install`
- Build command: `pnpm build`
- Node.js: `20.9.0` or newer
