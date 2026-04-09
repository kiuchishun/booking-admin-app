import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { AdminHero } from '../components/admin/AdminHero'
import { AdminLoginCard } from '../components/admin/AdminLoginCard'
import { PeopleBoard } from '../components/admin/PeopleBoard'
import { clearAllBookings, loadPeople, removeBooking } from '../lib/adminStorage'
import type { Person } from '../types'

const ADMIN_AUTH_STORAGE_KEY = 'admin-authenticated'
const DEV_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

export function AdminPage() {
  const [people, setPeople] = useState<Person[]>(() => loadPeople())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true'
  })

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined
    }

    const syncPeople = () => setPeople(loadPeople())

    window.addEventListener('storage', syncPeople)
    window.addEventListener('focus', syncPeople)

    return () => {
      window.removeEventListener('storage', syncPeople)
      window.removeEventListener('focus', syncPeople)
    }
  }, [isAuthenticated])

  function handleDeleteBooking(personId: string, scheduleId: string) {
    setPeople(removeBooking(personId, scheduleId))
  }

  function handleClearAll() {
    setPeople(clearAllBookings())
  }

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!DEV_ADMIN_PASSWORD) {
      setError(
        '開発用パスワードが設定されていません。.env.development.local を確認してください。',
      )
      return
    }

    if (password !== DEV_ADMIN_PASSWORD) {
      setError('パスワードが違います。')
      return
    }

    window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true')
    setIsAuthenticated(true)
    setPassword('')
    setError('')
    setPeople(loadPeople())
  }

  function handlePasswordChange(nextValue: string) {
    setPassword(nextValue)
    if (error) {
      setError('')
    }
  }

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
    setPassword('')
    setError('')
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginCard
        error={error}
        password={password}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleUnlock}
      />
    )
  }

  return (
    <main className="page-shell">
      <AdminHero people={people} onLogout={handleLogout} />
      <PeopleBoard
        people={people}
        onDeleteBooking={handleDeleteBooking}
        onClearAll={handleClearAll}
      />
    </main>
  )
}
