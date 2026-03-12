import { Link } from 'react-router-dom'
import { curriculum } from '../content/curriculum'
import { useLang } from '../context/LangContext'

const CONTENT_TYPE_INFO = {
  'content': { icon: '📖', label: 'Article', labelZh: '文章' },
  'content+visual': { icon: '🎬', label: 'Visual', labelZh: '可视化' },
  'content+practice': { icon: '💪', label: 'Practice', labelZh: '练习' },
  'all': { icon: '⭐', label: 'Full', labelZh: '完整' },
}

export function HomePage() {
  const { lang, t } = useLang()
  const totalTopics = curriculum.flatMap(c => c.topics).length

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="text-6xl mb-4">⚡</div>
        <h1 className="text-4xl font-bold text-white mb-3">
          {t('Algorithm Visualizer', '算法可视化学习平台')}
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          {t(
            'Learn algorithms through interactive visualizations, framework thinking, and curated LeetCode problems.',
            '通过交互式可视化、框架思维和精选 LeetCode 题目学习算法。'
          )}
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <span>📚 {totalTopics} {t('Topics', '个主题')}</span>
          <span>🌍 {t('EN / 中文', '中文 / EN')}</span>
          <span>🎬 {t('Interactive Visualizations', '交互式可视化')}</span>
          <span>🎯 {t('LeetCode Links', 'LeetCode 题目')}</span>
        </div>
      </div>

      {/* Quick start */}
      <div className="flex gap-3 justify-center mb-12 flex-wrap">
        <Link
          to="/learn/algo-thinking"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors no-underline"
        >
          {t('Start Learning →', '开始学习 →')}
        </Link>
        <Link
          to="/visualize"
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition-colors no-underline"
        >
          {t('Open Visualizer', '打开可视化器')}
        </Link>
      </div>

      {/* Chapters grid */}
      <div className="grid gap-6">
        {curriculum.map(chapter => (
          <div key={chapter.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{chapter.icon}</span>
              <h2 className="text-base font-bold text-slate-200">
                {lang === 'zh' ? chapter.title.zh : chapter.title.en}
              </h2>
              <span className="text-slate-600 text-sm">({chapter.topics.length} {t('topics', '个主题')})</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {chapter.topics.map(topic => {
                const typeInfo = CONTENT_TYPE_INFO[topic.contentType]
                return (
                  <Link
                    key={topic.id}
                    to={`/learn/${topic.id}`}
                    className="flex items-start gap-3 p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-slate-700 transition-all no-underline group"
                  >
                    <span className="text-lg shrink-0">{typeInfo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-200 group-hover:text-white leading-snug">
                        {lang === 'zh' ? topic.title.zh : topic.title.en}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {lang === 'zh' ? topic.description.zh : topic.description.en}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-slate-600">{topic.timeEstimate}</span>
                        {topic.leetcode.length > 0 && (
                          <span className="text-[10px] text-slate-600">· {topic.leetcode.length} {t('problems', '题')}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
