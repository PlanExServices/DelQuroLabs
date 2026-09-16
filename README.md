# DelQuro Labs

The DelQuro Labs marketing site — a dark, animated, single-page React experience
showcasing the **Loom**, **Aura** and **Vantage** apps.

Built with **Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion**, and
shipped as a self-hosted container (**nginx**) that runs on a private server or
under **Coolify**. No server-side runtime, no database, no external services
beyond Google Fonts.

- Deployment guide: **[DEPLOY.md](DEPLOY.md)**
- Environment template: **[.env.example](.env.example)**

---

## Quick start

```bash
npm ci          # install exact dependency versions
npm run dev     # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on `0.0.0.0:5173` (HMR) |
| `npm run build` | Type-check (`tsc -b`) then emit `dist/` |
| `npm run preview` | Serve the built `dist/` on `0.0.0.0:4173` |
| `npm run typecheck` | Types only, no output |

### Container

```bash
docker compose up -d --build          # http://127.0.0.1:8080
curl -f http://127.0.0.1:8080/healthz # -> ok
```

## Layout

```
.
├── index.html                  # HTML shell (metadata, fonts, #root)
├── Dockerfile                  # 2-stage build: Vite -> nginx
├── docker/default.conf         # nginx server block (cache, headers, /healthz)
├── docker-compose.yml          # private-server stack
├── docker-compose.coolify.yml  # Coolify stack (Traefik labels, no host ports)
├── ci/
│   └── github-workflow-publish-image.yml  # optional GHCR image build (see file header)
├── public/
│   ├── favicon.svg
│   └── images/                 # Loom / Aura / Vantage phone screenshots
└── src/
    ├── App.tsx                 # section composition
    ├── main.tsx                # React root
    ├── index.css               # Tailwind v4 theme (@theme) + custom utilities
    ├── lib/site.ts             # ALL copy/config: apps, plans, FAQs, nav, press
    ├── utils/cn.ts             # clsx + tailwind-merge class helper
    └── components/
        ├── Backdrop.tsx        # fixed aurora/grain/grid background
        ├── Navbar.tsx          # sticky nav, scroll progress, mobile sheet
        ├── Hero.tsx            # headline, store CTAs, stat row
        ├── SocialProof.tsx     # press wordmark marquee
        ├── Features.tsx        # "Why DelQuro" spotlight cards
        ├── Showcase.tsx        # app switcher with screenshot transitions
        ├── Benefits.tsx        # benefit grid
        ├── Testimonials.tsx    # member-story marquees
        ├── Projects.tsx        # portfolio grid (GitHub + live links)
        ├── Pricing.tsx         # plan toggle + plan cards
        ├── FAQ.tsx             # accordion
        ├── CTA.tsx             # closing call-to-action
        ├── Footer.tsx          # footer + newsletter form
        ├── AppIcon.tsx         # generated app icon for the suite apps
        ├── PhoneFrame.tsx      # device chrome around screenshots
        ├── Reveal.tsx          # scroll-reveal / stagger primitives
        └── ui.tsx              # Button, Eyebrow, SectionHeading, Em
```

All marketing copy lives in `src/lib/site.ts` — edit copy there, not in the
components.

## Configuration

Everything is static, so configuration is compile-time (Vite inlines `VITE_*`
variables into the bundle — changing one requires a rebuild):

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_BASE` | `/` | Sub-path to publish under, e.g. `/labs/` |
| `VITE_SITE_URL` | GitHub Pages URL | Public URL of this deployment, used by the portfolio section |

Runtime knobs (Compose only): `HOST_BIND`, `HOST_PORT`, `APP_PORT`.

## Verification

```bash
npm run typecheck                  # TS strict, no errors
npm run build                      # ~480 kB JS (~150 kB gzip), ~76 kB CSS
curl -sI http://127.0.0.1:8080/    # 200, security headers, no-cache on HTML
curl -s  http://127.0.0.1:8080/healthz   # ok
```

The nginx server block was validated with
[`crossplane`](https://github.com/nginxinc/crossplane) (`parse` → `status: ok`).

## History: file-name repair

The source was originally uploaded to GitHub through the web UI, and the upload
shuffled every filename: `App.tsx`/`AppIcon.tsx` were JPEGs, the real `src/`
tree had lost its directories, `package.json` was missing, and every component
imported a `cn` helper that did not exist in the repository.

The tree has been rebuilt from the import graph. Contents were preserved
byte-for-byte; only paths changed. The mapping, for reference:

| Was | Now |
| --- | --- |
| `App.tsx`, `AppIcon.tsx` (JPEG) | `public/images/screen-aura.jpg`, `public/images/screen-vantage.jpg` |
| `screen-vantage.jpg` (JPEG) | `public/images/screen-loom.jpg` |
| `Benefits.tsx` | `src/App.tsx` |
| `FAQ.tsx` | `src/components/AppIcon.tsx` |
| `Features.tsx` | `src/components/Backdrop.tsx` |
| `Footer.tsx` | `src/components/Benefits.tsx` |
| `Hero.tsx` | `src/components/CTA.tsx` |
| `Logo.tsx` | `src/components/FAQ.tsx` |
| `Navbar.tsx` | `src/components/Features.tsx` |
| `PhoneFrame.tsx` | `src/components/Footer.tsx` |
| `Pricing.tsx` | `src/components/Hero.tsx` |
| `Reveal.tsx` | `src/components/Logo.tsx` |
| `Showcase.tsx` | `src/components/Navbar.tsx` |
| `SocialProof.tsx` | `src/components/PhoneFrame.tsx` |
| `Testimonials.tsx` | `src/components/Pricing.tsx` |
| `cn.ts` | `src/components/ui.tsx` |
| `index.css` | `src/components/Showcase.tsx` |
| `index.html` | `src/index.css` |
| `main.tsx` | `src/components/Testimonials.tsx` |
| `package-lock.json` | `src/lib/site.ts` |
| `site.ts` | `src/components/SocialProof.tsx` |
| `ui.tsx` | `src/components/Reveal.tsx` |
| `tsconfig.json` | `src/main.tsx` |
| — | `src/utils/cn.ts` (rebuilt: `clsx` + `tailwind-merge`) |
| `styles.css` | `legacy/styles.css` (dead, broken duplicate — see below) |

Two fixes were needed to make the app build and render:

1. **`src/utils/cn.ts`** was missing entirely; recreated as the standard
   `clsx` + `tailwind-merge` helper that every component's usage expects.
2. **`Projects.tsx` was never rendered.** The commit that added the portfolio
   section ("Add Projects portfolio section with GitHub and live site links")
   added the file but did not wire it into `App.tsx` or the nav. It is now
   mounted between Testimonials and Pricing, with a `Projects` nav link.

`legacy/styles.css` is kept for reference only: it is an older stylesheet that
was superseded by the Tailwind v4 `src/index.css`, contains an invalid color
(`#77dff`) and class names (`.mask-r`, `.film-grain`, `.marquee-track`) that
nothing uses. It is not imported anywhere and is not part of the build.

## License

UNLICENSED — proprietary. © DelQuro Labs / PlanExServices.
