export type BookingSlot = {
  date: string
  weekday: string
  time: string
}

export type BookingScheduleDay = {
  date: string
  weekday: string
  times: string[]
}

export type Schedule = {
  id: string
  title: string
  date: string
  time: string
  createdAt?: string
  location?: string
  note?: string
  weekday?: string
}

export type Person = {
  id: string
  name: string
  role: string
  email?: string
  phone?: string
  memo?: string
  schedules: Schedule[]
}

export type BookingFormValues = {
  name: string
  phone: string
  email: string
}
