import { useCallback, useMemo, useState, useEffect } from 'react'
import {
  ReactFlow, Controls, Background, MiniMap,
  useNodesState, useEdgesState, Position, Handle,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { initialNodes, initialEdges } from '../../data/curriculumGraph'

const STORAGE_KEY = 'algoviz-progress-v1'
const TOTAL = initialNodes.filter(n => !n.data.locked).length

// ── Progress hook ────────────────────────────────────────────────────────────

function useTopicProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return new Set(raw ? JSON.parse(raw) : [])
    } catch {
      return new Set()
    }
  })

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const markDone = useCallback((id: string) => {
    setCompleted(prev => new Set([...prev, id]))
  }, [])

  const toggle = useCallback((id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setCompleted(new Set())
  }, [])

  return { completed, markDone, toggle, reset }
}

// ── Custom Node ──────────────────────────────────────────────────────────────

interface NodeData {
  label: string
  color?: string
  locked?: boolean
  path?: string
  completed?: boolean
  onToggle?: (id: string) => void
  nodeId?: string
}

const CheckIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 16 16"
    style={{ width: 11, height: 11, fill: color, flexShrink: 0, marginLeft: 'auto' }}
  >
    <path d="M13.485 1.431a1.473 1.473 0 0 0-2.084 0l-7.02 7.02-2.206-2.21a1.473 1.473 0 0 0-2.084 2.084l3.25 3.25a1.473 1.473 0 0 0 2.084 0l8.06-8.06a1.473 1.473 0 0 0 0-2.084z"/>
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 10, height: 10, fill: '#4b5563', flexShrink: 0, marginLeft: 'auto' }}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
)

