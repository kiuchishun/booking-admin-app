import type { Person } from '../../types'

type AdminSummaryProps = {
  people: Person[]
}

export function AdminSummary({ people }: AdminSummaryProps) {
  const totalSchedules = people.reduce((total, person) => total + person.schedules.length, 0)
  const peopleWithSchedules = people.filter((person) => person.schedules.length > 0).length

  return (
    <div className="admin-summary">
      <div className="summary-card">
        <span>総予約数</span>
        <strong>{totalSchedules}</strong>
      </div>
      <div className="summary-card">
        <span>予約人数</span>
        <strong>{peopleWithSchedules}</strong>
      </div>
    </div>
  )
}
