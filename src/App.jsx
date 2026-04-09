import { useEffect, useState } from 'react'
import './App.css'
import { TopNavigation } from './components/TopNavigation.jsx'
import { AdminPage } from './pages/AdminPage.jsx'
import { BookingPage } from './pages/BookingPage.jsx'

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  function navigate(nextPath) {
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
