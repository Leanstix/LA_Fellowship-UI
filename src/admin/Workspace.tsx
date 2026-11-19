import { useEffect, useState } from 'react'
import { apiMessage, type Content } from '../api/content'
import { SettingsForm } from './SettingsForm'

export type AdminRequest = <T>(path: string, options?: RequestInit) => Promise<T>

type WorkspaceProps = {
  username: string | null
  adminRequest: AdminRequest
}

export function Workspace({ username, adminRequest }: WorkspaceProps) {
  const [content, setContent] = useState<Content>()
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    adminRequest<Content>('/content', { signal: controller.signal }).then(
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
      {content ? <SettingsForm initialSettings={content.settings} adminRequest={adminRequest} /> : (
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
