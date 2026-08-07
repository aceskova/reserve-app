# Reserve App

Turborepo monorepo for a reservation system built as a portfolio full-stack project.

The app currently includes email/password authentication, JWT-based API access,
HTTP-only cookie sessions for the web client, a protected dashboard, training
session listing and creation, Swagger API documentation, and Playwright tests.

## Apps And Packages

- `apps/web` - Next.js web app
- `apps/api` - NestJS API
- `apps/docs` - Next.js docs app placeholder
- `packages/api-contracts` - shared DTOs, constants, roles, and error codes
- `packages/db` - Prisma schema, migrations, and generated client
- `packages/ui` - shared UI package
- `packages/eslint-config` - shared ESLint config
- `packages/typescript-config` - shared TypeScript config

## Local Development

Install dependencies:

```sh
yarn install
```

Run all development servers:

```sh
yarn dev
```

Default local URLs:

```txt
API: http://localhost:3000
Docs app: http://localhost:3001
Web app: http://localhost:3002
Swagger UI: http://localhost:3000/docs
```

Run a specific app:

```sh
yarn workspace web dev
yarn workspace api dev
yarn workspace docs dev
```

## Environment

Create environment files from examples:

```sh
cp .env.example .env
cp packages/db/.env.example packages/db/.env
cp apps/web/.env.e2e.example apps/web/.env.e2e
```

Important variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="change_me"
JWT_EXPIRES_IN="15m"
API_URL="http://localhost:3000"
CORS_ORIGINS="http://localhost:3002,https://reserve-app-web.vercel.app"
```

Local `.env` files are ignored by Git and must not be committed. Keep real
credentials in local env files or deployment/CI secrets only.

## Database

Local Postgres is available through Docker Compose:

```sh
yarn docker:up
```

Stop local Postgres:

```sh
yarn docker:down
```

Run Prisma migrations:

```sh
yarn db:migrate
```

Generate/build the shared Prisma client:

```sh
yarn db:generate
yarn db:build
```

## Checks

```sh
yarn check-types
yarn lint
yarn build
```

Run package-specific checks:

```sh
yarn api:check-types
yarn web:check-types
yarn contracts:check-types
```

## End-to-End And API Tests

The web app uses Playwright for browser end-to-end flows and API-level smoke
tests against the running application.

Current Playwright coverage includes:

- browser login flow to the protected dashboard
- authenticated user summary check
- API login response contract check

Create a local e2e environment file from the example:

```sh
cp apps/web/.env.e2e.example apps/web/.env.e2e
```

Required variables:

```env
E2E_USER_EMAIL="test@example.com"
E2E_USER_PASSWORD="change-me"
PLAYWRIGHT_API_URL="http://localhost:3000/v1"
```

Run the web e2e tests locally:

```sh
yarn web:test:e2e
```

Open the Playwright UI runner:

```sh
yarn web:test:e2e:ui
```

Run the login test in a visible browser:

```sh
yarn web:test:e2e:headed
```

Run e2e tests against the deployed web app:

```sh
yarn web:test:e2e:prod
```

Local e2e runs start the web app and API automatically when they are not already
running. Production e2e runs use `PLAYWRIGHT_BASE_URL` and do not start local
servers.

For production runs, provide credentials through environment variables:

```sh
PLAYWRIGHT_BASE_URL=https://reserve-app-web.vercel.app \
PLAYWRIGHT_API_URL=https://reserve-app-djf2.onrender.com/v1 \
E2E_USER_EMAIL="test@example.com" \
E2E_USER_PASSWORD="change-me" \
yarn workspace web test:e2e
```

In CI, store `E2E_USER_EMAIL` and `E2E_USER_PASSWORD` as repository or workflow
secrets. Do not store database credentials in Playwright e2e env files; e2e
tests should exercise the app through HTTP/browser flows, not connect directly
to the database.

### Playwright MCP And Agent-Assisted Debugging

Playwright tests in `apps/web/e2e` are the source of truth for repeatable test
coverage.

Playwright MCP can be used as an optional development aid for browser-driven
debugging with an LLM agent. It is useful for exploring pages, checking
accessible names, finding stable locators, and understanding why an e2e test
fails. The findings should be turned into normal Playwright tests committed to
the repo.

Typical workflow:

1. Run the app locally.
2. Use Playwright MCP or Playwright UI mode to inspect the page.
3. Choose stable user-facing locators such as roles, labels, and accessible
   names.
4. Commit the resulting `.spec.ts` test, not the exploratory browser session.

## Deploy

### Web

Deploy `apps/web` to Vercel.

- Production: `https://reserve-app-web.vercel.app`
- Root directory: `apps/web`
- Install command: `yarn install`
- Build command: `yarn build`

