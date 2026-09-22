import { formationPillars } from '../data/content'
import { fellowship } from '../data/fellowship'
import { ArrowUpRight, BookOpen, AudioLines, Users } from 'lucide-react'
import logo from '../assets/la-fellowship-logo.png'
import './About.css'

const icons = [BookOpen, AudioLines, Users]

export function About() {
  return (
    <section className="identity section-shell" id="about" aria-labelledby="identity-heading">
      <div className="identity-topline"><span>01 / Who we are</span><span>Light Army Fellowship · UI</span></div>
      <div className="identity-grid">
        <div className="identity-story">
          <p className="identity-overline">Rooted in Christ. Growing together.</p>
          <h2 id="identity-heading">Built in the Word.<br /><em>Burning with light.</em></h2>
          <p className="identity-lead">A place to know Jesus.<br />A family to grow with.</p>
          <p className="identity-description">We are a community of students at the University of Ibadan growing in Christ, walking in purpose, and carrying His light into everyday life.</p>
          <a className="identity-invitation" href="#connect">Find your place in the family <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
        <aside className="identity-family" aria-label="Our spiritual family and leadership">
          <div className="identity-family-top"><span>Our spiritual family</span><img src={logo} alt="Light Army Fellowship emblem" width="88" height="88" /></div>
          <p className="identity-family-name">One family.<br /><em>A shared light.</em></p>
          <p className="identity-family-copy">A campus expression of Light Nation. Knowing Jesus deeply and representing Him excellently, on campus and beyond.</p>
          <dl className="identity-leaders">
            <div><dt>Global pastor</dt><dd>{fellowship.globalPastor}</dd></div>
            <div><dt>Light Nation · Mother church</dt><dd>Apostle Femi Lazarus</dd></div>
          </dl>
        </aside>
      </div>

      <div className="identity-values-heading"><span>What shapes our life together</span><span aria-hidden="true">01 — 03</span></div>
      <div className="identity-values">
        {formationPillars.map((pillar, index) => {
          const Icon = icons[index]
          return (
          <article key={pillar.number} className="identity-value">
            <div className="identity-value-top"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{pillar.number}</span></div>
            <div><h3>{pillar.title}</h3><p>{pillar.copy}</p></div>
          </article>
          )
        })}
      </div>
    </section>
  )
}
