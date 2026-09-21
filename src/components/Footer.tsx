type FooterProps = { logo: string }

export function Footer({ logo }: FooterProps) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Light Army Fellowship" />
          <p>Knowing Jesus.<br />Carrying His light.</p>
        </div>
        <div className="footer-links">
          <div><small>Navigate</small><a href="#about">About</a><a href="#moments">Moments</a><a href="#sermons">Sermons</a></div>
          <div><small>Connect</small><a href="#connect">Join the family</a><a href="#sermons">Sermon library</a></div>
          <div><small>Location</small><p>University of Ibadan<br />Ibadan, Nigeria</p></div>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Light Army Fellowship UI</p><p>A campus expression of Light Nation</p></div>
    </footer>
  )
}
