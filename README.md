# ClearUp website

Marketing site for ClearUp, Garden Clearance Specialists: a homepage, five service pages, eight area pages and a page for every service in every area (54 pages).
Built with React 19, TypeScript, Tailwind CSS 4 and Vite. Icons from lucide-react. Outfit typeface self-hosted via @fontsource.

## Site architecture

| Page | Path | Source of content |
| --- | --- | --- |
| Home | `/` | `content.ts`, `site.ts` |
| Services hub | `/services/` | `pages.ts` |
| Service | `/garden-clearance/`, `/green-waste-removal/`, `/end-of-tenancy-garden-clearance/`, `/site-and-land-clearance/`, `/shed-clearance-and-dismantling/` | `services.ts` |
| Service in an area | `/<service>/<area>/`, e.g. `/garden-clearance/chester/` | `services.ts` + `areas.ts` |
| Areas hub | `/areas-we-cover/` | `pages.ts`, `areas.ts` |
| Area | `/areas-we-cover/<area>/` | `areas.ts` |
| How it works | `/how-it-works/` | `pages.ts` |
| Pricing | `/pricing/` | `pages.ts` |
| About | `/about/` | `pages.ts`, `site.ts` |
| Contact | `/contact/` | `pages.ts`, `site.ts` |
| Guides | `/guides/`, `/guides/<slug>/` | `guides.ts` |
| Projects | `/projects/`, `/projects/<slug>/` | `projects.ts` (pages exist only when it has entries) |
| Reviews | `/reviews/` | `reviews.ts` (only when it has entries) |
| Recycling | `/recycling/` | `site.trust.disposalStatement` (only when filled in) |
| Waste licence | `/waste-licence/` | `site.legal.wasteCarrierNumber` (only when filled in) |
| Not found | `404.html` | served by Netlify automatically |

All URLs are defined once in `src/config/routes.ts`. Every page is prerendered to its own `index.html` with its own head tags and schema, so nothing SEO-critical depends on JavaScript. With JavaScript on, internal links navigate without a full reload.

### Service-in-area pages

`serviceAreaMode` in `src/lib/seo.ts` controls how many are built. `'all'` (current) builds every service in every area, 40 pages. `'primary'` builds only garden clearance in each area. Near-identical pages can be treated as doorway pages, so the recommendation is `'primary'` until each combination has something genuinely local: `localNotes`, `faqs`, `testimonials` and projects on the area record, which are rendered when present and omitted when not.

### Adding content

- A service: add to `services.ts`. Page, area versions, nav, footer, cards, form option and schema all follow.
- An area: add to `areas.ts` with `places`, `county` and `geo`.
- A guide: add to `guides.ts` with an `answer` (direct response to the title), sections, optional FAQs and related services.
- A project: add to `projects.ts` with photos named descriptively (`garden-clearance-chester-hoole-before.webp`). The hub and page appear automatically.
- A review: add to `reviews.ts` with its source and link. Reviews are displayed but no rating schema is emitted from our own site, because self-published ratings are not eligible for rich results; link the Google Business Profile in `site.local.sameAs` instead.

## Deploying on Cloudflare Pages from GitHub

The repo is set up so Cloudflare builds it, the same way as Over The Rainbow.

1. Upload the whole project (everything except `node_modules`, `dist`, `dist-preview`) to a GitHub repo. The `functions/`, `public/`, `scripts/` and `src/` folders and `package.json` must sit at the repo root.
2. Cloudflare dashboard: Workers & Pages > Create > Pages > Connect to Git > pick the repo.
3. Build settings:
   - Framework preset: None (or Vite)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version is read from `.node-version` (22)
4. Environment variables (Settings > Environment variables, Production):
   - `VITE_SITE_URL` = `https://www.yourdomain.co.uk` (canonicals, sitemap, schema ids, og:image)
   - `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` for the quote form (see below)
   - Optional: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `INDEXNOW_KEY`
5. Add the custom domain under Custom domains and, as with OTR, a redirect rule from the bare domain to `www` (or the other way round, but pick one and use it in `VITE_SITE_URL`).

### No domain yet?

Deploy anyway on the free `<project>.pages.dev` address, with two temporary settings:

