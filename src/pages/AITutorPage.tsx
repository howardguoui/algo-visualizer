import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { renderMarkdown } from '../components/AITutor/GlobalAIChat'

const STORAGE_KEY = 'algo-viz-ai-tutor-page-history'
const MAX_PERSISTED = 50
const OLLAMA_MODEL = 'sorc/qwen3.5-claude-4.6-opus:9b'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveMessages(msgs: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-MAX_PERSISTED)))
}

const QUICK_PROMPTS_EN = [
  'Explain Big O notation',
  'What is dynamic programming?',
  'How does a hash table work?',
  'Tips for system design interviews',
  'Difference between BFS and DFS',
  'How to approach a LeetCode problem?',
  'Explain recursion with an example',
  'What are the most common interview patterns?',
]

const QUICK_PROMPTS_ZH = [
  '解释时间复杂度 Big O',
  '什么是动态规划？',
  '哈希表是怎么工作的？',
  '系统设计面试技巧',
  'BFS 和 DFS 的区别',
  '怎么解 LeetCode 题？',
  '用例子解释递归',
  '最常见的面试算法模式',
]

export function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { theme } = useTheme()
  const { lang, t } = useLang()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const quickPrompts = lang === 'zh' ? QUICK_PROMPTS_ZH : QUICK_PROMPTS_EN

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isTyping) return

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsTyping(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    const conversationHistory = messages.slice(-8).map(m =>
      `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content.slice(0, 400)}`
    ).join('\n')

    const prompt = `You are an expert computer science tutor and coding interview coach. You have deep knowledge of algorithms, data structures, system design, databases, and software engineering best practices. You help students prepare for interviews at top tech companies like Google, Meta, Amazon, Bloomberg, and Microsoft.

Answer any question the student has — there are no topic restrictions. Be thorough, clear, and use concrete examples. Use markdown formatting: **bold** for key terms, \`code\` for inline code, \`\`\`lang\\n...\\n\`\`\` for code blocks, and bullet points for lists.

CRITICAL: Always reply in the exact same language (English or Chinese) that the student uses.
${conversationHistory ? `\nRecent conversation:\n${conversationHistory}` : ''}

Student: ${userMessage}
Tutor:`

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: true }),
      })

      if (!response.ok || !response.body) throw new Error('Connection failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n').filter(l => l.trim())) {
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

      setMessages(prev => { saveMessages(prev); return prev })
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last.role === 'assistant') {
          last.content = lang === 'zh'
            ? '连接本地AI失败。请确保Ollama正在运行。'
            : 'Failed to connect to local AI. Make sure Ollama is running.'
        }
        return updated
      })
    } finally {
      setIsTyping(false)
    }
  }, [messages, isTyping, lang])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const msg = input.trim()
    if (!msg) return
    setInput('')
    await sendMessage(msg)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const isDark = theme === 'dark'

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>

      {/* Page header */}
      <div className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div>
          <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('AI Tutor', 'AI 导师')}
          </h1>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {t('Ask me anything — algorithms, system design, interview prep, or general CS.', '问我任何问题 — 算法、系统设计、面试准备或计算机基础。')}
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-700' : 'border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300'}`}
          >
            {t('Clear chat', '清空对话')}
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-50'}`}>
                <svg viewBox="0 0 24 24" className={`w-8 h-8 ${isDark ? 'text-indigo-400' : 'text-indigo-600'} fill-current`}>
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                {t('Ask me anything', '问我任何问题')}
              </h2>
              <p className={`text-sm mb-8 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                {t('No topic restrictions — I can help with any CS or interview question.', '无主题限制 — 任何计算机或面试问题我都可以帮助。')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-900/20' : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className={`w-7 h-7 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${isDark ? 'bg-indigo-900/60' : 'bg-indigo-100'}`}>
                    <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-current ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : isDark
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
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick prompts strip (when conversation active) */}
      {messages.length > 0 && !isTyping && (
        <div className={`border-t px-4 py-2 flex gap-2 overflow-x-auto shrink-0 ${isDark ? 'border-slate-800 bg-slate-950' : 'border-gray-100 bg-gray-50'}`}>
          {quickPrompts.slice(0, 4).map((p, i) => (
            <button
              key={i}
              onClick={() => sendMessage(p)}
              className={`text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400' : 'border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={`border-t px-4 py-3 shrink-0 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'zh' ? '问我任何问题… (Enter 发送, Shift+Enter 换行)' : 'Ask me anything… (Enter to send, Shift+Enter for newline)'}
            className={`flex-1 resize-none rounded-xl px-4 py-2.5 text-sm outline-none border focus:ring-2 transition-shadow leading-relaxed ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-indigo-500' : 'bg-gray-100 border-transparent text-gray-900 placeholder-gray-400 focus:ring-indigo-300 focus:bg-white'}`}
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-colors shrink-0 ${!input.trim() || isTyping ? isDark ? 'bg-slate-700 text-slate-500' : 'bg-gray-200 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
