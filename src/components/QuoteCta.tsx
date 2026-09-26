import type { ServiceId } from '../config/services'
import QuoteForm from './QuoteForm'

interface Props {
  heading: string
  body: string
  defaultService?: ServiceId
}

/** Closing section for inner pages: a short nudge beside the enquiry form. */
export default function QuoteCta({ heading, body, defaultService }: Props) {
  return (
    <section aria-labelledby="quote-cta-heading" className="bg-sage py-16 sm:py-20">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <h2 id="quote-cta-heading" className="text-balance text-3xl font-extrabold tracking-tight text-forest-deep sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-14 rounded-full bg-leaf" />
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{body}</p>
        </div>
        <QuoteForm defaultService={defaultService} />
      </div>
    </section>
  )
}
