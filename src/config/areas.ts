import { routes } from './routes'
import type { Testimonial } from './reviews'

/**
 * Areas ClearUp covers. Each entry powers a page at /areas/<slug>/, a
 * dropdown link and a chip in the homepage Areas section.
 *
 * Keep `intro` factual. Nothing here claims a base, a radius or a travel
 * time unless it has been confirmed.
 */

export interface Area {
  slug: string
  name: string
  /** Where it sits, for copy that reads naturally */
  region: string
  /** Towns, villages or districts inside the area, used in copy */
  places: string[]
  /** Administrative area the place sits in, for schema.org containedInPlace */
  county: string
  /** Approximate centre of the area, for schema.org Place geo */
  geo: { latitude: number; longitude: number }
  intro: string
  /**
   * Optional genuinely local content. Each of these is omitted from the page
   * when empty, so nothing is padded out just to look different.
   */
  localNotes?: string[]
  faqs?: { q: string; a: string }[]
  testimonials?: Testimonial[]
  seoTitle?: string
  metaDescription?: string
}

export const areas: Area[] = [
  {
    slug: 'chester',
    name: 'Chester',
    region: 'Cheshire',
    county: 'Cheshire',
    geo: { latitude: 53.1905, longitude: -2.8908 },
    places: ['Hoole', 'Upton', 'Boughton', 'Blacon', 'Christleton'],
    intro: 'Garden clearance, green waste removal and end of tenancy garden clearance for gardens in Chester and the surrounding villages.',
  },
  {
    slug: 'deeside',
    name: 'Deeside',
    region: 'Flintshire',
    county: 'Flintshire',
    geo: { latitude: 53.2177, longitude: -3.0581 },
    places: ['Connah\u2019s Quay', 'Shotton', 'Queensferry', 'Hawarden', 'Sealand'],
    intro: 'Garden and outdoor clearance across Deeside, including Connah\u2019s Quay, Shotton, Queensferry, Hawarden and Sealand.',
  },
  {
    slug: 'denbighshire',
    name: 'Denbighshire',
    region: 'North Wales',
    county: 'Denbighshire',
    geo: { latitude: 53.1828, longitude: -3.4181 },
    places: ['Rhyl', 'Prestatyn', 'St Asaph', 'Denbigh', 'Ruthin'],
    intro: 'Garden clearance and green waste collection across Denbighshire, from Rhyl and Prestatyn down to Ruthin and Denbigh.',
  },
  {
    slug: 'ellesmere-port',
    name: 'Ellesmere Port',
    region: 'Cheshire',
    county: 'Cheshire',
    geo: { latitude: 53.2794, longitude: -2.8971 },
    places: ['Great Sutton', 'Little Sutton', 'Whitby', 'Neston'],
    intro: 'Garden clearance, green waste removal and site clearance for Ellesmere Port, Great Sutton, Little Sutton and Neston.',
  },
  {
    slug: 'flintshire',
    name: 'Flintshire',
    region: 'North Wales',
    county: 'Flintshire',
    geo: { latitude: 53.2483, longitude: -3.135 },
    places: ['Flint', 'Holywell', 'Buckley', 'Mold', 'Deeside'],
    intro: 'Garden and land clearance throughout Flintshire, including Flint, Holywell, Buckley, Mold and Deeside.',
  },
  {
    slug: 'mold',
    name: 'Mold',
    region: 'Flintshire',
    county: 'Flintshire',
    geo: { latitude: 53.1664, longitude: -3.1426 },
    places: ['Northop', 'Sychdyn', 'Gwernymynydd', 'Nercwys'],
    intro: 'Garden clearance and green waste removal in Mold and the villages around it, including Northop, Sychdyn and Gwernymynydd.',
  },
  {
    slug: 'wirral',
    name: 'Wirral',
    region: 'Merseyside',
    county: 'Merseyside',
    geo: { latitude: 53.3727, longitude: -3.0754 },
    places: ['Birkenhead', 'Wallasey', 'Bebington', 'Heswall', 'West Kirby'],
    intro: 'Garden clearance, green waste removal and end of tenancy garden clearance across the Wirral, from Birkenhead and Wallasey to Heswall and West Kirby.',
  },
  {
    slug: 'wrexham',
    name: 'Wrexham',
    region: 'North Wales',
    county: 'Wrexham',
    geo: { latitude: 53.0462, longitude: -2.9931 },
    places: ['Gresford', 'Rossett', 'Marford', 'Llay', 'Rhosddu'],
    intro: 'Garden and outdoor clearance for Wrexham and the surrounding area, including Gresford, Rossett, Marford and Llay.',
  },
]

/** "A, B and C" */
export function listPlaces(a: Pick<Area, 'places'>) {
  const p = a.places
  return p.length > 1 ? `${p.slice(0, -1).join(', ')} and ${p[p.length - 1]}` : (p[0] ?? '')
}

export function findArea(slug: string) {
  return areas.find((a) => a.slug === slug)
}

export function areaHref(a: Pick<Area, 'slug'>) {
  return routes.area(a.slug)
}
