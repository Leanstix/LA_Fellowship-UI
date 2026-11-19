import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { apiEnabled, type Settings } from '../api/content'
import { FirstTimerContact } from './FirstTimerContact'

type ConnectProps = { settings?: Settings; notice: ReactNode }

export function Connect({ settings, notice }: ConnectProps) {
  return (
    <section className="campus-visit" id="connect" aria-labelledby="campus-visit-heading">
      <div className="campus-shell campus-visit-layout">
        <div className="campus-visit-copy">
          <p className="campus-kicker">Plan your visit</p>
          <h2 className="campus-title" id="campus-visit-heading">Your first Sunday.</h2>
          <p>Come on your own or bring a friend. You’re welcome here.</p>
          <h3>What to expect</h3>
          <p>We gather for Bible teaching, worship and prayer. If you’re exploring faith or looking for a fellowship on campus, come as you are.</p>
          {apiEnabled && <FirstTimerContact />}
        </div>
        <div className="campus-visit-card">
          <h3>When and where</h3>
          {settings ? (
            <>
              <div className="campus-visit-detail">
                <CalendarDays aria-hidden="true" size={22} />
                <p><strong>{settings.serviceTime}</strong></p>
              </div>
              <div className="campus-visit-detail">
                <MapPin aria-hidden="true" size={22} />
                <p><strong>{settings.venue}</strong><br />{settings.landmark}<br />{settings.location}</p>
              </div>
              <a className="campus-button campus-button-dark" href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${settings.venue} (opens in a new tab)`}>Get directions <ArrowUpRight size={18} aria-hidden="true" /></a>
            </>
          ) : notice}
        </div>
      </div>
    </section>
  )
}
