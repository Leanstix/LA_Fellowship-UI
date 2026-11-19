import { BookOpen, HandHeart, Music2 } from 'lucide-react'
import { formationPillars } from '../data/content'
import { fellowship } from '../data/fellowship'

const pillarIcons = [BookOpen, Music2, HandHeart]

export function About() {
  return (
    <section className="campus-about" id="about" aria-labelledby="campus-about-heading">
      <div className="campus-shell campus-about-layout">
        <div className="campus-about-copy">
          <p className="campus-kicker">About the fellowship</p>
          <h2 className="campus-title" id="campus-about-heading">Faith, lived together.</h2>
          <p className="campus-about-lead">We are a community of students at the University of Ibadan growing in Christ, walking in purpose and carrying His light on campus.</p>
          <p>Light Army Fellowship is a campus expression of Light Nation, led by Apostle Femi Lazarus and Pastor Miracle Femi Lazarus. {fellowship.globalPastor} is our global pastor.</p>
        </div>

        <ul className="campus-pillars">
          {formationPillars.map(({ title, copy }, index) => {
            const Icon = pillarIcons[index]
            return (
              <li key={title}>
                <Icon size={24} aria-hidden="true" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
