import { useState } from 'react'
import { bookingSchedule } from '../data/bookingSchedule.js'
import { saveBooking } from '../lib/adminStorage.js'

function formatWeekday(weekday) {
  return `(${weekday.replace('曜日', '')})`
}

export function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState({
    date: bookingSchedule[0].date,
    weekday: bookingSchedule[0].weekday,
    time: bookingSchedule[0].times[0],
  })
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    saveBooking({
      ...formValues,
      slot: selectedSlot,
    })
    setIsSubmitted(true)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const selectedSlotLabel = `${selectedSlot.date} ${formatWeekday(selectedSlot.weekday)} ${selectedSlot.time}`

  if (isSubmitted) {
    return (
      <main className="page-shell">
        <section className="hero-card booking-card booking-complete-card">
          <div className="hero-copy">
            <p className="eyebrow">Reservation Complete</p>
            <h1>予約を受け付けました</h1>
          </div>

          <div className="selected-panel booking-complete-panel" aria-live="polite">
            <span>予約日時</span>
            <strong>{selectedSlotLabel}</strong>
            <p>内容を確認のうえ、担当よりご連絡します。</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-card booking-card">
        <div className="hero-copy">
          <p className="eyebrow">Reservation Desk</p>
          <h1>予約ページ</h1>
        </div>

        <div className="selected-panel selected-panel-wide" aria-live="polite">
          <span>選択中の日時</span>
          <strong>{selectedSlotLabel}</strong>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <p className="required-note">* は必須項目です</p>

          <div className="form-grid">
            <label className="field">
              <span>
                お名前
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </span>
              <input
                type="text"
                name="name"
                placeholder="山田 太郎"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>
                電話番号
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="090-1234-5678"
                value={formValues.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="field">
            <span>
              メールアドレス
              <span className="required-mark" aria-hidden="true">
                *
              </span>
            </span>
            <input
              type="email"
              name="email"
              placeholder="sample@example.com"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </label>

          <section className="slot-section" aria-labelledby="booking-slot-title">
            <div className="section-title-row">
              <h2 id="booking-slot-title">
                予約可能日時
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </h2>
              <span>{bookingSchedule.length}日分を表示中</span>
            </div>
            <p className="required-note">日時は必須選択です</p>
            <p className="helper-note">都合の合う予約可能日時がない場合は、お問い合わせください。</p>

            <div className="schedule-list">
              {bookingSchedule.map((day) => (
                <article className="day-card" key={`${day.date}-${day.weekday}`}>
                  <header className="day-header">
                    <div>
                      <strong>{day.date}</strong>
                      <span>{formatWeekday(day.weekday)}</span>
                    </div>
                    <em>{day.times.length}枠</em>
                  </header>

                  <div className="time-grid">
                    {day.times.map((time) => {
                      const isSelected =
                        selectedSlot.date === day.date &&
                        selectedSlot.weekday === day.weekday &&
                        selectedSlot.time === time

                      return (
                        <button
                          key={`${day.date}-${time}`}
                          type="button"
                          className={`time-button${isSelected ? ' selected' : ''}`}
                          onClick={() =>
                            setSelectedSlot({
                              date: day.date,
                              weekday: day.weekday,
                              time,
                            })
                          }
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="form-footer">
            <button type="submit" className="submit-button">
              予約を確定
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
