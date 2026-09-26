import { Star } from 'lucide-react'
import { reviews, type Testimonial } from '../config/reviews'
import { CardGrid, CardItem } from './ui/CardGrid'
import SectionHeading from './ui/SectionHeading'

interface Props {
  areaSlug?: string
  serviceId?: string
  limit?: number
  heading?: string
}

/** Genuine reviews with their source. Renders nothing until reviews exist. */
export default function Reviews({ areaSlug, serviceId, limit = 3, heading = 'What customers say' }: Props) {
  const list: Testimonial[] = reviews
    .filter((r) => (!areaSlug || r.areaSlug === areaSlug) && (!serviceId || r.serviceId === serviceId))
    .slice(0, limit)
  if (!list.length) return null
  return (
    <section aria-labelledby="reviews-heading" className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading id="reviews-heading" title={heading} />
        <CardGrid cols={3} className="mt-10">
          {list.map((r) => (
            <CardItem key={`${r.author}-${r.date}`} cols={3} className="rounded-card border border-line bg-sage/50 p-6">
              {r.rating && (
                <p className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`size-5 ${i < r.rating! ? 'fill-leaf text-leaf' : 'text-line'}`} aria-hidden="true" />
                  ))}
                </p>
              )}
              <blockquote className="mt-3 text-ink">{r.text}</blockquote>
              <p className="mt-3 text-sm text-muted">
                {r.author}, {new Date(r.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} ·{' '}
                {r.sourceUrl ? (
                  <a href={r.sourceUrl} rel="noopener" className="underline">
                    {r.source}
                  </a>
                ) : (
                  r.source
                )}
              </p>
            </CardItem>
          ))}
        </CardGrid>
      </div>
    </section>
  )
}
