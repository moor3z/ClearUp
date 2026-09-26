import { Home, Leaf, Sprout, Trees, Warehouse } from 'lucide-react'
import { serviceHref, services } from '../config/services'
import { Link } from '../lib/router'

export const serviceIcons = {
  'garden-clearance': Sprout,
  'green-waste': Leaf,
  'end-of-tenancy': Home,
  'site-land': Trees,
  'shed-clearance': Warehouse,
} as const

export default function ServiceStrip() {
  return (
    <div className="border-y border-line/80 bg-white">
      {/* 1px gap over a line-coloured background draws the dividers however the grid wraps */}
      <div className="container-site">
        <ul className="grid grid-cols-1 gap-px bg-line/80 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s) => {
          const Icon = serviceIcons[s.id]
          return (
            <li key={s.id} className="bg-white sm:last:odd:col-span-2 lg:last:odd:col-span-1">
              <Link
                to={serviceHref(s)}
                className="flex w-full items-center gap-3 rounded-md px-2 py-4 text-left font-bold text-forest-deep hover:text-forest sm:justify-center sm:py-6 lg:flex-col lg:gap-2 lg:text-center"
              >
                <Icon className="size-9 shrink-0 text-forest" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[1.0625rem] lg:text-base">{s.name}</span>
              </Link>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}
