import { expect, test } from "@playwright/test";
import { freezeMotion } from "./helpers";

/**
 * Geometry checks against the 1440px Figma artboard (node positions taken from
 * the design file). Tolerance covers sub-pixel text rasterisation only.
 */
test.describe("design fidelity @1440", () => {
  test.skip(({ viewport }) => viewport?.width !== 1440, "desktop artboard only");

  test("home page sections sit at their Figma coordinates", async ({ page }) => {
    await page.goto("/");
    await freezeMotion(page);

    const box = async (selector: string) => {
      const b = (await page.locator(selector).first().boundingBox())!;
      const scrollY = await page.evaluate(() => window.scrollY);
      return { x: b.x, y: b.y + scrollY, w: b.width, h: b.height };
    };

    const expectNear = (actual: number, expected: number, label: string, tol = 2) =>
      expect(Math.abs(actual - expected), `${label}: got ${actual}, expected ${expected}`).toBeLessThanOrEqual(tol);

    expectNear((await box("h1")).y, 169, "hero heading top");
    expectNear((await box("#courses article")).x, 120, "first course card x");
    expectNear((await box("#courses article")).y, 1768, "first course card y");
    expectNear((await box('[aria-label="Why ByteSpace"]')).y, 3120, "growth section top");
    expectNear((await box("#creators")).y, 4580, "CTA top");
    expectNear((await box("#creators")).h, 488, "CTA height");
    expectNear((await box("footer")).y, 5852, "footer top");

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    expectNear(height, 6377, "total page height", 3);
  });

  test("auth card matches the Register/Login frame", async ({ page }) => {
    for (const route of ["/login", "/register"]) {
      await page.goto(route);
      const card = (await page.locator("main > section").boundingBox())!;
      expect(Math.round(card.x)).toBe(741);
      expect(Math.round(card.y)).toBe(120);
      expect(Math.round(card.width)).toBe(579);
      expect(Math.round(card.height)).toBe(784);
    }
  });
});
