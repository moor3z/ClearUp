import { guides, type Guide } from '../config/guides'
import type { ServiceId } from '../config/services'
import GuideCard from './GuideCard'
import { CardGrid, CardItem } from './ui/CardGrid'
import SectionHeading from './ui/SectionHeading'

interface Props {
  heading?: string
  /** Guides related to this service, or all guides when omitted */
  serviceId?: Exclude<ServiceId, 'other'>
  slugs?: string[]
  exclude?: string
  limit?: number
}

export default function RelatedGuides({ heading = 'Useful guides', serviceId, slugs, exclude, limit = 3 }: Props) {
  let list: Guide[] = slugs ? slugs.map((s) => guides.find((g) => g.slug === s)!).filter(Boolean) : guides
  if (serviceId) list = list.filter((g) => g.relatedServices.includes(serviceId))
  list = list.filter((g) => g.slug !== exclude).slice(0, limit)
  if (!list.length) return null
  return (
    <section aria-labelledby="guides-heading" className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading id="guides-heading" title={heading} />
        <CardGrid cols={3} className="mt-10">
          {list.map((g) => (
            <CardItem key={g.slug} cols={3}>
              <GuideCard guide={g} />
            </CardItem>
          ))}
        </CardGrid>
      </div>
    </section>
  )
}
