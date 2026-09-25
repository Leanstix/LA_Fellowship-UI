import { fellowship } from '../data/fellowship'

type FooterProps = { logo: string }

export function Footer({ logo }: FooterProps) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Light Army Fellowship" />
          <p>Knowing Jesus.<br />Carrying His light.</p>
        </div>
        <div className="footer-links">
          <div><small>Navigate</small><a href="#about">About</a><a href="#moments">Moments</a><a href="#sermons">Sermons</a><a href="#confession">Our confession</a></div>
          <div><small>Connect</small><a href="#connect">Join the family</a><a href="#sermons">Sermon library</a></div>
          <div><small>Join us on Sunday</small><p>{fellowship.serviceTime}<br />{fellowship.venue}<br />{fellowship.landmark}<br />{fellowship.location}</p><a href={fellowship.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions on Google Maps (opens in a new tab)">Get directions ↗</a></div>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Light Army Fellowship UI</p><p>A campus expression of Light Nation</p></div>
    </footer>
  )
}
