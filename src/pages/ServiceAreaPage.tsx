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
import ServiceDetails from '../components/ServiceDetails'
import Services from '../components/Services'
import { listPlaces, type Area } from '../config/areas'
import { areaFaqs, quickAnswers, serviceAreaPage, servicePage } from '../config/content'
import { servicesHub } from '../config/pages'
import { routes } from '../config/routes'
import { serviceHref, type Service } from '../config/services'
import { Link } from '../lib/router'

/** One service in one area, e.g. Garden Clearance in Chester. */
export default function ServiceAreaPage({ service, area }: { service: Service; area: Area }) {
  return (
    <>
      <Breadcrumb items={[{ label: servicesHub.title, to: routes.services }, { label: service.name, to: serviceHref(service) }, { label: area.name }]} />
      <PageHero
        eyebrow={`${area.name}, ${area.region}`}
        heading={
          <>
            {service.heading} in <span className="text-leaf-text">{area.name}</span>
          </>
        }
        intro={`${service.intro} We cover ${area.name} including ${listPlaces(area)}.`}
      />
      <QuickAnswer text={quickAnswers.serviceArea(service.formLabel.toLowerCase(), area.name, area.county, listPlaces(area), service.quickAnswer)} />
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
      <ServiceDetails service={service} context={`${service.name.toLowerCase()} in ${area.name}`} />
      <RelatedProjects serviceId={service.id} areaSlug={area.slug} />
      <HowItWorks />
      <Reviews areaSlug={area.slug} />
      <Faq
        heading={servicePage.faqHeading}
        items={[...service.faqs, ...areaFaqs(area.name, listPlaces(area), service.formLabel.toLowerCase()).slice(0, 2)]}
        id="service-faq"
      />
      <Services heading={`${serviceAreaPage.otherServicesHeading} ${area.name}`} intro="" exclude={service.id} compact area={area} id="other-services" />
      <Areas heading={`${service.name} ${serviceAreaPage.otherAreasHeading}`} intro="" exclude={area.slug} service={service} id="other-areas" />
      <RelatedGuides serviceId={service.id} />
      <section className="bg-white pb-12">
        <p className="container-site text-muted">
          See also <Link to={routes.area(area.slug)} className="font-semibold text-forest underline underline-offset-2">everything we do in {area.name}</Link> and{' '}
          <Link to={routes.pricing} className="font-semibold text-forest underline underline-offset-2">how quotes are worked out</Link>.
        </p>
      </section>
      <QuoteCta
        heading={`${serviceAreaPage.ctaHeadingPrefix} ${area.name}`}
        body={`Tell us about the ${service.formLabel.toLowerCase()} you need in ${area.name} and we will come back with a free, no obligation quote.`}
        defaultService={service.id}
      />
    </>
  )
}
