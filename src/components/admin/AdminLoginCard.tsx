import type { ChangeEvent, FormEvent } from 'react'

type AdminLoginCardProps = {
  error: string
  password: string
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AdminLoginCard({
  error,
  password,
  onPasswordChange,
  onSubmit,
}: AdminLoginCardProps) {
  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    onPasswordChange(event.target.value)
  }

  return (
    <main className="page-shell">
      <section className="hero-card admin-auth-card">
        <div className="hero-copy">
          <p className="eyebrow">Admin Login</p>
          <h1>管理画面ログイン</h1>
          <p className="lead">
            開発中のデモ認証です。1234を入力してください。
          </p>
        </div>

        <form className="booking-form admin-auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>パスワード</span>
            <input
              type="password"
              name="password"
              placeholder="管理用パスワード"
              value={password}
              onChange={handlePasswordInput}
            />
          </label>

          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="form-footer">
            <button type="submit" className="submit-button">
              ログイン
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
