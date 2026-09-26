import Areas from '../components/Areas'
import Breadcrumb from '../components/Breadcrumb'
import Faq from '../components/Faq'
import HowItWorks from '../components/HowItWorks'
import PageHero from '../components/PageHero'
import QuickAnswer from '../components/QuickAnswer'
import QuoteCta from '../components/QuoteCta'
import RelatedGuides from '../components/RelatedGuides'
import RelatedProjects from '../components/RelatedProjects'
import Reviews from '../components/Reviews'
import Services from '../components/Services'
import WhyClearUp from '../components/WhyClearUp'
import { listPlaces, type Area } from '../config/areas'
import { areaFaqs, areaPage, quickAnswers, servicePage } from '../config/content'
import { areasHub } from '../config/pages'
import { routes } from '../config/routes'
import { Link } from '../lib/router'

export default function AreaPage({ area }: { area: Area }) {
  return (
    <>
      <Breadcrumb items={[{ label: areasHub.title, to: routes.areas }, { label: area.name }]} />
      <PageHero
        eyebrow={`${area.name}, ${area.region}`}
        heading={
          <>
            {areaPage.headingPrefix} <span className="text-leaf-text">{area.name}</span>
          </>
        }
        intro={area.intro}
      />
      <QuickAnswer text={quickAnswers.area(area.name, area.county, listPlaces(area))} />
      {area.localNotes && area.localNotes.length > 0 && (
        <section aria-labelledby="local-heading" className="bg-white pb-4">
          <div className="container-site max-w-3xl">
            <h2 id="local-heading" className="text-2xl font-extrabold text-forest-deep">
              Working in {area.name}
            </h2>
            {area.localNotes.map((n) => (
              <p key={n} className="mt-3 leading-relaxed text-ink">
                {n}
              </p>
            ))}
          </div>
        </section>
      )}
      <Services heading={`${areaPage.servicesHeading} ${area.name}`} intro="" compact area={area} id="area-services" />
      <RelatedProjects areaSlug={area.slug} />
      <HowItWorks />
      <Reviews areaSlug={area.slug} />
      <WhyClearUp />
      <Faq heading={servicePage.faqHeading} items={[...(area.faqs ?? []), ...areaFaqs(area.name, listPlaces(area))]} id="area-faq" />
      <Areas heading={areaPage.nearbyHeading} intro="" exclude={area.slug} />
      <RelatedGuides />
      <section className="bg-white pb-12">
        <p className="container-site text-muted">
          Wondering about cost? Read <Link to={routes.pricing} className="font-semibold text-forest underline underline-offset-2">how garden clearance is priced</Link>.
        </p>
      </section>
      <QuoteCta
        heading={`${areaPage.ctaHeadingPrefix} ${area.name}`}
        body="A few details and a couple of photos are all we need to send you a free, no obligation quote."
      />
    </>
  )
}
