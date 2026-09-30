import { chromium, type FullConfig } from "@playwright/test";

/**
 * Warm-up: a freshly started `next start` optimises every image on first
 * request. Visiting each page once at every tested viewport fills that cache
 * so the real tests measure the app, not a cold image optimiser.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL ?? "http://localhost:3200";
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    for (const project of config.projects) {
      const viewport = project.use.viewport ?? { width: 1440, height: 1024 };
      const page = await browser.newPage({ viewport, deviceScaleFactor: project.use.deviceScaleFactor ?? 1 });
      for (const route of ["/", "/login", "/register"]) {
        await page.goto(new URL(route, baseURL).toString(), { waitUntil: "load", timeout: 120_000 });
        await page.evaluate(async () => {
          const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
          for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
            window.scrollTo({ top: y, behavior: "instant" });
            await wait(150);
          }
          for (const img of document.images) {
            if (!img.complete) {
              img.scrollIntoView({ block: "center", behavior: "instant" });
              await wait(200);
            }
          }
        });
        await page.waitForLoadState("networkidle", { timeout: 120_000 });
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
}
