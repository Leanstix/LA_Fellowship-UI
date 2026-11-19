import { useEffect, useState } from 'react'
import { apiMessage, type Content } from '../api/content'
import { SettingsForm } from './SettingsForm'
import { Gallery, type AdminMoment } from './Gallery'

type AdminContent = Omit<Content, 'moments'> & { moments: AdminMoment[] }

export type AdminRequest = <T>(path: string, options?: RequestInit) => Promise<T>

type WorkspaceProps = {
  username: string | null
  adminRequest: AdminRequest
}

export function Workspace({ username, adminRequest }: WorkspaceProps) {
  const [content, setContent] = useState<AdminContent>()
  const [section, setSection] = useState<'settings' | 'gallery'>('settings')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    adminRequest<AdminContent>('/content', { signal: controller.signal }).then(
      (value) => { if (!controller.signal.aborted) setContent(value) },
      (cause) => {
        if (!controller.signal.aborted) setError(apiMessage(cause, 'Unable to load the dashboard. Try again.'))
      },
    )
    return () => controller.abort()
  }, [adminRequest, attempt])

  return (
    <>
      <p className="admin-account">Signed in as <strong>{username}</strong></p>
      {content ? <>
        <nav className="admin-navigation" aria-label="Manage fellowship content">
          <button className="admin-button admin-secondary" type="button" aria-pressed={section === 'settings'} onClick={() => setSection('settings')}>Service and sermons</button>
          <button className="admin-button admin-secondary" type="button" aria-pressed={section === 'gallery'} onClick={() => setSection('gallery')}>Gallery</button>
        </nav>
        <div hidden={section !== 'settings'}>
          <SettingsForm initialSettings={content.settings} adminRequest={adminRequest} />
        </div>
        <div hidden={section !== 'gallery'}>
          <Gallery initialMoments={content.moments} adminRequest={adminRequest} />
        </div>
      </> : (
        <div className="admin-panel">
          {error ? <>
            <p className="admin-error" role="alert">{error}</p>
            <button className="admin-button" type="button" onClick={() => {
              setError('')
              setAttempt((value) => value + 1)
            }}>Try again</button>
          </> : <p role="status">Loading fellowship content…</p>}
        </div>
      )}
    </>
  )
}
