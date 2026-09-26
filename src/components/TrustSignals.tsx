import { ShieldCheck } from 'lucide-react'
import { routes } from '../config/routes'
import { site } from '../config/site'
import { Link } from '../lib/router'

/** Verifiable facts only. Renders nothing until something is configured. */
export function trustItems() {
  const { trust, legal } = site
  const items: { text: string; to?: string }[] = []
  if (legal.wasteCarrierNumber) items.push({ text: `Registered waste carrier ${legal.wasteCarrierNumber}`, to: routes.wasteLicence })
  if (trust.insurance) items.push({ text: trust.insurance })
  if (trust.trading) items.push({ text: trust.trading })
  if (legal.companyNumber) items.push({ text: `Company number ${legal.companyNumber}` })
  if (trust.disposalStatement) items.push({ text: 'Waste disposed of responsibly', to: routes.recycling })
  trust.other.forEach((t) => items.push({ text: t }))
  return items
}

export default function TrustSignals({ compact = false }: { compact?: boolean }) {
  const items = trustItems()
  if (!items.length) return null
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${compact ? 'text-sm' : ''}`}>
      {items.map((i) => (
        <li key={i.text} className="flex items-center gap-2 font-semibold text-forest-deep">
          <ShieldCheck className="size-5 shrink-0 text-leaf-text" aria-hidden="true" />
          {i.to ? (
            <Link to={i.to} className="hover:underline">
              {i.text}
            </Link>
          ) : (
            i.text
          )}
        </li>
      ))}
    </ul>
  )
}
