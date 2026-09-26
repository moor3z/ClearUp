/**
 * Genuine customer reviews. Leave empty until real reviews exist. The
 * /reviews/ page and review blocks appear only when this has entries.
 *
 * Review schema is deliberately NOT emitted for reviews hosted on our own
 * site: Google treats self-published ratings about the business as
 * self-serving and they are not eligible for rich results. Link to the
 * source profile instead via site.local.sameAs.
 */

export interface Testimonial {
  /** First name or initials as the customer agreed to be shown */
  author: string
  /** 1 to 5 */
  rating?: number
  text: string
  /** ISO date, e.g. '2026-08-14' */
  date: string
  /** Where it was left, e.g. 'Google' */
  source: string
  /** Link to the source review or profile */
  sourceUrl?: string
  /** Area slug this job was in, if known */
  areaSlug?: string
  /** Service id, if known */
  serviceId?: string
}

export const reviews: Testimonial[] = []
