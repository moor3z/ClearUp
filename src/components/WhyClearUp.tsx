import { CircleCheck } from 'lucide-react'
import { whyClearUp } from '../config/content'
import SectionHeading from './ui/SectionHeading'

export default function WhyClearUp() {
  return (
    <section aria-labelledby="why-heading" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <SectionHeading id="why-heading" title={whyClearUp.heading} intro={whyClearUp.intro} align="left" />
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {whyClearUp.points.map((p) => (
            <li key={p.title} className="flex gap-4">
              <CircleCheck className="mt-0.5 size-8 shrink-0 fill-leaf text-white" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-extrabold text-forest-deep">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
