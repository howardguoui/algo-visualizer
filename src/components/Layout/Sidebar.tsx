import { Link, useParams, useLocation } from 'react-router-dom'
import { curriculum } from '../../content/curriculum'
import { useLang } from '../../context/LangContext'
import { useState } from 'react'

const CONTENT_TYPE_BADGE: Record<string, { label: string; color: string }> = {
  'content': { label: 'Article', color: 'bg-slate-700 text-slate-300' },
  'content+visual': { label: 'Visual', color: 'bg-purple-900 text-purple-300' },
  'content+practice': { label: 'Practice', color: 'bg-green-900 text-green-300' },
  'all': { label: 'Full', color: 'bg-blue-900 text-blue-300' },
}

interface Props {
  isOpen: boolean
}

export function Sidebar({ isOpen }: Props) {
  const { topicId } = useParams<{ topicId: string }>()
  const { lang } = useLang()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleChapter = (id: string) =>
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))

  if (!isOpen) return null

  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden">
      {/* Search bar */}
      <div className="p-3 border-b border-slate-800">
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <span>Search topics...</span>
        </div>
      </div>

      {/* Chapters */}
      <nav className="flex-1 overflow-y-auto py-2">
        {curriculum.map(chapter => {
          const isChapterCollapsed = collapsed[chapter.id]
          const hasActive = chapter.topics.some(t => t.id === topicId)

          return (
            <div key={chapter.id} className="mb-1">
              {/* Chapter header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-800 ${
                  hasActive ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                <span className="text-base">{chapter.icon}</span>
                <span className="flex-1 text-left">
                  {lang === 'zh' ? chapter.title.zh : chapter.title.en}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`w-4 h-4 fill-current text-slate-500 transition-transform ${isChapterCollapsed ? '-rotate-90' : ''}`}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {/* Topics */}
              {!isChapterCollapsed && (
                <div className="pl-2">
                  {chapter.topics.map(topic => {
                    const isActive = topic.id === topicId
                    const badge = CONTENT_TYPE_BADGE[topic.contentType]

                    return (
                      <Link
                        key={topic.id}
                        to={`/learn/${topic.id}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg mx-1 mb-0.5 text-sm no-underline transition-colors group ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex-1 leading-snug">
                          {lang === 'zh' ? topic.title.zh : topic.title.en}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                          isActive ? 'bg-blue-500 text-blue-100' : badge.color
                        }`}>
                          {badge.label}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Problem sets link */}
      <div className="px-3 py-2 border-t border-slate-800">
        <Link
          to="/problems"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
            location.pathname === '/problems'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span>🎯</span>
          <span>{lang === 'zh' ? 'LeetCode 题单' : 'Problem Sets'}</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-xs text-slate-600 text-center">
        {curriculum.flatMap(c => c.topics).length} topics · Inspired by labuladong
      </div>
    </aside>
  )
}
