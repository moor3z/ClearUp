/**
 * Copy for the standalone pages: How it works, Pricing, About, Contact and
 * the two hubs. Kept out of components so nothing SEO-relevant is hard-coded.
 */

export const howItWorksPage = {
  title: 'How garden clearance with ClearUp works',
  seoTitle: 'How It Works | ClearUp Garden Clearance',
  description: 'The three steps from enquiry to a cleared garden, what can be removed, how access is handled and what happens to the waste.',
  answer:
    'ClearUp works in three steps: you send details and photos through the quote form, we reply with a free quote and agree a date, then our team cuts back, loads and removes everything in a single visit. You do not need to bag, move or prepare anything.',
  canRemoveHeading: 'What can be removed',
  canRemove: [
    'Grass cuttings, hedge trimmings, prunings and leaves',
    'Brambles, weeds, ivy and overgrown shrubs',
    'Bagged and loose garden waste',
    'Soil, turf and small amounts of rubble (quoted by weight)',
    'Old fencing, trellis, timber and decking boards',
    'Sheds and small outbuildings, dismantled',
    'Garden furniture, pots, planters and general outdoor clutter',
  ],
  cannotRemoveHeading: 'What we cannot take',
  cannotRemove: [
    'Hazardous waste such as asbestos, chemicals, oil or gas bottles',
    'Large tree felling or stump removal (a tree surgeon is needed)',
  ],
  accessHeading: 'Access',
  access:
    'Most gardens are reached through a side gate or through the house. Both are fine. Tell us which in the quote form so the team brings floor protection and plans the carry to the van.',
  timingHeading: 'How long it takes',
  timing:
    'Most domestic gardens are cleared in a single visit. Larger plots or land clearance may be split over more than one visit, and the quote will say so.',
  wasteHeading: 'What happens to the waste',
  wasteGeneral:
    'Green waste is composted, timber and metal are separated for recycling, and soil and rubble go to inert waste facilities. Anyone collecting waste for payment must be a registered waste carrier; see the waste licence page for our registration where published.',
}

export const pricingPage = {
  title: 'How garden clearance is priced',
  seoTitle: 'Garden Clearance Cost: How Quotes Are Worked Out | ClearUp',
  description: 'How ClearUp works out a garden clearance quote: volume, weight, access, labour and material type. What is included and how to get an accurate figure.',
  answer:
    'Garden clearance pricing depends on the volume and weight of waste, the labour involved in cutting back and dismantling, how far it has to be carried to the van, and the type of material. Loading and disposal are included. Quotes are free, fixed once agreed and based on the details and photos you send.',
  factorsHeading: 'What affects the price',
  factors: [
    { title: 'Volume', body: 'How much waste there is once cut back, usually thought of in van loads.' },
    { title: 'Weight', body: 'Soil, turf, rubble and wet material weigh far more than green waste and are disposed of by the tonne.' },
    { title: 'Labour', body: 'Cutting back brambles or dismantling a shed takes longer than collecting bagged waste.' },
    { title: 'Access', body: 'A long carry, steps, or access through the house adds time.' },
    { title: 'Material type', body: 'Green waste, timber, metal, soil and mixed items are disposed of differently.' },
  ],
  includedHeading: 'What every quote includes',
  included: ['All labour, cutting back and loading', 'Transport and disposal of everything removed', 'Sweeping up afterwards', 'No skip, permit or hidden charges'],
  accurateHeading: 'Getting an accurate quote first time',
  accurate: [
    'Photos of the garden from a couple of angles, plus the access route',
    'A rough size and how long the garden has been left',
    'A separate mention of anything heavy: soil, turf, rubble, paving',
    'Anything to be dismantled, such as a shed or fencing',
  ],
  faqs: [
    {
      q: 'Do you charge for a quote or a visit?',
      a: 'No. Quotes are free. Most are given from photos and a description; for larger sites we may suggest a visit, which is also free.',
    },
    {
      q: 'Is the price fixed?',
      a: 'Once a quote is agreed it is fixed for the job as described. If the job turns out to be different from what was described, for example far more soil than mentioned, we will say so before doing extra work.',
    },
    {
      q: 'Is there a minimum charge?',
      a: 'Every job is quoted individually. Tell us what you have, however small, and we will give you a price.',
    },
    {
      q: 'Why is soil more expensive than green waste?',
      a: 'Weight. A bag of soil can weigh ten times as much as the same bag of hedge cuttings, and inert waste facilities charge by the tonne.',
    },
  ],
}

