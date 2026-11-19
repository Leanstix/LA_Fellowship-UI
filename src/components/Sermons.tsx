import { ArrowUpRight, Headphones } from 'lucide-react'
import type { ReactNode } from 'react'

type SermonsProps = { archiveUrl?: string | null; notice: ReactNode }

export function Sermons({ archiveUrl, notice }: SermonsProps) {
  return (
    <section className="campus-sermons" id="sermons" aria-labelledby="campus-sermons-heading">
      <div className="campus-shell campus-sermons-layout">
        <div>
          <p className="campus-kicker">Sermons</p>
          <h2 className="campus-title" id="campus-sermons-heading">Keep learning.</h2>
          <p>Revisit teachings from the fellowship or catch up on a service you missed.</p>
        </div>
        <div className="campus-sermon-archive">
          <Headphones aria-hidden="true" size={32} />
          <div>
            <h3>Sermon library</h3>
            {archiveUrl === undefined ? notice : archiveUrl ? (
              <a href={archiveUrl} target="_blank" rel="noopener noreferrer">
                Open sermon library <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            ) : <p>The sermon library is coming soon.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
