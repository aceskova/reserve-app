import { expect, test } from "@playwright/test";
import { getE2EUser } from "../helpers/env";

const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/v1";
const JWT_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test("login API returns access token and public user", async ({ request }) => {
  const { email, password } = getE2EUser();

  const response = await request.post(`${apiURL}/auth/login`, {
    data: {
      email,
      password,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.accessToken).toEqual(expect.any(String));
  expect(body.accessToken).toMatch(JWT_REGEX);

  expect(body.user).toMatchObject({
    id: expect.stringMatching(UUID_REGEX),
    email,
    name: "Test User",
    role: "USER",
  });

  expect(body.user).not.toHaveProperty("passwordHash");
});
