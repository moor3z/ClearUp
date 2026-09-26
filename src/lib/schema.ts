import { areas, listPlaces, type Area } from '../config/areas'
import { areaFaqs, faq as generalFaq, howItWorks } from '../config/content'
import { guides, type Guide } from '../config/guides'
import { aboutPage, areasHub, contactPage, howItWorksPage, pricingPage, servicesHub } from '../config/pages'
import type { Project } from '../config/projects'
import { routes } from '../config/routes'
import { services, type Service } from '../config/services'
import { site } from '../config/site'
import { matchRoute, pageMeta } from './seo'

/**
 * One connected schema.org graph per page, built from config only.
 *
 * Persistent @ids:
 *   /#organization  /#website  /#logo  /#area-<slug>
 *   /<service>/#service            /<service>/<area>/#service
 *   /guides/<slug>/#article        <page>/#breadcrumb  <page>/#faq
 *
 * Anything unverified (address, phone, hours, profiles, reviews) is left out
 * rather than guessed. Ratings are never emitted from our own site.
 */

type Node = Record<string, unknown>

const base = site.url.replace(/\/$/, '')
const abs = (path: string) => `${base}${path === '/' ? '/' : `${path}/`}`
const id = (fragment: string) => `${base}/#${fragment}`
const asset = (path: string) => `${base}${path}`
const ORG = id('organization')

function organization(): Node {
  const { contact, local, legal } = site
  const hasAddress = Boolean(local.address.streetAddress || local.address.addressLocality || local.address.postalCode)
  const node: Node = {
    '@type': 'LocalBusiness',
    '@id': ORG,
    name: site.name,
    slogan: site.tagline,
    description: site.seo.aiSummary,
    url: base ? `${base}/` : '/',
    logo: { '@id': id('logo') },
    image: { '@id': id('logo') },
    areaServed: areas.map((a) => ({ '@id': id(`area-${a.slug}`) })),
    knowsAbout: services.map((s) => s.serviceType),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: servicesHub.title,
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': `${abs(routes.service(s.slug))}#service` } })),
    },
  }
  if (site.legalName) node.legalName = site.legalName
  if (legal.vatNumber) node.vatID = legal.vatNumber
  if (contact.phone) {
    node.telephone = contact.phone
    node.contactPoint = { '@type': 'ContactPoint', telephone: contact.phone, contactType: 'customer service', areaServed: 'GB', availableLanguage: 'en' }
  }
  if (contact.email) node.email = contact.email
  if (hasAddress) node.address = { '@type': 'PostalAddress', ...local.address }
  if (hasAddress && local.geo.latitude && local.geo.longitude) {
    node.geo = { '@type': 'GeoCoordinates', latitude: local.geo.latitude, longitude: local.geo.longitude }
  }
  if (local.openingHours.length) node.openingHours = local.openingHours
  if (local.sameAs.length) node.sameAs = local.sameAs
  if (local.mapUrl) node.hasMap = local.mapUrl
  return node
}

const logoNode = (): Node => ({
  '@type': 'ImageObject',
  '@id': id('logo'),
  url: asset('/brand/clearup-logo.png'),
  contentUrl: asset('/brand/clearup-logo.png'),
  width: 640,
  height: 250,
  caption: `${site.name} logo`,
})

const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': id('website'),
  url: base ? `${base}/` : '/',
  name: site.name,
  description: site.seo.description,
  inLanguage: 'en-GB',
  publisher: { '@id': ORG },
})

const placeNodes = (): Node[] =>
  areas.map((a) => ({
    '@type': 'Place',
    '@id': id(`area-${a.slug}`),
    name: a.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: a.county },
    geo: { '@type': 'GeoCoordinates', latitude: a.geo.latitude, longitude: a.geo.longitude },
  }))

