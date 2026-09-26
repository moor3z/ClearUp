import { site } from '../config/site'
import type { EnquiryValues } from './validation'

/**
 * Submission is isolated here so connecting a backend is a one-file change.
 *
 * Returns { mode: 'demo' } when nothing was sent, so the UI can be honest
 * about it instead of showing a false "enquiry sent" message.
 */

export type SubmitOutcome =
  | { ok: true; mode: 'live' }
  | { ok: true; mode: 'demo' }
  | { ok: false; message: string }

export interface EnquiryPayload extends EnquiryValues {
  photos: File[]
  /** Honeypot. Real visitors never fill this in. */
  company: string
}

function toFormData(p: EnquiryPayload, formName?: string) {
  const fd = new FormData()
  if (formName) fd.append('form-name', formName)
  fd.append('fullName', p.fullName.trim())
  fd.append('postcode', p.postcode.trim())
  fd.append('email', p.email.trim())
  fd.append('phone', p.phone.trim())
  fd.append('service', p.service)
  fd.append('job', p.job.trim())
  fd.append('company', p.company)
  p.photos.forEach((file) => fd.append('photos', file, file.name))
  return fd
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitOutcome> {
  const { provider, endpointUrl } = site.enquiry

  if (provider === 'demo') {
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, mode: 'demo' }
  }

  const url = provider === 'netlify' ? '/' : endpointUrl
  if (!url) {
    return { ok: false, message: 'The enquiry form is not connected yet. Set endpointUrl in src/config/site.ts.' }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: toFormData(payload, provider === 'netlify' ? 'enquiry' : undefined),
    })
    let body: { ok?: boolean; error?: string } = {}
    try {
      body = await res.json()
    } catch {
      body = {}
    }
    if (!res.ok || body.ok !== true) {
      return { ok: false, message: body.error ?? `We could not send your enquiry (error ${res.status}). Please try again.` }
    }
    return { ok: true, mode: 'live' }
  } catch {
    return { ok: false, message: 'We could not send your enquiry. Check your connection and try again.' }
  }
}