### API

Deploy `apps/api` to Render.

- Production docs: `https://reserve-app-djf2.onrender.com/docs`
- Root directory: repository root
- Install command: `yarn install`
- Build command: `yarn turbo run build --filter=api`
- Start command: `yarn workspace api start:prod`

### Database

Use Supabase Postgres and set `DATABASE_URL` in the API deployment environment.

## API Documentation

The NestJS API exposes an OpenAPI specification through Swagger UI.

- Local: `http://localhost:3000/docs`
- Production: `https://reserve-app-djf2.onrender.com/docs`

The documented API routes are versioned under `/v1`.

## Auth API

The API currently supports email and password authentication.

```txt
POST /v1/auth/register  -> 201 Created
POST /v1/auth/login     -> 200 OK
GET /v1/auth/me         -> 200 OK
```

- `POST /v1/auth/register` creates a user and stores a hashed password.
- `POST /v1/auth/login` verifies credentials and returns a JWT access token.
- `GET /v1/auth/me` verifies a JWT access token and returns the current user.

Successful login response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "name": "Test User",
    "role": "USER",
    "createdAt": "2026-05-07T10:00:00.000Z",
    "updatedAt": "2026-05-07T10:00:00.000Z"
  }
}
```

Authenticated requests can provide the access token in one of two ways.

Mobile, API clients, and manual Swagger/Postman tests can use the
`Authorization` header:

```txt
Authorization: Bearer <accessToken>
```

Browser-based web clients can use the HTTP-only cookie set by the Next.js
server action after login:

```txt
Cookie: accessToken=<accessToken>
```

Web authentication flow:

1. `POST /v1/auth/login` returns a JWT access token.
2. The Next.js login server action stores the token in an HTTP-only
   `accessToken` cookie.
3. Server-rendered protected pages read the cookie and call
   `GET /v1/auth/me`.
4. Authenticated web server actions read the same cookie and forward the JWT to
   protected API endpoints through the `Authorization` header.
5. Logout deletes the `accessToken` cookie and redirects the user to `/login`.

## Training Sessions API

Training sessions are the first reservation-domain resource in the app.

```txt
GET /v1/training-sessions       -> 200 OK
GET /v1/training-sessions/:id   -> 200 OK
POST /v1/training-sessions      -> 201 Created
```

- `GET /v1/training-sessions` returns all training sessions ordered by start
  time.
- `GET /v1/training-sessions/:id` returns one training session.
- `POST /v1/training-sessions` creates a training session and requires a valid
  JWT. Only users with role `TRAINER` or `ADMIN` can create training sessions.
- The web client exposes a role-protected `/training-sessions/new` page for
  creating training sessions. Preset durations are calculated server-side before
  sending `startsAtUtc` and `endsAtUtc` to the API.

Training session response shape:

```json
{
  "trainingSession": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Joga",
    "description": "Joga description",
    "trainer": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Test Trainer"
    },
    "startsAtUtc": "2026-12-31T17:00:00.000Z",
    "endsAtUtc": "2026-12-31T18:00:00.000Z",
    "capacity": 12,
    "priceCents": 25000,
    "currency": "CZK",
    "createdAt": "2026-05-07T10:00:00.000Z",
    "updatedAt": "2026-05-07T10:00:00.000Z"
  }
}
```
