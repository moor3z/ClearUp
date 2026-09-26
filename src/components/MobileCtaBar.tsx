import { Phone } from 'lucide-react'
import { site } from '../config/site'
import { requestQuote } from '../lib/quoteForm'

/** Sticky bottom bar on phones so the quote action is always one tap away. */
export default function MobileCtaBar() {
  const phone = site.contact.phone
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden print:hidden">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => requestQuote({ focus: 'first' })}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-forest font-bold text-white"
        >
          Get a Free Quote
        </button>
        {phone && (
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-forest px-4 font-bold text-forest">
            <Phone className="size-5" aria-hidden="true" /> Call
          </a>
        )}
      </div>
    </div>
  )
}
