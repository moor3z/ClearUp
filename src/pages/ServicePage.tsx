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
import { servicePage } from '../config/content'
import { servicesHub } from '../config/pages'
import { routes } from '../config/routes'
import type { Service } from '../config/services'
import { site } from '../config/site'

export default function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <Breadcrumb items={[{ label: servicesHub.title, to: routes.services }, { label: service.name }]} />
      <PageHero eyebrow={site.tagline} heading={service.heading} intro={service.intro} />
      <QuickAnswer text={service.quickAnswer} />
      <ServiceDetails service={service} />
      <RelatedProjects serviceId={service.id} />
      <HowItWorks />
      <Reviews serviceId={service.id} />
      <Faq heading={servicePage.faqHeading} items={service.faqs} id="service-faq" />
      <Areas heading={`${servicePage.areasHeading} ${service.name.toLowerCase()}`} intro={servicePage.areasIntro} service={service} id="service-areas" />
      <RelatedGuides serviceId={service.id} />
      <Services heading={servicePage.otherServices} intro="" exclude={service.id} compact id="other-services" />
      <QuoteCta
        heading={servicePage.ctaHeading}
        body={`Tell us about the ${service.formLabel.toLowerCase()} you need and we will come back with a free, no obligation quote.`}
        defaultService={service.id}
      />
    </>
  )
}
