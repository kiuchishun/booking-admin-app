export function TopNavigation({ isAdmin, onNavigate }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-kicker">My App</span>
        <h1 className="brand-title">予約管理システム</h1>
      </div>

      <nav className="topnav" aria-label="main navigation">
        <button
          type="button"
          className={`nav-link${!isAdmin ? ' active' : ''}`}
          onClick={() => onNavigate('/')}
        >
          予約ページ
        </button>
        <button
          type="button"
          className={`nav-link${isAdmin ? ' active' : ''}`}
          onClick={() => onNavigate('/admin')}
        >
          管理画面
        </button>
      </nav>
    </header>
  )
}
