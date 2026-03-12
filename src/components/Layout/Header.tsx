import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

interface Props {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: Props) {
  const { lang, toggle, t } = useLang()

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-4 shrink-0 z-20">
      {/* Menu toggle */}
      <button
        onClick={onMenuToggle}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
        <span className="font-bold text-white text-sm hidden sm:block">
          AlgoVisualizer
        </span>
      </Link>

      <div className="flex-1" />

      {/* Language toggle */}
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm font-medium"
      >
        <span className="text-base leading-none">{lang === 'en' ? '🇨🇳' : '🇺🇸'}</span>
        <span className="text-slate-300">{lang === 'en' ? '中文' : 'English'}</span>
      </button>

      {/* Problem sets link */}
      <Link
        to="/problems"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm font-medium text-slate-200 no-underline"
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
