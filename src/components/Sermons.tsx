import { ArrowUpRight, Headphones, Play } from 'lucide-react'

export function Sermons() {
  return (
    <section className="sermons section-shell" id="sermons">
      <div className="section-kicker"><span>03</span><p>Stay in the Word</p></div>
      <div className="sermon-layout">
        <div className="sermon-copy">
          <p className="coming-soon"><i /> Sermon library · coming soon</p>
          <h2>Truth for<br /><em>everyday life.</em></h2>
          <p>Missed a meeting or want to listen again? Our growing sermon library will make teachings from the fellowship available wherever you are.</p>
          <button className="ghost-button" type="button" disabled aria-describedby="library-note">
            Open sermon library <ArrowUpRight />
          </button>
          <small id="library-note">The Google Drive archive will be connected here.</small>
        </div>

        <div className="sermon-art" aria-hidden="true">
          <div className="sound-ring ring-one" />
          <div className="sound-ring ring-two" />
          <div className="sound-ring ring-three" />
          <div className="sermon-disc">
            <Headphones />
            <span>Listen.<br />Learn.<br />Live.</span>
          </div>
          <button className="play-button" tabIndex={-1}><Play fill="currentColor" /></button>
          <div className="sound-bars">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 54)}px` }} />)}</div>
        </div>
      </div>
    </section>
  )
}
