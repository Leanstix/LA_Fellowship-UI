import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Settings } from '../api/content'

type ConnectProps = { settings?: Settings; notice: ReactNode }

export function Connect({ settings, notice }: ConnectProps) {
  return (
    <section className="connect" id="connect">
      <div className="connect-orbit orbit-one" />
      <div className="connect-orbit orbit-two" />
      <p className="connect-script">There is room for you.</p>
      <div className="connect-content">
        <p className="eyebrow eyebrow-dark"><span /> Your place. Your people.</p>
        <h2>Come as you are.<br /><em>Leave carrying light.</em></h2>
        <p>Whether you are new to campus, exploring faith, or looking for a spiritual family, you do not have to walk alone.</p>
        {settings ? <>
          <a className="dark-button" href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${settings.venue} (opens in a new tab)`}>Get directions <ArrowUpRight aria-hidden="true" /></a>
          <div className="location"><MapPin aria-hidden="true" /><span><strong>{settings.serviceTime}</strong><br />{settings.venue}<br />{settings.landmark}<br />{settings.location}</span></div>
        </> : notice}
      </div>
    </section>
  )
}
