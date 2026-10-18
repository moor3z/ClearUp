import { areas, findArea } from '../config/areas'
import { areaPage, notFound } from '../config/content'
import { findGuide, guides } from '../config/guides'
import { aboutPage, areasHub, contactPage, guidesHub, howItWorksPage, pricingPage, projectsHub, reviewsPage, servicesHub } from '../config/pages'
import { findProject, projects } from '../config/projects'
import { reviews } from '../config/reviews'
import { routes } from '../config/routes'
import { findService, services } from '../config/services'
import { site } from '../config/site'

export interface PageMeta {
  title: string
  description: string
  ogType: 'website' | 'article'
  /** Sitemap grouping */
  group: 'pages' | 'services' | 'areas' | 'guides' | 'projects'
  /** Content date for lastmod/dateModified where the page has a real one */
  dateModified?: string
}

/**
 * Service-in-area pages. 'all' builds every service in every area (the
 * client's current choice). 'primary' builds only the main service in each
 * area, which is the safer option until each combination has genuinely
 * local content, as near-identical pages can be treated as doorway pages.
 */
export const serviceAreaMode: 'all' | 'primary' = 'all'

export const hasReviews = reviews.length > 0
export const hasProjects = projects.length > 0
export const hasRecycling = Boolean(site.trust.disposalStatement)
export const hasWasteLicence = Boolean(site.legal.wasteCarrierNumber)

/** Every path that gets prerendered to its own HTML file. */
export function allRoutes(): string[] {
  const comboServices = serviceAreaMode === 'all' ? services : services.slice(0, 1)
  return [
    routes.home,
    routes.services,
    ...services.map((s) => routes.service(s.slug)),
    ...comboServices.flatMap((s) => areas.map((a) => routes.serviceArea(s.slug, a.slug))),
    routes.areas,
    ...areas.map((a) => routes.area(a.slug)),
    routes.howItWorks,
    routes.pricing,
    routes.about,
    routes.contact,
    routes.guides,
    ...guides.map((g) => routes.guide(g.slug)),
    ...(hasProjects ? [routes.projects, ...projects.map((p) => routes.project(p.slug))] : []),
    ...(hasReviews ? [routes.reviews] : []),
    ...(hasRecycling ? [routes.recycling] : []),
    ...(hasWasteLicence ? [routes.wasteLicence] : []),
  ]
}

const serviceSlugs = new Set(services.map((s) => s.slug))

/** Parse a path into what it points at. */
export function matchRoute(path: string) {
  if (path === routes.home) return { kind: 'home' as const }
  const seg = path.split('/').filter(Boolean)
  if (seg.length === 1 && serviceSlugs.has(seg[0])) return { kind: 'service' as const, service: findService(seg[0])! }
  if (seg.length === 2 && serviceSlugs.has(seg[0])) {
    const service = findService(seg[0])!
    const area = findArea(seg[1])
    const allowed = serviceAreaMode === 'all' || service === services[0]
    if (area && allowed) return { kind: 'serviceArea' as const, service, area }
  }
  if (path === routes.services) return { kind: 'servicesHub' as const }
  if (path === routes.areas) return { kind: 'areasHub' as const }
  if (seg[0] === 'areas-we-cover' && seg.length === 2) {
    const area = findArea(seg[1])
    if (area) return { kind: 'area' as const, area }
  }
  if (path === routes.howItWorks) return { kind: 'howItWorks' as const }
  if (path === routes.pricing) return { kind: 'pricing' as const }
  if (path === routes.about) return { kind: 'about' as const }
  if (path === routes.contact) return { kind: 'contact' as const }
  if (path === routes.guides) return { kind: 'guidesHub' as const }
  if (seg[0] === 'guides' && seg.length === 2) {
    const guide = findGuide(seg[1])
    if (guide) return { kind: 'guide' as const, guide }
  }
  if (hasProjects && path === routes.projects) return { kind: 'projectsHub' as const }
  if (hasProjects && seg[0] === 'projects' && seg.length === 2) {
    const project = findProject(seg[1])
    if (project) return { kind: 'project' as const, project }
  }
  if (hasReviews && path === routes.reviews) return { kind: 'reviews' as const }
  if (hasRecycling && path === routes.recycling) return { kind: 'recycling' as const }
  if (hasWasteLicence && path === routes.wasteLicence) return { kind: 'wasteLicence' as const }
  return { kind: 'notFound' as const }
}

export type RouteMatch = ReturnType<typeof matchRoute>

export function pageMeta(path: string): PageMeta {
  const m = matchRoute(path)
  const web = (title: string, description: string, group: PageMeta['group'] = 'pages'): PageMeta => ({ title, description, ogType: 'website', group })
  switch (m.kind) {
    case 'home':
      return web(site.seo.title, site.seo.description)
    case 'service':
      return web(`${m.service.name} | ${site.name}`, m.service.seoDescription, 'services')
    case 'serviceArea':
      return web(
        `${m.service.name} ${m.area.name} | ${site.name}`,
        `${m.service.name} in ${m.area.name} and ${m.area.places.slice(0, 3).join(', ')}. Loading and disposal included. Free quotes from ${site.name}.`,
        'areas',
      )
    case 'servicesHub':
      return web(servicesHub.seoTitle, servicesHub.description, 'services')
    case 'areasHub':
      return web(areasHub.seoTitle, areasHub.description, 'areas')
    case 'area':
      return web(
        m.area.seoTitle ?? `${areaPage.headingPrefix} ${m.area.name} | ${site.name}`,
        m.area.metaDescription ?? `Garden clearance, green waste removal and shed clearance in ${m.area.name}, covering ${m.area.places.slice(0, 3).join(', ')}. Loading included. Free quotes from ${site.name}.`,
        'areas',
      )
    case 'howItWorks':
      return web(howItWorksPage.seoTitle, howItWorksPage.description)
    case 'pricing':
      return web(pricingPage.seoTitle, pricingPage.description)
    case 'about':
      return web(aboutPage.seoTitle, aboutPage.description)
    case 'contact':
      return web(contactPage.seoTitle, contactPage.description)
    case 'guidesHub':
      return web(guidesHub.seoTitle, guidesHub.description, 'guides')
    case 'guide':
      return { title: m.guide.seoTitle, description: m.guide.description, ogType: 'article', group: 'guides', dateModified: m.guide.dateModified }
    case 'projectsHub':
      return web(projectsHub.seoTitle, projectsHub.description, 'projects')
    case 'project':
      return { title: `${m.project.title} | ${site.name}`, description: m.project.description, ogType: 'article', group: 'projects', dateModified: m.project.date }
    case 'reviews':
      return web(reviewsPage.seoTitle, reviewsPage.description)
    case 'recycling':
      return web(`Recycling and Waste Disposal | ${site.name}`, site.trust.disposalStatement)
    case 'wasteLicence':
      return web(`Waste Carrier Licence | ${site.name}`, `${site.name} is a registered waste carrier. Registration number and register details for customers to verify.`)
    default:
      return web(`${notFound.heading} | ${site.name}`, site.seo.description)
  }
}

/** Lines for llms.txt: one per page with its title and description. */
export function llmsIndex() {
  return allRoutes().map((r) => ({ path: r, ...pageMeta(r) }))
}
