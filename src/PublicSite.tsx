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
import { isIllustrativeMoment, moments } from './data/content'
import { fellowship } from './data/fellowship'
import logo from './assets/la-fellowship-logo.png'
import './campus.css'

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

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }
  const content = state.status === 'ready' ? state.content : null
  const serviceNotice = <ContentNotice state={state.status} subject="service details" onRetry={retry} />

  return (
    <div className="campus-site">
      <Header logo={logo} />
      <main id="main">
        <Hero moment={content?.moments.find((moment) => !isIllustrativeMoment(moment))} settings={content?.settings} notice={serviceNotice} />
        <Connect settings={content?.settings} notice={serviceNotice} />
        <About />
        <Moments moments={content?.moments} notice={<ContentNotice state={state.status} subject="gallery" onRetry={retry} />} />
        <Sermons archiveUrl={content?.settings.sermonArchiveUrl} notice={<ContentNotice state={state.status} subject="sermon library" onRetry={retry} />} />
        <Confession />
      </main>
      <Footer logo={logo} settings={content?.settings} notice={serviceNotice} />
    </div>
  )
}
