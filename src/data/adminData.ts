import type { Person, Schedule } from '../types'

export const storageKey = 'admin-people-schedule'

export function createInitialPeople(): Person[] {
  return [
    {
      id: crypto.randomUUID(),
      name: '山田 花',
      role: '顧客',
      email: 'hana.yamada@example.com',
      phone: '090-1111-2222',
      memo: '新規相談の予約',
      schedules: [
        {
          id: crypto.randomUUID(),
          title: '初回ヒアリング',
          date: '2026-04-15',
          time: '10:00',
          createdAt: '2026-04-10T09:30:00+09:00',
          location: 'オンライン',
          note: '資料確認と事前の要望共有',
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: '佐藤 恒一',
      role: 'デザイナー',
      email: 'koichi.sato@example.com',
      phone: '080-3333-4444',
      memo: 'UIレビュー相談',
      schedules: [
        {
          id: crypto.randomUUID(),
          title: 'デザイン相談',
          date: '2026-04-18',
          time: '14:00',
          createdAt: '2026-04-09T18:15:00+09:00',
          location: '東京オフィス',
          note: '共有画面でカンプを確認',
        },
      ],
    },
  ]
}

export function formatScheduleLabel(schedule: Schedule): string {
  return `${schedule.date} ${schedule.time} / ${schedule.title}`
}
