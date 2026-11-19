import { ArrowUpRight, LogOut } from 'lucide-react'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { ApiError, apiEnabled, apiMessage, request } from '../api/content'
import logo from '../assets/la-fellowship-logo.png'
import { Workspace } from './Workspace'
import type { OfficerPermissions } from './permissions'
import './admin.css'

type Session = {
  authenticated: boolean
  username: string | null
  csrfToken: string
  permissions?: OfficerPermissions
}

export default function Admin() {
  const [session, setSession] = useState<Session>()
  const [sessionError, setSessionError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [actionError, setActionError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Admin · Light Army Fellowship UI'
    window.scrollTo(0, 0)
    return () => { document.title = originalTitle }
  }, [])

  useEffect(() => {
    if (!apiEnabled) return
    const controller = new AbortController()
    request<Session>('/admin/session', { signal: controller.signal }).then(
      (value) => { if (!controller.signal.aborted) setSession(value) },
      () => {
        if (!controller.signal.aborted) setSessionError('Unable to check your session. Try again.')
      },
    )
    return () => controller.abort()
  }, [attempt])

  const changeSession = async (path: string, body?: { username: string; password: string }) => {
    if (!session || pending) return
    setPending(true)
    setActionError('')
    try {
      const updatedSession = await request<Session>(path, {
        method: 'POST',
        headers: { 'X-CSRF-Token': session.csrfToken },
        body: body ? JSON.stringify(body) : undefined,
      })
      setSession(updatedSession)
    } catch (error) {
      setActionError(apiMessage(error, 'Unable to reach the server. Try again.'))
      if (error instanceof ApiError && (error.status === 403 || (!body && error.status === 401))) {
        setAttempt((value) => value + 1)
      }
    } finally {
      setPending(false)
    }
  }

  const csrfToken = session?.csrfToken
  const adminRequest = useCallback(async <T,>(path: string, options?: RequestInit): Promise<T> => {
    try {
      const headers = new Headers(options?.headers)
      if (csrfToken && options?.method && options.method !== 'GET') headers.set('X-CSRF-Token', csrfToken)
      return await request<T>(`/admin${path}`, { ...options, headers })
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setSession(undefined)
        setActionError('Your session expired. Sign in to continue.')
        setAttempt((value) => value + 1)
      }
      throw error
    }
  }, [csrfToken])

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    void changeSession('/admin/sign-in', {
      username: String(form.get('username') ?? '').trim(),
      password: String(form.get('password') ?? ''),
    })
  }

  const retrySession = () => {
    setSessionError('')
    setAttempt((value) => value + 1)
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-container admin-topbar">
          <a className="admin-brand" href="#top">
            <img src={logo} alt="" />
            <span>Light Army Fellowship UI</span>
          </a>
          <div className="admin-actions">
            <a className="admin-button admin-secondary" href="#top">View site <ArrowUpRight aria-hidden="true" size={16} /></a>
            {session?.authenticated && <button type="button" className="admin-button admin-secondary" disabled={pending} onClick={() => void changeSession('/admin/sign-out')}>{pending ? 'Signing out…' : 'Sign out'} <LogOut aria-hidden="true" size={16} /></button>}
          </div>
        </div>
      </header>

      <main className="admin-container admin-main">
        <h1>{session?.authenticated ? 'Fellowship dashboard' : 'Fellowship admin'}</h1>
        {!apiEnabled ? (
          <div className="admin-panel"><p>The dashboard requires a connection to the fellowship API.</p></div>
        ) : sessionError ? (
          <div className="admin-panel">
            <p className="admin-error" role="alert">{sessionError}</p>
            <button type="button" className="admin-button" onClick={retrySession}>Try again</button>
          </div>
        ) : !session ? (
          <div className="admin-panel"><p role="status">Checking your session…</p></div>
        ) : session.authenticated ? (
          <>
            {actionError && <p className="admin-error" role="alert">{actionError}</p>}
            <Workspace username={session.username} permissions={session.permissions} adminRequest={adminRequest} />
          </>
        ) : (
          <form className="admin-panel admin-sign-in admin-form" onSubmit={signIn}>
            <h2>Sign in</h2>
            <label>Username<input name="username" autoComplete="username" maxLength={64} required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" maxLength={256} required /></label>
            {actionError && <p className="admin-error" role="alert">{actionError}</p>}
            <button className="admin-button" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
          </form>
        )}
      </main>
    </div>
  )
}
