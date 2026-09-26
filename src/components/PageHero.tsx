import { CircleCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { hero } from '../config/content'
import CtaBar from './CtaBar'

interface Props {
  eyebrow: string
  heading: ReactNode
  intro: string
}

/** Copy-led hero for inner pages. The form sits at the foot of these pages. */
export default function PageHero({ eyebrow, heading, intro }: Props) {
  return (
    <section aria-labelledby="page-heading" className="bg-sage">
      <div className="container-site py-10 sm:py-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-dark">{eyebrow}</p>
          <h1 id="page-heading" className="mt-3 text-balance text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-forest-deep min-[420px]:text-[2.5rem] sm:text-5xl lg:text-[3.5rem]">
            {heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>
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
      </div>
    </section>
  )
}
