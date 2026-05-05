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

## First Commit Goal

The first commit is intended to be a stable hello-world baseline:

- Web app builds
- API app builds
- Prisma package is ready for future migrations
- Deployment targets are documented
