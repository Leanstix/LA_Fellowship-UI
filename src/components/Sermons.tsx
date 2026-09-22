import { ArrowUpRight, Headphones, FolderOpen } from 'lucide-react'
import './Sermons.css'

export function Sermons() {
  return (
    <section className="teaching section-shell" id="sermons" aria-labelledby="teaching-heading">
      <div className="teaching-topline"><span>03 / Stay in the Word</span><span>Teachings &amp; messages</span></div>
      <div className="teaching-grid">
        <div className="teaching-story">
          <p className="teaching-overline">Beyond the Sunday gathering</p>
          <h2 id="teaching-heading">The message stays.<br /><em>Let it shape your life.</em></h2>
          <p>Revisit a teaching. Sit with a truth. Carry it into your week. Soon, messages from the fellowship will be available to listen to wherever you are.</p>
          <a className="teaching-visit" href="#connect">Join us this Sunday <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
        <div className="teaching-library" aria-label="Sermon library, coming soon">
          <div className="teaching-cover">
            <div className="teaching-cover-top"><Headphones size={28} strokeWidth={1.5} aria-hidden="true" /><span>Light Army Fellowship / UI</span></div>
            <p className="teaching-cover-title">Listen.<br />Learn.<br /><em>Live.</em></p>
            <p className="teaching-cover-footer">The Word for your everyday.</p>
          </div>
          <div className="teaching-library-details">
            <div className="teaching-library-label"><h3>Sermon library</h3><span>Coming soon</span></div>
            <p>Our messages will be collected in one place, ready to return to throughout the week.</p>
            <div className="teaching-archive-note"><FolderOpen size={19} aria-hidden="true" /><span>Google Drive archive · Not yet available</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
