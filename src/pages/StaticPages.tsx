import Breadcrumb from '../components/Breadcrumb'
import { FactList, Section } from '../components/ContentBlocks'
import Faq from '../components/Faq'
import HowItWorks from '../components/HowItWorks'
import PageHero from '../components/PageHero'
import QuickAnswer from '../components/QuickAnswer'
import QuoteCta from '../components/QuoteCta'
import RelatedGuides from '../components/RelatedGuides'
import RelatedProjects from '../components/RelatedProjects'
import Reviews from '../components/Reviews'
import Services from '../components/Services'
import TrustSignals, { trustItems } from '../components/TrustSignals'
import Areas from '../components/Areas'
import GuideCard from '../components/GuideCard'
import { CardGrid, CardItem } from '../components/ui/CardGrid'
import { areas, listPlaces } from '../config/areas'
import { guides } from '../config/guides'
import { aboutPage, areasHub, contactPage, guidesHub, howItWorksPage, pricingPage, projectsHub, reviewsPage, servicesHub } from '../config/pages'
import { projects } from '../config/projects'
import { reviews } from '../config/reviews'
import { routes } from '../config/routes'
import { services } from '../config/services'
import { site } from '../config/site'
import { Link } from '../lib/router'
import type { ReactNode } from 'react'
import QuoteForm from '../components/QuoteForm'
import { hasRecycling, hasWasteLicence } from '../lib/seo'

const Article = ({ children }: { children: ReactNode }) => (
  <article className="bg-white py-14 sm:py-16">
    <div className="container-site max-w-3xl">{children}</div>
  </article>
)

export function ServicesHubPage() {
  return (
    <>
      <Breadcrumb items={[{ label: servicesHub.title }]} />
      <PageHero eyebrow={site.tagline} heading={servicesHub.title} intro={servicesHub.intro} />
      <Services heading="Choose a service" intro="" id="services" />
      <HowItWorks />
      <Areas />
      <QuoteCta heading="Not sure which service you need?" body="Describe the garden and add photos. We will tell you what is involved and quote for the whole job." />
    </>
  )
}

