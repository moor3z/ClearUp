import { CircleCheck } from 'lucide-react'
import { hero } from '../config/content'
import CtaBar from './CtaBar'
import QuoteForm from './QuoteForm'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-sage">
      <div className="container-site grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14 lg:py-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-dark">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-forest-deep min-[420px]:text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {hero.headingLine1}
            <br />
            {hero.headingLine2Prefix}
            <span className="text-leaf-text">{hero.headingHighlight}</span>
            {hero.headingSuffix}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{hero.paragraph}</p>

          <CtaBar className="mt-8" />

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {hero.checks.map((c) => (
              <li key={c} className="flex items-center gap-2 font-semibold text-forest-deep">
                <CircleCheck className="size-6 shrink-0 fill-leaf text-white" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <QuoteForm />
      </div>
    </section>
  )
}
