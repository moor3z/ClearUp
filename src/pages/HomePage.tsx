import Areas from '../components/Areas'
import Faq from '../components/Faq'
import FinalCta from '../components/FinalCta'
import Hero from '../components/Hero'
import RelatedGuides from '../components/RelatedGuides'
import RelatedProjects from '../components/RelatedProjects'
import Reviews from '../components/Reviews'
import TrustSignals from '../components/TrustSignals'
import HowItWorks from '../components/HowItWorks'
import QuickAnswer from '../components/QuickAnswer'
import Services from '../components/Services'
import ServiceStrip from '../components/ServiceStrip'
import WhyClearUp from '../components/WhyClearUp'
import { site } from '../config/site'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAnswer text={site.seo.aiSummary} />
      <ServiceStrip />
      <Services />
      <RelatedProjects />
      <HowItWorks />
      <Reviews />
      <WhyClearUp />
      <div className="container-site pb-4">
        <TrustSignals />
      </div>
      <Areas />
      <RelatedGuides />
      <Faq />
      <FinalCta />
    </>
  )
}
