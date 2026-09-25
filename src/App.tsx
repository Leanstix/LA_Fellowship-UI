import { useEffect } from 'react'
import { About } from './components/About'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Moments } from './components/Moments'
import { Sermons } from './components/Sermons'
import { Confession } from './components/Confession'
import { moments } from './data/content'
import logo from './assets/la-fellowship-logo.png'

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.12 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header logo={logo} />
      <main>
        <Hero image={moments[0].image} />
        <div data-reveal><About /></div>
        <div data-reveal><Moments /></div>
        <div data-reveal><Sermons /></div>
        <Confession />
        <div data-reveal><Connect /></div>
      </main>
      <Footer logo={logo} />
    </>
  )
}

export default App
