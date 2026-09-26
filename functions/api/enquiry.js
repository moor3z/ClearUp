/**
 * Cloudflare Pages Function: POST /api/enquiry
 *
 * Receives the quote form (multipart, photos included), checks it, and emails
 * it via Resend with the photos attached. Configure in the Pages project
 * (Settings > Environment variables):
 *
 *   RESEND_API_KEY   Resend API key
 *   ENQUIRY_TO       inbox that receives enquiries, e.g. quotes@example.co.uk
 *   ENQUIRY_FROM     verified sender, e.g. "ClearUp <enquiries@send.example.co.uk>"
 *
 * Until those exist the function returns 503 and the form shows an honest
 * "not sent" error rather than a fake confirmation.
 */

const MAX_FILES = 6
const MAX_FILE_BYTES = 8 * 1024 * 1024
const MAX_TOTAL_BYTES = 30 * 1024 * 1024 // Resend attachment limit is 40 MB per email
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const SERVICE_LABELS = {
  'garden-clearance': 'Garden clearance',
  'green-waste': 'Green waste removal',
  'end-of-tenancy': 'End of tenancy garden clearance',
  'site-land': 'Site and land clearance',
  'shed-clearance': 'Shed clearance and dismantling',
  other: 'Something else',
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

const clean = (v) => (typeof v === 'string' ? v.trim().slice(0, 2000) : '')
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

async function toBase64(file) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO || !env.ENQUIRY_FROM) {
    return json({ ok: false, error: 'The enquiry form is not connected yet.' }, 503)
  }

  let form
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false, error: 'Could not read the form.' }, 400)
  }

  // Honeypot: real visitors never fill this in.
  if (clean(form.get('company'))) return json({ ok: true })

  const fields = {
    fullName: clean(form.get('fullName')),
    postcode: clean(form.get('postcode')).toUpperCase(),
    email: clean(form.get('email')),
    phone: clean(form.get('phone')),
    service: clean(form.get('service')),
    job: clean(form.get('job')),
  }
  if (!fields.fullName || !fields.postcode || !fields.email || !fields.service || !fields.job) {
    return json({ ok: false, error: 'Please fill in every required field.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) return json({ ok: false, error: 'Please enter a valid email address.' }, 400)

  const attachments = []
  let total = 0
  for (const file of form.getAll('photos')) {
    if (!(file instanceof File) || !file.size) continue
    if (!ALLOWED_TYPES.has(file.type)) return json({ ok: false, error: `${file.name} is not a JPG, PNG or WEBP image.` }, 400)
    if (file.size > MAX_FILE_BYTES) return json({ ok: false, error: `${file.name} is over 8 MB.` }, 400)
    total += file.size
    if (attachments.length >= MAX_FILES || total > MAX_TOTAL_BYTES) return json({ ok: false, error: 'Too many photos, or photos too large in total.' }, 400)
    attachments.push({ filename: file.name.replace(/[^\w.-]+/g, '_'), content: await toBase64(file) })
  }

  const serviceLabel = SERVICE_LABELS[fields.service] ?? fields.service
  const page = request.headers.get('Referer') ?? ''
  const lines = [
    ['Name', fields.fullName],
    ['Postcode', fields.postcode],
    ['Email', fields.email],
    ['Phone', fields.phone || 'Not given'],
    ['Service', serviceLabel],
    ['Photos', attachments.length ? `${attachments.length} attached` : 'None'],
    ['Sent from', page || 'Unknown page'],
  ]
  const text = [...lines.map(([k, v]) => `${k}: ${v}`), '', 'About the job:', fields.job].join('\n')
  const html = `<h2>New quote request</h2><table>${lines
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><h3>About the job</h3><p>${escapeHtml(fields.job).replace(/\n/g, '<br>')}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: env.ENQUIRY_TO.split(',').map((s) => s.trim()),
      reply_to: fields.email,
      subject: `Quote request: ${serviceLabel}, ${fields.postcode}`,
      text,
      html,
      attachments,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return json({ ok: false, error: 'We could not send your enquiry just now. Please try again.' }, 502)
  }
  return json({ ok: true })
}

export const onRequest = ({ request }) =>
  request.method === 'POST' ? undefined : json({ ok: false, error: 'Method not allowed' }, 405)
