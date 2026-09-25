import './Confession.css'

export function Confession() {
  return (
    <section className="confession" id="confession" aria-labelledby="confession-heading">
      <div className="section-shell confession-inner">
        <div className="confession-heading">
          <p className="confession-kicker">Our confession</p>
          <h2 id="confession-heading">L.A Fellowship<br /><em>Confession</em></h2>
        </div>
        <div className="confession-words">
          <p>The Spirit of the Lord is upon us, so we run like mighty men; we climb the walls like men of war; we triumph in all sphere of influence, we do not break our ranks!</p>
          <p>We are a balanced people, a wealthy place; we prosper and be in health as our soul prospers, we are God's End-time Armies sent to the nations of the World.</p>
          <p className="confession-declaration">We are L.A Fellowship!</p>
        </div>
      </div>
    </section>
  )
}