- Leave `VITE_SITE_URL` unset (otherwise canonicals and the sitemap would point at pages.dev).
- Set `VITE_NOINDEX` = `true` so the pages.dev copy carries `noindex` and a `Disallow: /` robots.txt. This stops the temporary address being indexed and competing with the real domain later.

When the domain is bought: add it under Custom domains, set `VITE_SITE_URL` to it, delete `VITE_NOINDEX`, and redeploy. Cloudflare then serves the real domain with everything switched on.

Every push to the branch rebuilds and deploys. `public/_headers` is honoured by Cloudflare Pages (same format as Netlify) for caching and security headers. `404.html` is served automatically for unknown paths. If stale CSS ever shows on a phone, set Browser Cache TTL to Respect Existing Headers as on OTR.

### The quote form on Cloudflare

`functions/api/enquiry.js` is a Pages Function at `/api/enquiry`. It accepts the form (photos included), checks it, and emails it through Resend with the photos attached, replying to the customer's address. It needs:

- `RESEND_API_KEY`: a key from the Resend account
- `ENQUIRY_FROM`: a sender on a domain verified in Resend, e.g. `ClearUp <enquiries@send.yourdomain.co.uk>` (add the domain in Resend with Cloudflare auto-configure, as done for OTR)
- `ENQUIRY_TO`: where enquiries go; comma-separate for more than one inbox

Until those exist the function returns 503 and the form shows "not connected yet" instead of a fake confirmation. The client only treats a JSON `{"ok": true}` as success. `src/config/site.ts` already points the form at `/api/enquiry`.

## Run it locally

```bash
npm install
npm run dev        # local dev server (the form will report "not connected" without the function)
npm run build      # typecheck + production build into dist/ (what Cloudflare runs)
npm run preview    # serve dist/ locally
```

`npm run build:preview` makes a hash-routed single-page build in `dist-preview/` for sharing a quick preview as one file; never deploy it.

## Where to edit things

| What | File |
| --- | --- |
| Business details, contact, legal footer, form delivery | `src/config/site.ts` |
| Services: names, page copy, bullets, FAQs, form labels | `src/config/services.ts` |
| Areas: names, regions, intro copy | `src/config/areas.ts` |
| Homepage copy, section headings, general FAQs, steps | `src/config/content.ts` |
| Colours, fonts, radii, shadows | `src/index.css` (`@theme` block) |
| Logo files | `public/brand/` |
| Enquiry submission logic | `src/lib/submitEnquiry.ts` |
| Validation rules and messages | `src/lib/validation.ts` |

Anything left blank in `site.ts` is simply not rendered. The site never shows placeholder text, fake contact details or dead links.

## Connecting the enquiry form

`enquiry.provider` in `src/config/site.ts` controls delivery. `'demo'` validates and sends nothing, saying so on screen.

The default is the Cloudflare Pages Function described above. Alternatives:

### Netlify Forms (only if hosted on Netlify)

Set `provider: 'netlify'`. Netlify detects the hidden `<form name="enquiry">` in `index.html` at deploy time; add an email notification in the Netlify dashboard.

### Another endpoint

