export interface EnquiryValues {
  fullName: string
  postcode: string
  email: string
  phone: string
  service: string
  job: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

/** UK postcode, tolerant of spacing and case. */
const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s().-]{6,}$/

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {}
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.'
  if (!v.postcode.trim()) e.postcode = 'Enter your postcode.'
  else if (!POSTCODE.test(v.postcode.trim())) e.postcode = 'Enter a valid UK postcode, for example CH1 1AA.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address, for example name@example.com.'
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) e.phone = 'Enter a valid phone number or leave this blank.'
  if (!v.service) e.service = 'Choose what you need cleared.'
  if (!v.job.trim()) e.job = 'Tell us a little about the job.'
  return e
}

export function formatPostcode(raw: string) {
  const s = raw.toUpperCase().replace(/\s+/g, '')
  if (s.length < 5) return raw.toUpperCase()
  return `${s.slice(0, -3)} ${s.slice(-3)}`
}
