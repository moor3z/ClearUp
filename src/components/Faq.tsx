import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { faq } from '../config/content'
import SectionHeading from './ui/SectionHeading'

interface Props {
  heading?: string
  items?: { q: string; a: string }[]
  id?: string
}

export default function Faq({ heading = faq.heading, items = faq.items, id = 'faq' }: Props) {
  const uid = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading id={`${id}-heading`} title={heading} />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line border-y border-line lg:mt-14">
          {items.map((item, i) => {
            const isOpen = open === i
            const btnId = `${uid}-q-${i}`
            const panelId = `${uid}-a-${i}`
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-bold text-forest-deep hover:text-forest"
                  >
                    {item.q}
                    <ChevronDown
                      className={`size-6 shrink-0 text-leaf-text transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="pb-6 pr-10">
                  <p className="leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
