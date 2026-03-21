import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useTheme } from '../../context/ThemeContext'

interface Props {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: Props) {
  const { lang, toggle, t } = useLang()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 gap-3 shrink-0 z-20">
      {/* Menu toggle */}
      <button
        onClick={onMenuToggle}
        className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        title="Toggle sidebar"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline group">
        {/* Icon: gradient box with frozen-BFS binary tree */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6d28d9 100%)', boxShadow: '0 4px 14px rgba(99,102,241,0.45)' }}>
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Level 2→3 edges (dim — not yet traversed) */}
            <line x1="5"  y1="9.5" x2="2.5" y2="15.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
            <line x1="5"  y1="9.5" x2="7.5" y2="15.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
            <line x1="15" y1="9.5" x2="12.5" y2="15.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
            <line x1="15" y1="9.5" x2="17.5" y2="15.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
            {/* Root→Level2 edges (bright — traversed) */}
            <line x1="10" y1="3.5" x2="5"  y2="9.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.85"/>
            <line x1="10" y1="3.5" x2="15" y2="9.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.85"/>
            {/* Level 3 leaf nodes (dim — queued, not visited) */}
            <circle cx="2.5"  cy="15.5" r="1.5" fill="white" opacity="0.35"/>
            <circle cx="7.5"  cy="15.5" r="1.5" fill="white" opacity="0.35"/>
            <circle cx="12.5" cy="15.5" r="1.5" fill="white" opacity="0.35"/>
            <circle cx="17.5" cy="15.5" r="1.5" fill="white" opacity="0.35"/>
            {/* Level 2 nodes (visited) */}
            <circle cx="5"  cy="9.5" r="1.9" fill="white" opacity="0.88"/>
            <circle cx="15" cy="9.5" r="1.9" fill="white" opacity="0.88"/>
            {/* Root node (fully visited, brightest) */}
            <circle cx="10" cy="3.5" r="2.3" fill="white"/>
          </svg>
        </div>

        {/* Wordmark: stacked two-line futuristic treatment */}
        <div className="hidden sm:flex flex-col leading-none gap-0.5">
          <span
            className="font-black text-sm tracking-[0.08em] uppercase bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa)' }}
          >
            Algo
          </span>
          <span className="font-light text-[9px] tracking-[0.38em] uppercase text-gray-400 dark:text-slate-500">
            Visualizer
          </span>
        </div>
      </Link>

      {/* Theme toggle — beside logo */}
      <button
        onClick={toggleTheme}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-600">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-400">
            <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-2a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm0 14a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm9-8h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM4 11H2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm14.24-5.76a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 1 0 1.42 1.41l1.41-1.41a1 1 0 0 0 0-1.42zM7.76 17.66l-1.42 1.41a1 1 0 1 0 1.42 1.42l1.41-1.42a1 1 0 0 0-1.41-1.41zm11.32 1.41-1.41-1.41a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.41-1.42zM7.76 6.34 6.34 4.93a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.42-1.42z"/>
          </svg>
        )}
      </button>

      <div className="flex-1" />

      {/* Language toggle — segmented pill */}
      <div className="flex items-center rounded-lg bg-gray-100 dark:bg-slate-800 p-0.5 gap-0.5">
        <button
          onClick={() => lang !== 'zh' && toggle()}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
            lang === 'zh'
              ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
          }`}
        >
          {/* Chinese character icon */}
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current shrink-0">
            <text x="1" y="15" fontSize="14" fontFamily="serif">中</text>
          </svg>
          中文
        </button>
        <button
          onClick={() => lang !== 'en' && toggle()}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
            lang === 'en'
              ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
          }`}
        >
          {/* Globe icon */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c.55 0 1.3.4 2.05 1.6.38.61.73 1.4 1 2.4H8.95c.27-1 .62-1.79 1-2.4C10.7 4.4 11.45 4 12 4zm-3.2.76C8.17 5.5 7.6 6.6 7.2 8H4.26A8.04 8.04 0 0 1 8.8 4.76zM4.04 10h3.42c-.06.65-.1 1.32-.1 2s.04 1.35.1 2H4.04a8.02 8.02 0 0 1 0-4zm.22 6H7.2c.4 1.4.97 2.5 1.6 3.24A8.04 8.04 0 0 1 4.26 16zm4.69 0h6.1c-.27 1-.62 1.79-1 2.4C13.3 19.6 12.55 20 12 20c-.55 0-1.3-.4-2.05-1.6-.38-.61-.73-1.4-1-2.4zm6.85 0h2.94A8.04 8.04 0 0 1 14.2 19.24c.63-.74 1.2-1.84 1.6-3.24zm3.16-2h-3.42c.06-.65.1-1.32.1-2s-.04-1.35-.1-2h3.42a8.02 8.02 0 0 1 0 4zm-4.47-4c.07.64.11 1.31.11 2s-.04 1.36-.1 2H9.45A17.4 17.4 0 0 1 9.34 12c0-.69.04-1.36.1-2h5.11zm.41-2c-.4-1.4-.97-2.5-1.6-3.24A8.04 8.04 0 0 1 19.74 8H16.8z"/>
          </svg>
          EN
        </button>
      </div>

      {/* SQL Sandbox link */}
      <Link
        to="/sql-sandbox"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-gray-700 dark:text-slate-200 no-underline"
      >
        {t('SQL Sandbox', 'SQL 沙盒')}
      </Link>

      {/* Problem sets link */}
      <Link
        to="/problems"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-gray-700 dark:text-slate-200 no-underline"
      >
        🎯 {t('Problems', '题单')}
      </Link>

    </header>
  )
}
