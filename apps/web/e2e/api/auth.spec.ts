import { expect, test } from "@playwright/test";
import { expectJwt, expectUuid } from "../helpers/assertions";
import { getE2EUser } from "../helpers/env";

const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/v1";

test.describe("Auth API", () => {
  test("returns access token and public user after login", async ({
    request,
  }) => {
    const { email, password } = getE2EUser();

    const response = await request.post(`${apiURL}/auth/login`, {
      data: {
        email,
        password,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expectJwt(body.accessToken);
    expectUuid(body.user.id);

    expect(body.user).toMatchObject({
      email,
      name: "Test User",
      role: "USER",
    });

    expect(body.user).not.toHaveProperty("passwordHash");
  });
});
