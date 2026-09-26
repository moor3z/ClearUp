import { Check } from 'lucide-react'
import { servicesSection } from '../config/content'
import type { Area } from '../config/areas'
import { serviceAreaHref, serviceHref, services, type Service } from '../config/services'
import { requestQuote } from '../lib/quoteForm'
import { Link } from '../lib/router'
import { serviceIcons } from './ServiceStrip'
import Button from './ui/Button'
import { CardGrid, CardItem } from './ui/CardGrid'
import SectionHeading from './ui/SectionHeading'

interface Props {
  heading?: string
  intro?: string
  /** Leave out one service (used on service pages for "other ways we can help"). */
  exclude?: Service['id']
  /** Compact cards without the bullet list. */
  compact?: boolean
  /** Link each card to the service page for this area. */
  area?: Area
  /** Restrict to these services */
  only?: Service['id'][]
  id?: string
}

export default function Services({ heading = servicesSection.heading, intro = servicesSection.intro, exclude, compact = false, area, only, id = 'services' }: Props) {
  const list = services.filter((s) => s.id !== exclude && (!only || only.includes(s.id)))
  const linkTo = (s: Service) => (area ? serviceAreaHref(s, area) : serviceHref(s))
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />

        <CardGrid cols={3} className="mt-12 lg:mt-16">
          {list.map((card) => {
            const Icon = serviceIcons[card.id]
            return (
              <CardItem key={card.id} cols={3} className="rounded-card border border-line bg-sage/70 p-6 sm:p-7">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-forest text-white">
                  <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-forest-deep">
                  <Link to={linkTo(card)} className="inline-block rounded-sm py-1 hover:text-forest hover:underline hover:underline-offset-4">
                    {card.name}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{card.summary}</p>
                {!compact && (
                  <ul className="mt-5 space-y-2 border-t border-line/80 pt-5">
                    {card.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.95rem] font-medium text-ink">
                        <Check className="mt-1 size-4 shrink-0 text-leaf-text" strokeWidth={3} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-col gap-2 pt-6">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => requestQuote({ service: card.id, focus: 'first' })}
                    aria-label={`${servicesSection.quoteCta}: ${card.name}`}
                  >
                    {servicesSection.quoteCta}
                  </Button>
                  <Link to={linkTo(card)} className="rounded-md py-2 text-center font-semibold text-forest hover:underline hover:underline-offset-4">
                    {servicesSection.cardCta}
                  </Link>
                </div>
              </CardItem>
            )
          })}
        </CardGrid>
      </div>
    </section>
  )
}
