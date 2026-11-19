export type Settings = {
  serviceTime: string
  venue: string
  landmark: string
  location: string
  directionsUrl: string
  sermonArchiveUrl: string | null
}

export type MomentFields = {
  image: string
  alt: string
  label: string
  align: 'center' | 'top' | 'bottom'
}

export type PublicMoment = MomentFields & { id: number }

export type Content = {
  settings: Settings
  moments: PublicMoment[]
}

export const apiEnabled = import.meta.env.VITE_ENABLE_FELLOWSHIP_API === 'true'

export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message)
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers)
  headers.set('Accept', 'application/json')
  if (options?.body) headers.set('Content-Type', 'application/json')
  const response = await fetch(`/api${path}`, { ...options, headers, credentials: 'same-origin', cache: 'no-store' })
  if (!response.ok) {
    const payload: { detail?: unknown } | null = await response.json().catch(() => null)
    const detail = payload?.detail
    const validationMessages = Array.isArray(detail)
      ? detail.flatMap((issue) => typeof issue?.msg === 'string' ? [issue.msg.replace(/^Value error, /, '')] : [])
      : []
    throw new ApiError(response.status, typeof detail === 'string' ? detail : validationMessages.join(' ') || 'The request could not be completed.')
  }
  return response.status === 204 ? undefined as T : response.json()
}

export function apiMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback
}
