import { ArrowUpRight, MapPin } from 'lucide-react'
import { fellowship } from '../data/fellowship'

export function Connect() {
  return (
    <section className="connect" id="connect">
      <div className="connect-orbit orbit-one" />
      <div className="connect-orbit orbit-two" />
      <p className="connect-script">There is room for you.</p>
      <div className="connect-content">
        <p className="eyebrow eyebrow-dark"><span /> Your place. Your people.</p>
        <h2>Come as you are.<br /><em>Leave carrying light.</em></h2>
        <p>Whether you are new to campus, exploring faith, or looking for a spiritual family, you do not have to walk alone.</p>
        <a className="dark-button" href={fellowship.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions to BNI Building on Google Maps (opens in a new tab)">Get directions <ArrowUpRight aria-hidden="true" /></a>
        <div className="location"><MapPin aria-hidden="true" /><span><strong>{fellowship.serviceTime}</strong><br />{fellowship.venue}<br />{fellowship.landmark}<br />{fellowship.location}</span></div>
      </div>
    </section>
  )
}
