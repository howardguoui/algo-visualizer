import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { findArticle, getAdjacentArticles } from '../content/labuladong/curriculum'
import { MarkdownRenderer } from '../components/Content/MarkdownRenderer'
import { useLang } from '../context/LangContext'

type LoadState = 'loading' | 'ok' | 'fallback' | 'error'

export function LabuladongArticlePage() {
  const { articleId } = useParams<{ articleId: string }>()
  const { lang, t } = useLang()
  const [content, setContent] = useState('')
  const [loadState, setLoadState] = useState<LoadState>('loading')

  // NOTE: findArticle is called outside and inside the effect intentionally:
  // - Outside: for rendering breadcrumb / prev-next nav (always needed)
  // - Inside the effect: so `result` is NOT in the dep array (it's a new
  //   object reference every render, which would cause an infinite loop)
  const result = articleId ? findArticle(articleId) : null

  useEffect(() => {
    if (!articleId) return
    const r = findArticle(articleId)
    if (!r) return
    const { article } = r

    setLoadState('loading')
    setContent('')

    async function load() {
      const primary = `/labuladong/${lang}/${article.zhPath}.md`
      const fallback = `/labuladong/zh/${article.zhPath}.md`

      try {
        const res = await fetch(primary)
        if (res.ok) {
          setContent(await res.text())
          setLoadState('ok')
          return
        }
      } catch { /* fall through */ }

      // English not available — try Chinese fallback
      if (lang === 'en') {
        try {
          const res = await fetch(fallback)
          if (res.ok) {
            setContent(await res.text())
            setLoadState('fallback')
            return
          }
        } catch { /* fall through */ }
      }

      setLoadState('error')
    }

    load()
  }, [articleId, lang])

  if (!articleId) return <Navigate to="/labuladong/article/lb-home" />

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
        <span className="text-5xl">🔍</span>
        <p>{t('Article not found', '未找到该文章')}</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300">{t('Back to home', '返回首页')}</Link>
      </div>
    )
  }

  const { chapter, section, article } = result
  const { prev, next } = getAdjacentArticles(article.id)
  const articleTitle = lang === 'zh' ? article.title.zh : article.title.en
  const chapterTitle = lang === 'zh' ? chapter.title.zh : chapter.title.en
  const sectionTitle = lang === 'zh' ? section.title.zh : section.title.en

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-slate-300 no-underline">{t('Home', '首页')}</Link>
        <span>/</span>
        <Link to="/labuladong" className="hover:text-slate-300 no-underline">Labuladong</Link>
        <span>/</span>
        <span>{chapterTitle}</span>
        <span>/</span>
        <span className="text-slate-400">{sectionTitle}</span>
        <span>/</span>
        <span className="text-slate-200">{articleTitle}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-2">{articleTitle}</h1>

      {/* Fallback notice */}
      {loadState === 'fallback' && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-300 text-sm">
          {t(
            'English version not yet available — showing Chinese content.',
            '英文版本暂未提供，显示中文内容。'
          )}
        </div>
      )}

      {/* Content */}
      {loadState === 'loading' && (
        <div className="flex items-center justify-center py-20 text-slate-500 gap-3">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span>{t('Loading…', '加载中…')}</span>
        </div>
      )}

      {loadState === 'error' && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-4">
          <span className="text-4xl">📄</span>
          <p>{t('Content not available offline.', '内容暂未缓存。')}</p>
          <a
            href={`https://labuladong.online/zh/algo/${article.zhPath}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {t('Read on labuladong.online →', '在 labuladong.online 阅读 →')}
          </a>
        </div>
      )}

      {(loadState === 'ok' || loadState === 'fallback') && (
        <MarkdownRenderer content={content} />
      )}

      {/* Prev / Next navigation */}
      <div className="flex gap-4 mt-12 pt-8 border-t border-slate-800">
        {prev ? (
          <Link
            to={`/labuladong/article/${prev.id}`}
            className="flex-1 flex flex-col gap-1 p-4 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 no-underline group"
          >
            <span className="text-xs text-slate-500">← {t('Previous', '上一节')}</span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
              {lang === 'zh' ? prev.title.zh : prev.title.en}
            </span>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            to={`/labuladong/article/${next.id}`}
            className="flex-1 flex flex-col gap-1 p-4 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 no-underline group text-right"
          >
            <span className="text-xs text-slate-500">{t('Next', '下一节')} →</span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
              {lang === 'zh' ? next.title.zh : next.title.en}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
