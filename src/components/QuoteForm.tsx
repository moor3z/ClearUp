import { AlertCircle, CheckCircle2, FlaskConical, Loader2 } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { form as copy, serviceOptions, type ServiceId } from '../config/content'
import { site } from '../config/site'
import { onQuoteRequest, QUOTE_FORM_ID, scrollToElement, type QuoteRequest } from '../lib/quoteForm'
import { submitEnquiry } from '../lib/submitEnquiry'
import { formatPostcode, validateEnquiry, type EnquiryErrors, type EnquiryValues } from '../lib/validation'
import PhotoUpload, { type UploadedPhoto } from './PhotoUpload'
import Button from './ui/Button'

type Status = 'idle' | 'submitting' | 'error' | 'sent' | 'demo'

const empty: EnquiryValues = { fullName: '', postcode: '', email: '', phone: '', service: '', job: '' }
const isDemo = site.enquiry.provider === 'demo'

interface FieldProps {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: (a: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

function Field({ id, label, error, optional, children }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children({ id, describedBy: error ? errorId : undefined, invalid: Boolean(error) })}
      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

interface Props {
  /** Preselect a service, e.g. on a service page. */
  defaultService?: ServiceId
}

export default function QuoteForm({ defaultService }: Props) {
  const uid = useId()
  const [values, setValues] = useState<EnquiryValues>({ ...empty, service: defaultService ?? '' })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({})
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const cardRef = useRef<HTMLDivElement>(null)
  const fields = useRef<Partial<Record<keyof EnquiryValues, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({})
  const photoInput = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // Buttons elsewhere on the page can bring the visitor here and preselect a service.
  useEffect(
    () =>
      onQuoteRequest((req: QuoteRequest) => {
        if (status === 'sent') setStatus('idle')
        if (req.service) {
          setValues((v) => ({ ...v, service: req.service! }))
          setErrors((e) => ({ ...e, service: undefined }))
        }
        scrollToElement(cardRef.current)
        const target =
          req.focus === 'photos' ? photoInput.current : req.focus === 'postcode' ? fields.current.postcode : fields.current.fullName
        // Focus without stealing the scroll so the smooth scroll can finish.
        target?.focus({ preventScroll: true })
      }),
    [status],
  )

  useEffect(() => {
    if (status === 'error' || status === 'sent' || status === 'demo') statusRef.current?.focus()
  }, [status])

  const set = (key: keyof EnquiryValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateEnquiry({ ...values, [key]: value })[key] }))
  }

  const blur = (key: keyof EnquiryValues) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    const next = key === 'postcode' ? { ...values, postcode: formatPostcode(values.postcode) } : values
    if (key === 'postcode') setValues(next)
    setErrors((e) => ({ ...e, [key]: validateEnquiry(next)[key] }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validateEnquiry(values)
    setErrors(found)
    setTouched({ fullName: true, postcode: true, email: true, phone: true, service: true, job: true })
    const firstBad = (Object.keys(found) as (keyof EnquiryValues)[]).find((k) => found[k])
    if (firstBad) {
      fields.current[firstBad]?.focus()
      return
    }

    setStatus('submitting')
    setMessage('')
    const outcome = await submitEnquiry({ ...values, company: honeypot, photos: photos.map((p) => p.file) })
    if (!outcome.ok) {
      setStatus('error')
      setMessage(outcome.message)
      return
    }
    if (outcome.mode === 'demo') {
      setStatus('demo')
      return
    }
    setStatus('sent')
    setValues({ ...empty, service: defaultService ?? '' })
    setPhotos([])
    setTouched({})
  }

  const submitting = status === 'submitting'
  const serviceId = `${uid}-service`

  if (status === 'sent') {
    return (
      <div ref={cardRef} id={QUOTE_FORM_ID} className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
        <div ref={statusRef} tabIndex={-1} role="status" className="rounded-md">
          <CheckCircle2 className="size-12 text-leaf" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-extrabold text-forest-deep">Thanks, your enquiry has been sent</h2>
          <p className="mt-2 text-muted">We have your details and will be in touch with your free quote shortly.</p>
        </div>
        <Button variant="secondary" chevron={false} className="mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <div ref={cardRef} id={QUOTE_FORM_ID} className="rounded-card border border-line bg-white p-5 shadow-card sm:p-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-forest-deep sm:text-[2.125rem]">{copy.heading}</h2>
      <p className="mt-1.5 text-base text-muted sm:text-lg">{copy.intro}</p>

      {status === 'error' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">Your enquiry was not sent</p>
            <p className="mt-0.5 text-sm">{message} Your details are still filled in below.</p>
          </div>
        </div>
      )}

      {status === 'demo' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="mt-5 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
        >
          <FlaskConical className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">Demo mode: nothing was sent</p>
            <p className="mt-0.5 text-sm">
              The form validated correctly, but it is not connected to an inbox yet. Your details have been kept below.
            </p>
          </div>
        </div>
      )}

      <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate aria-busy={submitting}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${uid}-name`} label="Full name" error={touched.fullName ? errors.fullName : undefined}>
            {(a) => (
              <input
                ref={(el) => void (fields.current.fullName = el)}
                id={a.id}
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Your full name"
                className="field-input"
                value={values.fullName}
                onChange={(e) => set('fullName')(e.target.value)}
                onBlur={blur('fullName')}
                aria-invalid={a.invalid}
                aria-describedby={a.describedBy}
                disabled={submitting}
              />
            )}
          </Field>
          <Field id={`${uid}-postcode`} label="Postcode" error={touched.postcode ? errors.postcode : undefined}>
            {(a) => (
              <input
                ref={(el) => void (fields.current.postcode = el)}
                id={a.id}
                name="postcode"
                type="text"
                autoComplete="postal-code"
                required
                placeholder="e.g. CH1 1AA"
                className="field-input uppercase placeholder:normal-case"
                value={values.postcode}
                onChange={(e) => set('postcode')(e.target.value)}
                onBlur={blur('postcode')}
                aria-invalid={a.invalid}
                aria-describedby={a.describedBy}
                disabled={submitting}
              />
            )}
          </Field>
          <Field id={`${uid}-email`} label="Email address" error={touched.email ? errors.email : undefined}>
            {(a) => (
              <input
                ref={(el) => void (fields.current.email = el)}
                id={a.id}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@example.com"
                className="field-input"
                value={values.email}
                onChange={(e) => set('email')(e.target.value)}
                onBlur={blur('email')}
                aria-invalid={a.invalid}
                aria-describedby={a.describedBy}
                disabled={submitting}
              />
            )}
          </Field>
          <Field id={`${uid}-phone`} label="Phone number" optional error={touched.phone ? errors.phone : undefined}>
            {(a) => (
              <input
                ref={(el) => void (fields.current.phone = el)}
                id={a.id}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="07XXX XXXXXX"
                className="field-input"
                value={values.phone}
                onChange={(e) => set('phone')(e.target.value)}
                onBlur={blur('phone')}
                aria-invalid={a.invalid}
                aria-describedby={a.describedBy}
                disabled={submitting}
              />
            )}
          </Field>
        </div>

        <Field id={serviceId} label="What do you need cleared?" error={touched.service ? errors.service : undefined}>
          {(a) => (
            <select
              ref={(el) => void (fields.current.service = el)}
              id={a.id}
              name="service"
              required
              className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23164B35%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-11"
              value={values.service}
              onChange={(e) => {
                set('service')(e.target.value)
                setTouched((t) => ({ ...t, service: true }))
                setErrors((er) => ({ ...er, service: undefined }))
              }}
              onBlur={blur('service')}
              aria-invalid={a.invalid}
              aria-describedby={a.describedBy}
              disabled={submitting}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id={`${uid}-job`} label="Tell us about the job" error={touched.job ? errors.job : undefined}>
          {(a) => (
            <textarea
              ref={(el) => void (fields.current.job = el)}
              id={a.id}
              name="job"
              required
              rows={3}
              placeholder={copy.jobPlaceholder}
              className="field-input resize-y"
              value={values.job}
              onChange={(e) => set('job')(e.target.value)}
              onBlur={blur('job')}
              aria-invalid={a.invalid}
              aria-describedby={a.describedBy}
              disabled={submitting}
            />
          )}
        </Field>

        <PhotoUpload ref={photoInput} photos={photos} onChange={setPhotos} disabled={submitting} />

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting} chevron={!submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending your enquiry
            </>
          ) : (
            copy.submit
          )}
        </Button>

        <p className="text-center text-sm text-muted">{copy.privacy}</p>

        {isDemo && (
          <p className="flex items-center justify-center gap-1.5 rounded-md bg-amber-50 px-3 py-2 text-center text-xs font-semibold text-amber-900">
            <FlaskConical className="size-3.5 shrink-0" aria-hidden="true" />
            Demo mode: enquiries are not being sent yet.
          </p>
        )}
      </form>
    </div>
  )
}
