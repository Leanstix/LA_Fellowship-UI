import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Settings } from '../api/content'

type FooterProps = { logo: string; settings?: Settings; notice: ReactNode }

export function Footer({ logo, settings, notice }: FooterProps) {
  return (
    <footer className="campus-footer">
      <div className="campus-shell">
        <div className="campus-footer-layout">
          <div className="campus-footer-brand">
            <img src={logo} alt="" width="64" height="64" />
            <div><strong>Light Army Fellowship</strong><p>A campus expression of Light Nation</p></div>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#connect">Plan your visit</a>
            <a href="#about">About</a>
            <a href="#moments">Moments</a>
            <a href="#sermons">Sermons</a>
            <a href="#confession">Our confession</a>
          </nav>
          <div className="campus-footer-visit">
            <strong>Visit us</strong>
            {settings ? (
              <>
                <p>{settings.serviceTime}<br />{settings.venue}<br />{settings.landmark}<br />{settings.location}</p>
                <a href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${settings.venue} (opens in a new tab)`}>Get directions <ArrowUpRight aria-hidden="true" size={16} /></a>
              </>
            ) : notice}
          </div>
        </div>
        <p className="campus-footer-copyright">© {new Date().getFullYear()} Light Army Fellowship UI</p>
      </div>
    </footer>
  )
}
