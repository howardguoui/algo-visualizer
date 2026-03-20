import { Link } from 'react-router-dom'
import { curriculum } from '../content/curriculum'
import { studyNoteChapters } from '../content/algorithm-study-note/curriculum'
import { useLang } from '../context/LangContext'
import { SkillTreeRenderer } from '../components/SkillTree/SkillTreeRenderer'

export function HomePage() {
  const { t, lang } = useLang()
  const totalTopics = curriculum.flatMap(c => c.topics).length
  const lbArticleCount = studyNoteChapters.flatMap(ch => ch.sections.flatMap(s => s.articles)).length
  const firstLbArticle = studyNoteChapters[0]?.sections[0]?.articles[0]

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          🗺️ {t('Skill Tree / Curriculum', '技能树 / 课程表')}
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm">
          {t(
            `${lbArticleCount} study notes · ${totalTopics} topics · Interactive visualizations`,
            `${lbArticleCount} 篇学习笔记 · ${totalTopics} 个主题 · 交互式可视化`
          )}
        </p>
      </div>

      {/* ── Two-panel Overview ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">

        {/* Left: Algorithm Study Notes (primary, 3 cols) */}
        <div className="lg:col-span-3 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/40">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl shrink-0">📚</span>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {t('Algorithm Study Notes', '算法学习笔记')}
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-xs mt-0.5">
                {t(
                  `${lbArticleCount}+ articles · 7 chapters · Bilingual EN/ZH`,
                  `${lbArticleCount}+ 篇文章 · 7 个章节 · 中英双语`
                )}
              </p>
            </div>
          </div>

          {/* Chapter chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {studyNoteChapters.map(ch => (
              <Link
                key={ch.id}
                to={`/algorithm-study-note/article/${ch.sections[0]?.articles[0]?.id ?? 'lb-home'}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 rounded-full text-xs text-gray-700 dark:text-slate-300 no-underline transition-colors border border-indigo-200 dark:border-transparent font-medium"
              >
                <span>{ch.icon}</span>
                <span>{lang === 'zh' ? ch.title.zh : ch.title.en}</span>
              </Link>
            ))}
          </div>

          <div className="flex gap-2">
            {firstLbArticle && (
              <Link
                to={`/algorithm-study-note/article/${firstLbArticle.id}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-xs transition-colors no-underline"
              >
                {t('Start Reading →', '开始阅读 →')}
              </Link>
            )}
            <Link
              to="/problems"
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg font-medium text-xs transition-colors no-underline border border-indigo-200 dark:border-transparent"
            >
              {t('Problem Sets', '题单')}
            </Link>
          </div>
        </div>

        {/* Right: Quick View — curriculum overview (2 cols) */}
        <div className="lg:col-span-2 p-5 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-700/40">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl shrink-0">📦</span>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {t('Quick View', '快速查看')}
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-xs mt-0.5">
                {t(
                  `${totalTopics} topics · Visualizer included`,
                  `${totalTopics} 个主题 · 含可视化器`
                )}
              </p>
            </div>
          </div>

          {/* Chapter list */}
          <div className="space-y-1 mb-4">
            {curriculum.slice(0, 6).map(ch => (
              <Link
                key={ch.id}
                to={`/learn/${ch.topics[0]?.id}`}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-200 no-underline transition-colors"
              >
                <span>{ch.icon}</span>
                <span className="truncate">{lang === 'zh' ? ch.title.zh : ch.title.en}</span>
                <span className="ml-auto text-gray-400 dark:text-slate-600 shrink-0">{ch.topics.length}</span>
              </Link>
            ))}
            {curriculum.length > 6 && (
              <p className="px-2 text-xs text-gray-400 dark:text-slate-600 pt-1">
                +{curriculum.length - 6} {t('more chapters', '个章节')}
              </p>
            )}
          </div>

          <Link
            to={`/learn/${curriculum[0]?.topics[0]?.id}`}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-xs transition-colors no-underline"
          >
            {t('Browse Topics →', '浏览主题 →')}
          </Link>
        </div>
      </div>

      {/* ── Interactive Skill Tree ───────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 dark:text-slate-300 mb-3">
          {t('Interactive Skill Tree', '交互式技能树')}
        </h2>
        <SkillTreeRenderer />
      </div>

    </div>
  )
}
