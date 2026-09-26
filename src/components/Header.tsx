import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { areaHref, areas } from '../config/areas'
import { nav } from '../config/content'
import { routes } from '../config/routes'
import { serviceHref, services } from '../config/services'
import { requestQuote } from '../lib/quoteForm'
import { Link, useRoute } from '../lib/router'
import Button from './ui/Button'
import Logo from './Logo'

interface Item {
  label: string
  to: string
}

/** Menus are alphabetical; the "All ..." link always sits last. */
export const byLabel = <T extends { label: string }>(a: T, b: T) => a.label.localeCompare(b.label, 'en-GB')

const serviceItems: Item[] = [...services.map((s) => ({ label: s.name, to: serviceHref(s) })).sort(byLabel), { label: 'All services', to: routes.services }]
const areaItems: Item[] = [...areas.map((a) => ({ label: a.name, to: areaHref(a) })).sort(byLabel), { label: 'All areas', to: routes.areas }]

const topLinks = [
  { label: 'Guides', to: routes.guides },
  { label: nav.howItWorks, to: routes.howItWorks },
  { label: 'Pricing', to: routes.pricing },
].sort(byLabel)

const mobileLinks = [
  { label: 'About', to: routes.about },
  { label: 'Contact', to: routes.contact },
  { label: 'Guides', to: routes.guides },
  { label: nav.howItWorks, to: routes.howItWorks },
  { label: 'Pricing', to: routes.pricing },
].sort(byLabel)

/** Desktop dropdown: a disclosure button plus a list of page links. */
function Dropdown({ label, items, columns = 1 }: { label: string; items: Item[]; columns?: 1 | 2 }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const wrap = useRef<HTMLDivElement>(null)
  const current = useRoute()
  const active = items.some((i) => i.to === current)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrap.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative" onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-md py-2 text-[1.0625rem] font-semibold hover:text-forest ${active ? 'text-forest' : 'text-ink'}`}
      >
        {label}
        <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div
        id={id}
        hidden={!open}
        className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-xl border border-line bg-white p-2 shadow-card ${columns === 2 ? 'w-[26rem]' : 'w-64'}`}
      >
        <ul className={columns === 2 ? 'grid grid-cols-2 gap-x-2' : ''}>
          {items.map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                onClick={() => setOpen(false)}
                aria-current={i.to === current ? 'page' : undefined}
                className={`block rounded-lg px-3.5 py-2.5 font-semibold hover:bg-sage hover:text-forest-deep ${i.to === current ? 'bg-sage text-forest-deep' : 'text-ink'}`}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Mobile nav group: expandable list under a heading button. */
function MobileGroup({ label, items, onNavigate }: { label: string; items: Item[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const current = useRoute()
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-3.5 text-left text-lg font-semibold text-ink hover:bg-sage"
      >
        {label}
        <ChevronDown className={`size-5 text-forest transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <ul id={id} hidden={!open} className="mb-2 border-l-2 border-leaf/50 pl-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              onClick={onNavigate}
              aria-current={i.to === current ? 'page' : undefined}
              className={`block rounded-lg px-2 py-3 font-medium hover:bg-sage ${i.to === current ? 'text-forest-deep underline underline-offset-4' : 'text-ink'}`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function NavLink({ to, anchor, children, onNavigate }: { to: string; anchor?: string; children: ReactNode; onNavigate?: () => void }) {
  const current = useRoute()
  return (
    <Link to={to} anchor={anchor} onClick={onNavigate} aria-current={current === to ? 'page' : undefined} className={`rounded-md py-2 text-[1.0625rem] font-semibold hover:text-forest ${current === to ? 'text-forest' : 'text-ink'}`}>
      {children}
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const quote = () => {
    close()
    requestQuote({ focus: 'first' })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-site flex h-[4.75rem] items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="shrink-0 rounded-md" aria-label="ClearUp, home">
          <Logo className="h-11 sm:h-12 lg:h-[3.75rem]" priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <Dropdown label={nav.services} items={serviceItems} />
          <Dropdown label={nav.areas} items={areaItems} columns={2} />
          {topLinks.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button onClick={quote}>{nav.quote}</Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-lg text-forest hover:bg-sage lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="size-7" aria-hidden="true" /> : <Menu className="size-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
        <nav aria-label="Main mobile" className="container-site py-3">
          <ul>
            <MobileGroup label={nav.services} items={serviceItems} onNavigate={close} />
            <MobileGroup label={nav.areas} items={areaItems} onNavigate={close} />
            {mobileLinks.map((i) => (
              <li key={i.to}>
                <Link to={i.to} onClick={close} className="block rounded-lg px-2 py-3.5 text-lg font-semibold text-ink hover:bg-sage">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={quote} className="mt-2 w-full sm:hidden">
            {nav.quote}
          </Button>
        </nav>
      </div>
    </header>
  )
}
