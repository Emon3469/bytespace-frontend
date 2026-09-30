# ByteSpace — Frontend

A pixel-accurate implementation of the **ByteSpace** Figma design (landing page, plus the Login and Register screens), built with **Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4**.

| Route       | Figma frame          |
| ----------- | -------------------- |
| `/`         | Home (1440×6377)     |
| `/login`    | Login (1440×1024)    |
| `/register` | Register (1440×1024) |

## Getting started

Requires **Node.js 22** (see `.nvmrc`).

```bash
npm ci
npm run dev          # http://localhost:3000
```

| Script                 | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run build`        | Production build                                         |
| `npm start`            | Serve the production build                               |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)      |
| `npm run typecheck`    | `tsc --noEmit`                                           |
| `npm run format:check` | Prettier (with Tailwind class sorting)                   |
| `npm test`             | Unit & component tests (Vitest + Testing Library)        |
| `npm run test:e2e`     | End-to-end tests (Playwright) against a production build |
| `npm run test:all`     | Everything above in sequence                             |

## Project structure

```
src/
  app/
    layout.tsx              # fonts (Poppins, Satoshi, Clash Display) + metadata
    globals.css             # design tokens (@theme), utilities, motion
    page.tsx                # landing page
    (auth)/login, register  # auth pages
    (auth)/actions.ts       # Server Actions for the auth forms
    robots.ts, sitemap.ts, opengraph-image.png
  components/
    layout/                 # SiteHeader (responsive nav + hamburger), SiteFooter
    home/                   # one component per landing-page section
    auth/                   # AuthLayout, AuthCard, Field, forms, collage
    ui/                     # reusable primitives: Button, Logo, CourseCard,
                            # AvatarStack, FloatingCards, Ornament, Place, SectionHeading
  data/                     # course, testimonial and navigation content
  lib/                      # helpers (cn, auth validation, site URL)
  fonts/                    # self-hosted Satoshi + Clash Display (Fontshare)
  __tests__/                # unit & component tests
e2e/                        # Playwright end-to-end tests
public/images/              # every asset exported from the Figma file
```

## Implementation notes

- **Design tokens.** Colours, the type scale (Heading L/M/S/XS, Body L–XS, Label XL–XS), radii and the layered "A" shadow are taken from the Figma styles and declared once in `globals.css` via Tailwind's `@theme`, so they are available as utilities (`text-heading-m`, `bg-lime`, `text-gray-700`, `rounded-card`…).
- **Pixel-accurate layout.** Section spacing, widths and positions come from the Figma node geometry. Desktop screenshots at 1440px were diffed against the Figma render; section boundaries line up exactly, and most elements are within 1–3px (the remaining difference is browser vs. Figma text rasterisation). Key coordinates are asserted in `e2e/design-fidelity.spec.ts`.
- **3D ornaments.** In Figma these are greyscale renders tinted with a colour layer in _hard-light_ blend mode and masked to the shape. The same maths was applied offline to the source renders (`public/images/ornaments`), which keeps them transparent and lightweight.
- **Cut-out photos.** The Figma drop shadow follows the photo's alpha channel, so it is implemented as a `filter: drop-shadow()` stack (`drop-shadow-float`) rather than `box-shadow`.
- **Responsive.** Styles are authored desktop-first for the 1440 artboard with overrides at `max-lg` (≤1024px, tablet) and `max-md` (≤768px, mobile). Illustration "stages" keep their exact composition and scale down uniformly on smaller screens.
- **Navigation.** At ≤1024px the links collapse into an accessible hamburger button (`aria-expanded`, `aria-controls`, Escape to close) with a smooth CSS grid-rows transition.
- **Forms.** Login/Register submit to **Server Actions**: they work before JavaScript loads (progressive enhancement), never put credentials in the URL, and validate on the server as well as in the browser. There is no backend yet — `src/app/(auth)/actions.ts` is the single place to call a real auth API.
- **Motion.** Entrance, float and scroll-reveal animations are purely additive (the resting layout is the Figma layout) and are disabled for users who prefer reduced motion.
- **Performance.** `next/image` (WebP) for raster images, fonts self-hosted through `next/font`, and only the header, category tabs and auth forms are client components. Every page is statically prerendered.

## Testing

- **Unit / component** (`src/__tests__`): header menu behaviour and ARIA state, category filter, course card content, auth forms (validation, pending state, server errors), validation rules, and asset integrity.
- **End-to-end** (`e2e/`, desktop 1440px · tablet 900px · mobile 375px): every page loads with no console errors, failed requests or broken images; no horizontal overflow; navigation and anchor links; forms with and without JavaScript; keyboard-only completion; every internal link resolves; 404 handling; WCAG 2.1 A/AA checks with axe; reduced-motion support; and pixel-geometry checks against the Figma artboard.

> **Accessibility note:** the design's muted grey (`#82868E`) body copy on white has a contrast ratio of 3.6:1, below the WCAG AA 4.5:1 guideline. It is kept to match the approved design 1:1, so the axe `color-contrast` rule is excluded; all other A/AA rules pass. Darkening the token in `globals.css` would resolve it.

## Deployment

Deployed on **Vercel** (framework preset: Next.js, Node 22). No environment variables are required; the canonical URL for metadata, `robots.txt` and `sitemap.xml` is detected from Vercel's system variables (`NEXT_PUBLIC_SITE_URL` can override it — see `.env.example`). CI (`.github/workflows/ci.yml`) runs lint, type-check, formatting, unit tests, build and the Playwright suite on every push and pull request.
