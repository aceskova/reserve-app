# Reserve App Web

Next.js web client for Reserve App.

## Local Development

Run from the repository root:

```sh
yarn web:dev
```

Or from this workspace:

```sh
yarn dev
```

The web app runs on:

```txt
http://localhost:3002
```

## Features

- public home page
- login and registration forms
- HTTP-only cookie based web session
- protected dashboard
- training sessions preview on the dashboard
- training sessions overview page

## Environment

For local web/API communication, set the API URL in an ignored env file when
needed:

```env
API_URL="http://localhost:3000"
```

E2E test credentials live in `apps/web/.env.e2e`, created from
`apps/web/.env.e2e.example`.

## Checks

Run from the repository root:

```sh
yarn web:check-types
yarn web:lint
yarn web:test
yarn web:test:e2e
```

## Testing

Vitest and React Testing Library are used for component-level tests.

Playwright is used for browser e2e flows and API-level smoke tests against the
running application.
