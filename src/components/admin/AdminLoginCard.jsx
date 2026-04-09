export function AdminLoginCard({ error, password, onPasswordChange, onSubmit }) {
  return (
    <main className="page-shell">
      <section className="hero-card admin-auth-card">
        <div className="hero-copy">
          <p className="eyebrow">Admin Login</p>
          <h1>管理画面ログイン</h1>
          <p className="lead">
            開発中の簡易認証です。`.env.development.local` に設定した管理用パスワードを入力してください。
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
              onChange={(event) => onPasswordChange(event.target.value)}
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
