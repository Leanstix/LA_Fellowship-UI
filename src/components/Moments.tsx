import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import type { PublicMoment } from '../api/content'

type MomentsProps = { moments?: PublicMoment[]; notice: ReactNode }

export function Moments({ moments, notice }: MomentsProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const move = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.78, 520), behavior: 'smooth' })
  }

  return (
    <section className="moments" id="moments">
      <div className="section-shell moments-heading">
        <div className="section-kicker section-kicker-light"><span>02</span><p>Life together</p></div>
        <div>
          <h2>More than meetings.<br /><em>These are our moments.</em></h2>
          {moments && moments.length > 1 && <div className="carousel-controls">
            <button onClick={() => move(-1)} aria-label="Previous moment"><ArrowLeft /></button>
            <button onClick={() => move(1)} aria-label="Next moment"><ArrowRight /></button>
          </div>}
        </div>
      </div>

      {moments?.length ? <div className="moments-track" ref={trackRef}>
        {moments.map((moment, index) => (
          <figure key={moment.id} className={`moment-card moment-${index + 1}`}>
            <img src={moment.image} alt={moment.alt} style={{ objectPosition: moment.align }} loading={index > 1 ? 'lazy' : 'eager'} />
            <div className="moment-shade" />
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{moment.label}</figcaption>
          </figure>
        ))}
      </div> : <div className="section-shell moments-notice">{moments ? <p>Check back for photos from the fellowship.</p> : notice}</div>}
    </section>
  )
}
