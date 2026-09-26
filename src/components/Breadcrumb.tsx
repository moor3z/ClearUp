import { ChevronRight } from 'lucide-react'
import { routes } from '../config/routes'
import { Link } from '../lib/router'

interface Crumb {
  label: string
  to?: string
}

/** Visible breadcrumb; the matching BreadcrumbList lives in src/lib/schema.ts. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="bg-sage">
      <nav aria-label="Breadcrumb" className="container-site pt-5 text-sm font-medium text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to={routes.home} className="inline-block rounded-sm py-2 hover:text-forest hover:underline">
              Home
            </Link>
          </li>
          {items.map((c, i) => {
            const last = i === items.length - 1
            return (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-4 text-leaf" aria-hidden="true" />
                {c.to && !last ? (
                  <Link to={c.to} className="inline-block rounded-sm py-2 hover:text-forest hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? 'page' : undefined} className={last ? 'py-2 text-forest-deep' : "py-2"}>
                    {c.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
