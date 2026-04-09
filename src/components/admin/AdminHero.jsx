import { AdminSummary } from './AdminSummary.jsx'

export function AdminHero({ people, onLogout }) {
  return (
    <section className="hero-card admin-hero">
      <div className="hero-copy">
        <p className="eyebrow">Admin Dashboard</p>
        <h1>管理画面</h1>
        <p className="lead">
          予約済みの一覧確認と削除を行うための開発用管理画面です。
        </p>
      </div>

      <div className="admin-actions">
        <button type="button" className="ghost-button" onClick={onLogout}>
          ログアウト
        </button>
      </div>

      <AdminSummary people={people} />
    </section>
  )
}
