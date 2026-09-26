/**
 * Submits URLs whose content changed in the last build to IndexNow (used by
 * Bing, Yandex and others). Run after `npm run build` on a deploy:
 *
 *   INDEXNOW_KEY=... VITE_SITE_URL=https://... node scripts/indexnow.mjs
 *
 * Only changed URLs are sent, so unchanged pages are never resubmitted.
 * Requires the key file that prerender writes to dist/<key>.txt to be live.
 */
import { readFileSync } from 'node:fs'

const key = process.env.INDEXNOW_KEY
const host = (process.env.VITE_SITE_URL ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '')
if (!key || !host) {
  console.log('IndexNow skipped: INDEXNOW_KEY and VITE_SITE_URL are both required.')
  process.exit(0)
}
const urlList = JSON.parse(readFileSync('scripts/.changed-urls.json', 'utf8'))
if (!urlList.length) {
  console.log('IndexNow: nothing changed, nothing submitted.')
  process.exit(0)
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
})
console.log(`IndexNow: submitted ${urlList.length} URL(s), response ${res.status}`)
