import { MessageCircle, Phone } from 'lucide-react'
import { hero } from '../config/content'
import { site } from '../config/site'
import { requestQuote } from '../lib/quoteForm'
import Button from './ui/Button'

interface Props {
  size?: 'md' | 'lg'
  onDark?: boolean
  className?: string
}

/**
 * The standard conversion actions: quote, photos, and call / WhatsApp when
 * those channels are configured. Used in heroes and closing sections.
 */
export default function CtaBar({ size = 'lg', onDark = false, className = '' }: Props) {
  const { phone, whatsapp } = site.contact
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <Button size={size} variant={onDark ? 'onDark' : 'primary'} onClick={() => requestQuote({ focus: 'first' })}>
        {hero.primaryCta}
      </Button>
      <Button size={size} variant={onDark ? 'onDark' : 'secondary'} onClick={() => requestQuote({ focus: 'photos' })}>
        {hero.secondaryCta}
      </Button>
      {phone && (
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 px-6 text-lg font-bold ${onDark ? 'border-white/60 text-white hover:bg-white/10' : 'border-forest text-forest hover:bg-sage'}`}
        >
          <Phone className="size-5" aria-hidden="true" /> Call {phone}
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsapp}
          className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 px-6 text-lg font-bold ${onDark ? 'border-white/60 text-white hover:bg-white/10' : 'border-forest text-forest hover:bg-sage'}`}
        >
          <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp us
        </a>
      )}
    </div>
  )
}