export const aboutPage = {
  title: 'About ClearUp',
  seoTitle: 'About ClearUp | Garden Clearance Specialists',
  description: 'Who ClearUp is and where it works: garden clearance and green waste removal across Chester, Flintshire, Wrexham, Denbighshire and the Wirral.',
  answer:
    'ClearUp is a garden clearance business serving Chester, Cheshire, Flintshire, Wrexham, Denbighshire and the Wirral. The team clears overgrown gardens, removes green waste, dismantles sheds, clears sites and land, and prepares rental gardens at the end of a tenancy. Every job includes loading and removal of the waste.',
  whatHeading: 'What we do',
  what: 'One team, one visit, everything loaded and taken away. We only do gardens and outdoor spaces, which means the equipment, the van and the disposal routes are all set up for green waste, timber and soil rather than general junk.',
  howHeading: 'How we work',
  how: [
    'Quotes from photos, free and without obligation',
    'A fixed price once agreed',
    'Cutting back and loading done by us, not left for you',
    'Paths and patios swept before we leave',
  ],
  trustHeading: 'Company details',
}

export const contactPage = {
  title: 'Contact ClearUp',
  seoTitle: 'Contact ClearUp | Free Garden Clearance Quotes',
  description: 'Request a free garden clearance quote from ClearUp. Send your postcode, a description and photos through the form and we will reply with a price.',
  answer:
    'The quickest way to contact ClearUp is the quote form on this page. Send your postcode, what needs clearing and a few photos, and we will reply with a free quote.',
  channelsHeading: 'Other ways to reach us',
}

export const servicesHub = {
  title: 'Garden clearance services',
  seoTitle: 'Garden Clearance Services | ClearUp',
  description: 'ClearUp services: garden clearance, green waste removal, end of tenancy garden clearance, site and land clearance, shed clearance and dismantling.',
  intro: 'Everything we do is outdoors: gardens, green waste, sheds, plots and land. Choose a service for details, or go straight to the quote form.',
}

export const areasHub = {
  title: 'Areas we cover',
  seoTitle: 'Areas We Cover | ClearUp Garden Clearance',
  description: 'ClearUp provides garden clearance across Chester, Ellesmere Port, Deeside, Mold, Flintshire, Wrexham, Denbighshire and the Wirral. Choose your area.',
  answer:
    'ClearUp covers Chester, Ellesmere Port and the surrounding Cheshire villages, Deeside, Mold and the rest of Flintshire, Wrexham, Denbighshire and the Wirral. If your postcode is close to one of these, send it through the quote form and we will confirm.',
}

export const guidesHub = {
  title: 'Garden clearance guides',
  seoTitle: 'Garden Clearance Guides and Advice | ClearUp',
  description: 'Plain answers to common garden clearance questions: what is included, skip hire compared, disposing of garden waste, soil removal and preparing for the day.',
  intro: 'Straight answers to the questions we are asked most, written for people deciding how to deal with an overgrown garden.',
}

export const projectsHub = {
  title: 'Completed garden clearances',
  seoTitle: 'Completed Garden Clearance Jobs | ClearUp',
  description: 'Recent garden clearance, green waste removal and shed clearance jobs completed by ClearUp, with before and after photos.',
}

export const reviewsPage = {
  title: 'Customer reviews',
  seoTitle: 'ClearUp Reviews | Garden Clearance Customers',
  description: 'What customers say about ClearUp garden clearance, with links to the original reviews.',
}
