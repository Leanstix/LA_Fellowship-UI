import { lazy, Suspense, useEffect, useState } from 'react'
import { PublicSite } from './PublicSite'

const Admin = lazy(() => import('./admin/Admin'))

function isAdminRoute() {
  return window.location.hash === '#/admin' || window.location.hash.startsWith('#/admin/')
}

export default function App() {
  const [adminRoute, setAdminRoute] = useState(isAdminRoute)

  useEffect(() => {
    const handleHashChange = () => setAdminRoute(isAdminRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (adminRoute) {
    return <Suspense fallback={<p role="status">Loading admin dashboard…</p>}><Admin /></Suspense>
  }

  return <PublicSite />
}
