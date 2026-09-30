# ByteSpace — Frontend

A pixel-accurate implementation of the **ByteSpace** Figma design (landing page, plus the Login and Register screens), built with **Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4**.

| Route       | Figma frame      |
| ----------- | ---------------- |
| `/`         | Home (1440×6377) |
| `/login`    | Login (1440×1024) |
| `/register` | Register (1440×1024) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx              # fonts (Poppins, Satoshi, Clash Display) + metadata
    globals.css             # design tokens (@theme) + small utilities
    page.tsx                # landing page
    (auth)/login/page.tsx
    (auth)/register/page.tsx
  components/
    layout/                 # SiteHeader (responsive nav + hamburger), SiteFooter
    home/                   # one component per landing-page section
    auth/                   # AuthLayout, AuthCard, Field, forms, collage
    ui/                     # reusable primitives: Button, Logo, CourseCard,
                            # AvatarStack, FloatingCards, Ornament, Place, SectionHeading
  data/                     # course, testimonial and navigation content
  fonts/                    # self-hosted Satoshi + Clash Display (Fontshare)
public/images/              # every asset exported from the Figma file
```

## Implementation notes

- **Design tokens.** Colours, the type scale (Heading L/M/S/XS, Body L–XS, Label XL–XS), radii and the layered "A" shadow are taken from the Figma styles and declared once in `globals.css` via Tailwind's `@theme`, so they are available as utilities (`text-heading-m`, `bg-lime`, `text-gray-700`, `rounded-card`…).
- **Pixel-accurate layout.** Section spacing, widths and positions come from the Figma node geometry. Desktop screenshots at 1440px were diffed against the Figma render; section boundaries line up exactly, and most elements are within 1–3px (the remaining difference is browser vs. Figma text rasterisation).
- **3D ornaments.** In Figma these are greyscale renders tinted with a colour layer in *hard-light* blend mode and masked to the shape. The same maths was applied offline to the source renders (`public/images/ornaments`), which keeps them transparent and lightweight.
- **Cut-out photos.** The Figma drop shadow follows the photo's alpha channel, so it is implemented as a `filter: drop-shadow()` stack (`drop-shadow-float`) rather than `box-shadow`.
- **Responsive.** Styles are authored desktop-first for the 1440 artboard with overrides at `max-lg` (≤1024px, tablet) and `max-md` (≤768px, mobile). Illustration "stages" keep their exact composition and scale down uniformly on smaller screens.
- **Navigation.** At ≤1024px the links collapse into an accessible hamburger button (`aria-expanded`, `aria-controls`, Escape to close) with a smooth CSS grid-rows transition.
- **Forms.** Login/Register use native constraint validation (required, email, min length), a pending state on submit, and proper labels and autocomplete hints. There is no backend: submitting routes back to the home page.
- **Performance.** `next/image` (AVIF/WebP) for raster images, fonts self-hosted through `next/font`, and only the header, category tabs and auth forms are client components. Everything else is a Server Component.
