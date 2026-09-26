/**
 * Renders every route to its own static HTML file inside dist/ with per-page
 * head tags, then writes sitemaps, robots.txt, llms.txt and the IndexNow key.
 *
 * Last-modified dates are real: scripts/content-manifest.json stores a hash
 * of each page's rendered content and the date it last changed. A page's
 * lastmod only moves when its content actually changes.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const manifestPath = 'scripts/content-manifest.json'
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render, routes, siteUrl, seo, siteName, llms, metaFor } = await import('../dist-ssr/entry-server.js')

const base = siteUrl.replace(/\/$/, '')
const abs = (p) => `${base}${p === '/' ? '/' : `${p}/`}`
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const today = new Date().toISOString().slice(0, 10)
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}
const changed = []

function headTags(path, meta, indexable) {
  const { title, description, ogType } = meta
  const tags = [
    `<meta name="robots" content="${indexable ? 'index, follow, max-snippet:-1, max-image-preview:large' : 'noindex, follow'}" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ]
  if (base) {
    tags.push(
      `<link rel="canonical" href="${abs(path)}" />`,
      `<meta property="og:url" content="${abs(path)}" />`,
      `<meta property="og:image" content="${base}${seo.ogImage}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(siteName)} logo" />`,
      `<meta name="twitter:image" content="${base}${seo.ogImage}" />`,
    )
  }
  if (process.env.GOOGLE_SITE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}" />`)
  if (process.env.BING_SITE_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${esc(process.env.BING_SITE_VERIFICATION)}" />`)
  return tags.join('\n    ')
}

function page(path, indexable = true) {
  const rendered = render(path)
  const meta = metaFor(path)
  // React 19 emits <link rel="preload"> for images at the start of the markup; move them to <head>.
  const preloads = []
  const html = rendered.html.replace(/<link rel="preload"[^>]*>/g, (tag) => {
    preloads.push(tag)
    return ''
  })
  // Track content changes for lastmod and IndexNow (schema dateModified excluded so it can't self-trigger)
  const contentHash = createHash('sha256').update(html.replace(/"dateModified":"[^"]*"/g, '')).digest('hex').slice(0, 16)
  const entry = manifest[path]
  if (!entry || entry.hash !== contentHash) {
    manifest[path] = { hash: contentHash, lastmod: today }
    changed.push(path)
  }
  const head = [`<title>${esc(meta.title)}</title>`, headTags(path, meta, indexable), ...preloads].join('\n    ')
  return template
    .replace(/<title>[^<]*<\/title>/, head)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace('<div id="root">', `<div id="root" data-route="${path}">`)
    .replace('<!--app-html-->', html)
}

for (const route of routes) {
  const dir = route === '/' ? dist : join(dist, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), page(route))
}
writeFileSync(join(dist, '404.html'), page('/404', false))
for (const key of Object.keys(manifest)) if (!routes.includes(key) && key !== '/404') delete manifest[key]
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
writeFileSync('scripts/.changed-urls.json', JSON.stringify(changed.filter((p) => p !== '/404').map((p) => abs(p))))

// llms.txt: plain-text guide for AI assistants (llmstxt.org)
const groups = { pages: 'Pages', services: 'Services', areas: 'Areas we cover', guides: 'Guides', projects: 'Completed projects' }
const llmsTxt = [
  `# ${siteName}`,
  '',
  `> ${seo.aiSummary}`,
  '',
  'Quotes are free and requested through the enquiry form on any page. Photos of the job help us quote accurately.',
  '',
  ...Object.entries(groups).flatMap(([g, label]) => {
    const items = llms.filter((p) => p.group === g)
    return items.length ? ['', `## ${label}`, '', ...items.map((p) => `- [${p.title}](${base ? abs(p.path) : abs(p.path)}): ${p.description}`)] : []
  }),
  '',
].join('\n')
writeFileSync(join(dist, 'llms.txt'), llmsTxt)

// Sitemaps: one per group plus an index, with real lastmod values
if (base) {
  const files = []
  for (const g of Object.keys(groups)) {
    const items = llms.filter((p) => p.group === g)
    if (!items.length) continue
    const urls = items
      .map((p) => `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${p.dateModified ?? manifest[p.path]?.lastmod ?? today}</lastmod>\n  </url>`)
      .join('\n')
    const name = `sitemap-${g}.xml`
    writeFileSync(join(dist, name), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
    files.push(name)
  }
  const index = files.map((f) => `  <sitemap>\n    <loc>${base}/${f}</loc>\n  </sitemap>`).join('\n')
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${index}\n</sitemapindex>\n`)
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
} else {
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n')
}

// IndexNow key file (the key itself comes from the environment, never the repo)
if (process.env.INDEXNOW_KEY) writeFileSync(join(dist, `${process.env.INDEXNOW_KEY}.txt`), process.env.INDEXNOW_KEY)

rmSync('dist-ssr', { recursive: true, force: true })
console.log(`Prerendered ${routes.length} pages + 404.html; ${changed.length} changed since last build${base ? '; sitemaps written' : ''}`)