export function AreasHubPage() {
  return (
    <>
      <Breadcrumb items={[{ label: areasHub.title }]} />
      <PageHero eyebrow={site.tagline} heading={areasHub.title} intro={areasHub.description} />
      <QuickAnswer text={areasHub.answer} />
      <section aria-labelledby="area-list-heading" className="bg-white py-12 sm:py-16">
        <div className="container-site">
          <h2 id="area-list-heading" className="text-3xl font-extrabold text-forest-deep">
            Choose your area
          </h2>
          <CardGrid cols={4} className="mt-8">
            {areas.map((a) => (
              <CardItem key={a.slug} cols={4} className="rounded-card border border-line bg-sage/50 p-6">
                <h3 className="text-xl font-extrabold text-forest-deep">
                  <Link to={routes.area(a.slug)} className="inline-block py-1 hover:text-forest hover:underline hover:underline-offset-4">
                    {a.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm font-semibold text-leaf-dark">{a.county}</p>
                <p className="mt-2 text-muted">Including {listPlaces(a)}.</p>
              </CardItem>
            ))}
          </CardGrid>
        </div>
      </section>
      <Services heading="Available in every area" intro="" compact id="services" />
      <QuoteCta heading="Check your postcode" body="Enter your postcode in the form and we will confirm coverage with your quote." />
    </>
  )
}

export function HowItWorksPage() {
  const p = howItWorksPage
  return (
    <>
      <Breadcrumb items={[{ label: p.title }]} />
      <PageHero eyebrow={site.tagline} heading={p.title} intro={p.description} />
      <QuickAnswer text={p.answer} />
      <HowItWorks link={false} />
      <Article>
        <Section section={{ heading: p.canRemoveHeading, list: p.canRemove }} />
        <Section section={{ heading: p.cannotRemoveHeading, list: p.cannotRemove }} />
        <Section section={{ heading: p.accessHeading, paragraphs: [p.access] }} />
        <Section section={{ heading: p.timingHeading, paragraphs: [p.timing] }} />
        <Section section={{ heading: p.wasteHeading, paragraphs: [site.trust.disposalStatement || p.wasteGeneral] }} />
        {(hasRecycling || hasWasteLicence) && (
          <p className="mt-4 text-muted">
            {hasWasteLicence && (
              <Link to={routes.wasteLicence} className="font-semibold text-forest underline underline-offset-2">
                Our waste carrier registration
              </Link>
            )}
            {hasWasteLicence && hasRecycling && ' · '}
            {hasRecycling && (
              <Link to={routes.recycling} className="font-semibold text-forest underline underline-offset-2">
                Recycling and disposal
              </Link>
            )}
          </p>
        )}
      </Article>
      <RelatedGuides slugs={['how-to-prepare-for-a-garden-clearance', 'what-does-garden-clearance-include', 'garden-clearance-vs-skip-hire']} />
      <QuoteCta heading="Ready to start?" body="Send a few details and photos. Step one takes about a minute." />
    </>
  )
}

export function PricingPage() {
  const p = pricingPage
  return (
    <>
      <Breadcrumb items={[{ label: p.title }]} />
      <PageHero eyebrow={site.tagline} heading={p.title} intro={p.description} />
      <QuickAnswer text={p.answer} />
      <Article>
        <h2 className="text-2xl font-extrabold tracking-tight text-forest-deep sm:text-3xl">{p.factorsHeading}</h2>
        <CardGrid as="dl" cols={2} className="mt-5">
          {p.factors.map((f) => (
            <CardItem key={f.title} as="div" cols={2} className="rounded-xl border border-line bg-sage/50 p-5">
              <dt className="text-lg font-extrabold text-forest-deep">{f.title}</dt>
              <dd className="mt-1 text-ink">{f.body}</dd>
            </CardItem>
          ))}
        </CardGrid>
        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-forest-deep sm:text-3xl">{p.includedHeading}</h2>
        <div className="mt-4">
          <FactList items={p.included} />
        </div>
        <Section section={{ heading: p.accurateHeading, list: p.accurate, ordered: true }} />
      </Article>
      <Faq heading="Pricing questions" items={p.faqs} id="pricing-faq" />
      <RelatedGuides slugs={['garden-clearance-vs-skip-hire', 'can-you-remove-soil-and-turf', 'what-does-garden-clearance-include']} />
      <QuoteCta heading="Get your fixed price" body="Photos and a short description are all we need. No visit required for most jobs." />
    </>
  )
}

export function AboutPage() {
  const p = aboutPage
  const { legal, contact } = site
  const facts = [
    ...(site.legalName ? [`Legal name: ${site.legalName}`] : []),
    ...(legal.tradingName ? [legal.tradingName] : []),
    ...(legal.companyNumber ? [`Company number ${legal.companyNumber}`] : []),
    ...(legal.vatNumber ? [`VAT number ${legal.vatNumber}`] : []),
    ...(legal.registeredAddress ? [`Registered office: ${legal.registeredAddress}`] : []),
    ...(legal.wasteCarrierNumber ? [`Waste carrier registration ${legal.wasteCarrierNumber}${legal.wasteCarrierRegister ? ` (${legal.wasteCarrierRegister})` : ''}`] : []),
    ...(site.trust.insurance ? [site.trust.insurance] : []),
    ...(site.trust.trading ? [site.trust.trading] : []),
    ...(contact.hours ? [`Hours: ${contact.hours}`] : []),
  ]
  return (
    <>
      <Breadcrumb items={[{ label: p.title }]} />
      <PageHero eyebrow={site.tagline} heading={p.title} intro={p.description} />
      <QuickAnswer text={p.answer} />
      <Article>
        <Section section={{ heading: p.whatHeading, paragraphs: [p.what] }} />
        <Section section={{ heading: 'Services', list: services.map((s) => s.name) }} />
        <Section section={{ heading: 'Where we work', paragraphs: [areasHub.answer] }} />
        <Section section={{ heading: p.howHeading, list: p.how }} />
        {facts.length > 0 && <Section section={{ heading: p.trustHeading, list: facts }} />}
        {trustItems().length > 0 && (
          <div className="mt-8">
            <TrustSignals />
          </div>
        )}
      </Article>
      <Reviews />
      <RelatedProjects />
      <QuoteCta heading="Talk to us about your garden" body="Send a few details and we will reply with a free quote." />
    </>
  )
}

export function ContactPage() {
  const p = contactPage
  const { phone, email, whatsapp, hours } = site.contact
  const hasChannels = Boolean(phone || email || whatsapp)
  return (
    <>
      <Breadcrumb items={[{ label: p.title }]} />
      <section aria-labelledby="page-heading" className="bg-sage">
        <div className="container-site grid items-start gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-dark">{site.tagline}</p>
            <h1 id="page-heading" className="mt-3 text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-forest-deep sm:text-5xl">
              {p.title}
            </h1>
            <p id="quick-answer" className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {p.answer}
            </p>
            {hasChannels && (
              <address className="mt-8 not-italic">
                <h2 className="text-xl font-extrabold text-forest-deep">{p.channelsHeading}</h2>
                <ul className="mt-3 space-y-2 text-lg">
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-semibold text-forest underline underline-offset-2">
                        {phone}
                      </a>
                    </li>
                  )}
                  {whatsapp && (
                    <li>
                      <a href={whatsapp} className="font-semibold text-forest underline underline-offset-2">
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="font-semibold text-forest underline underline-offset-2">
                        {email}
                      </a>
                    </li>
                  )}
                  {hours && <li className="text-muted">{hours}</li>}
                </ul>
              </address>
            )}
            <div className="mt-8">
              <h2 className="text-xl font-extrabold text-forest-deep">Areas we cover</h2>
              <p className="mt-2 text-muted">
                {areas.map((a) => a.name).join(', ')}. See{' '}
                <Link to={routes.areas} className="font-semibold text-forest underline underline-offset-2">
                  all areas
                </Link>
                .
              </p>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}

