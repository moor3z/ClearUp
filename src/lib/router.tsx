import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { scrollToElement } from './quoteForm'

/**
 * A very small router. Pages are prerendered to real HTML files at build
 * time, so plain links work with JavaScript disabled. With JavaScript,
 * internal links navigate client side to avoid a full reload.
 *
 * VITE_ROUTING=hash builds a single-file preview where routes live in the
 * URL hash (used for the claude.ai preview only, never for production).
 */

const HASH = import.meta.env.VITE_ROUTING === 'hash'

export function normalisePath(p: string) {
  let s = p.split('?')[0].split('#')[0]
  if (!s.startsWith('/')) s = '/' + s
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1)
  return s
}

export function currentPath() {
  if (typeof window === 'undefined') return '/'
  if (HASH) return normalisePath(window.location.hash.replace(/^#/, '') || '/')
  return normalisePath(window.location.pathname)
}

/** Build a link href for a route, optionally with a section anchor on that page. */
export function href(path: string, anchor?: string) {
  const p = normalisePath(path)
  if (HASH) return `#${p}${anchor ? `?to=${anchor}` : ''}`
  const withSlash = p === '/' ? '/' : `${p}/`
  return anchor ? `${withSlash}#${anchor}` : withSlash
}

const RouteContext = createContext('/')
export const useRoute = () => useContext(RouteContext)

type Listener = (path: string, anchor?: string) => void
const listeners = new Set<Listener>()

export function navigate(path: string, anchor?: string) {
  const p = normalisePath(path)
  window.history.pushState({}, '', href(p, anchor))
  listeners.forEach((l) => l(p, anchor))
}

function settleScroll(anchor?: string) {
  if (anchor) {
    const el = document.getElementById(anchor)
    if (el) {
      scrollToElement(el)
      return
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.getElementById('main')?.focus({ preventScroll: true })
}

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(initialPath)

  useEffect(() => {
    const onNavigate: Listener = (p, anchor) => {
      setPath(p)
      // Wait for the new page to render before scrolling.
      requestAnimationFrame(() => settleScroll(anchor))
    }
    const onPop = () => {
      setPath(currentPath())
      const anchor = HASH ? new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('to') ?? undefined : window.location.hash.slice(1) || undefined
      requestAnimationFrame(() => settleScroll(anchor))
    }
    listeners.add(onNavigate)
    window.addEventListener('popstate', onPop)
    return () => {
      listeners.delete(onNavigate)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  anchor?: string
}

/** Internal link. Same page + anchor just scrolls; otherwise navigates client side. */
export function Link({ to, anchor, onClick, children, ...rest }: LinkProps) {
  const current = useRoute()
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (normalisePath(to) === current && anchor) {
      window.history.pushState({}, '', href(to, anchor))
      settleScroll(anchor)
      return
    }
    navigate(to, anchor)
  }
  return (
    <a href={href(to, anchor)} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
