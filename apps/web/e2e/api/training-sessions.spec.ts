import { expect, test } from "@playwright/test";
import { expectUuid } from "../helpers/assertions";
import { getE2ETrainer, getE2EUser } from "../helpers/env";

const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/v1";

test.describe("Training Sessions API", () => {
  test("rejects create request from regular user", async ({ request }) => {
    const { email, password } = getE2EUser();

    const loginResponse = await request.post(`${apiURL}/auth/login`, {
      data: { email, password },
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const response = await request.post(`${apiURL}/training-sessions`, {
      headers: {
        Authorization: `Bearer ${loginBody.accessToken}`,
      },
      data: {
        title: "Test lekce",
        startsAtUtc: "2026-12-31T17:00:00.000Z",
        endsAtUtc: "2026-12-31T18:00:00.000Z",
        capacity: 10,
        priceCents: 25000,
        currency: "CZK",
      },
    });

    expect(response.status()).toBe(403);
  });

  test("creates training session for trainer", async ({ request }) => {
    const title = `E2E lekce ${Date.now()}`;

    const { email, password } = getE2ETrainer();

    const loginResponse = await request.post(`${apiURL}/auth/login`, {
      data: { email, password },
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const response = await request.post(`${apiURL}/training-sessions`, {
      headers: {
        Authorization: `Bearer ${loginBody.accessToken}`,
      },
      data: {
        title,
        startsAtUtc: "2026-12-31T17:00:00.000Z",
        endsAtUtc: "2026-12-31T18:00:00.000Z",
        capacity: 10,
        priceCents: 25000,
        currency: "CZK",
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.trainingSession).toMatchObject({
      title,
      capacity: 10,
      priceCents: 25000,
      currency: "CZK",
    });

    expectUuid(body.trainingSession.id);
  });
});
