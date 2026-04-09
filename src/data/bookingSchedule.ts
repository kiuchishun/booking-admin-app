import type { BookingScheduleDay } from '../types'

export const bookingSchedule: BookingScheduleDay[] = [
  {
    date: '4/15',
    weekday: '火',
    times: ['10:00', '11:30', '13:00', '15:00', '17:30'],
  },
  {
    date: '4/16',
    weekday: '水',
    times: ['09:30', '11:00', '14:00', '16:00', '18:30'],
  },
  {
    date: '4/17',
    weekday: '木',
    times: ['10:30', '12:00', '14:30', '16:30', '19:00'],
  },
  {
    date: '4/18',
    weekday: '金',
    times: ['09:00', '10:30', '13:30', '15:30', '18:00'],
  },
]
