import { ArrowDownRight, ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PublicMoment, Settings } from '../api/content'
import logo from '../assets/la-fellowship-logo.png'

type HeroProps = {
  moment?: PublicMoment
  settings?: Settings
  notice: ReactNode
}

export function Hero({ moment, settings, notice }: HeroProps) {
  return (
    <section className="campus-hero" id="top" aria-labelledby="campus-hero-heading">
      <div className="campus-shell campus-hero-layout">
        <div className="campus-hero-copy">
          <p className="campus-kicker">Christian student fellowship <span aria-hidden="true">·</span> University of Ibadan</p>
          <h1 id="campus-hero-heading">Find your people.<em>Grow in faith.</em></h1>
          <p className="campus-hero-intro">Join us for the Word, worship and a community to grow with.</p>
          <a href="#connect" className="campus-button campus-button-dark">Plan your visit <ArrowDownRight size={19} aria-hidden="true" /></a>
        </div>
        <div className="campus-sunday" aria-label="Service time and location">
          {settings ? <>
            <div className="campus-sunday-time"><Clock3 size={18} aria-hidden="true" /><strong>{settings.serviceTime}</strong></div>
            <div className="campus-sunday-location">
              <MapPin size={18} aria-hidden="true" />
              <div><strong>{settings.venue}</strong><br />{settings.landmark}</div>
            </div>
            <a href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${settings.venue} (opens in a new tab)`}>Get directions <ArrowUpRight size={16} aria-hidden="true" /></a>
          </> : notice}
        </div>
        <div className="campus-hero-media">
          {moment ? <img src={moment.image} alt={moment.alt} style={{ objectPosition: moment.align }} fetchPriority="high" />
            : <div className="campus-hero-emblem" aria-hidden="true"><img src={logo} alt="" width="384" height="384" /></div>}
        </div>
      </div>
    </section>
  )
}
