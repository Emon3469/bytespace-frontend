import { expect, test } from "@playwright/test";

test.describe("register form", () => {
  test("submits valid data, shows a pending state and redirects home", async ({ page }) => {
    await page.route("**/register", async (route) => {
      // Slow the Server Action down so the pending state is observable.
      if (route.request().method() === "POST") await new Promise((r) => setTimeout(r, 800));
      await route.continue();
    });
    await page.goto("/register");
    await page.getByLabel("Full Name").fill("Jamie Davis");
    await page.getByLabel("Email").fill("designer@example.com");
    await page.getByLabel("Password").fill("a-strong-password");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("button", { name: "Creating…" })).toBeDisabled();
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  });

  test("blocks empty and invalid submissions", async ({ page }) => {
    await page.goto("/register");
    const submit = page.getByRole("button", { name: "Continue" });

    await submit.click();
    await expect(page).toHaveURL(/\/register$/);
    expect(await page.getByLabel("Full Name").evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBe(true);

    await page.getByLabel("Full Name").fill("Jamie Davis");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Password").fill("short");
    await submit.click();
    await expect(page).toHaveURL(/\/register$/);
    expect(await page.getByLabel("Email").evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);
    expect(await page.getByLabel("Password").evaluate((el: HTMLInputElement) => el.validity.tooShort)).toBe(true);
  });

  test("submits valid data and redirects home", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Full Name").fill("Jamie Davis");
    await page.getByLabel("Email").fill("designer@example.com");
    await page.getByLabel("Password").fill("a-strong-password");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  });

  test("can be completed with the keyboard only", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow is covered on desktop and tablet");
    await page.goto("/register");
    await page.getByLabel("Full Name").focus();
    await page.keyboard.type("Jamie Davis");
    await page.keyboard.press("Tab");
    await page.keyboard.type("designer@example.com");
    await page.keyboard.press("Tab");
    await page.keyboard.type("a-strong-password");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  });
});

test.describe("login form", () => {
  test("requires both fields", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("signs in with valid data", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("designer@example.com");
    await page.getByLabel("Password").fill("secret-password");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  });
});

test("hero search submits the query", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: /Search courses/ });
  await search.fill("figma");
  await search.press("Enter");
  await expect(page).toHaveURL(/\/\?q=figma$/);
});

test("newsletter requires a valid email", async ({ page }) => {
  await page.goto("/");
  const email = page.getByRole("textbox", { name: "Email address" });
  await email.fill("nope");
  await page.locator("footer").getByRole("button", { name: "Search" }).click();
  expect(await email.evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);
  await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("register still works and never puts credentials in the URL", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Full Name").fill("Jamie Davis");
    await page.getByLabel("Email").fill("designer@example.com");
    await page.getByLabel("Password").fill("a-strong-password");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    expect(page.url()).not.toContain("password");
  });

  test("login still works without client-side JavaScript", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("designer@example.com");
    await page.getByLabel("Password").fill("secret-password");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    expect(page.url()).not.toContain("secret");
  });
});
