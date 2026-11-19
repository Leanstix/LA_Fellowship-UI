import { ChevronDown, Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { ApiError, request } from '../api/content'

export function FirstTimerContact() {
  const id = useId()
  const [pending, setPending] = useState(false)
  const [received, setReceived] = useState(false)
  const [error, setError] = useState('')
  const [fields, setFields] = useState<Record<string, string>>({})

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending) return

    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const consent = form.has('consent')

    setError('')
    setFields({})
    if (!email && !phone) {
      setFields({ contact: 'Enter an email address or phone number.' })
      return
    }

    setPending(true)
    try {
      await request<{ status: 'received' }>('/public/first-timers', {
        method: 'POST',
        body: JSON.stringify({ name, email: email || undefined, phone: phone || undefined, consent }),
      })
      setReceived(true)
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 400 && cause.fields) {
        const { name, email, phone, consent, contact, ...other } = cause.fields
        setFields(Object.fromEntries(Object.entries({ name, email, phone, consent, contact }).filter(([, value]) => value)))
        if (Object.keys(other).length) setError(Object.values(other).join(' '))
      } else {
        setError(cause instanceof ApiError && cause.status === 429
          ? 'Too many requests. Please wait and try again.'
          : 'We couldn’t send your request. Please try again.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <details className="campus-contact">
      <summary>Request a follow-up <ChevronDown size={18} aria-hidden="true" /></summary>
      <p>Use this optional form if you’d like the fellowship to contact you. You can visit without filling it in.</p>
      <p className="campus-contact-success" role="status">{received && 'Thanks. The fellowship received your request.'}</p>
      {!received && (
        <form onSubmit={submit} aria-label="Request a first-visit follow-up">
          <fieldset disabled={pending}>
            <legend className="campus-sr-only">First-visit contact details</legend>
            <label htmlFor={`${id}-name`}>Your name</label>
            <input id={`${id}-name`} name="name" autoComplete="name" maxLength={120} required aria-invalid={!!fields.name} aria-describedby={fields.name ? `${id}-name-error` : undefined} />
            {fields.name && <p id={`${id}-name-error`} className="campus-contact-error" role="alert">{fields.name}</p>}
            <p className="campus-contact-hint" id={`${id}-contact-hint`}>Give an email address or phone number.</p>
            {fields.contact && <p id={`${id}-contact-error`} className="campus-contact-error" role="alert">{fields.contact}</p>}
            <label htmlFor={`${id}-email`}>Email address</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} aria-invalid={!!(fields.email || fields.contact)} aria-describedby={`${id}-contact-hint${fields.email ? ` ${id}-email-error` : ''}${fields.contact ? ` ${id}-contact-error` : ''}`} />
            {fields.email && <p id={`${id}-email-error`} className="campus-contact-error" role="alert">{fields.email}</p>}
            <label htmlFor={`${id}-phone`}>Phone number</label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={32} aria-invalid={!!(fields.phone || fields.contact)} aria-describedby={`${id}-contact-hint${fields.phone ? ` ${id}-phone-error` : ''}${fields.contact ? ` ${id}-contact-error` : ''}`} />
            {fields.phone && <p id={`${id}-phone-error`} className="campus-contact-error" role="alert">{fields.phone}</p>}
            <label className="campus-contact-consent">
              <input name="consent" type="checkbox" required aria-invalid={!!fields.consent} aria-describedby={fields.consent ? `${id}-consent-error` : undefined} />
              <span>I agree that authorized fellowship officers may use these details to contact me about visiting.</span>
            </label>
            {fields.consent && <p id={`${id}-consent-error`} className="campus-contact-error" role="alert">{fields.consent}</p>}
          </fieldset>
          {error && <p className="campus-contact-error" role="alert">{error}</p>}
          <button className="campus-button campus-button-dark" type="submit" disabled={pending}>
            {pending ? 'Sending…' : 'Send request'} <Send size={16} aria-hidden="true" />
          </button>
        </form>
      )}
    </details>
  )
}
