import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type HeaderProps = {
  logo: string
}

const links = [
  { label: 'About', href: '#about' },
  { label: 'Moments', href: '#moments' },
  { label: 'Sermons', href: '#sermons' },
  { label: 'Connect', href: '#connect' },
]

export function Header({ logo }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Light Army Fellowship home">
        <img src={logo} alt="" />
        <span>Light Army <small>Fellowship UI</small></span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <a className="header-cta" href="#connect">Join the family <span aria-hidden="true">↗</span></a>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>

      <div className={`mobile-panel ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small>{link.label}
            </a>
          ))}
        </nav>
        <p>University of Ibadan<br />Light Nation family</p>
      </div>
    </header>
  )
}