function serviceNode(s: Service, area?: Area): Node {
  const path = area ? routes.serviceArea(s.slug, area.slug) : routes.service(s.slug)
  return {
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name: area ? `${s.name} in ${area.name}` : s.name,
    serviceType: s.serviceType,
    description: s.quickAnswer,
    provider: { '@id': ORG },
    areaServed: area ? [{ '@id': id(`area-${area.slug}`) }] : areas.map((a) => ({ '@id': id(`area-${a.slug}`) })),
    url: abs(path),
    ...(area ? { isVariantOf: { '@id': `${abs(routes.service(s.slug))}#service` } } : {}),
  }
}

const faqNode = (path: string, items: { q: string; a: string }[]): Node => ({
  '@type': 'FAQPage',
  '@id': `${abs(path)}#faq`,
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
})

const breadcrumb = (path: string, crumbs: { name: string; path?: string }[]): Node => ({
  '@type': 'BreadcrumbList',
  '@id': `${abs(path)}#breadcrumb`,
  itemListElement: [{ name: 'Home', path: routes.home }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    ...(c.path ? { item: abs(c.path) } : {}),
  })),
})

function webPage(path: string, type = 'WebPage', extra: Node = {}): Node {
  const meta = pageMeta(path)
  return {
    '@type': type,
    '@id': abs(path),
    url: abs(path),
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': id('website') },
    about: { '@id': ORG },
    primaryImageOfPage: { '@id': id('logo') },
    dateModified: meta.dateModified ?? __BUILD_DATE__,
    breadcrumb: { '@id': `${abs(path)}#breadcrumb` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#page-heading', '#quick-answer'] },
    ...extra,
  }
}

function articleNode(g: Guide): Node {
  const path = routes.guide(g.slug)
  return {
    '@type': 'Article',
    '@id': `${abs(path)}#article`,
    headline: g.title,
    description: g.description,
    datePublished: g.datePublished,
    dateModified: g.dateModified,
    author: { '@id': ORG },
    publisher: { '@id': ORG },
    mainEntityOfPage: { '@id': abs(path) },
    image: { '@id': id('logo') },
    inLanguage: 'en-GB',
    about: g.relatedServices.map((sid) => ({ '@id': `${abs(routes.service(services.find((s) => s.id === sid)!.slug))}#service` })),
  }
}

function projectNode(p: Project): Node {
  const path = routes.project(p.slug)
  const service = services.find((s) => s.id === p.serviceId)!
  const images = [...(p.beforeImages ?? []), ...(p.afterImages ?? [])]
  return {
    '@type': 'Article',
    '@id': `${abs(path)}#article`,
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    author: { '@id': ORG },
    publisher: { '@id': ORG },
    mainEntityOfPage: { '@id': abs(path) },
    about: { '@id': `${abs(routes.service(service.slug))}#service` },
    contentLocation: { '@id': id(`area-${p.areaSlug}`) },
    ...(images.length ? { image: images.map((i) => ({ '@type': 'ImageObject', url: asset(i.src), width: i.width, height: i.height, caption: i.alt })) } : {}),
  }
}

export function schemaFor(path: string): Node {
  const graph: Node[] = [organization(), logoNode(), websiteNode(), ...placeNodes()]
  const m = matchRoute(path)

  switch (m.kind) {
    case 'home':
      graph.push(
        ...services.map((s) => serviceNode(s)),
        webPage(path, 'WebPage', {
          mainEntity: { '@id': ORG },
          breadcrumb: undefined,
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-heading', '#quick-answer'] },
        }),
        faqNode(path, generalFaq.items),
        {
          '@type': 'HowTo',
          '@id': `${abs(routes.howItWorks)}#howto`,
          name: howItWorks.heading,
          step: howItWorks.steps.map((st, i) => ({ '@type': 'HowToStep', position: i + 1, name: st.title, text: st.body })),
        },
      )
      break
    case 'service':
      graph.push(
        serviceNode(m.service),
        webPage(path, 'WebPage', { mainEntity: { '@id': `${abs(path)}#service` } }),
        breadcrumb(path, [{ name: servicesHub.title, path: routes.services }, { name: m.service.name }]),
        faqNode(path, m.service.faqs),
      )
      break
    case 'serviceArea':
      graph.push(
        serviceNode(m.service, m.area),
        webPage(path, 'WebPage', { mainEntity: { '@id': `${abs(path)}#service` } }),
        breadcrumb(path, [{ name: servicesHub.title, path: routes.services }, { name: m.service.name, path: routes.service(m.service.slug) }, { name: m.area.name }]),
        faqNode(path, [...m.service.faqs, ...areaFaqs(m.area.name, listPlaces(m.area), m.service.formLabel.toLowerCase()).slice(0, 2)]),
      )
      break
    case 'servicesHub':
      graph.push(
        webPage(path, 'CollectionPage', { mainEntity: { '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(routes.service(s.slug)), name: s.name })) } }),
        breadcrumb(path, [{ name: servicesHub.title }]),
      )
      break
    case 'areasHub':
      graph.push(
        webPage(path, 'CollectionPage', { mainEntity: { '@type': 'ItemList', itemListElement: areas.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(routes.area(a.slug)), name: a.name })) } }),
        breadcrumb(path, [{ name: areasHub.title }]),
      )
      break
    case 'area':
      graph.push(
        ...services.map((s) => serviceNode(s, m.area)),
        webPage(path, 'WebPage', { mainEntity: { '@id': id(`area-${m.area.slug}`) } }),
        breadcrumb(path, [{ name: areasHub.title, path: routes.areas }, { name: m.area.name }]),
        faqNode(path, [...(m.area.faqs ?? []), ...areaFaqs(m.area.name, listPlaces(m.area))]),
      )
      break
    case 'howItWorks':
      graph.push(
        webPage(path),
        breadcrumb(path, [{ name: howItWorksPage.title }]),
        {
          '@type': 'HowTo',
          '@id': `${abs(path)}#howto`,
          name: howItWorks.heading,
          step: howItWorks.steps.map((st, i) => ({ '@type': 'HowToStep', position: i + 1, name: st.title, text: st.body })),
        },
      )
      break
    case 'pricing':
      graph.push(webPage(path), breadcrumb(path, [{ name: pricingPage.title }]), faqNode(path, pricingPage.faqs))
      break
    case 'about':
      graph.push(webPage(path, 'AboutPage', { mainEntity: { '@id': ORG } }), breadcrumb(path, [{ name: aboutPage.title }]))
      break
    case 'contact':
      graph.push(webPage(path, 'ContactPage', { mainEntity: { '@id': ORG } }), breadcrumb(path, [{ name: contactPage.title }]))
      break
    case 'guidesHub':
      graph.push(
        webPage(path, 'CollectionPage', { mainEntity: { '@type': 'ItemList', itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(routes.guide(g.slug)), name: g.title })) } }),
        breadcrumb(path, [{ name: 'Guides' }]),
      )
      break
    case 'guide':
      graph.push(articleNode(m.guide), webPage(path, 'WebPage', { mainEntity: { '@id': `${abs(path)}#article` } }), breadcrumb(path, [{ name: 'Guides', path: routes.guides }, { name: m.guide.title }]))
      if (m.guide.faqs?.length) graph.push(faqNode(path, m.guide.faqs))
      break
    case 'projectsHub':
      graph.push(webPage(path, 'CollectionPage'), breadcrumb(path, [{ name: 'Projects' }]))
      break
    case 'project':
      graph.push(projectNode(m.project), webPage(path, 'WebPage', { mainEntity: { '@id': `${abs(path)}#article` } }), breadcrumb(path, [{ name: 'Projects', path: routes.projects }, { name: m.project.title }]))
      break
    case 'reviews':
    case 'recycling':
    case 'wasteLicence':
      graph.push(webPage(path), breadcrumb(path, [{ name: pageMeta(path).title.split(' | ')[0] }]))
      break
    default:
      graph.push(webPage(path, 'WebPage', { breadcrumb: undefined }))
  }

  // Strip undefined values so the JSON is clean
  return JSON.parse(JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }))
}
