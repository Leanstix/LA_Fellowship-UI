import { ArrowUpRight, LogOut } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { apiEnabled, request } from '../api/content'
import logo from '../assets/la-fellowship-logo.png'
import './admin.css'

type Session = {
  authenticated: boolean
  username: string | null
  csrfToken: string
}

const getMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message !== 'Failed to fetch' ? error.message : fallback

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
      setActionError(getMessage(error, 'Unable to reach the server. Try again.'))
    } finally {
      setPending(false)
    }
  }

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
            <div className="admin-panel"><p>Signed in as {session.username}.</p></div>
          </>
        ) : (
          <form className="admin-panel admin-sign-in admin-form" onSubmit={signIn}>
            <h2>Sign in</h2>
            <label>Username<input name="username" autoComplete="username" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
            {actionError && <p className="admin-error" role="alert">{actionError}</p>}
            <button className="admin-button" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
          </form>
        )}
      </main>
    </div>
  )
}
