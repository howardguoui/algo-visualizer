import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const PROBLEM_SETS = [
  {
    id: 'ps-binary-tree',
    title: { en: 'Binary Tree Problem Set', zh: '二叉树题单' },
    description: { en: 'All binary tree problems from the curriculum', zh: '课程中所有二叉树题目' },
    icon: '🌲',
    href: 'https://labuladong.online/algo/problem-set/binary-tree1/',
  },
  {
    id: 'ps-dp',
    title: { en: 'Dynamic Programming Problem Set', zh: '动态规划题单' },
    description: { en: 'Comprehensive DP practice problems', zh: '完整的动态规划练习题' },
    icon: '💡',
    href: 'https://labuladong.online/algo/problem-set/dp-1/',
  },
  {
    id: 'ps-graph',
    title: { en: 'Graph Algorithms Problem Set', zh: '图算法题单' },
    description: { en: 'Graph traversal, shortest paths, and more', zh: '图遍历、最短路径等图算法题目' },
    icon: '🗺️',
    href: 'https://labuladong.online/algo/problem-set/graph/',
  },
  {
    id: 'ps-backtrack',
    title: { en: 'Backtracking Problem Set', zh: '回溯算法题单' },
    description: { en: 'Permutations, combinations, subsets, and more', zh: '排列、组合、子集等回溯题目' },
    icon: '🔄',
    href: 'https://labuladong.online/algo/problem-set/backtrack/',
  },
  {
    id: 'ps-sliding-window',
    title: { en: 'Sliding Window / Two Pointers', zh: '滑动窗口 / 双指针题单' },
    description: { en: 'Array and string pattern problems', zh: '数组和字符串的滑窗与双指针题目' },
    icon: '🪟',
    href: 'https://labuladong.online/algo/problem-set/sliding-window/',
  },
  {
    id: 'ps-binary-search',
    title: { en: 'Binary Search Problem Set', zh: '二分搜索题单' },
    description: { en: 'Binary search applications and variants', zh: '二分搜索应用与变体题目' },
    icon: '🎯',
    href: 'https://labuladong.online/algo/problem-set/binary-search/',
  },
]

export function LabuladongProblemSetPage() {
  const { lang, t } = useLang()

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-300 no-underline">{t('Home', '首页')}</Link>
        <span>/</span>
        <Link to="/labuladong" className="hover:text-slate-300 no-underline">Labuladong</Link>
        <span>/</span>
        <span className="text-slate-200">{t('Problem Sets', '题单')}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🎯</span>
          <h1 className="text-3xl font-bold text-white">{t('Problem Sets', '题单')}</h1>
        </div>
        <p className="text-slate-400 leading-7">
          {t(
            'Curated problem sets organized by topic. Each set reinforces the frameworks learned in the curriculum.',
            '按主题整理的精选题单，每个题单强化课程中学习的算法框架。'
          )}
        </p>
      </div>

      {/* Problem sets grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {PROBLEM_SETS.map(ps => (
          <a
            key={ps.id}
            href={ps.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-slate-700 transition-all no-underline group"
          >
            <span className="text-3xl shrink-0">{ps.icon}</span>
            <div>
              <div className="font-semibold text-slate-200 group-hover:text-white mb-1">
                {lang === 'zh' ? ps.title.zh : ps.title.en}
              </div>
              <div className="text-sm text-slate-500">
                {lang === 'zh' ? ps.description.zh : ps.description.en}
              </div>
              <div className="mt-2 text-xs text-blue-500 group-hover:text-blue-400">
                {t('Open on labuladong.online →', '在 labuladong.online 打开 →')}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-500">
        💡 {t(
          'Problem sets open on labuladong.online. Some may require a membership.',
          '题单在 labuladong.online 上打开，部分内容可能需要会员权限。'
        )}
      </div>
    </div>
  )
}
