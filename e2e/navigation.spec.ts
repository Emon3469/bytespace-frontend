import { expect, test } from "@playwright/test";

const isNarrow = (width: number) => width <= 1024;

test.describe("header navigation", () => {
  test("desktop shows inline links; tablet/mobile use an accessible hamburger", async ({ page, viewport }) => {
    await page.goto("/");
    const mainNav = page.getByRole("navigation", { name: "Main" });
    const toggle = page.getByRole("button", { name: "Open menu" });

    if (isNarrow(viewport!.width)) {
      await expect(mainNav).toBeHidden();
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");

      await toggle.click();
      const close = page.getByRole("button", { name: "Close menu" });
      await expect(close).toHaveAttribute("aria-expanded", "true");
      const mobileNav = page.getByRole("navigation", { name: "Mobile" });
      await expect(mobileNav.getByRole("link", { name: "Courses" })).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");

      // Navigate through the mobile menu.
      await toggle.click();
      await mobileNav.getByRole("link", { name: "Sign In" }).click();
      await expect(page).toHaveURL(/\/login$/);
    } else {
      await expect(mainNav).toBeVisible();
      await expect(toggle).toBeHidden();
      await page.getByRole("link", { name: "Join Us" }).first().click();
      await expect(page).toHaveURL(/\/register$/);
    }
  });

  test("Courses link scrolls to the course catalogue", async ({ page, viewport }) => {
    await page.goto("/");
    if (isNarrow(viewport!.width)) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Courses" }).click();
    } else {
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Courses" }).click();
    }
    await expect(page).toHaveURL(/#courses$/);
    await expect(page.getByRole("heading", { name: /Discover Your Passion/ })).toBeInViewport({ timeout: 10_000 });
  });
});

test("'Join as Creator' leads to registration", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Join as Creator" }).click();
  await expect(page).toHaveURL(/\/register$/);
});

test("auth pages link to each other and back home", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Create an account" }).click();
  await expect(page).toHaveURL(/\/register$/);
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole("link", { name: "ByteSpace home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("every internal link resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of ["/", "/login", "/register"]) {
    await page.goto(route);
    for (const href of await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!))) {
      if (href.startsWith("/")) hrefs.add(href.split("#")[0] || "/");
    }
  }
  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
});

test("category chips behave as a single-select filter", async ({ page }) => {
  await page.goto("/");
  const toolbar = page.getByRole("toolbar", {
    name: "Filter courses by category",
  });
  await expect(toolbar.getByRole("button", { name: "Featured" })).toHaveAttribute("aria-pressed", "true");
  await toolbar.getByRole("button", { name: "Web Development" }).click();
  await expect(toolbar.getByRole("button", { name: "Web Development" })).toHaveAttribute("aria-pressed", "true");
  await expect(toolbar.getByRole("button", { pressed: true })).toHaveCount(1);
});
