import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { useFloatingPanel } from '../../context/FloatingPanelContext'
import { findTopic } from '../../content/curriculum'
import { getPracticeProblem } from '../../data/problems/practiceProblems'
import { systemDesignCases } from '../../data/systemDesign/cases'

const CHAT_STORAGE_KEY = 'algo-viz-chat-history'
const MAX_PERSISTED_MESSAGES = 30

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// ── Section name resolver ─────────────────────────────────────────────────────
function getSectionName(pathname: string, lang: string): string {
  if (pathname.includes('/system-design')) return lang === 'zh' ? '系统设计' : 'System Design'
  if (pathname.includes('/practice/')) return lang === 'zh' ? '编程练习' : 'Practice'
  if (pathname.includes('/learn/')) {
    const topicId = pathname.split('/learn/')[1]
    const found = findTopic(topicId)
    if (found) return lang === 'zh' ? found.topic.title.zh : found.topic.title.en
    return topicId
  }
  if (pathname.includes('/visualize')) return lang === 'zh' ? '算法可视化' : 'Visualizer'
  if (pathname.includes('/sql')) return lang === 'zh' ? 'SQL 沙盒' : 'SQL Sandbox'
  if (pathname.includes('/algorithm-study-note')) return lang === 'zh' ? '算法笔记' : 'Study Notes'
  if (pathname === '/problems') return lang === 'zh' ? 'LeetCode 题单' : 'Problem Sets'
  return lang === 'zh' ? '主页' : 'Home'
}

// ── Simple markdown renderer ──────────────────────────────────────────────────
export function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      result.push(
        <pre key={i} className="my-2 p-2.5 rounded-lg bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-green-300 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre border border-slate-200 dark:border-transparent">
          {lang && <span className="block text-slate-400 dark:text-gray-500 text-[10px] mb-1">{lang}</span>}
          {codeLines.join('\n')}
        </pre>
      )
      i++
      continue
    }

    // Heading
    if (line.startsWith('### ')) {
      result.push(<div key={i} className="font-bold text-sm mt-2 mb-0.5">{inlineFormat(line.slice(4))}</div>)
      i++; continue
    }
    if (line.startsWith('## ')) {
      result.push(<div key={i} className="font-bold text-sm mt-2 mb-0.5">{inlineFormat(line.slice(3))}</div>)
      i++; continue
    }
    if (line.startsWith('# ')) {
      result.push(<div key={i} className="font-bold text-base mt-2 mb-1">{inlineFormat(line.slice(2))}</div>)
      i++; continue
    }

    // List item
    if (line.startsWith('- ') || line.startsWith('* ')) {
      result.push(
        <div key={i} className="flex items-start gap-1.5 my-0.5">
          <span className="mt-1 text-blue-500 dark:text-blue-400 shrink-0 text-xs">•</span>
          <span>{inlineFormat(line.slice(2))}</span>
        </div>
      )
      i++; continue
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s(.*)/)
    if (numMatch) {
      result.push(
        <div key={i} className="flex items-start gap-1.5 my-0.5">
          <span className="text-blue-500 dark:text-blue-400 shrink-0 font-medium text-xs mt-0.5">{numMatch[1]}.</span>
          <span>{inlineFormat(numMatch[2])}</span>
        </div>
      )
      i++; continue
    }

    // Blank line
    if (line.trim() === '') {
      result.push(<div key={i} className="h-1.5" />)
      i++; continue
    }

    // Regular paragraph
    result.push(<div key={i} className="my-0.5 leading-relaxed">{inlineFormat(line)}</div>)
    i++
  }

  return result
}

export function inlineFormat(text: string): React.ReactNode {
  // Split on **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith('*') && part.endsWith('*'))
          return <em key={i}>{part.slice(1, -1)}</em>
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={i} className="px-1 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 text-[11px] font-mono">{part.slice(1, -1)}</code>
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
// ─────────────────────────────────────────────────────────────────────────────

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveMessages(msgs: Message[]) {
  const toSave = msgs.slice(-MAX_PERSISTED_MESSAGES)
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toSave))
}

