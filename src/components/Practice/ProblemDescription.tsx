import { useState } from 'react'
import type { PracticeProblem } from '../../data/problems/practiceProblems'
import { useLang } from '../../context/LangContext'
import { useTheme } from '../../context/ThemeContext'

const DIFFICULTY_STYLE = {
  Easy: 'text-green-400 bg-green-900/30 border-green-800',
  Medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  Hard: 'text-red-400 bg-red-900/30 border-red-800',
}

interface Props {
  problem: PracticeProblem
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="bg-slate-700 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  )
}

function renderText(text: string, theme: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <InlineCode key={i}>{part.slice(1, -1)}</InlineCode>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function renderDescription(text: string, theme: string) {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    result.push(
      <p key={i} className={`text-sm leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
        {renderText(line, theme)}
      </p>
    )
    i++
  }
  return result
}

export function ProblemDescription({ problem }: Props) {
  const [tab, setTab] = useState<'description' | 'hints'>('description')
  const { lang, t } = useLang()
  const { theme } = useTheme()

  const title = lang === 'zh' ? problem.titleZh : problem.title

  return (
    <div className="flex flex-col h-full">
      {/* Problem header */}
      <div className={`px-5 pt-5 pb-3 border-b shrink-0 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-slate-500 font-mono text-sm">#{problem.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${DIFFICULTY_STYLE[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {problem.tags.map(tag => (
            <span key={tag} className={`px-2 py-0.5 rounded text-xs px-2.5 py-1 ${theme === 'dark' ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className={`text-lg font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
      </div>

      {/* Tabs */}
      <div className={`flex border-b shrink-0 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        {(['description', 'hints'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? `border-blue-500 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`
                : `border-transparent ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            {t === 'hints' ? '💡 Hint' : 'Description'}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className={`flex-1 overflow-y-auto px-5 py-4 custom-scrollbar ${theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-white text-gray-700'}`}>
        {tab === 'description' && (
          <div>
            {/* Description */}
            <div className="mb-6">
              {renderDescription(problem.description, theme)}
            </div>

            {/* Examples */}
            <div className="mb-6">
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{t('Examples', '示例')}</h3>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div key={i} className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-gray-50 border border-gray-200 shadow-sm'}`}>
                    <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('Example', '示例')} {i + 1}:</h3>
                    <div className={`p-4 rounded-xl font-mono text-sm space-y-2 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-gray-50 border border-gray-200 text-gray-700 shadow-sm'}`}>
                      <div><strong className={theme === 'dark' ? 'text-slate-400' : 'text-gray-700'}>{t('Input:', '输入：')}</strong> <span className={theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}>{ex.input}</span></div>
                      <div><strong className={theme === 'dark' ? 'text-slate-400' : 'text-gray-700'}>{t('Output:', '输出：')}</strong> <span className={theme === 'dark' ? 'text-green-300' : 'text-green-700'}>{ex.output}</span></div>
                      {ex.explanation && (
                        <div className={`mt-2 pt-2 border-t ${theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-gray-200 text-gray-500'}`}>
                          <strong>{t('Explanation:', '解释：')}</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{t('Constraints', '约束')}</h3>
              <ul className="space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-700'}`}>
                    <span className={theme === 'dark' ? 'text-slate-600 shrink-0' : 'text-gray-400 shrink-0'}>•</span>
                    <code className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>{c}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'hints' && (
          <div>
            {problem.hint ? (
              <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800/40' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span>💡</span>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>{t('Hint', '提示')}</span>
                </div>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>{problem.hint}</p>
              </div>
            ) : (
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>{t('No hints available for this problem.', '此问题暂无提示。')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
