# Reserve App API

NestJS API for Reserve App.

## Local Development

Run from the repository root:

```sh
yarn api:dev
```

Or from this workspace:

```sh
yarn dev
```

The API runs on:

```txt
http://localhost:3000
```

Swagger UI is available at:

```txt
http://localhost:3000/docs
```

All API routes are versioned under `/v1`.

## Environment

Required variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="change_me"
JWT_EXPIRES_IN="15m"
CORS_ORIGINS="http://localhost:3002,https://reserve-app-web.vercel.app"
```

The API loads env values from `.env`, the repository root `.env`, and
`packages/db/.env`.

## Main Endpoints

Auth:

```txt
POST /v1/auth/register
POST /v1/auth/login
GET /v1/auth/me
```

Training sessions:

```txt
GET /v1/training-sessions
GET /v1/training-sessions/:id
POST /v1/training-sessions
```

`POST /v1/training-sessions` requires JWT authentication and role `TRAINER` or
`ADMIN`.

## Checks

Run from the repository root:

```sh
yarn api:check-types
yarn api:lint
yarn api:build
```

Package-local test scripts are available through Jest:

```sh
yarn workspace api test
yarn workspace api test:e2e
```