function CustomNode({ data, id }: { data: NodeData; id: string }) {
  const [hovered, setHovered] = useState(false)
  const color   = data.color ?? '#60a5fa'
  const locked    = !!data.locked
  const done      = !!data.completed

  // Derived visual state
  const borderColor = locked
    ? '#1e293b'
    : done
      ? color + 'd0'
      : hovered ? color + 'b0' : color + '38'

  const bg = locked
    ? 'linear-gradient(135deg, #0a1120 0%, #131f30 100%)'
    : done
      ? `linear-gradient(135deg, ${color}18 0%, #1e293b 100%)`
      : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'

  const shadow = locked
    ? 'none'
    : done
      ? `0 0 14px ${color}40, 0 4px 12px rgba(0,0,0,0.5)`
      : hovered
        ? `0 0 20px ${color}45, 0 4px 16px rgba(0,0,0,0.55)`
        : `0 0 6px ${color}18, 0 2px 8px rgba(0,0,0,0.35)`

  const textColor = locked ? '#4b5563' : done ? '#fff' : hovered ? '#fff' : '#cbd5e1'

  return (
    <div
      style={{ width: 152 }}
      onMouseEnter={() => { if (!locked) setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle type="target" position={Position.Top}
        style={{ opacity: 0, width: 4, height: 4, minWidth: 0, minHeight: 0 }} />

      <div style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: locked ? 'default' : 'pointer',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        boxShadow: shadow,
      }}>
        {/* Top accent stripe — solid when done, gradient when idle */}
        <div style={{
          height: 2,
          background: locked
            ? '#1e293b'
            : done
              ? color
              : `linear-gradient(90deg, ${color}cc 0%, ${color}00 100%)`,
        }} />

        {/* Content */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px' }}>
          {/* Category dot — ring when done */}
          <div style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            backgroundColor: locked ? '#374151' : done ? color : color,
            boxShadow: locked ? 'none' : done ? `0 0 10px ${color}` : `0 0 7px ${color}90`,
            outline: done ? `2px solid ${color}50` : 'none',
            outlineOffset: 1,
          }} />

          {/* Label */}
          <span style={{
            fontSize: 11, fontWeight: 600, lineHeight: 1.3,
            color: textColor, transition: 'color 0.15s', flex: 1,
          }}>
            {data.label}
          </span>

          {locked && <LockIcon />}
          {done && !locked && <CheckIcon color={color} />}
        </div>

        {/* Manual toggle button — visible on hover only */}
        {!locked && hovered && (
          <div
            style={{
              borderTop: `1px solid ${color}22`,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: done ? `${color}12` : 'transparent',
            }}
            onClick={e => {
              e.stopPropagation()
              data.onToggle?.(id)
            }}
          >
            <div style={{
              width: 12, height: 12, borderRadius: 3,
              border: `1.5px solid ${done ? color : color + '80'}`,
              background: done ? color : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.15s',
            }}>
              {done && (
                <svg viewBox="0 0 10 10" style={{ width: 8, height: 8, fill: '#0f172a' }}>
                  <path d="M8.5 1.5L4 7 1.5 4.5"/>
                  <path d="M8.5 1.5L4 7.5 1.5 4.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 9.5, color: done ? color : color + '99', fontWeight: 500 }}>
              {done ? 'Mark as unread' : 'Mark as read'}
            </span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom}
        style={{ opacity: 0, width: 4, height: 4, minWidth: 0, minHeight: 0 }} />
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

// ── Legend ───────────────────────────────────────────────────────────────────

const LEGEND = [
  { label: 'Intro',         labelZh: '入门',     color: '#60a5fa' },
  { label: 'Arrays',        labelZh: '数组',     color: '#34d399' },
  { label: 'Linked List',   labelZh: '链表',     color: '#a78bfa' },
  { label: 'Stack / Queue', labelZh: '栈与队列', color: '#fbbf24' },
  { label: 'Hash Table',    labelZh: '哈希表',   color: '#f472b6' },
  { label: 'Sorting',       labelZh: '排序',     color: '#6ee7b7' },
  { label: 'Trees',         labelZh: '树',       color: '#4ade80' },
  { label: 'Heaps',         labelZh: '堆',       color: '#fb923c' },
  { label: 'Graphs',        labelZh: '图',       color: '#22d3ee' },
  { label: 'Backtracking',  labelZh: '回溯',     color: '#818cf8' },
  { label: 'Dynamic Prog.', labelZh: '动态规划', color: '#e879f9' },
  { label: 'SQL',           labelZh: 'SQL',      color: '#38bdf8' },
]

// ── Renderer ──────────────────────────────────────────────────────────────────

export function SkillTreeRenderer() {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const { completed, markDone, toggle, reset } = useTopicProgress()

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  // Two-step reset: first click asks, second confirms
  const [confirmReset, setConfirmReset] = useState(false)
  useEffect(() => {
    if (!confirmReset) return
    const t = setTimeout(() => setConfirmReset(false), 3000)
    return () => clearTimeout(t)
  }, [confirmReset])

  const handleReset = () => {
    if (confirmReset) {
      reset()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
    }
  }

  const localizedNodes = useMemo(() =>
    nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        label: lang === 'zh' ? node.data.labelZh : node.data.labelEn,
        completed: completed.has(node.id),
        onToggle: toggle,
        nodeId: node.id,
      },
    })),
  [nodes, lang, completed, toggle])

  const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    if (!node.data.locked && node.data.path) {
      markDone(node.id)   // auto-mark read on navigation
      navigate(node.data.path)
    }
  }, [navigate, markDone])

  const doneCount = completed.size
  const pct = Math.round((doneCount / TOTAL) * 100)

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-800" style={{ background: '#050d1a' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-0 border-b border-slate-800/60">

        {/* Top row: title + controls */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-xs font-bold text-slate-200 tracking-wide uppercase">
              {t('Skill Dependency Map', '技能依赖图谱')}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t(
                'Click a node to open the topic · Hover to toggle read status',
                '点击节点打开主题 · 悬停可标记/取消已读',
              )}
            </p>
          </div>

          {/* Progress + reset */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Progress counter */}
            <div className="text-right">
              <span className="text-sm font-bold text-white tabular-nums">{doneCount}</span>
              <span className="text-xs text-slate-500"> / {TOTAL}</span>
              <span className="text-[10px] text-slate-500 ml-1">
                {t('read', '已读')}
              </span>
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              title={confirmReset ? t('Click again to confirm reset', '再次点击确认重置') : t('Reset progress', '重置进度')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{
                background: confirmReset ? '#7f1d1d' : '#1e293b',
                border: `1px solid ${confirmReset ? '#ef4444' : '#334155'}`,
                color: confirmReset ? '#fca5a5' : '#94a3b8',
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: 'currentColor', flexShrink: 0 }}>
                <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              {confirmReset ? t('Sure?', '确认?') : t('Reset', '重置')}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: pct === 100
                  ? 'linear-gradient(90deg, #4ade80, #34d399)'
                  : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              }}
            />
          </div>
          <span className="text-[10px] font-medium tabular-nums"
            style={{ color: pct === 100 ? '#4ade80' : '#64748b', minWidth: 28 }}>
            {pct}%
          </span>
        </div>

        {/* Legend */}
        <div className="hidden md:grid grid-cols-6 gap-x-4 gap-y-1.5 pb-3">
          {LEGEND.map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color, boxShadow: `0 0 5px ${item.color}90` }} />
              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                {lang === 'zh' ? item.labelZh : item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Flow canvas ────────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: 720 }}>
        <ReactFlow
          nodes={localizedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          colorMode="dark"
          minZoom={0.25}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={28} size={1} />
          <Controls style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: 10, boxShadow: 'none',
          }} />
          <MiniMap
            style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10 }}
            nodeColor={(node: any) => {
              const c = node.data?.color ?? '#60a5fa'
              return completed.has(node.id) ? c : c + '55'
            }}
            maskColor="rgba(5,13,26,0.75)"
          />
        </ReactFlow>
      </div>
    </div>
  )
}
