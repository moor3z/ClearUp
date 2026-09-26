import Breadcrumb from '../components/Breadcrumb'
import { Section } from '../components/ContentBlocks'
import Faq from '../components/Faq'
import QuickAnswer from '../components/QuickAnswer'
import QuoteCta from '../components/QuoteCta'
import RelatedGuides from '../components/RelatedGuides'
import Services from '../components/Services'
import type { Guide } from '../config/guides'
import { routes } from '../config/routes'
import { services } from '../config/services'
import { site } from '../config/site'

export default function GuidePage({ guide }: { guide: Guide }) {
  const related = services.filter((s) => guide.relatedServices.includes(s.id))
  const modified = new Date(guide.dateModified).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <>
      <Breadcrumb items={[{ label: 'Guides', to: routes.guides }, { label: guide.title }]} />
      <article>
        <header className="bg-sage">
          <div className="container-site max-w-3xl py-10 sm:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-dark">Guide</p>
            <h1 id="page-heading" className="mt-3 text-balance text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-forest-deep sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-sm text-muted">
              By {site.name} · Updated <time dateTime={guide.dateModified}>{modified}</time>
            </p>
          </div>
        </header>
        <QuickAnswer text={guide.answer} />
        <div className="bg-white pb-14 sm:pb-16">
          <div className="container-site max-w-3xl">
            {guide.sections.map((s) => (
              <Section key={s.heading} section={s} />
            ))}
          </div>
        </div>
      </article>
      {guide.faqs && guide.faqs.length > 0 && <Faq heading="Related questions" items={guide.faqs} id="guide-faq" />}
      {related.length > 0 && (
        <Services heading="Related services" intro="" compact id="related-services" only={guide.relatedServices} />
      )}
      <RelatedGuides heading="More guides" slugs={guide.relatedGuides} exclude={guide.slug} />
      <QuoteCta heading="Get a free quote" body="Send your postcode, a short description and photos. We reply with a fixed price." />
    </>
  )
}
