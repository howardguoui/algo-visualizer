import { useParams, Link, Navigate } from 'react-router-dom'
import { findTopic, getNextTopic, getPrevTopic } from '../content/curriculum'
import { MarkdownRenderer } from '../components/Content/MarkdownRenderer'
import { LeetCodeLinks } from '../components/Content/LeetCodeLinks'
import { VisualizerEmbed } from '../components/Content/VisualizerEmbed'
import { useLang } from '../context/LangContext'

const BADGE_STYLE: Record<string, string> = {
  'content': 'bg-slate-700 text-slate-300',
  'content+visual': 'bg-purple-900 text-purple-300',
  'content+practice': 'bg-green-900 text-green-300',
  'all': 'bg-blue-900 text-blue-300',
}

const BADGE_LABEL: Record<string, { en: string; zh: string }> = {
  'content': { en: 'Article', zh: '文章' },
  'content+visual': { en: 'Visual', zh: '可视化' },
  'content+practice': { en: 'Practice', zh: '练习' },
  'all': { en: 'Full', zh: '完整' },
}

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const { lang, t } = useLang()

  if (!topicId) return <Navigate to="/" />

  const result = findTopic(topicId)
  if (!result) return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
      <span className="text-5xl">🔍</span>
      <p>{t('Topic not found', '未找到该主题')}</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300">{t('Back to home', '返回首页')}</Link>
    </div>
  )

  const { chapter, topic } = result
  const nextTopic = getNextTopic(topicId)
  const prevTopic = getPrevTopic(topicId)
  const badgeLabel = BADGE_LABEL[topic.contentType]
  const content = lang === 'zh' ? topic.content.zh : topic.content.en

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-300 no-underline">{t('Home', '首页')}</Link>
        <span>/</span>
        <span>{lang === 'zh' ? chapter.title.zh : chapter.title.en}</span>
        <span>/</span>
        <span className="text-slate-300">{lang === 'zh' ? topic.title.zh : topic.title.en}</span>
      </div>

      {/* Title block */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs px-2 py-1 rounded font-medium ${BADGE_STYLE[topic.contentType]}`}>
            {lang === 'zh' ? badgeLabel.zh : badgeLabel.en}
          </span>
          <span className="text-xs text-slate-500">⏱ {topic.timeEstimate}</span>
          {topic.leetcode.length > 0 && (
            <span className="text-xs text-slate-500">🎯 {topic.leetcode.length} {t('problems', '题')}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {lang === 'zh' ? topic.title.zh : topic.title.en}
        </h1>
        <p className="text-slate-400 text-base">
          {lang === 'zh' ? topic.description.zh : topic.description.en}
        </p>
      </div>

      {/* Main content */}
      <MarkdownRenderer content={content} />

      {/* Embedded visualizer (if applicable) */}
      {topic.hasVisualizer && topic.visualizerKey && (
        <VisualizerEmbed algorithmKey={topic.visualizerKey} />
      )}

      {/* LeetCode problems */}
      <LeetCodeLinks problems={topic.leetcode} />

      {/* Prev / Next navigation */}
      <div className="flex gap-4 mt-12 pt-8 border-t border-slate-800">
        {prevTopic ? (
          <Link
            to={`/learn/${prevTopic.id}`}
            className="flex-1 flex flex-col gap-1 p-4 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 no-underline group"
          >
            <span className="text-xs text-slate-500">← {t('Previous', '上一节')}</span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
              {lang === 'zh' ? prevTopic.title.zh : prevTopic.title.en}
            </span>
          </Link>
        ) : <div className="flex-1" />}

        {nextTopic ? (
          <Link
            to={`/learn/${nextTopic.id}`}
            className="flex-1 flex flex-col gap-1 p-4 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 no-underline group text-right"
          >
            <span className="text-xs text-slate-500">{t('Next', '下一节')} →</span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
              {lang === 'zh' ? nextTopic.title.zh : nextTopic.title.en}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
