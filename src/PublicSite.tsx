import { useEffect, useState } from 'react'
import { apiEnabled, request, type Content } from './api/content'
import { About } from './components/About'
import { Connect } from './components/Connect'
import { ContentNotice } from './components/ContentNotice'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Moments } from './components/Moments'
import { Sermons } from './components/Sermons'
import { Confession } from './components/Confession'
import { moments } from './data/content'
import { fellowship } from './data/fellowship'
import logo from './assets/la-fellowship-logo.png'

type LoadState = { status: 'loading' | 'error' } | { status: 'ready'; content: Content }

export function PublicSite() {
  const [state, setState] = useState<LoadState>(apiEnabled
    ? { status: 'loading' }
    : { status: 'ready', content: { settings: fellowship, moments } })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!apiEnabled) return
    const controller = new AbortController()
    request<Content>('/public/content', { signal: controller.signal }).then(
      (content) => { if (!controller.signal.aborted) setState({ status: 'ready', content }) },
      () => { if (!controller.signal.aborted) setState({ status: 'error' }) },
    )
    return () => controller.abort()
  }, [attempt])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.12 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }
  const content = state.status === 'ready' ? state.content : null
  const serviceNotice = <ContentNotice state={state.status} subject="service details" onRetry={retry} />

  return (
    <>
      <Header logo={logo} />
      <main>
        <Hero moment={content?.moments[0]} />
        <div data-reveal><About /></div>
        <div data-reveal><Moments moments={content?.moments} notice={<ContentNotice state={state.status} subject="gallery" onRetry={retry} />} /></div>
        <div data-reveal><Sermons archiveUrl={content?.settings.sermonArchiveUrl} notice={<ContentNotice state={state.status} subject="sermon library" onRetry={retry} />} /></div>
        <Confession />
        <div data-reveal><Connect settings={content?.settings} notice={serviceNotice} /></div>
      </main>
      <Footer logo={logo} settings={content?.settings} notice={serviceNotice} />
    </>
  )
}