1. Set `endpointUrl` to any URL that accepts a `multipart/form-data` POST and returns JSON `{"ok": true}` on success.
2. Fields sent: `fullName`, `postcode`, `email`, `phone`, `service` (option id, see `serviceOptions` in `content.ts`), `job`, `photos` (one or more files), `company` (honeypot, should be empty).
3. Any non-2xx status, a non-JSON body or `ok: false` shows the error state (with the server's `error` message if given) and keeps the visitor's details in the form.

## SEO, local search and AI answers

What is built in, all driven by config:

- **One HTML file per page** with a unique title, meta description, robots directive and Open Graph / Twitter tags.
- **Answer-first "In short" block** at the top of every page (40 to 70 words) marked as `speakable` in the schema, so search engines and AI assistants can quote it directly. Service versions live in `quickAnswer` in `services.ts`; area versions are templated in `content.ts`.
- **FAQs with `FAQPage` schema** on the homepage, every service page (service questions), every area page (local questions) and every service-in-area page (both).
- **schema.org JSON-LD graph** on every page with persistent ids (`/#organization`, `/#website`, `/#logo`, `/#area-<slug>`, `/<service>/#service`): `LocalBusiness` (`areaServed`, `knowsAbout`, `hasOfferCatalog`, `ContactPoint` when a phone exists), `ImageObject` logo, `WebSite`, `WebPage` / `CollectionPage` / `AboutPage` / `ContactPage` with `breadcrumb`, `dateModified` and `speakable`, `Place` per area with county and coordinates, `Service` per service and per service-in-area (`isVariantOf` the parent), `BreadcrumbList`, `FAQPage`, `HowTo`, and `Article` for guides and projects with the organisation as author and publisher. Phone, email, address, geo, opening hours, `sameAs`, `hasMap`, legal name and VAT number appear only when filled in. Schema is validated for parseability and duplicate ids in the test suite.
- **`llms.txt`** at the site root: a plain-text description of the business and an index of every page grouped by type, for AI crawlers (llmstxt.org).
- **Sitemap index** (`sitemap.xml`) pointing to `sitemap-pages.xml`, `sitemap-services.xml`, `sitemap-areas.xml`, `sitemap-guides.xml` and `sitemap-projects.xml`. `lastmod` is real: `scripts/content-manifest.json` records a hash of each page and the date it last changed, so dates only move when content does. Commit that file.
- **IndexNow**: `npm run indexnow` submits only the URLs that changed in the last build. Needs `INDEXNOW_KEY` and `VITE_SITE_URL` in the environment; the key file is written to the site root at build time and the key never goes in the repo.
- **Search Console and Bing Webmaster verification**: set `GOOGLE_SITE_VERIFICATION` and/or `BING_SITE_VERIFICATION` at build time to add the meta tags.
- **Caching and security headers** in `public/_headers` (Cloudflare Pages and Netlify both read this file): hashed assets and fonts immutable for a year, HTML revalidated.
- **Fonts** self-hosted with the two weights used above the fold preloaded; logo served as WebP with PNG fallback; header logo eager with high fetch priority, everything else lazy.
- **Social sharing image** at `public/brand/og-image.png` (1200 x 630, made from the logo).
- Semantic headings (one `h1` per page, keyword in the `h1`), breadcrumbs, `lang="en-GB"`, `inLanguage`, and dense internal linking between services, areas and service-in-area pages.

### The site URL matters

Canonical links, `og:image`, `sitemap.xml`, absolute schema IDs and the llms.txt links all need the public URL. Build with it:

```bash
VITE_SITE_URL=https://www.your-domain.co.uk npm run build
```

or set `url` in `src/config/site.ts`. Without it the site still works, but those items are either relative or left out.

### Fill these in for the full local SEO benefit

In `src/config/site.ts`:

- `contact.phone` and `contact.email`: also enable `telephone` / `email` in the `LocalBusiness` schema.
- `local.address` and `local.geo`: publish an address only if you want it public; a service-area business can leave this blank and still rank.
- `local.openingHours`: schema format, e.g. `['Mo-Fr 08:00-18:00', 'Sa 08:00-13:00']`.
- `local.sameAs`: Google Business Profile, Facebook, Instagram, Checkatrade or similar. This is the strongest signal that connects the site to your listings.
- `local.mapUrl`: your Google Maps link.

Keep the business name, phone and address identical across the site, Google Business Profile and any directories.



- Fill in `site.contact`, `site.legal` and `site.url` once confirmed. Setting `site.url` also switches on `sitemap.xml`, canonical links and the sitemap line in `robots.txt`.
- Check the town and village names in `src/config/areas.ts` match where you actually go.
- Add `legalLinks` only when the privacy and terms pages exist.
- Structured data (`LocalBusiness` JSON-LD with `areaServed`) is emitted automatically once `site.url` and `site.contact.phone` are set.
- Update the `<title>` and `<meta name="description">` in `index.html` if the wording in `site.seo` changes (they are duplicated there so the values exist before JavaScript loads).

## Accessibility notes

- Every field has a permanent visible label, `autocomplete` attributes and inline errors linked with `aria-describedby` and `aria-invalid`.
- Status messages (sent, demo, error) use `role="status"` or `role="alert"` and receive focus.
- The FAQ accordion uses `aria-expanded` and `aria-controls`.
- Smooth scrolling and the small transitions are disabled under `prefers-reduced-motion`.
- Text colours meet WCAG AA. Leaf green is used as `#52A02E` for large headline text (3.3:1) and `#3A7F1E` for small text (5:1); the brighter `#65B741` is reserved for icons and accents.
