import { MapPin } from 'lucide-react'
import { areaHref, areas, type Area } from '../config/areas'
import { areasSection } from '../config/content'
import { requestQuote } from '../lib/quoteForm'
import { serviceAreaHref, type Service } from '../config/services'
import { routes } from '../config/routes'
import { Link } from '../lib/router'
import Button from './ui/Button'
import SectionHeading from './ui/SectionHeading'

interface Props {
  heading?: string
  intro?: string
  exclude?: Area['slug']
  /** Link each area to this service's page for that area. */
  service?: Service
  id?: string
}

export default function Areas({ heading = areasSection.heading, intro = areasSection.intro, exclude, service, id = 'areas' }: Props) {
  const list = areas.filter((a) => a.slug !== exclude)
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-sage py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-3xl rounded-card border border-line bg-white p-7 text-center shadow-card sm:p-10">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-leaf-pale text-forest">
            <MapPin className="size-7" aria-hidden="true" />
          </span>
          <div className="mt-5">
            <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
          </div>

          <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2" aria-label="Areas we cover">
            {list.map((a) => (
              <li key={a.slug}>
                <Link
                  to={service ? serviceAreaHref(service, a) : areaHref(a)}
                  className="inline-block rounded-full border border-line bg-sage px-4 py-2 font-semibold text-forest-deep hover:border-forest hover:bg-leaf-pale"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>

          <Button size="lg" className="mt-8" onClick={() => requestQuote({ focus: 'postcode' })}>
            {areasSection.cta}
          </Button>
          {!service && !exclude && (
            <p className="mt-4">
              <Link to={routes.areas} className="font-semibold text-forest underline underline-offset-4">
                See all areas we cover
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
