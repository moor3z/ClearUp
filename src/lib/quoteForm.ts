import type { ServiceId } from '../config/content'

/**
 * A tiny event bus so any button on the page can bring the visitor to the
 * enquiry form, optionally preselecting a service and focusing a field.
 */

export type QuoteFocus = 'first' | 'postcode' | 'photos'

export interface QuoteRequest {
  service?: ServiceId
  focus?: QuoteFocus
}

export const QUOTE_FORM_ID = 'quote-form'
const EVENT = 'clearup:request-quote'

export function requestQuote(detail: QuoteRequest = {}) {
  window.dispatchEvent(new CustomEvent<QuoteRequest>(EVENT, { detail }))
}

export function onQuoteRequest(handler: (req: QuoteRequest) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<QuoteRequest>).detail ?? {})
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

/** Scrolls an element into view, respecting the visitor's motion preference. */
export function scrollToElement(el: Element | null) {
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
