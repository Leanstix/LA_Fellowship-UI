import { ArrowDownRight, Sparkles } from 'lucide-react'

type HeroProps = {
  image: string
}

export function Hero({ image }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-grain" />
      <div className="hero-copy">
        <p className="eyebrow"><span /> Light Army Fellowship · UI</p>
        <h1>
          <span>Find light.</span>
          <em>Find family.</em>
        </h1>
        <div className="hero-lower-copy">
          <p>A people formed by the Word, alive in worship, and committed to carrying the light of Christ everywhere.</p>
          <a href="#about" className="round-link" aria-label="Discover the fellowship"><ArrowDownRight /></a>
        </div>
      </div>

      <div className="hero-visual">
        <img src={image} alt="A congregation gathered in worship" />
        <div className="hero-image-shade" />
        <div className="hero-sticker">
          <Sparkles size={18} />
          <span>One family.<br />One light.</span>
        </div>
        <p className="hero-caption">Raising a generation<br />that burns for Jesus.</p>
      </div>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>WORD</span><i>✦</i><span>WORSHIP</span><i>✦</i><span>PRAYER</span><i>✦</i><span>COMMUNITY</span><i>✦</i>
          <span>WORD</span><i>✦</i><span>WORSHIP</span><i>✦</i><span>PRAYER</span><i>✦</i><span>COMMUNITY</span><i>✦</i>
        </div>
      </div>
    </section>
  )
}
