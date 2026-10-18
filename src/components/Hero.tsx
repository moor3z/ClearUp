import { CircleCheck } from 'lucide-react'
import { hero } from '../config/content'
import CtaBar from './CtaBar'
import QuoteForm from './QuoteForm'

const img = (w: number) => `/brand/hero-overgrown-garden-${w}.webp`

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-forest-deep">
      {/* Background photo: the LCP image, so it loads eagerly at high priority. */}
      <img
        src={img(1280)}
        srcSet={`${img(800)} 800w, ${img(1280)} 1280w, ${img(1920)} 1920w, ${img(2400)} 2400w`}
        sizes="100vw"
        width={1280}
        height={1170}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[center_40%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-deep/75" />

      <div className="container-site grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14 lg:py-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-white min-[420px]:text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {hero.headingLine1}
            <br />
            {hero.headingLine2Prefix}
            <span className="text-leaf">{hero.headingHighlight}</span>
            {hero.headingSuffix}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85 sm:text-xl">{hero.paragraph}</p>

          <CtaBar className="mt-8" onDark />

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {hero.checks.map((c) => (
              <li key={c} className="flex items-center gap-2 font-semibold text-white">
                <CircleCheck className="size-6 shrink-0 fill-leaf text-forest-deep" aria-hidden="true" />
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
