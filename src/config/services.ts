import { routes } from './routes'

/**
 * Service definitions. Each entry powers a page at /services/<slug>/, a card
 * on the homepage, a dropdown link and an option in the enquiry form.
 */

export type ServiceId = 'garden-clearance' | 'green-waste' | 'end-of-tenancy' | 'site-land' | 'shed-clearance' | 'other'

export interface Service {
  id: Exclude<ServiceId, 'other'>
  slug: string
  /** Menu and card title */
  name: string
  /** Enquiry form dropdown label */
  formLabel: string
  /** Page heading */
  heading: string
  /** One or two sentences under the heading */
  intro: string
  /** Homepage card summary */
  summary: string
  /**
   * A direct, self-contained answer to "what is this service?" in 40 to 60
   * words. Shown near the top of the page and marked as speakable, so search
   * engines and AI assistants can quote it.
   */
  quickAnswer: string
  /** schema.org serviceType / search phrase, lower case */
  serviceType: string
  /** Short bullets shown on the card and page */
  includes: string[]
  /** Examples of jobs this suits */
  typicalJobs: string[]
  seoDescription: string
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    id: 'garden-clearance',
    slug: 'garden-clearance',
    name: 'Garden Clearance',
    formLabel: 'Garden clearance',
    heading: 'Garden Clearance',
    intro:
      'A complete clear-out for gardens that have got out of hand. We cut back, clear and remove the lot, then leave the space tidy and ready to use.',
    summary: 'Overgrown lawns, beds and borders cut back, cleared and taken away in one visit.',
    quickAnswer:
      'Garden clearance is a one-visit service where our team cuts back overgrowth, clears lawns, beds and borders, and removes everything we take out. It suits gardens that have been left for a season or more. You do not need to bag or move anything; loading and removal are included.',
    serviceType: 'garden clearance',
    includes: ['Overgrown lawns, weeds and brambles', 'Shrubs, hedges and small trees cut back', 'Beds, borders and paths cleared', 'Everything loaded and removed'],
    typicalJobs: [
      'A garden left to grow for a season or more',
      'Getting a rental or inherited garden back under control',
      'Clearing the ground before landscaping or a new lawn',
      'A one-off reset before summer',
    ],
    seoDescription:
      'Full garden clearance from ClearUp. Overgrown lawns, brambles, shrubs and borders cut back, cleared and removed, with loading included. Request a free quote.',
    faqs: [
      {
        q: 'How overgrown is too overgrown?',
        a: 'There is no such thing. Send a couple of photos through the form and we will tell you what is involved. The more overgrown it is, the more useful the photos are for an accurate quote.',
      },
      {
        q: 'Do you cut things back as well as removing waste?',
        a: 'Yes. Garden clearance includes cutting back overgrowth, not just collecting what is already on the ground. Tell us how far you want things taken back and we will quote for that.',
      },
      {
        q: 'Will you take the waste away on the same visit?',
        a: 'Yes. Loading and removal are part of the job, so nothing is left in piles for you to deal with afterwards.',
      },
    ],
  },
  {
    id: 'green-waste',
    slug: 'green-waste-removal',
    name: 'Green Waste Removal',
    formLabel: 'Green waste removal',
    heading: 'Green Waste Removal',
    intro:
      'Grass cuttings, hedge trimmings, branches and bagged garden waste collected from where it sits and taken away. No trips to the tip and no waiting for a bin collection.',
    summary: 'Bagged or loose green waste collected, loaded and taken away for you.',
    quickAnswer:
      'Green waste removal is a collection service for grass cuttings, hedge trimmings, branches, leaves and bagged garden waste. We collect it loose or bagged from wherever it sits in your garden, load it onto our van and take it away, so there is no trip to the tip and no waiting for a bin day.',
    serviceType: 'green waste removal',
    includes: ['Grass cuttings and hedge trimmings', 'Branches, leaves and prunings', 'Bagged garden waste and soil', 'Loose piles collected as they are'],
    typicalJobs: [
      'The pile left after a weekend in the garden',
      'Hedge and tree cuttings from a tidy up',
      'Bags of waste that will not fit in the garden bin',
      'Regular collections for gardeners and landscapers',
    ],
    seoDescription:
      'Green waste removal from ClearUp. Grass, hedge trimmings, branches and bagged garden waste collected and taken away, loading included. Request a free quote.',
    faqs: [
      {
        q: 'Does the waste need to be bagged?',
        a: 'No. We collect loose piles as well as bagged waste. If it is already bagged that is fine, but there is no need to do it for us.',
      },
      {
        q: 'Can you collect from the front of the property?',
        a: 'Yes, and it usually makes the job quicker. If the waste is in the back garden, let us know how we get to it and we will plan for that.',
      },
      {
        q: 'Do you take soil and turf?',
        a: 'Yes. Mention it in the form, as soil and turf are heavier than green waste and affect the quote.',
      },
    ],
  },
  {
    id: 'end-of-tenancy',
    slug: 'end-of-tenancy-garden-clearance',
    name: 'End of Tenancy Garden Clearance',
    formLabel: 'End of tenancy garden clearance',
    heading: 'End of Tenancy Garden Clearance',
    intro:
      'Rental gardens brought back to a tidy, presentable state at the end of a tenancy. For tenants ahead of check-out, landlords preparing to relet and letting agents managing the turnaround. This is a garden service: lawns, borders, hedges, patios and garden waste.',
    summary: 'Rental gardens cut back, cleared of garden waste and left tidy ahead of check-out or a new tenancy.',
    quickAnswer:
      'End of tenancy garden clearance brings a rental garden back to the tidy state expected at check-out or before a new let. We cut back lawns, borders and hedges, clear weeds from patios and paths, remove all garden waste and leave the outdoor space neat. It covers the garden only, and tenants, landlords and letting agents can all book.',
    serviceType: 'end of tenancy garden clearance',
    includes: ['Lawns cut and edged, borders and beds tidied', 'Hedges, shrubs and overgrowth cut back', 'Weeds cleared from patios, paths and gravel', 'All garden waste loaded and taken away'],
    typicalJobs: [
      'Tenants tidying the garden before the check-out inspection',
      'Landlords getting a garden ready to relet',
      'Letting agents arranging a garden tidy for a managed property',
      'A garden that has been let go over a long tenancy',
    ],
    seoDescription:
      'End of tenancy garden clearance for tenants, landlords and agents. Rental gardens cut back, weeded and left tidy for check-out. Free quotes from ClearUp.',
    faqs: [
      {
        q: 'Can you work to a check-out date?',
        a: 'Tell us your check-out or inspection date in the form and we will let you know what we can do. The earlier you get in touch, the easier it is to fit the garden in before then.',
      },
      {
        q: 'What does an end of tenancy garden clearance include?',
        a: 'Cutting the lawn, tidying beds and borders, cutting back hedges and overgrowth, clearing weeds from patios and paths, and removing all the garden waste we create. If the garden has a shed that needs to go, see our shed clearance service.',
      },
      {
        q: 'Can a landlord or agent book on behalf of a tenant?',
        a: 'Yes. Just use your own contact details in the form and tell us who to liaise with for access to the garden on the day.',
      },
    ],
  },
  {
    id: 'site-land',
    slug: 'site-and-land-clearance',
    name: 'Site & Land Clearance',
    formLabel: 'Site and land clearance',
    heading: 'Site & Land Clearance',
    intro:
      'Larger plots, allotments, yards and grounds cleared of vegetation and debris so the land can be used, sold or built on.',
    summary: 'Plots, allotments, yards and grounds cleared of overgrowth and debris, ready for their next use.',
    quickAnswer:
      'Site and land clearance is for larger areas such as plots, allotments, yards and grounds. We clear overgrowth, scrub and brambles, remove old fencing, timber and debris, and take everything away so the land is ready to be used, sold or built on. Larger sites can be quoted after a visit.',
    serviceType: 'site and land clearance',
    includes: ['Overgrowth, scrub and brambles cleared', 'Old fencing, timber and debris removed', 'Allotments and unused plots reset', 'Grounds around commercial premises tidied'],
    typicalJobs: [
      'A plot of land that has been left to grow',
      'Allotments being handed back or taken on',
      'Yards and grounds behind commercial units',
      'Clearing vegetation before a survey, sale or building work',
    ],
    seoDescription:
      'Site and land clearance from ClearUp. Plots, allotments, yards and grounds cleared of overgrowth and debris, with removal included. Request a free quote.',
    faqs: [
      {
        q: 'What information do you need to quote for a site?',
        a: 'The rough size of the area, what is growing or lying on it and how we get access. Photos help enormously, and for larger sites we may suggest a visit before quoting.',
      },
      {
        q: 'Do you remove rubble and hardcore?',
        a: 'Tell us what is on the site in the form. Vegetation, timber and general debris are our bread and butter; for heavier materials we will confirm what we can take before quoting.',
      },
      {
        q: 'Can you clear a site in stages?',
        a: 'Yes. If you would rather split the work across visits, say so and we will quote it that way.',
      },
    ],
  },
  {
    id: 'shed-clearance',
    slug: 'shed-clearance-and-dismantling',
    name: 'Shed Clearance & Dismantle',
    formLabel: 'Shed clearance and dismantling',
    heading: 'Shed Clearance & Dismantle',
    intro:
      'Sheds emptied, taken down and taken away. Whether the shed is full of things you no longer need or has simply had its day, we clear the contents, dismantle the structure and remove every piece.',
    summary: 'Sheds and outbuildings emptied, dismantled and removed, contents and all.',
    quickAnswer:
      'Shed clearance and dismantling covers emptying a shed of its contents, taking the structure down and removing every piece, including roofing felt, glass and fixings. Timber and metal sheds, summerhouses and small outbuildings are all covered. You can choose whether the base is left in place.',
    serviceType: 'shed clearance and dismantling',
    includes: ['Shed contents sorted, bagged and removed', 'Timber and metal sheds dismantled', 'Roofing felt, glass and fixings taken away', 'Summerhouses, playhouses and small outbuildings'],
    typicalJobs: [
      'An old shed that is rotten or leaking',
      'Clearing a shed full of tools, paint and junk',
      'Making room for a new shed, garden room or patio',
      'Taking down an old shed at the end of a tenancy',
    ],
    seoDescription:
      'Shed clearance and dismantling from ClearUp. Sheds and outbuildings emptied, taken down and removed, including the contents. Request a free quote.',
    faqs: [
      {
        q: 'Do I need to empty the shed before you arrive?',
        a: 'No. Clearing the contents is part of the service. If there is anything you want to keep, set it aside or let us know and we will leave it for you.',
      },
      {
        q: 'Can you just dismantle the shed and leave the base?',
        a: 'Yes. Tell us in the form whether you want the base left in place or dealt with too, and what it is made of, so we can quote accurately.',
      },
      {
        q: 'What if the shed is in a tricky spot?',
        a: 'Most are. Sheds get dismantled into manageable pieces, so narrow paths and side gates are rarely a problem. A photo of the access route helps us plan.',
      },
    ],
  },
]

export function findService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function serviceHref(s: Pick<Service, 'slug'>) {
  return routes.service(s.slug)
}

/** A service page scoped to one area, e.g. /garden-clearance/chester */
export function serviceAreaHref(s: Pick<Service, 'slug'>, a: { slug: string }) {
  return routes.serviceArea(s.slug, a.slug)
}

/** The primary service, used where one service has to stand for the business. */
export const primaryService = services[0]
