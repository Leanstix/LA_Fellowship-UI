import type { ReactNode } from 'react'
import type { PublicMoment } from '../api/content'
import { isIllustrativeMoment } from '../data/content'

type MomentsProps = { moments?: PublicMoment[]; notice: ReactNode }

export function Moments({ moments, notice }: MomentsProps) {
  return (
    <section className="campus-moments" id="moments" aria-labelledby="campus-moments-heading">
      <div className="campus-shell">
        <p className="campus-kicker">Life together</p>
        <h2 className="campus-title" id="campus-moments-heading">Moments.</h2>
        {moments?.length ? (
          <ul className="campus-moments-grid">
              {moments.map((moment) => (
                <li key={moment.id}>
                  <figure>
                    <img src={moment.image} alt={moment.alt} style={{ objectPosition: moment.align }} loading="lazy" />
                    <figcaption>{isIllustrativeMoment(moment) && <small>Illustrative photo</small>}{moment.label}</figcaption>
                  </figure>
                </li>
              ))}
          </ul>
        ) : moments ? <p className="campus-gallery-notice">Check back for photos from the fellowship.</p> : notice}
      </div>
    </section>
  )
}
