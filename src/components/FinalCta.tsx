import { finalCta } from '../config/content'
import { requestQuote } from '../lib/quoteForm'
import Button from './ui/Button'

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-forest py-16 sm:py-20">
      <div className="container-site text-center">
        <h2 id="cta-heading" className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {finalCta.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{finalCta.body}</p>
        <Button variant="onDark" size="lg" className="mt-8" onClick={() => requestQuote({ focus: 'first' })}>
          {finalCta.cta}
        </Button>
      </div>
    </section>
  )
}
