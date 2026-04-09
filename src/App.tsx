import { useEffect, useState } from 'react'
import './App.css'
import { TopNavigation } from './components/TopNavigation'
import { AdminPage } from './pages/AdminPage'
import { BookingPage } from './pages/BookingPage'

type AppPath = '/' | '/admin'

function getCurrentPathname(): AppPath {
  return window.location.pathname === '/admin' ? '/admin' : '/'
}

function App() {
  const [pathname, setPathname] = useState<AppPath>(getCurrentPathname)

  useEffect(() => {
    const handleLocationChange = () => setPathname(getCurrentPathname())

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  function navigate(nextPath: AppPath) {
    if (nextPath === pathname) {
      return
    }

    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  const isAdmin = pathname === '/admin'

  return (
    <div className="app-shell">
      <TopNavigation isAdmin={isAdmin} onNavigate={navigate} />
      {isAdmin ? <AdminPage /> : <BookingPage />}
    </div>
  )
}

export default App