function getQuickPrompts(pathname: string, lang: string): string[] {
  if (pathname.includes('/system-design')) {
    return lang === 'zh'
      ? ['解释关键权衡', '如何扩展到百万用户?', '常见面试错误', 'Bloomberg 特别考点']
      : ['Explain the key trade-offs', 'How to scale to 1M users?', 'Common interview mistakes', 'Bloomberg-specific tips']
  }
  if (pathname.includes('/practice/')) {
    return lang === 'zh'
      ? ['给我一个提示', '这道题用什么算法?', '时间复杂度是多少?', '有哪些边界情况?']
      : ['Give me a hint', 'What algorithm pattern?', 'What is the time complexity?', 'What are the edge cases?']
  }
  if (pathname.includes('/learn/')) {
    return lang === 'zh'
      ? ['举个例子', '用简单的话解释', '考我一道题', '常见面试题']
      : ['Give me an example', 'Explain in simple terms', 'Quiz me on this', 'Common interview questions']
  }
  if (pathname.includes('/sql')) {
    return lang === 'zh'
      ? ['解释 JOIN 的类型', '什么是窗口函数?', '如何优化慢查询?', 'Bloomberg SQL 考点']
      : ['Explain types of JOINs', 'What are window functions?', 'How to optimize slow queries?', 'Bloomberg SQL topics']
  }
  return lang === 'zh'
    ? ['如何准备 Google 面试?', '解释动态规划', '什么是系统设计?', '刷题的最佳策略']
    : ['How to prepare for Google?', 'Explain dynamic programming', 'What is system design?', 'Best LeetCode strategy']
}

