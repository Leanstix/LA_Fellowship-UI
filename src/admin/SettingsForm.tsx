import { useState, type FormEvent } from 'react'
import { apiMessage, type Settings } from '../api/content'
import type { AdminRequest } from './Workspace'

type SettingsFormProps = {
  initialSettings: Settings
  adminRequest: AdminRequest
}

export function SettingsForm({ initialSettings, adminRequest }: SettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const edit = (field: keyof Settings, value: string) => {
    setSettings((previous) => ({ ...previous, [field]: value }))
    setSaved(false)
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending) return
    setPending(true)
    setError('')
    setSaved(false)
    try {
      const result = await adminRequest<Settings>('/settings', {
        method: 'PUT',
        body: JSON.stringify({ ...settings, sermonArchiveUrl: settings.sermonArchiveUrl?.trim() || null }),
      })
      setSettings(result)
      setSaved(true)
    } catch (cause) {
      setError(apiMessage(cause, 'Unable to save settings. Try again.'))
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="admin-panel admin-form admin-settings" onSubmit={save}>
      <fieldset disabled={pending}>
        <legend>Service details</legend>
        <label>Service time<input value={settings.serviceTime} onChange={(event) => edit('serviceTime', event.target.value)} maxLength={160} required aria-describedby="service-time-help" /></label>
        <p id="service-time-help" className="admin-hint">Include the day and time in WAT.</p>
        <label>Venue<input value={settings.venue} onChange={(event) => edit('venue', event.target.value)} maxLength={160} required /></label>
        <label>Landmark<input value={settings.landmark} onChange={(event) => edit('landmark', event.target.value)} maxLength={160} required /></label>
        <label>Location<input value={settings.location} onChange={(event) => edit('location', event.target.value)} maxLength={160} required /></label>
        <label>Directions URL<input type="url" value={settings.directionsUrl} onChange={(event) => edit('directionsUrl', event.target.value)} maxLength={2048} pattern="https://.+" title="Enter an HTTPS URL" required /></label>
      </fieldset>
      <fieldset disabled={pending}>
        <legend>Sermon library</legend>
        <label>Archive URL (optional)<input type="url" value={settings.sermonArchiveUrl ?? ''} onChange={(event) => edit('sermonArchiveUrl', event.target.value)} maxLength={2048} pattern="https://.+" title="Enter an HTTPS URL" aria-describedby="archive-url-help" /></label>
        <p id="archive-url-help" className="admin-hint">Leave this blank to show “coming soon” on the site.</p>
      </fieldset>
      <div className="admin-actions">
        <button className="admin-button" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save settings'}</button>
        <span role="status">{saved && 'Settings published.'}</span>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
    </form>
  )
}
