import { expect, type Page } from "@playwright/test";

export const ROUTES = ["/", "/login", "/register"] as const;

/** Collects console errors, uncaught exceptions and failed network requests. */
export function watchForErrors(page: Page) {
  const problems: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`http ${res.status()}: ${res.url()}`);
  });
  page.on("requestfailed", (req) => {
    // Navigations away from the page abort pending requests; that's not a bug.
    if (req.failure()?.errorText !== "net::ERR_ABORTED") problems.push(`failed: ${req.url()}`);
  });
  return problems;
}

/** Scrolls through the whole page so lazy images load, then returns to the top. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = window.innerHeight / 2;
    // `behavior: "instant"` overrides the page's smooth scrolling so each step lands.
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await wait(100);
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
    await wait(1000); // let lazy images near the footer start loading, as a reader would
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, "page must not scroll horizontally").toBeLessThanOrEqual(0);
}

/** Disables animations so geometry can be measured at its resting (design) position. */
export async function freezeMotion(page: Page) {
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });
}
