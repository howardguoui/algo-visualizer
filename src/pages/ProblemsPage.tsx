import { useState } from 'react'
import { MarkdownRenderer } from '../components/Content/MarkdownRenderer'
import { useLang } from '../context/LangContext'
import hot100Raw from '../data/problems/hot100.md?raw'
import quickmasterRaw from '../data/problems/quickmaster.md?raw'
import beginnerRaw from '../data/problems/beginner.md?raw'

const TABS = [
  {
    key: 'hot100',
    label: { en: 'Hot 100', zh: 'Hot 100' },
    icon: '🔥',
    desc: { en: '100 must-know problems', zh: '100道必刷题目' },
    badge: 'bg-orange-900 text-orange-300',
    content: hot100Raw,
  },
  {
    key: 'quickmaster',
    label: { en: 'Quick Master', zh: '速成清单' },
    icon: '⚡',
    desc: { en: 'Core techniques, curated paths', zh: '核心技巧精选路径' },
    badge: 'bg-blue-900 text-blue-300',
    content: quickmasterRaw,
  },
  {
    key: 'beginner',
    label: { en: 'Beginner', zh: '入门系列' },
    icon: '🌱',
    desc: { en: '474 problems across 32 categories', zh: '32个分类共474道题' },
    badge: 'bg-green-900 text-green-300',
    content: beginnerRaw,
  },
] as const

type TabKey = typeof TABS[number]['key']

export function ProblemsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('hot100')
  const { lang } = useLang()

  const tab = TABS.find(t => t.key === activeTab)!

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {lang === 'zh' ? 'LeetCode 题单' : 'LeetCode Problem Sets'}
        </h1>
        <p className="text-slate-400">
          {lang === 'zh'
            ? '来自 labuladong 的精选题单 — 按算法分类，系统学习'
            : 'Curated problem sets from labuladong — organized by algorithm topic for systematic study'}
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              activeTab === t.key
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span>{t.icon}</span>
            <span>{lang === 'zh' ? t.label.zh : t.label.en}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${t.badge}`}>
              {lang === 'zh' ? t.desc.zh : t.desc.en}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <MarkdownRenderer content={tab.content} />
    </div>
  )
}
