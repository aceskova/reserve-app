# Reserve App

Turborepo monorepo for a reservation app.

## Apps And Packages

- `apps/web` - Next.js web app
- `apps/api` - NestJS API
- `packages/db` - Prisma schema and generated client
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

Run a specific app:

```sh
yarn workspace web dev
yarn workspace api dev
```

## Database

Local Postgres is available through Docker Compose:

```sh
yarn docker:up
```

Stop local Postgres:

```sh
yarn docker:down
```

Create an environment file from the example:

```sh
cp packages/db/.env.example packages/db/.env
```

Required variable:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

## Checks

```sh
yarn check-types
yarn lint
yarn build
```

## Deploy

### Web

Deploy `apps/web` to Vercel.

- Root directory: `apps/web`
- Install command: `yarn install`
- Build command: `yarn build`

### API

Deploy `apps/api` to Render.

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

The documented API routes are versioned under `/v1`, for example:

```txt
POST /v1/auth/register
POST /v1/auth/login
GET /v1/auth/me
```

## Auth

The API currently supports email and password authentication.

- `POST /v1/auth/register` creates a user and stores a hashed password.
- `POST /v1/auth/login` verifies credentials and returns a JWT access token.
- `GET /v1/auth/me` verifies a JWT access token and returns the current user.

Web clients store the access token in an HTTP-only cookie from the Next.js
server layer. API and mobile clients can send the token with the
`Authorization` header.

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

Browser-based web clients can use the HTTP-only cookie set by the Next.js server action after login:

```txt
Cookie: accessToken=<accessToken>
```

Web authentication flow:

1. `POST /v1/auth/login` returns a JWT access token.
2. The Next.js login server action stores the token in an HTTP-only
   `accessToken` cookie.
3. Server-rendered protected pages read the cookie and call
   `GET /v1/auth/me`.
4. Logout deletes the `accessToken` cookie and redirects the user to `/login`.

Current user response:

```json
{
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
