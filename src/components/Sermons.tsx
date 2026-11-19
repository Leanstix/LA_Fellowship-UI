import { ArrowUpRight, Headphones } from 'lucide-react'
import type { ReactNode } from 'react'

type SermonsProps = { archiveUrl?: string | null; notice: ReactNode }

export function Sermons({ archiveUrl, notice }: SermonsProps) {
  return (
    <section className="sermons section-shell" id="sermons">
      <div className="section-kicker"><span>03</span><p>Stay in the Word</p></div>
      <div className="sermon-layout">
        <div className="sermon-copy">
          <h2>Truth for<br /><em>everyday life.</em></h2>
          <p>Missed a meeting or want to listen again? Find teachings from the fellowship wherever you are.</p>
          {archiveUrl === undefined ? notice : archiveUrl ? (
            <a className="ghost-button" href={archiveUrl} target="_blank" rel="noopener noreferrer">
              Open sermon library <ArrowUpRight aria-hidden="true" />
            </a>
          ) : <small>The sermon library is coming soon.</small>}
        </div>

        <div className="sermon-art" aria-hidden="true">
          <div className="sound-ring ring-one" />
          <div className="sound-ring ring-two" />
          <div className="sound-ring ring-three" />
          <div className="sermon-disc">
            <Headphones />
            <span>Listen.<br />Learn.<br />Live.</span>
          </div>
          <div className="sound-bars">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 54)}px` }} />)}</div>
        </div>
      </div>
    </section>
  )
}
