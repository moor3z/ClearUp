import { howItWorks } from '../config/content'
import { routes } from '../config/routes'
import { Link } from '../lib/router'
import SectionHeading from './ui/SectionHeading'

export default function HowItWorks({ link = true }: { link?: boolean }) {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-sage py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading id="how-heading" title={howItWorks.heading} intro={howItWorks.intro} />

        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:mt-16">
          {/* Connecting line behind the step markers on desktop */}
          <span aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-7 hidden h-0.5 bg-leaf/50 md:block" />
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-sage bg-forest text-xl font-extrabold text-white">
                {i + 1}
              </span>
              <div className="pt-2 md:max-w-xs md:pt-4">
                <h3 className="text-xl font-extrabold text-forest-deep">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {link && (
          <p className="mt-10 text-center">
            <Link to={routes.howItWorks} className="font-semibold text-forest underline underline-offset-4 hover:text-forest-deep">
              What we can remove, access and what happens to the waste
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
