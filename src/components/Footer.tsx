import type { ReactNode } from 'react'
import type { Settings } from '../api/content'

type FooterProps = { logo: string; settings?: Settings; notice: ReactNode }

export function Footer({ logo, settings, notice }: FooterProps) {
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
          <div>
            <small>Visit us</small>
            {settings ? <>
              <p>{settings.serviceTime}<br />{settings.venue}<br />{settings.landmark}<br />{settings.location}</p>
              <a href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${settings.venue} (opens in a new tab)`}>Get directions ↗</a>
            </> : notice}
          </div>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Light Army Fellowship UI</p><p>A campus expression of Light Nation</p></div>
    </footer>
  )
}
