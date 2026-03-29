import { Link, useParams, useLocation } from 'react-router-dom'
import { curriculum } from '../../content/curriculum'
import { studyNoteChapters } from '../../content/algorithm-study-note/curriculum'
import { useLang } from '../../context/LangContext'
import { useProgress } from '../../context/ProgressContext'
import { useState } from 'react'

const CONTENT_TYPE_BADGE: Record<string, { label: string; color: string }> = {
  'content': { label: 'Article', color: 'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-slate-300' },
  'content+visual': { label: 'Visual', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  'content+practice': { label: 'Practice', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  'all': { label: 'Full', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
}

interface Props {
  isOpen: boolean
}

// Default: all study note chapters start collapsed
const STUDY_NOTE_DEFAULTS: Record<string, boolean> = Object.fromEntries(
  studyNoteChapters.map(ch => [ch.id, true]),
)

export function Sidebar({ isOpen }: Props) {
  const { topicId } = useParams<{ topicId: string }>()
  const { lang } = useLang()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(STUDY_NOTE_DEFAULTS)
  const [searchQuery, setSearchQuery] = useState('')
  const { solvedProblemIds, readTopicIds } = useProgress()

  const toggle = (id: string) =>
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))

  if (!isOpen) return null

  const q = searchQuery.toLowerCase()

  // ── Search helpers ────────────────────────────────────────────────────────
  const articleMatches = (title: { en: string; zh: string }) =>
    !q || title.en.toLowerCase().includes(q) || title.zh.toLowerCase().includes(q)

  const topicMatches = (title: { en: string; zh: string }) =>
    !q || title.en.toLowerCase().includes(q) || title.zh.toLowerCase().includes(q)

  // ── Active helpers ────────────────────────────────────────────────────────
  const activeArticleId = location.pathname.startsWith('/algorithm-study-note/article/')
    ? location.pathname.replace('/algorithm-study-note/article/', '')
    : null

  return (
    <aside className="w-88 h-full shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col overflow-hidden">

      {/* Search bar */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm text-gray-500 dark:text-slate-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder={lang === 'zh' ? '搜索主题...' : 'Search topics...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">

        {/* ── Skill Tree / Curriculum ───────────────────────────────────────── */}
        <div className="px-3 mb-1">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
              location.pathname === '/'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'zh' ? '技能树 / 课程表' : 'Skill Tree / Curriculum'}
          </Link>
        </div>

        {/* ── Problem Sets ─────────────────────────────────────────────────── */}
        <div className="px-3 mb-1">
          <Link
            to="/problems"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
              location.pathname === '/problems'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'zh' ? 'LeetCode 题单' : 'Problem Sets'}
          </Link>
        </div>

        {/* ── SQL Sandbox ───────────────────────────────────────────────────── */}
        <div className="px-3 mb-1">
          <Link
            to="/sql-sandbox"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
              location.pathname === '/sql-sandbox'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'zh' ? 'SQL 沙盒练习' : 'SQL Sandbox'}
          </Link>
        </div>

        {/* ── System Design ─────────────────────────────────────────────────── */}
        <div className="px-3 mb-1">
          <Link
            to="/system-design"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
              location.pathname === '/system-design'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{lang === 'zh' ? '系统设计' : 'System Design'}</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 font-medium">
              NEW
            </span>
          </Link>
        </div>

        {/* ── AI Tutor ──────────────────────────────────────────────────────── */}
        <div className="px-3 mb-1">
          <Link
            to="/ai-tutor"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
              location.pathname === '/ai-tutor'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{lang === 'zh' ? 'AI 导师' : 'AI Tutor'}</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-800 mx-3 my-2" />

        {/* ── Algorithm Study Note chapters ─────────────────────────────────── */}
        {studyNoteChapters.map(chapter => {
          const filteredSections = chapter.sections
            .map(sec => ({
              ...sec,
              articles: sec.articles.filter(a => articleMatches(a.title)),
            }))
            .filter(sec => !q || sec.articles.length > 0)

          if (q && filteredSections.length === 0) return null

          const isCollapsed = (collapsed[chapter.id] ?? true) && !q
          const hasActive = chapter.sections.some(sec =>
            sec.articles.some(a => a.id === activeArticleId),
          )

          return (
            <div key={chapter.id} className="mb-0.5">
              {/* Chapter header */}
              <button
                onClick={() => toggle(chapter.id)}
                className={`w-full flex items-start px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${
                  hasActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                <span className="flex-1 text-left break-words min-w-0">
                  {chapter.label ? `${chapter.label} · ` : ''}
                  {lang === 'zh' ? chapter.title.zh : chapter.title.en}
                </span>
              </button>

              {/* Sections + Articles */}
              {!isCollapsed && (
                <div className="pl-2 pb-1">
                  {filteredSections.map(section => (
                    <div key={section.id} className="mb-1">
                      {/* Section label */}
                      <div className="px-3 pt-2 pb-0.5 mx-1 text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide break-words">
                        {lang === 'zh' ? section.title.zh : section.title.en}
                      </div>
                      {/* Articles */}
                      {section.articles.map(article => {
                        const isActive = article.id === activeArticleId
                        return (
                          <Link
                            key={article.id}
                            to={`/algorithm-study-note/article/${article.id}`}
                            className={`flex items-center px-3 py-1.5 rounded-lg mx-1 mb-0.5 text-sm no-underline transition-colors ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                            }`}
                          >
                            <span className="flex-1 leading-snug">
                              {lang === 'zh' ? article.title.zh : article.title.en}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Divider before Quick View */}
        <div className="border-t border-gray-200 dark:border-slate-800 mx-3 my-2" />

        {/* ── Quick View ────────────────────────────────────────────────────── */}
        <div className="mb-1">
          <button
            onClick={() => toggle('__quickView')}
            className="w-full flex items-center px-3 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="flex-1 text-left">
              {lang === 'zh' ? '快速查看' : 'Quick View'}
            </span>
          </button>

          {!((collapsed['__quickView'] ?? false) && !q) && (
            <div className="pl-2">
              {curriculum.map(chapter => {
                const filteredTopics = chapter.topics.filter(topic => {
                  if (!q) return true
                  return topicMatches(topic.title)
                })

                if (filteredTopics.length === 0 && q) return null

                const isChapterCollapsed = (collapsed[chapter.id] ?? false) && !q
                const hasActive =
                  chapter.topics.some(t => t.id === topicId) ||
                  (location.pathname === '/' && chapter.id === 'intro')

                return (
                  <div key={chapter.id} className="mb-0.5">
                    <button
                      onClick={() => toggle(chapter.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${
                        hasActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex-1 text-left">
                        {lang === 'zh' ? chapter.title.zh : chapter.title.en}
                      </span>
                    </button>

                    {!isChapterCollapsed && (
                      <div className="pl-2">
                        {filteredTopics.map(topic => {
                          const isActive = topic.id === topicId
                          const badge = CONTENT_TYPE_BADGE[topic.contentType]

                          return (
                            <Link
                              key={topic.id}
                              to={`/learn/${topic.id}`}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg mx-1 mb-0.5 text-sm no-underline transition-colors group ${
                                isActive
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
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
            </div>
          )}
        </div>

      </nav>

      {/* Footer — progress stats */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-800 text-xs text-gray-400 dark:text-slate-600">
        <div className="flex items-center justify-between mb-1.5">
          <span>{studyNoteChapters.flatMap(ch => ch.sections.flatMap(s => s.articles)).length} notes · {curriculum.flatMap(c => c.topics).length} topics</span>
        </div>
        {(solvedProblemIds.size > 0 || readTopicIds.size > 0) && (
          <div className="flex items-center gap-3 mt-1 pt-1.5 border-t border-gray-200 dark:border-slate-800">
            {solvedProblemIds.size > 0 && (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                <span>✓</span>
                <span>{solvedProblemIds.size} solved</span>
              </span>
            )}
            {readTopicIds.size > 0 && (
              <span className="flex items-center gap-1 text-blue-500 dark:text-blue-400 font-medium">
                <span>📖</span>
                <span>{readTopicIds.size} read</span>
              </span>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
