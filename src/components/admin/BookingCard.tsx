import type { Person, Schedule } from '../../types'

type BookingCardProps = {
  person: Person
  schedule: Schedule
  onDelete: (personId: string, scheduleId: string) => void
}

function formatWeekday(weekday?: string): string {
  return weekday ? `(${weekday.replace('曜日', '')})` : ''
}

function getScheduleWeekday(schedule: Schedule): string {
  if (schedule.weekday) {
    return schedule.weekday
  }

  if (schedule.note?.endsWith('曜日')) {
    return schedule.note.replace('曜日', '')
  }

  return ''
}

function formatSubmittedAt(createdAt?: string): string {
  if (!createdAt) {
    return '未記録'
  }

  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) {
    return '未記録'
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function BookingCard({ person, schedule, onDelete }: BookingCardProps) {
  const weekday = getScheduleWeekday(schedule)
  const scheduleDateLabel = [schedule.date, formatWeekday(weekday)].filter(Boolean).join(' ')
  const submittedAtLabel = formatSubmittedAt(schedule.createdAt)
  const noteLabel = schedule.note && !schedule.note.endsWith('曜日') ? schedule.note : ''
  const supplementalLabel =
    schedule.location && schedule.location !== '予約ページ' ? schedule.location : noteLabel

  return (
    <article className="booking-list-card">
      <div className="booking-list-head">
        <div>
          <span className="person-role">{person.role}</span>
          <h3>{person.name}</h3>
        </div>
        <small className="booking-submitted-at">送信日時: {submittedAtLabel}</small>
      </div>

      <div className="booking-list-main">
        <span>予約日時</span>
        <strong>{scheduleDateLabel}</strong>
        <em>{schedule.time}</em>
      </div>

      <div className="booking-list-meta">
        <div>
          <span>電話</span>
          <strong>{person.phone || '-'}</strong>
        </div>
      </div>

      <div className="booking-list-submeta">
        <p>{person.email || 'メール未登録'}</p>
        {supplementalLabel ? <small>{supplementalLabel}</small> : null}
      </div>

      <button
        type="button"
        className="ghost-button booking-delete-button"
        onClick={() => onDelete(person.id, schedule.id)}
      >
        削除
      </button>
    </article>
  )
}
