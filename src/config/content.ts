/**
 * Page copy and service options. Edit text here rather than in components.
 */

import { services, type ServiceId } from './services'

export type { ServiceId }

export interface ServiceOption {
  id: ServiceId
  label: string
}

/** Options in the "What do you need cleared?" dropdown, in order. */
export const serviceOptions: ServiceOption[] = [
  ...services.map((s) => ({ id: s.id, label: s.formLabel })),
  { id: 'other', label: 'Something else' },
]

/** Top-level navigation. Dropdown contents come from services.ts and areas.ts. */
export const nav = {
  services: 'Our Services',
  howItWorks: 'How It Works',
  areas: 'Areas We Cover',
  quote: 'Get a Free Quote',
}

export const hero = {
  eyebrow: 'Garden clearance specialists',
  headingLine1: 'Overgrown garden?',
  headingLine2Prefix: "Let's ",
  headingHighlight: 'ClearUp',
  headingSuffix: '.',
  paragraph:
    'From unwanted garden waste to a complete outdoor clear-out, we do the heavy lifting so you can enjoy your space again.',
  primaryCta: 'Get a Free Quote',
  secondaryCta: 'Send Us Your Photos',
  checks: ['All loading included', 'Responsible disposal', 'Friendly, reliable team'],
}

export const form = {
  heading: 'Get your free quote',
  intro: "Tell us what needs clearing and we'll be in touch.",
  submit: 'Request My Free Quote',
  privacy: "We'll only use your details to respond to your enquiry.",
  jobPlaceholder: 'What needs removing, and roughly how much?',
}

export const servicesSection = {
  heading: 'A fresh start for your outdoor space',
  intro:
    'Whether it is a few bags of cuttings or a plot that has got away from you, tell us what needs to go and we will take it from there.',
  cardCta: 'Find out more',
  quoteCta: 'Get a quote for this',
}

export const howItWorks = {
  heading: 'How it works',
  intro: 'Three simple steps from overgrown to cleared.',
  steps: [
    {
      title: 'Tell us what needs clearing',
      body: 'Fill in the quick form with a few details and, if you can, a couple of photos. It only takes a minute.',
    },
    {
      title: 'Receive your quote and arrange a collection',
      body: 'We come back with a clear quote. If you are happy, we agree a date and time that suits you.',
    },
    {
      title: 'We clear up and take the waste away',
      body: 'Our team does all the loading, clears the space and leaves your garden tidy.',
    },
  ],
}

export const whyClearUp = {
  heading: 'Why ClearUp',
  intro:
    'Garden clearance should be simple to arrange and simple to live with. Here is what you can expect from us.',
  points: [
    {
      title: 'Clear communication',
      body: 'You will know what is included, when we are coming and what happens on the day.',
    },
    {
      title: 'Loading included',
      body: 'You do not need to bag anything up or carry it out. We handle the lifting, loading and carrying.',
    },
    {
      title: 'Convenient clearance',
      body: 'One visit, one team, one price. No skip on your drive and no trips to the tip.',
    },
    {
      title: 'Left tidy',
      body: 'We sweep up after ourselves so the space is ready to use as soon as we leave.',
    },
  ],
}

export const areasSection = {
  heading: 'Areas we cover',
  intro: 'We cover Chester, Cheshire, Flintshire, Wrexham, Denbighshire and the Wirral. Not sure if that includes you? Pop your postcode in the quote form and we will confirm.',
  cta: 'Check my postcode',
}

export const servicePage = {
  includesHeading: 'What is included',
  quickAnswerLabel: 'In short',
  jobsHeading: 'Typical jobs',
  faqHeading: 'Common questions',
  otherServices: 'Other ways we can help',
  areasHeading: 'Where we offer',
  areasIntro: 'Choose your area for local details, or go straight to the quote form.',
  ctaHeading: 'Ready to get started?',
}

export const serviceAreaPage = {
  otherServicesHeading: 'Other services in',
  otherAreasHeading: 'in other areas',
  ctaHeadingPrefix: 'Get your free quote in',
}

export const areaPage = {
  headingPrefix: 'Garden Clearance in',
  servicesHeading: 'What we can clear in',
  nearbyHeading: 'Also covering',
  ctaHeadingPrefix: 'Get your free quote in',
}

/** Answer-first summaries for area pages and service-in-area pages (AEO). */
export const quickAnswers = {
  area: (area: string, county: string, places: string) =>
    `ClearUp provides garden clearance, green waste removal, end of tenancy garden clearance, site and land clearance, and shed clearance and dismantling in ${placeName(area, county)}, including ${places}. Loading is included, all waste is taken away, and quotes are free. Send your postcode and a few photos through the form to get started.`,
  serviceArea: (service: string, area: string, county: string, places: string, quickAnswer: string) =>
    `${quickAnswer} We provide ${service} throughout ${placeName(area, county)}, including ${places}.`,
}

/** "Mold, Flintshire" but just "Flintshire" when the area is the county. */
export const placeName = (area: string, county: string) => (area === county ? area : `${area}, ${county}`)

/** FAQs generated for each area (and reused on service-in-area pages). */
export const areaFaqs = (area: string, places: string, service?: string) => [
  {
    q: service ? `Which parts of ${area} do you cover for ${service}?` : `Which parts of ${area} do you cover?`,
    a: `We cover ${area} including ${places}. If you are just outside these, put your postcode in the quote form and we will confirm straight away.`,
  },
  {
    q: `How do I get a ${service ?? 'garden clearance'} quote in ${area}?`,
    a: 'Fill in the form on this page with your postcode and a short description of the job, and add photos if you can. We will come back to you with a free, no obligation quote.',
  },
  {
    q: 'Do you take the waste away, or do I need a skip?',
    a: 'We load and remove everything on the day, so there is no skip to hire, no permit to arrange and nothing left on your drive.',
  },
]

export const notFound = {
  heading: 'That page is not here',
  body: 'The link may be out of date. Head back to the homepage or send us a quote request and we will point you in the right direction.',
  cta: 'Back to the homepage',
}

export const faq = {
  heading: 'Frequently asked questions',
  items: [
    {
      q: 'What kinds of garden waste do you collect?',
      a: 'Most things that come out of a garden: grass cuttings, hedge trimmings, branches, leaves, weeds, brambles, soil, bagged waste, old fencing, sheds and unwanted outdoor items. If you are not sure about something, mention it in the form and we will let you know.',
    },
    {
      q: 'Do I need to bag or move anything before you arrive?',
      a: 'No. Loading is included, so you can leave everything where it is. If you have already bagged things up, that is fine too.',
    },
    {
      q: 'What if access to my garden is only through the house?',
      a: 'That is common and usually not a problem. Let us know in the form and we will plan the job around it, using sheets to protect floors where needed.',
    },
    {
      q: 'Why do you ask for photos?',
      a: 'Photos help us understand the size of the job and give you an accurate quote first time, without needing a separate visit. They are optional, but a couple of quick snaps from your phone make a real difference.',
    },
    {
      q: 'How is my quote worked out?',
      a: 'Quotes are based on the amount of waste, the type of waste and how much work is involved in clearing it, for example cutting back overgrowth or dismantling a shed. Your quote is free and there is no obligation.',
    },
    {
      q: 'How do I book?',
      a: 'Send your details through the form on this page. We will come back to you with a quote and, if you are happy, agree a collection date with you.',
    },
  ],
}

export const finalCta = {
  heading: 'Ready to reclaim your garden?',
  body: 'Send us a few details and we will get back to you with a free, no obligation quote.',
  cta: 'Get a Free Quote',
}
