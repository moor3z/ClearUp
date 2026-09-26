/**
 * Every URL on the site is built here so paths are consistent across
 * navigation, breadcrumbs, internal links, metadata, schema and sitemaps.
 *
 * Structure (all served with a trailing slash):
 *   /                                  home
 *   /<service>/                        service page, e.g. /garden-clearance/
 *   /<service>/<area>/                 service in an area, e.g. /garden-clearance/chester/
 *   /services/                         services hub
 *   /areas-we-cover/                   areas hub
 *   /areas-we-cover/<area>/            area page
 *   /how-it-works/  /pricing/  /about/  /contact/
 *   /guides/  /guides/<slug>/          informational content
 *   /projects/  /projects/<slug>/      completed jobs (only when data exists)
 *   /reviews/                          only when data exists
 *   /recycling/  /waste-licence/       only when the relevant facts are configured
 */

export const routes = {
  home: '/',
  services: '/services',
  service: (slug: string) => `/${slug}`,
  serviceArea: (serviceSlug: string, areaSlug: string) => `/${serviceSlug}/${areaSlug}`,
  areas: '/areas-we-cover',
  area: (slug: string) => `/areas-we-cover/${slug}`,
  howItWorks: '/how-it-works',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  guides: '/guides',
  guide: (slug: string) => `/guides/${slug}`,
  projects: '/projects',
  project: (slug: string) => `/projects/${slug}`,
  reviews: '/reviews',
  recycling: '/recycling',
  wasteLicence: '/waste-licence',
} as const
