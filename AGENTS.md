# Reserve App Agent Notes

## Collaboration

- The user is learning. Prefer step-by-step explanations and small guided changes.
- Do not implement large changes for the user unless explicitly asked.
- When reviewing code, lead with concrete findings and file references.
- Keep changes focused. Avoid unrelated refactors and metadata churn.

## Safety

- Do not read, print, or edit local secret files unless explicitly requested.
- Never commit `.env`, `.env.local`, `.env.e2e`, database passwords, JWT secrets, or generated reports.
- Treat root `apps/web/app/page.tsx` test-only changes as temporary when the user says so; remind before commit.

## Version-Sensitive Guidance

- This project currently uses Next.js 16, React 19, NestJS 11, Prisma 7, and Zod 4.
- Before giving framework-specific advice, check local package versions in `package.json`.
- For version-sensitive APIs, prefer current official documentation over memory.
- Do not suggest deprecated APIs when the project uses a newer major version.
- For Zod 4, use `z.flattenError(error)` instead of deprecated `error.flatten()`.
- For Next.js App Router, prefer current App Router patterns and avoid Pages Router patterns unless explicitly requested.
- For NestJS-specific implementation details, inspect local code and installed NestJS version first. If unsure, verify against official NestJS documentation.

## Architecture

- The app is a Turborepo monorepo:
  - `apps/web` is the Next.js web client.
  - `apps/api` is the NestJS API.
  - `packages/api-contracts` contains shared API DTOs, constants, roles, and error codes.
  - `packages/db` contains Prisma schema, migrations, and generated client.
- Prefer shared API contracts over duplicated FE/BE DTO types.
- Keep backend validation authoritative. Frontend validation improves UX but must not be trusted as the only guard.

## Next.js Web Conventions

- Prefer Server Components for data loading and protected pages.
- Use Client Components for browser interactivity such as `useState`, `useActionState`, form pending state, and controlled inputs.
- Keep Server Actions server-only with `"use server"`.
- Protected Server Actions must forward the HttpOnly `accessToken` cookie to the Nest API as `Authorization: Bearer <token>`.
- Public auth actions should use public API helpers; protected mutations should use authenticated API helpers.

## Forms And Validation

- Form action state stores raw string values for repopulating form inputs and field errors for UI display.
- Use Zod schemas for form validation and transformations.
- Test schema business logic, boundaries, and transformations rather than every UI detail.
- Prefer small local abstractions like `FormField` only after repetition is real and readability improves.

## Testing

- Use Vitest and React Testing Library for component-level tests.
- Use Vitest for schema/business-form logic tests.
- Use Playwright for browser e2e flows and API-level smoke tests against a running app.
- Keep Playwright locators user-facing and stable: roles, labels, accessible names, and visible text scoped to meaningful regions.
- Avoid DB-polluting e2e tests unless the test data strategy is explicit.

## Verification

- For web changes, run `yarn web:check-types` before reporting completion when feasible.
- For API changes, run `yarn api:check-types` before reporting completion when feasible.
- For shared contracts changes, rebuild/check `@repo/api-contracts` as needed.
