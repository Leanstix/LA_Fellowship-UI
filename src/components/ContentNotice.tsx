type ContentNoticeProps = {
  state: 'loading' | 'error' | 'ready'
  subject: string
  onRetry: () => void
}

export function ContentNotice({ state, subject, onRetry }: ContentNoticeProps) {
  if (state === 'ready') return null

  return (
    <div className="content-notice">
      <p role="status">{state === 'loading' ? `Loading ${subject}…` : `The ${subject} could not be loaded.`}</p>
      {state === 'error' && <button type="button" onClick={onRetry}>Try loading the {subject} again</button>}
    </div>
  )
}
