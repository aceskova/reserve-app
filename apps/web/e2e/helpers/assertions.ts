import { expect } from "@playwright/test";

export const JWT_REGEX =
  /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function expectJwt(value: unknown) {
  expect(value).toEqual(expect.any(String));
  expect(value).toMatch(JWT_REGEX);
}

export function expectUuid(value: unknown) {
  expect(value).toEqual(expect.any(String));
  expect(value).toMatch(UUID_REGEX);
}
