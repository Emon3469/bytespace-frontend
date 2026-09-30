/**
 * Absolute site URL used for metadata, robots.txt and the sitemap.
 * Priority: explicit NEXT_PUBLIC_SITE_URL → Vercel production domain → Vercel
 * preview domain → localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
