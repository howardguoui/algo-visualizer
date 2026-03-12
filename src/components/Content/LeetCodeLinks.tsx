import type { LeetCodeProblem } from '../../content/types'
import { useLang } from '../../context/LangContext'

const DIFFICULTY_STYLE = {
  Easy: 'text-green-400 bg-green-900/40 border-green-800',
  Medium: 'text-yellow-400 bg-yellow-900/40 border-yellow-800',
  Hard: 'text-red-400 bg-red-900/40 border-red-800',
}

interface Props {
  problems: LeetCodeProblem[]
}

export function LeetCodeLinks({ problems }: Props) {
  const { lang, t } = useLang()
  if (!problems.length) return null

  return (
    <div className="mt-10 pt-8 border-t border-slate-800">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span>🎯</span>
        {t('Practice Problems', '练习题目')}
      </h2>
      <div className="grid gap-2">
        {problems.map(p => (
          <a
            key={p.id}
            href={`https://leetcode.com/problems/${p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors no-underline group"
          >
            <span className="text-slate-500 font-mono text-sm w-12 shrink-0">#{p.id}</span>
            <span className="flex-1 text-slate-200 group-hover:text-white text-sm font-medium">
              {lang === 'zh' && p.titleZh ? p.titleZh : p.title}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium shrink-0 ${DIFFICULTY_STYLE[p.difficulty]}`}>
              {p.difficulty}
            </span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-slate-500 group-hover:text-slate-300 shrink-0">
              <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
