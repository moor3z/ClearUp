import { areaHref, areas } from '../config/areas'
import { nav } from '../config/content'
import { routes } from '../config/routes'
import { serviceHref, services } from '../config/services'
import { site } from '../config/site'
import { Link } from '../lib/router'
import { hasProjects, hasRecycling, hasReviews, hasWasteLicence } from '../lib/seo'
import { byLabel } from './Header'
import Logo from './Logo'
import TrustSignals from './TrustSignals'

const linkCls = 'inline-block rounded-md py-2 text-white/85 hover:text-white hover:underline'

export default function Footer() {
  const { contact, legal, legalLinks } = site
  const hasContact = Boolean(contact.phone || contact.email || contact.whatsapp || contact.hours)
  const hasLegal = Boolean(site.legalName || legal.tradingName || legal.companyNumber || legal.vatNumber || legal.registeredAddress || legal.wasteCarrierNumber)
  const year = new Date().getFullYear()
  const company = [
    { label: 'About', to: routes.about },
    { label: nav.howItWorks, to: routes.howItWorks },
    { label: 'Pricing', to: routes.pricing },
    { label: 'Guides', to: routes.guides },
    { label: 'Contact', to: routes.contact },
    ...(hasReviews ? [{ label: 'Reviews', to: routes.reviews }] : []),
    ...(hasProjects ? [{ label: 'Projects', to: routes.projects }] : []),
    ...(hasRecycling ? [{ label: 'Recycling', to: routes.recycling }] : []),
    ...(hasWasteLicence ? [{ label: 'Waste licence', to: routes.wasteLicence }] : []),
  ].sort(byLabel)
  const footerServices = [...services].sort((a, b) => a.name.localeCompare(b.name, 'en-GB'))
  const footerAreas = [...areas].sort((a, b) => a.name.localeCompare(b.name, 'en-GB'))

  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Link to={routes.home} className="inline-block rounded-md" aria-label="ClearUp, home">
            <Logo variant="white" className="h-16" />
          </Link>
          <p className="mt-4 max-w-sm text-white/75">{site.seo.aiSummary}</p>
          {hasContact && (
            <address className="mt-5 space-y-1 not-italic text-white/85">
              {contact.phone && (
                <p>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:underline">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.whatsapp && (
                <p>
                  <a href={contact.whatsapp} className="hover:underline">
                    WhatsApp
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.hours && <p>{contact.hours}</p>}
            </address>
          )}
          {!hasContact && (
            <p className="mt-5 text-white/85">
              The quickest way to reach us is the{' '}
              <Link to={routes.contact} className="font-semibold text-white underline underline-offset-2">
                free quote form
              </Link>
              .
            </p>
          )}
        </div>

        <nav aria-label="Footer services">
          <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
            <Link to={routes.services} className="inline-block py-2 hover:underline">
              {nav.services}
            </Link>
          </h2>
          <ul className="mt-4 space-y-0">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link to={serviceHref(s)} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer areas">
          <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
            <Link to={routes.areas} className="inline-block py-2 hover:underline">
              {nav.areas}
            </Link>
          </h2>
          <ul className="mt-4 space-y-0">
            {footerAreas.map((a) => (
              <li key={a.slug}>
                <Link to={areaHref(a)} className={linkCls}>
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer company">
          <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">Company</h2>
          <ul className="mt-4 space-y-0">
            {company.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className={linkCls}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="[&_li]:text-white/80 [&_svg]:text-leaf">
              <TrustSignals compact />
            </div>
            <p>
              &copy; {year} {site.name}. All rights reserved.
            </p>
            {hasLegal && (
              <p>
                {[
                  site.legalName && legal.tradingName ? legal.tradingName : site.legalName ? `${site.name} is a trading name of ${site.legalName}` : legal.tradingName,
                  legal.companyNumber && `Company number ${legal.companyNumber}`,
                  legal.vatNumber && `VAT ${legal.vatNumber}`,
                  legal.registeredAddress && `Registered office: ${legal.registeredAddress}`,
                  legal.wasteCarrierNumber && `Waste carrier registration ${legal.wasteCarrierNumber}`,
                ]
                  .filter(Boolean)
                  .join('. ')}
                .
              </p>
            )}
          </div>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-block py-2 hover:text-white hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
