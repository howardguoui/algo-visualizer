import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { systemDesignCases, type SystemDesignCase } from '../data/systemDesign/cases'

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

function CaseDetail({ c, lang }: { c: SystemDesignCase; lang: string }) {
  const [activeSection, setActiveSection] = useState<'overview' | 'components' | 'diagram' | 'decisions' | 'tips'>('overview')

  const sections = [
    { key: 'overview', label: lang === 'zh' ? '概览' : 'Overview' },
    { key: 'components', label: lang === 'zh' ? '组件' : 'Components' },
    { key: 'diagram', label: lang === 'zh' ? '架构图' : 'Diagram' },
    { key: 'decisions', label: lang === 'zh' ? '关键决策' : 'Key Decisions' },
    { key: 'tips', label: lang === 'zh' ? '面试技巧' : 'Interview Tips' },
  ] as const

  return (
    <div className="flex flex-col h-full">
      {/* Case header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-4xl">{c.icon}</span>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            {lang === 'zh' ? c.title.zh : c.title.en}
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLE[c.difficulty]}`}>
              {c.difficulty}
            </span>
            <span className="text-xs text-gray-500 dark:text-slate-400">{c.category}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {c.relatedCompanies.map(co => (
              <span key={co} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeSection === s.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto text-sm text-gray-700 dark:text-slate-300 space-y-4">

        {activeSection === 'overview' && (
          <div className="space-y-4">
            <p className="leading-relaxed">{lang === 'zh' ? c.overview.zh : c.overview.en}</p>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {lang === 'zh' ? '功能需求' : 'Functional Requirements'}
              </h3>
              <ul className="space-y-1">
                {c.requirements.functional.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {lang === 'zh' ? '非功能需求' : 'Non-functional Requirements'}
              </h3>
              <ul className="space-y-1">
                {c.requirements.nonFunctional.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'components' && (
          <div className="space-y-3">
            {c.components.map((comp, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{comp.name}</div>
                <div className="text-gray-600 dark:text-slate-400">{comp.role}</div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'diagram' && (
          <div>
            <pre className="p-4 rounded-lg bg-gray-900 dark:bg-slate-950 text-green-400 dark:text-green-300 text-xs leading-relaxed overflow-x-auto whitespace-pre font-mono border border-gray-700 dark:border-slate-700">
              {c.diagram}
            </pre>
          </div>
        )}

        {activeSection === 'decisions' && (
          <div className="space-y-4">
            {c.keyDecisions.map((d, i) => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 font-medium flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">Q{i + 1}.</span>
                  <span>{d.question}</span>
                </div>
                <div className="px-4 py-3 bg-white dark:bg-slate-800/60 text-gray-700 dark:text-slate-300 leading-relaxed">
                  {d.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-2">
            {c.interviewTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">{i + 1}.</span>
                <span className="text-gray-700 dark:text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function SystemDesignPage() {
  const { theme } = useTheme()
  const { lang } = useLang()
  const [selectedId, setSelectedId] = useState<string>(systemDesignCases[0].id)

  const selected = systemDesignCases.find(c => c.id === selectedId)!

  return (
    <div className="h-full flex flex-col">
      {/* Page header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {lang === 'zh' ? '系统设计案例库' : 'System Design Case Studies'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          {lang === 'zh'
            ? `${systemDesignCases.length} 个案例 — 覆盖 Bloomberg、Google、Meta 等大厂高频考题`
            : `${systemDesignCases.length} cases — covers Bloomberg, Google, Meta and top-company interview patterns`}
        </p>
      </div>

      {/* Two-pane layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Left: case list */}
        <div className={`w-72 shrink-0 overflow-y-auto border-r ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className="p-3 space-y-1">
            {systemDesignCases.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-3 py-3 rounded-xl transition-colors ${
                  selectedId === c.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{c.icon}</span>
                  <span className="font-medium text-sm leading-tight">
                    {lang === 'zh' ? c.title.zh : c.title.en}
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-7">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    selectedId === c.id ? 'bg-blue-500 text-blue-100' : DIFFICULTY_STYLE[c.difficulty]
                  }`}>
                    {c.difficulty}
                  </span>
                  <span className={`text-[10px] truncate ${selectedId === c.id ? 'text-blue-200' : 'text-gray-400 dark:text-slate-500'}`}>
                    {c.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: case detail */}
        <div className="flex-1 overflow-y-auto p-6">
          <CaseDetail c={selected} lang={lang} />
        </div>
      </div>
    </div>
  )
}
