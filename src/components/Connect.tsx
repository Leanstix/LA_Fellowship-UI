import { ArrowUpRight, MapPin } from 'lucide-react'

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
        <button className="dark-button" type="button" disabled>Connection details coming soon <ArrowUpRight /></button>
        <div className="location"><MapPin /><span>University of Ibadan<br /><small>Service details will be announced soon.</small></span></div>
      </div>
    </section>
  )
}
