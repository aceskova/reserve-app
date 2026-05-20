import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

const isCi = Boolean(process.env.CI);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3002";
const apiURL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/v1";
const shouldStartLocalServers = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./e2e",

  fullyParallel: true,

  retries: isCi ? 2 : 0,

  reporter: "html",

  use: {
    baseURL,
    trace: "on-first-retry",
  },

  webServer: shouldStartLocalServers
    ? [
        {
          command: "yarn workspace api dev",
          url: apiURL,
          reuseExistingServer: !isCi,
          timeout: 120_000,
        },
        {
          command: "yarn dev",
          url: baseURL,
          reuseExistingServer: !isCi,
          timeout: 120_000,
        },
      ]
    : undefined,

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