export function GuidesHubPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Guides' }]} />
      <PageHero eyebrow={site.tagline} heading={guidesHub.title} intro={guidesHub.intro} />
      <section aria-labelledby="guide-list-heading" className="bg-white py-12 sm:py-16">
        <div className="container-site">
          <h2 id="guide-list-heading" className="sr-only">
            All guides
          </h2>
          <CardGrid cols={2}>
            {guides.map((g) => (
              <CardItem key={g.slug} cols={2}>
                <GuideCard guide={g} large />
              </CardItem>
            ))}
          </CardGrid>
        </div>
      </section>
      <QuoteCta heading="Still have a question?" body="Ask it in the form with a couple of photos and we will answer it with a quote." />
    </>
  )
}

export function ProjectsHubPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Projects' }]} />
      <PageHero eyebrow={site.tagline} heading={projectsHub.title} intro={projectsHub.description} />
      <RelatedProjects limit={projects.length} />
      <QuoteCta heading="Want yours to look like this?" body="Send photos of your garden and we will quote." />
    </>
  )
}

export function ReviewsHubPage() {
  return (
    <>
      <Breadcrumb items={[{ label: reviewsPage.title }]} />
      <PageHero eyebrow={site.tagline} heading={reviewsPage.title} intro={reviewsPage.description} />
      <Reviews limit={reviews.length} heading="All reviews" />
      <QuoteCta heading="Get your free quote" body="Join them. Send a few details and photos." />
    </>
  )
}

export function RecyclingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Recycling and disposal' }]} />
      <PageHero eyebrow={site.tagline} heading="Recycling and waste disposal" intro={site.trust.disposalStatement} />
      <QuickAnswer text={site.trust.disposalStatement} />
      <Article>
        <Section section={{ heading: 'What happens to garden waste', paragraphs: [howItWorksPage.wasteGeneral] }} />
      </Article>
      <QuoteCta heading="Get your free quote" body="Disposal is included in every quote." />
    </>
  )
}

export function WasteLicencePage() {
  const { wasteCarrierNumber, wasteCarrierRegister } = site.legal
  return (
    <>
      <Breadcrumb items={[{ label: 'Waste carrier licence' }]} />
      <PageHero eyebrow={site.tagline} heading="Waste carrier registration" intro={`${site.name} is registered to carry waste. You can check the registration on the public register.`} />
      <QuickAnswer text={`${site.name} holds waste carrier registration ${wasteCarrierNumber}${wasteCarrierRegister ? ` with ${wasteCarrierRegister}` : ''}. Anyone paid to remove waste from your property must be registered, and householders can check a number on the public register before booking.`} />
      <Article>
        <Section
          section={{
            heading: 'Why this matters',
            paragraphs: [
              'Under the household duty of care you are responsible for making sure waste leaving your property goes to someone authorised to carry it. If unregistered waste is fly-tipped, the householder can be fined. Checking a registration number takes a minute and protects you.',
            ],
          }}
        />
        <Section section={{ heading: 'Our registration', list: [`Registration number: ${wasteCarrierNumber}`, ...(wasteCarrierRegister ? [`Register: ${wasteCarrierRegister}`] : [])] }} />
      </Article>
      <QuoteCta heading="Get your free quote" body="Registered, insured where stated, and everything taken away." />
    </>
  )
}
