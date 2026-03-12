import { useState } from 'react'
import type { PracticeProblem } from '../../data/problems/practiceProblems'
import { useLang } from '../../context/LangContext'

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

function renderText(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <InlineCode key={i}>{part.slice(1, -1)}</InlineCode>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function renderDescription(text: string) {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    result.push(
      <p key={i} className="text-slate-300 text-sm leading-relaxed mb-3">
        {renderText(line)}
      </p>
    )
    i++
  }
  return result
}

export function ProblemDescription({ problem }: Props) {
  const [tab, setTab] = useState<'description' | 'hints'>('description')
  const { lang } = useLang()

  const title = lang === 'zh' ? problem.titleZh : problem.title

  return (
    <div className="flex flex-col h-full">
      {/* Problem header */}
      <div className="px-5 pt-5 pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-slate-500 font-mono text-sm">#{problem.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${DIFFICULTY_STYLE[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {problem.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-lg font-bold text-white leading-snug">{title}</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 shrink-0">
        {(['description', 'hints'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'text-white border-blue-500'
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            {t === 'hints' ? '💡 Hint' : 'Description'}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {tab === 'description' && (
          <div>
            {/* Description */}
            <div className="mb-6">
              {renderDescription(problem.description)}
            </div>

            {/* Examples */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Examples</h3>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-900 rounded-xl border border-slate-700 p-4">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Example {i + 1}</div>
                    <div className="font-mono text-sm space-y-1">
                      <div><span className="text-slate-500">Input: </span><span className="text-slate-200">{ex.input}</span></div>
                      <div><span className="text-slate-500">Output: </span><span className="text-green-400">{ex.output}</span></div>
                      {ex.explanation && (
                        <div className="text-slate-400 text-xs mt-2 pt-2 border-t border-slate-700 leading-relaxed">
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Constraints</h3>
              <ul className="space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="text-slate-400 text-sm flex gap-2">
                    <span className="text-slate-600 shrink-0">•</span>
                    <code className="font-mono text-xs text-slate-300">{c}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'hints' && (
          <div>
            {problem.hint ? (
              <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span>💡</span>
                  <span className="text-yellow-400 text-sm font-semibold">Hint</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{problem.hint}</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No hints available for this problem.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
