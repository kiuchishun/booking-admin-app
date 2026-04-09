import { BookingCard } from './BookingCard.jsx'

function EmptyState({ onClearAll }) {
  return (
    <section className="panel-card stack-panel">
      <div className="section-title-row">
        <h2>予約一覧</h2>
        <button type="button" className="ghost-button danger" onClick={onClearAll}>
          全削除
        </button>
      </div>
      <div className="empty-card">表示できる予約はまだありません。</div>
    </section>
  )
}

function parseScheduleDateTime(schedule) {
  const time = schedule.time || '00:00'

  if (/^\d{4}-\d{2}-\d{2}$/.test(schedule.date)) {
    return new Date(`${schedule.date}T${time}:00`)
  }

  const match = schedule.date.match(/^(\d{1,2})\/(\d{1,2})$/)

  if (!match) {
    return null
  }

  const [, month, day] = match
  const year = new Date().getFullYear()
  const normalizedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  return new Date(`${normalizedDate}T${time}:00`)
}

function getSortValue(schedule) {
  const parsed = parseScheduleDateTime(schedule)
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : Number.MAX_SAFE_INTEGER
}

function getSubmittedSortValue(schedule) {
  const parsed = schedule.createdAt ? new Date(schedule.createdAt) : null
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : Number.MAX_SAFE_INTEGER
}

export function PeopleBoard({ people, onDeleteBooking, onClearAll }) {
  const bookings = people
    .flatMap((person) =>
      person.schedules.map((schedule) => ({
        person,
        schedule,
      })),
    )
    .sort((left, right) => {
      const scheduleDiff = getSortValue(left.schedule) - getSortValue(right.schedule)

      if (scheduleDiff !== 0) {
        return scheduleDiff
      }

      return getSubmittedSortValue(left.schedule) - getSubmittedSortValue(right.schedule)
    })

  if (bookings.length === 0) {
    return <EmptyState onClearAll={onClearAll} />
  }

  return (
    <section className="panel-card stack-panel">
      <div className="section-title-row">
        <h2>予約一覧</h2>
        <button type="button" className="ghost-button danger" onClick={onClearAll}>
          全削除
        </button>
      </div>

      <div className="people-grid">
        {bookings.map(({ person, schedule }) => (
          <BookingCard
            key={`${person.id}-${schedule.id}`}
            person={person}
            schedule={schedule}
            onDelete={onDeleteBooking}
          />
        ))}
      </div>
    </section>
  )
}
