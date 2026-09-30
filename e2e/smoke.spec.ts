import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, ROUTES, scrollThrough, watchForErrors } from "./helpers";

const titles: Record<(typeof ROUTES)[number], RegExp> = {
  "/": /ByteSpace — Get Access to Hundreds of Courses/,
  "/login": /Sign In \| ByteSpace/,
  "/register": /Create an Account \| ByteSpace/,
};

for (const route of ROUTES) {
  test.describe(`page ${route}`, () => {
    test("loads without errors, broken requests or broken images", async ({ page }) => {
      test.setTimeout(90_000);
      const problems = watchForErrors(page);
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(titles[route]);

      await scrollThrough(page);
      await page.waitForLoadState("networkidle");

      // Images a reader can actually see: rendered and horizontally inside the viewport.
      // (Decorative shapes parked off-canvas inside overflow:hidden sections are
      // correctly never fetched by native lazy loading.)
      const unloaded = () =>
        page.$$eval("img", (imgs) =>
          imgs
            .filter((img) => {
              const r = img.getBoundingClientRect();
              return img.checkVisibility({ visibilityProperty: true }) && r.right > 0 && r.left < window.innerWidth;
            })
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.getAttribute("src")),
        );
      // Chrome defers lazy images that were scrolled past quickly; view each one as a reader would.
      await page.evaluate(async () => {
        for (const img of document.images) {
          if (img.complete) continue;
          img.scrollIntoView({ block: "center", behavior: "instant" });
          await new Promise((r) => setTimeout(r, 300));
        }
      });
      // A cold server optimises every image on first request, so allow generous time.
      await expect.poll(unloaded, { message: "all visible images must load", timeout: 60_000 }).toEqual([]);
      expect(problems).toEqual([]);
    });

    test("has exactly one h1, a lang attribute and a meta description", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    });

    test("never scrolls horizontally", async ({ page }) => {
      await page.goto(route);
      await scrollThrough(page);
      await expectNoHorizontalOverflow(page);
    });
  });
}

test("unknown routes return a 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});
