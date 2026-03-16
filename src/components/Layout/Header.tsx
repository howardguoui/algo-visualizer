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
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 gap-4 shrink-0 z-20">
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
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-sm font-bold text-white">
          ⚡
        </div>
        <span className="font-bold text-gray-900 dark:text-white text-sm hidden sm:block">
          AlgoVisualizer
        </span>
      </Link>

      <div className="flex-1" />

      {/* Language toggle */}
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
      >
        <span className="text-base leading-none">{lang === 'en' ? '🇨🇳' : '🇺🇸'}</span>
        <span className="text-gray-700 dark:text-slate-300">{lang === 'en' ? '中文' : 'English'}</span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        {theme === 'light' ? (
          /* Moon icon — click to go dark */
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-600 dark:fill-slate-400">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          /* Sun icon — click to go light */
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-600 dark:fill-slate-400">
            <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-2a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm0 14a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm9-8h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM4 11H2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm14.24-5.76a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 1 0 1.42 1.41l1.41-1.41a1 1 0 0 0 0-1.42zM7.76 17.66l-1.42 1.41a1 1 0 1 0 1.42 1.42l1.41-1.42a1 1 0 0 0-1.41-1.41zm11.32 1.41-1.41-1.41a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.41-1.42zM7.76 6.34 6.34 4.93a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.42-1.42z"/>
          </svg>
        )}
      </button>

      {/* Problem sets link */}
      <Link
        to="/problems"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-gray-700 dark:text-slate-200 no-underline"
      >
        🎯 {t('Problems', '题单')}
      </Link>

      {/* Standalone visualizer link */}
      <Link
        to="/visualize"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium text-white no-underline"
      >
        {t('Visualizer', '算法可视化')}
      </Link>
    </header>
  )
}
