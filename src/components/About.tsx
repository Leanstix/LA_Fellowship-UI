import { formationPillars } from '../data/content'
import { fellowship } from '../data/fellowship'

export function About() {
  return (
    <section className="about section-shell" id="about">
      <div className="section-kicker"><span>01</span><p>Who we are</p></div>
      <div className="about-intro">
        <p className="about-side-note">A campus expression of<br />the Light Nation family.</p>
        <h2>Built in the Word.<br /><em>Burning with light.</em></h2>
      </div>
      <div className="about-body">
        <p className="about-lead">Light Army Fellowship is a community of students at the University of Ibadan growing in Christ, walking in purpose, and becoming visible expressions of His light.</p>
        <p>Under the spiritual covering of Light Nation, headed by Apostle Femi Lazarus, and with {fellowship.globalPastor} as our global pastor, we are learning to know Jesus deeply and represent Him excellently—on campus and beyond.</p>
      </div>

      <div className="pillars">
        {formationPillars.map((pillar) => (
          <article key={pillar.number}>
            <span>{pillar.number}</span>
            <div><h3>{pillar.title}</h3><p>{pillar.copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}