export function GlobalAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { theme } = useTheme()
  const { lang, t } = useLang()
  const { activePanel, setActivePanel } = useFloatingPanel()
  const location = useLocation()

  const handleOpen = () => {
    setIsOpen(true)
    setActivePanel('chat')
  }
  const handleClose = () => {
    setIsOpen(false)
    setActivePanel(null)
  }

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem(CHAT_STORAGE_KEY)
  }, [])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const current = location.pathname + location.search
    if (prevPathRef.current !== null && prevPathRef.current !== current) {
      const sectionName = getSectionName(location.pathname, lang)
      setMessages(prev => {
        if (prev.length === 0) return prev
        const label = lang === 'zh'
          ? `已切换至：${sectionName}`
          : `Context refreshed: ${sectionName}`
        return [...prev, { role: 'system' as const, content: label }]
      })
    }
    prevPathRef.current = current
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search])

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isTyping) return

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsTyping(true)

    const withPlaceholder: Message[] = [...newMessages, { role: 'assistant', content: '' }]
    setMessages(withPlaceholder)

    // ── Build page context ────────────────────────────────────────────────────
    let pageContext = 'The user is navigating an algorithm learning platform.'
    let constraints = ''

    if (location.pathname.includes('/system-design')) {
      const caseIdMatch = location.search.match(/case=([^&]+)/)
      const caseId = caseIdMatch?.[1]
      const caseData = caseId ? systemDesignCases.find(c => c.id === caseId) : null
      if (caseData) {
        pageContext = `The user is studying a system design case: "${caseData.title.en}". Category: ${caseData.category}. Key components: ${caseData.components.map(c => c.name).join(', ')}.`
      } else {
        pageContext = `The user is on the System Design page, studying case studies for interviews at companies like Bloomberg, Google, Meta. Cases covered: ${systemDesignCases.map(c => c.title.en).join(', ')}.`
      }
      constraints = 'Focus on system design concepts, trade-offs, and interview preparation. Provide concrete, interview-ready answers.'
    } else if (location.pathname.includes('/learn/')) {
      const topicId = location.pathname.split('/learn/')[1]
      const found = findTopic(topicId)
      if (found) {
        const topicTitle = lang === 'zh' ? found.topic.title.zh : found.topic.title.en
        const localContent = lang === 'zh' ? found.topic.content.zh : found.topic.content.en
        const rawContent = localContent.slice(0, 1000)
        pageContext = `The user is reading a learning topic: "${topicTitle}" (id: ${found.topic.id}).\nTopic excerpt:\n"""\n${rawContent}\n"""`
        constraints = 'ONLY answer questions related to this topic. Do not go off-topic.'
      }
    } else if (location.pathname.includes('/practice/')) {
      const problemIdStr = location.pathname.split('/practice/')[1]
      const problem = getPracticeProblem(Number(problemIdStr))
      if (problem) {
        const title = lang === 'zh' ? problem.titleZh : problem.title
        pageContext = `The user is solving a coding problem: "${title}".\nDescription:\n"""\n${problem.description}\n"""`
        constraints = 'Give hints only. DO NOT provide the full code solution. Guide the user to the answer with questions.'
      }
    } else if (location.pathname.includes('/visualize')) {
      pageContext = 'The user is watching an algorithm visualizer (sorting algorithms).'
      constraints = 'Explain algorithmic steps conceptually. Reference what they are likely seeing in the visualizer.'
    } else if (location.pathname.includes('/sql')) {
      pageContext = 'The user is working in the SQL Sandbox, practicing SQL queries.'
      constraints = 'Help with SQL concepts, query writing, and optimization. Use examples with standard SQL syntax.'
    }

    const conversationHistory = messages.filter(m => m.role !== 'system').slice(-6).map(m =>
      `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content.slice(0, 300)}`
    ).join('\n')

    const prompt = `You are an expert algorithm and system design tutor helping a student prepare for interviews at Bloomberg, Google, and other top tech companies.

Context: ${pageContext}
${constraints ? `\nRules: ${constraints}` : ''}
${conversationHistory ? `\nRecent conversation:\n${conversationHistory}` : ''}

CRITICAL: Always reply in the exact same language (English or Chinese) that the student uses.
Use markdown formatting: **bold** for key terms, \`code\` for inline code, \`\`\`lang\\n...\\n\`\`\` for code blocks.

Student: ${userMessage}
Tutor:`

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'sorc/qwen3.5-claude-4.6-opus:9b',
          prompt: prompt,
          stream: true,
        }),
      })

      if (!response.ok || !response.body) throw new Error('Connection failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.trim())

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line)
            if (parsed.response) {
              setMessages(prev => {
                const updated = [...prev]
                const last = { ...updated[updated.length - 1] }
                if (last.role === 'assistant') {
                  last.content += parsed.response
                  updated[updated.length - 1] = last
                }
                return updated
              })
            }
          } catch {}
        }
      }

      setMessages(prev => {
        saveMessages(prev)
        return prev
      })
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last.role === 'assistant') {
          last.content = lang === 'zh'
            ? '连接本地AI失败。请确保Ollama正在运行，并且安装了预设模型。'
            : 'Failed to connect to local AI. Make sure Ollama is running with `OLLAMA_ORIGINS="*"`.'
        }
        return updated
      })
    } finally {
      setIsTyping(false)
    }
  }, [messages, isTyping, location.pathname, location.search, lang])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const msg = input.trim()
    setInput('')
    await sendMessage(msg)
  }

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt)
  }

  const quickPrompts = getQuickPrompts(location.pathname, lang)

  if (activePanel === 'notes') return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className={`mb-4 w-80 sm:w-96 h-[560px] flex flex-col rounded-2xl shadow-xl overflow-hidden border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>

          {/* Header */}
          <div className={`px-4 py-3 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-indigo-600 border-indigo-700'}`}>
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg">🤖</span>
              <div>
                <div className="font-semibold text-sm leading-tight">{t('AI Tutor', 'AI 导师')}</div>
                <div className="text-[10px] text-white/60 leading-tight">
                  {location.pathname.includes('/system-design')
                    ? t('System Design mode', '系统设计模式')
                    : location.pathname.includes('/practice/')
                      ? t('Hint-only mode', '提示模式')
                      : location.pathname.includes('/learn/')
                        ? t('Topic-focused mode', '主题专注模式')
                        : t('General mode', '通用模式')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title={lang === 'zh' ? '清空对话' : 'Clear chat'}
                  className="text-white/60 hover:text-white transition-colors text-xs px-1.5 py-0.5 rounded hover:bg-white/10"
                >
                  {lang === 'zh' ? '清空' : 'Clear'}
                </button>
              )}
              <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
            {messages.length === 0 ? (
              <div className={`text-center mt-6 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                <div className="text-3xl mb-3">🤖</div>
                <div className="mb-4">
                  {t('Ask me anything about algorithms, system design, or interview prep.', '问我任何关于算法、系统设计或面试准备的问题。')}
                </div>
                {/* Quick prompts on empty state */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(p)}
                      className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                        theme === 'dark'
                          ? 'border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-900/20'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                if (msg.role === 'system') {
                  return (
                    <div key={idx} className="flex items-center gap-2 my-1">
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} />
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${theme === 'dark' ? 'text-slate-500 bg-slate-800' : 'text-gray-400 bg-gray-100'}`}>
                        {msg.content}
                      </span>
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} />
                    </div>
                  )
                }
                return (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : theme === 'dark'
                          ? 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-sm rounded-bl-none'
                    }`}>
                      {msg.role === 'assistant' && msg.content
                        ? renderMarkdown(msg.content)
                        : msg.role === 'assistant' && !msg.content && isTyping
                          ? <span className="inline-flex gap-1 items-center py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          : <span className="whitespace-pre-wrap">{msg.content}</span>
                      }
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips (when conversation is active) */}
          {messages.length > 0 && !isTyping && (
            <div className={`px-3 py-2 border-t flex gap-1.5 overflow-x-auto ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-gray-50'}`}>
              {quickPrompts.slice(0, 3).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(p)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 transition-colors ${
                    theme === 'dark'
                      ? 'border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-400'
                      : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={lang === 'zh' ? '问我任何问题...' : 'Ask me anything...'}
              className={`flex-1 rounded-full px-4 py-2 text-sm outline-none border focus:ring-2 transition-shadow ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-white focus:ring-blue-500'
                  : 'bg-gray-100 border-transparent text-gray-900 focus:ring-indigo-300'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                !input.trim() || isTyping
                  ? theme === 'dark' ? 'bg-slate-700 text-slate-500' : 'bg-gray-200 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle button with unread indicator */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 relative"
        >
          <span className="text-2xl">💬</span>
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">
              {messages.filter(m => m.role === 'assistant').length}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
