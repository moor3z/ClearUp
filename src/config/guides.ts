import type { ServiceId } from './services'

/**
 * Informational guides. Each one answers a real customer question, in
 * garden clearance terms only. Written to be extractable: the `answer`
 * field is a direct response to the title, shown first on the page.
 */

export interface GuideTable {
  caption: string
  columns: string[]
  rows: string[][]
}

export interface GuideSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
  ordered?: boolean
  table?: GuideTable
}

export interface Guide {
  slug: string
  title: string
  seoTitle: string
  description: string
  datePublished: string
  dateModified: string
  answer: string
  sections: GuideSection[]
  faqs?: { q: string; a: string }[]
  relatedServices: Exclude<ServiceId, 'other'>[]
  relatedGuides: string[]
}

export const guides: Guide[] = [
  {
    slug: 'what-does-garden-clearance-include',
    title: 'What does garden clearance include?',
    seoTitle: 'What Does Garden Clearance Include? | ClearUp',
    description:
      'What a garden clearance covers, what usually is not included, and how to describe your garden so the quote matches the job.',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    answer:
      'Garden clearance includes cutting back overgrowth, clearing lawns, beds, borders and paths, and removing the resulting waste along with any unwanted garden items. Loading and removal are part of the job. It does not include landscaping, planting or laying new surfaces.',
    sections: [
      {
        heading: 'Work that is included',
        list: [
          'Cutting back brambles, weeds, long grass and self-seeded growth',
          'Trimming or cutting back overgrown shrubs and hedges',
          'Clearing beds, borders, paths and patios of debris',
          'Removing bagged or loose green waste already in the garden',
          'Taking away unwanted garden items such as old pots, fencing, timber and garden furniture',
          'Loading everything onto the van and disposing of it',
          'Sweeping paths and patios before leaving',
        ],
      },
      {
        heading: 'Work that is not usually included',
        paragraphs: [
          'Garden clearance is about removal and reset, not construction. The following are separate jobs and should be arranged with a landscaper or tree surgeon:',
        ],
        list: [
          'Laying turf, paving or decking',
          'Planting, re-seeding or redesign',
          'Felling large trees or removing stumps',
          'Removing sheds or other structures, unless booked as shed clearance and dismantling',
        ],
      },
      {
        heading: 'What you do not need to do beforehand',
        paragraphs: [
          'You do not need to bag anything up, move items to the front or hire a skip. Loading is included. If access is through the house, tell us in the quote form so it can be planned for.',
        ],
      },
      {
        heading: 'How to describe the job for an accurate quote',
        ordered: true,
        list: [
          'Say roughly how big the garden is and how long it has been left.',
          'List anything other than plants that needs to go, such as fencing, a rotten shed or old furniture.',
          'Mention soil, turf or rubble separately, as these are heavier than green waste.',
          'Add a few photos, including one of the access route.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is hedge cutting part of garden clearance?',
        a: 'Cutting back overgrown hedges to bring them under control is included. Regular shaped hedge trimming as ongoing maintenance is a gardening job rather than a clearance.',
      },
      {
        q: 'Do you take the waste with you on the day?',
        a: 'Yes. Everything cleared is loaded and removed during the same visit.',
      },
    ],
    relatedServices: ['garden-clearance', 'green-waste', 'shed-clearance'],
    relatedGuides: ['garden-clearance-vs-skip-hire', 'how-to-prepare-for-a-garden-clearance'],
  },
  {
    slug: 'garden-clearance-vs-skip-hire',
    title: 'Garden clearance or skip hire: which is better for garden waste?',
    seoTitle: 'Garden Clearance vs Skip Hire for Garden Waste | ClearUp',
    description:
      'A plain comparison of a garden clearance service and hiring a skip for garden waste: labour, permits, time, what can go in and how the cost is worked out.',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    answer:
      'A garden clearance service includes the labour to cut back, load and remove waste in one visit, with no skip on the drive and no permit. A skip is cheaper only if you are willing to do all the cutting and loading yourself and have somewhere to put it. For most overgrown gardens a clearance service is quicker and less work.',
    sections: [
      {
        heading: 'Side by side',
        table: {
          caption: 'Garden clearance service compared with hiring a skip',
          columns: ['', 'Garden clearance service', 'Skip hire'],
          rows: [
            ['Who does the cutting and loading', 'The clearance team', 'You'],
            ['Where the waste sits', 'Straight onto the van', 'In the skip on your drive or the road for days'],
            ['Permit', 'None needed', 'Council permit needed if the skip goes on a public road'],
            ['Time', 'Usually one visit', 'Delivery, your labour over days, then collection'],
            ['Overloading', 'Not your problem', 'Level loads only; heavy soil fills a skip fast'],
            ['How cost is worked out', 'Volume, weight, access and labour', 'Skip size, hire period and permit'],
          ],
        },
      },
      {
        heading: 'When a skip makes sense',
        paragraphs: [
          'A skip suits a project where waste builds up over a week or more, such as a landscaping job, and you have the time and fitness to fill it yourself. It also suits mixed building and garden waste from the same project.',
        ],
      },
      {
        heading: 'When a clearance service makes sense',
        list: [
          'The garden is overgrown and the cutting back is the hard part',
          'You want it done in one visit rather than over several days',
          'There is no room for a skip, or you would need a road permit',
          'Access is through the house or down a narrow side path',
          'The waste is mostly green waste, which is bulky but light',
        ],
      },
      {
        heading: 'What about soil and turf?',
        paragraphs: [
          'Soil and turf are heavy. They fill a skip quickly and skip companies limit how much can go in. A clearance service quotes for the weight involved instead, so tell us if soil or turf is part of the job.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I hire a skip just for garden waste?',
        a: 'Yes, but you still do the cutting and loading, and heavy materials such as soil are restricted. Check with the skip company before filling it.',
      },
    ],
    relatedServices: ['garden-clearance', 'green-waste', 'site-land'],
    relatedGuides: ['what-does-garden-clearance-include', 'how-to-dispose-of-garden-waste'],
  },
  {
    slug: 'how-to-dispose-of-garden-waste',
    title: 'How to dispose of garden waste',
    seoTitle: 'How to Dispose of Garden Waste in the UK | ClearUp',
    description:
      'The ways to get rid of garden waste in the UK: council garden bins, recycling centres, composting and collection services, and what to check before paying someone to take it.',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    answer:
      'Garden waste can go in a council garden waste bin where one is offered, be taken to a household waste recycling centre, be composted at home, or be collected by a waste carrier such as ClearUp. Anyone you pay to take waste away must be registered as a waste carrier, and the householder is responsible for checking.',
    sections: [
      {
        heading: 'Your options',
        table: {
          caption: 'Ways to dispose of garden waste',
          columns: ['Option', 'Best for', 'Things to know'],
          rows: [
            ['Council garden waste bin', 'Small, regular amounts', 'Usually a paid subscription; limited to what fits in the bin each fortnight'],
            ['Household waste recycling centre', 'A car or trailer load', 'Opening hours, vehicle rules and booking systems vary by council'],
            ['Home composting', 'Soft green waste', 'Slow; woody material, weeds with seeds and diseased plants are not suitable'],
            ['Collection service', 'Large or one-off amounts, overgrown gardens', 'Loading included; check the carrier is registered'],
          ],
        },
      },
      {
        heading: 'Check who takes your waste',
        paragraphs: [
          'Under the household duty of care in England and Wales, you are responsible for taking reasonable steps to make sure anyone removing waste from your property is authorised to do so. Ask for the carrier registration number and check it on the Environment Agency or Natural Resources Wales public register. If unregistered waste is fly-tipped, the householder can be fined.',
        ],
      },
      {
        heading: 'What happens to collected garden waste',
        paragraphs: [
          'Green waste is normally taken to a licensed transfer station or composting facility where it is shredded and composted. Timber, fencing and mixed garden items are separated for recycling or disposal according to material. Soil and rubble go to inert waste facilities.',
        ],
      },
      {
        heading: 'Can garden waste go in the general rubbish bin?',
        paragraphs: [
          'Small amounts are generally allowed, but councils ask that garden waste is kept out of general waste so it can be composted rather than landfilled, and bulky green waste will not fit in any case.',
        ],
      },
    ],
    relatedServices: ['green-waste', 'garden-clearance'],
    relatedGuides: ['garden-clearance-vs-skip-hire', 'can-you-remove-soil-and-turf'],
  },
  {
    slug: 'can-you-remove-soil-and-turf',
    title: 'Can you remove soil and turf?',
    seoTitle: 'Soil and Turf Removal as Part of Garden Clearance | ClearUp',
    description:
      'Whether soil, turf and rubble can be removed as part of a garden clearance, why they are quoted differently from green waste, and how to describe them in your quote request.',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    answer:
      'Yes. Soil, turf and small amounts of rubble can be removed as part of a garden clearance or green waste collection. They are quoted by weight rather than volume because they are far heavier than green waste, so it helps to say roughly how much there is and whether it is bagged or in a pile.',
    sections: [
      {
        heading: 'Why soil is quoted differently',
        paragraphs: [
          'A bag of hedge trimmings weighs a few kilograms. The same bag full of soil can weigh 20 to 25 kilograms. Vans have a legal payload limit, so soil and turf take up weight allowance quickly and are disposed of at inert waste facilities that charge by the tonne. That is why a clearance quote treats them separately from green waste.',
        ],
      },
      {
        heading: 'How to describe it',
        ordered: true,
        list: [
          'Say whether it is loose soil, lifted turf, or mixed with stones and rubble.',
          'Estimate the amount: bags, a pile so many metres across, or a raised bed of a given size.',
          'Say where it is and how far it has to be carried to the van.',
          'Add a photo.',
        ],
      },
      {
        heading: 'What we do not take',
        paragraphs: [
          'Soil contaminated with oil, chemicals or asbestos is hazardous waste and needs a specialist. If in doubt, tell us and we will say whether we can help.',
        ],
      },
    ],
    relatedServices: ['green-waste', 'site-land', 'garden-clearance'],
    relatedGuides: ['how-to-dispose-of-garden-waste', 'garden-clearance-vs-skip-hire'],
  },
  {
    slug: 'how-to-prepare-for-a-garden-clearance',
    title: 'How to prepare for a garden clearance',
    seoTitle: 'How to Prepare for a Garden Clearance | ClearUp',
    description: 'A short checklist for the day of a garden clearance: what to move, what to point out and what to leave to the team.',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    answer:
      'Very little preparation is needed. Move or mark anything you want to keep, make sure the team can get in, mention pets and anything hidden in the growth, and leave the cutting and loading to us.',
    sections: [
      {
        heading: 'Before the team arrives',
        ordered: true,
        list: [
          'Move anything you want to keep out of the area, or mark it clearly.',
          'Point out plants or shrubs to be left alone. Cane, string or a quick photo with notes works well.',
          'Make sure side gates are unlocked and any vehicles are moved off the access route.',
          'Keep pets inside while cutting equipment is in use.',
          'Tell us about hidden hazards in the growth: buried glass, an old pond, a septic tank cover, wire or rubble.',
        ],
      },
      {
        heading: 'What you do not need to do',
        list: ['Bag up waste', 'Carry anything to the front', 'Provide tools or bins', 'Hire a skip'],
      },
      {
        heading: 'During the job',
        paragraphs: [
          'You do not need to stay on site, but someone contactable by phone is useful in case a question comes up, for example whether a self-seeded shrub should stay.',
        ],
      },
    ],
    relatedServices: ['garden-clearance', 'end-of-tenancy'],
    relatedGuides: ['what-does-garden-clearance-include'],
  },
]

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug)
