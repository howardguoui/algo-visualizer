import { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { labuladongChapters } from '../../content/labuladong/curriculum'
import { useLang } from '../../context/LangContext'

interface Props {
  isOpen: boolean
}

export function LabuladongSidebar({ isOpen }: Props) {
  const { articleId } = useParams<{ articleId: string }>()
  const location = useLocation()
  const { lang } = useLang()

  // Track which chapters are collapsed; sections start expanded
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({})
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const toggleChapter = (id: string) =>
    setCollapsedChapters(prev => ({ ...prev, [id]: !prev[id] }))

  const toggleSection = (id: string) =>
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }))

  if (!isOpen) return null

  const isProblemSet = location.pathname === '/labuladong/problem-set'

  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-800">
        <Link
          to="/labuladong"
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-800 no-underline group"
        >
          <span className="text-lg">📚</span>
          <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
            {lang === 'zh' ? 'Labuladong 课程' : 'Labuladong Curriculum'}
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {labuladongChapters.map(chapter => {
          const isChapterCollapsed = collapsedChapters[chapter.id]

          // Determine if this chapter has the active article
          const hasActive = chapter.sections.some(s =>
            s.articles.some(a => a.id === articleId)
          )

          return (
            <div key={chapter.id} className="mb-0.5">
              {/* Chapter header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-slate-800 ${
                  hasActive ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                <span className="text-sm">{chapter.icon}</span>
                <span className="flex-1 text-left">
                  {chapter.label} · {lang === 'zh' ? chapter.title.zh : chapter.title.en}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`w-3.5 h-3.5 fill-current transition-transform shrink-0 ${isChapterCollapsed ? '-rotate-90' : ''}`}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {/* Sections */}
              {!isChapterCollapsed && (
                <div className="pl-2">
                  {chapter.sections.map(section => {
                    const isSectionCollapsed = collapsedSections[section.id]
                    const hasSectionActive = section.articles.some(a => a.id === articleId)

                    return (
                      <div key={section.id} className="mb-0.5">
                        {/* Section header */}
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-slate-800 rounded-lg mx-1 ${
                            hasSectionActive ? 'text-blue-300' : 'text-slate-400'
                          }`}
                        >
                          <span className="flex-1 text-left">
                            {lang === 'zh' ? section.title.zh : section.title.en}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            className={`w-3 h-3 fill-current text-slate-600 transition-transform shrink-0 ${isSectionCollapsed ? '-rotate-90' : ''}`}
                          >
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </button>

                        {/* Articles */}
                        {!isSectionCollapsed && (
                          <div className="pl-2">
                            {section.articles.map(article => {
                              const isActive = article.id === articleId
                              return (
                                <Link
                                  key={article.id}
                                  to={`/labuladong/article/${article.id}`}
                                  className={`flex items-center px-3 py-1.5 rounded-lg mx-1 mb-0.5 text-xs no-underline transition-colors ${
                                    isActive
                                      ? 'bg-blue-600 text-white'
                                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                  }`}
                                >
                                  <span className="leading-snug">
                                    {lang === 'zh' ? article.title.zh : article.title.en}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Problem Sets link at bottom */}
      <div className="px-3 py-2 border-t border-slate-800">
        <Link
          to="/labuladong/problem-set"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
            isProblemSet
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span>🎯</span>
          <span>{lang === 'zh' ? '题单' : 'Problem Sets'}</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-xs text-slate-600 text-center">
        <Link to="/" className="hover:text-slate-400 no-underline">
          ← {lang === 'zh' ? '返回主课程' : 'Back to Main'}
        </Link>
      </div>
    </aside>
  )
}
