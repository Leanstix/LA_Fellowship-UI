import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'

type HeaderProps = { logo: string }

const links = [
  { label: 'Visit', href: '#connect' },
  { label: 'About', href: '#about' },
  { label: 'Moments', href: '#moments' },
  { label: 'Sermons', href: '#sermons' },
]

export function Header({ logo }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header className="campus-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }}>
      <a className="campus-skip" href="#main">Skip to content</a>
      <div className="campus-shell campus-header-inner">
        <a className="campus-brand" href="#top" aria-label="Light Army Fellowship home" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width="48" height="48" />
          <span>Light Army Fellowship<small>University of Ibadan</small></span>
        </a>
        <nav className="campus-nav" aria-label="Primary navigation">
          {links.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="campus-header-visit" href="#connect">Plan a visit <ArrowUpRight aria-hidden="true" size={16} /></a>
        <button className="campus-menu" ref={menuButton} type="button" aria-controls="campus-mobile-nav" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          <span>{open ? 'Close menu' : 'Menu'}</span>
        </button>
      </div>
      <nav className="campus-mobile-nav" id="campus-mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {links.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  )
}
