import { Check, ClipboardList } from 'lucide-react'
import { servicePage } from '../config/content'
import type { Service } from '../config/services'
import { serviceIcons } from './ServiceStrip'

/** "What is included" and "Typical jobs" for a service. */
export default function ServiceDetails({ service, context }: { service: Service; context?: string }) {
  const Icon = serviceIcons[service.id]
  return (
    <section aria-labelledby="includes-heading" className="bg-white py-16 sm:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-forest text-white">
            <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h2 id="includes-heading" className="mt-5 text-3xl font-extrabold tracking-tight text-forest-deep sm:text-4xl">
            {context ? `What ${context} includes` : servicePage.includesHeading}
          </h2>
          <ul className="mt-6 space-y-3.5">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg font-medium text-ink">
                <Check className="mt-1.5 size-5 shrink-0 text-leaf-text" strokeWidth={3} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-line bg-sage/70 p-7 sm:p-8">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white text-forest">
            <ClipboardList className="size-7" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-forest-deep">{servicePage.jobsHeading}</h2>
          <ul className="mt-5 space-y-3">
            {service.typicalJobs.map((job) => (
              <li key={job} className="flex items-start gap-3 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-leaf" />
                {job}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
