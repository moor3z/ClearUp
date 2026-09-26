import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { site } from './config/site'
import { allRoutes, llmsIndex, pageMeta } from './lib/seo'

/** Used by scripts/prerender.mjs. Returns markup plus per-page head data. */
export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
  return { html, ...pageMeta(path) }
}

export const routes = allRoutes()
export const siteUrl = site.url
export const seo = site.seo
export const siteName = site.name
export const llms = llmsIndex()
export const metaFor = pageMeta
