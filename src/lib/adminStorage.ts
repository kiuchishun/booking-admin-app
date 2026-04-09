import { createInitialPeople, storageKey } from '../data/adminData'
import type { BookingFormValues, BookingSlot, Person, Schedule } from '../types'

type SaveBookingInput = BookingFormValues & {
  slot: BookingSlot
}

export function loadPeople(): Person[] {
  const saved = window.localStorage.getItem(storageKey)

  if (!saved) {
    const initialPeople = createInitialPeople()
    savePeople(initialPeople)
    return initialPeople
  }

  try {
    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? (parsed as Person[]) : createInitialPeople()
  } catch {
    const initialPeople = createInitialPeople()
    savePeople(initialPeople)
    return initialPeople
  }
}

export function savePeople(people: Person[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(people))
}

export function saveBooking({ name, phone, email, slot }: SaveBookingInput): void {
  const people = loadPeople()
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPhone = phone.trim()
  const normalizedName = name.trim()
  const schedule: Schedule = {
    id: crypto.randomUUID(),
    title: '予約',
    date: slot.date,
    weekday: slot.weekday,
    time: slot.time,
    location: '予約ページ',
    note: `${slot.weekday}曜日`,
    createdAt: new Date().toISOString(),
  }

  const existingPerson = people.find((person) => {
    const sameEmail =
      normalizedEmail && person.email?.trim().toLowerCase() === normalizedEmail
    const samePhone = normalizedPhone && person.phone?.trim() === normalizedPhone

    return sameEmail || samePhone
  })

  if (existingPerson) {
    existingPerson.name = normalizedName || existingPerson.name
    existingPerson.email = normalizedEmail || existingPerson.email
    existingPerson.phone = normalizedPhone || existingPerson.phone
    existingPerson.schedules = [...existingPerson.schedules, schedule]
    savePeople(people)
    return
  }

  const nextPeople: Person[] = [
    {
      id: crypto.randomUUID(),
      name: normalizedName || '未入力',
      role: '予約者',
      email: normalizedEmail,
      phone: normalizedPhone,
      memo: '予約ページから予約',
      schedules: [schedule],
    },
    ...people,
  ]

  savePeople(nextPeople)
}

export function removeBooking(personId: string, scheduleId: string): Person[] {
  const nextPeople = loadPeople().map((person) => {
    if (person.id !== personId) {
      return person
    }

    return {
      ...person,
      schedules: person.schedules.filter((schedule) => schedule.id !== scheduleId),
    }
  })

  savePeople(nextPeople)
  return nextPeople
}

export function clearAllBookings(): Person[] {
  const nextPeople = loadPeople().map((person) => ({
    ...person,
    schedules: [],
  }))

  savePeople(nextPeople)
  return nextPeople
}
