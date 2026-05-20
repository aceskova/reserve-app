import { expect, test } from "@playwright/test";
import { getE2EUser } from "./helpers/env";

test("user can log in and see dashboard", async ({ page }) => {
  const { email, password } = getE2EUser();

  await page.goto("/login");

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Heslo").fill(password);

  await page.getByRole("button", { name: "Přihlásit se" }).click();

  await expect(page).toHaveURL(/\/dashboard/);

  const main = page.getByRole("main");

  await expect(main.getByRole("heading", { name: /Vítej,/ })).toBeVisible();

  const userSummary = page.getByRole("region", {
    name: "Přihlášený uživatel",
  });

  await expect(userSummary.getByText("Jméno")).toBeVisible();
  await expect(userSummary.getByText("Test User")).toBeVisible();

  await expect(userSummary.getByText("Email")).toBeVisible();
  await expect(userSummary.getByText(email)).toBeVisible();

  await expect(userSummary.getByText("Role")).toBeVisible();
  await expect(userSummary.getByText("USER")).toBeVisible();
});
