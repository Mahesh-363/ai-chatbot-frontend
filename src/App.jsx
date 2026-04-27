import { useState, useRef, useEffect } from 'react'
import { globalStyles } from './styles'
import { uid, ts, sleep } from './utils'
import { callAI } from './api'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import MessageList from './components/MessageList'
import InputArea from './components/InputArea'
import AnalyticsPanel from './components/AnalyticsPanel'

const PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'anthropic'
const HAS_KEY = !!(
  import.meta.env.VITE_ANTHROPIC_API_KEY || import.meta.env.VITE_OPENAI_API_KEY
)

const STORAGE_KEY = 'chatbot_sessions'
const STORAGE_ACTIVE = 'chatbot_active'

const INIT_SESSION = () => ({ id: uid(), title: 'New Conversation', msgs: [], tokens: 0, createdAt: Date.now() })

const INIT_LOGS = [
  { meth: 'GET', path: '/health/', code: '200', id: uid() },
  { meth: 'GET', path: '/api/v1/auth/profile/', code: '200', id: uid() },
  { meth: 'GET', path: '/api/v1/chat/sessions/', code: '200', id: uid() },
]

function loadSessions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [INIT_SESSION()]
}

function loadActive(sessions) {
  try {
    const saved = localStorage.getItem(STORAGE_ACTIVE)
    if (saved && sessions.find(s => s.id === saved)) return saved
  } catch {}
  return sessions[0].id
}

export default function App() {
  const [sessions, setSessions] = useState(() => loadSessions())
  const [active, setActive] = useState(() => { const s = loadSessions(); return loadActive(s) })
  const [inp, setInp] = useState('')
  const [busy, setBusy] = useState(false)
  const [rl, setRl] = useState({ m: 0, h: 0, d: 0 })
  const [totTok, setTotTok] = useState(0)
  const [totMsg, setTotMsg] = useState(0)
  const [sysPr, setSysPr] = useState('You are a helpful, accurate, and concise AI assistant. Provide clear responses.')
  const [logs, setLogs] = useState(INIT_LOGS)
  const msgsRef = useRef(null)

  const sess = sessions.find((s) => s.id === active) || sessions[0]

  const addLog = (meth, path, code) =>
    setLogs((prev) => [{ meth, path, code, id: uid() }, ...prev].slice(0, 22))

  // ── Persist sessions + active to localStorage on every change ──────────────
  useEffect(() => {
    try {
      const toSave = sessions.map(s => ({
        ...s,
        msgs: s.msgs.map(m =>
          (m.status === 'pending' || m.status === 'processing')
            ? { ...m, content: '(interrupted — please resend)', status: 'error' }
            : m
        )
      }))
      localStorage.setItem('chatbot_sessions', JSON.stringify(toSave))
      localStorage.setItem('chatbot_active', active)
    } catch(e) { console.warn('localStorage save failed', e) }
  }, [sessions, active])

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [sess?.msgs?.length, sess?.msgs?.[sess?.msgs?.length - 1]?.status])

  // Inject global styles once
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = globalStyles
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const newSess = () => {
    const s = INIT_SESSION()
    setSessions((p) => [s, ...p])
    setActive(s.id)
    addLog('POST', '/api/v1/chat/sessions/', '201')
  }

  const switchSess = (id) => {
    setActive(id)
    addLog('GET', `/api/v1/chat/sessions/${id.slice(0, 8)}/`, '200')
  }

  const archiveSess = () => {
    addLog('DELETE', `/api/v1/chat/sessions/${active.slice(0, 8)}/`, '200')
    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== active)
      if (remaining.length === 0) {
        const s = INIT_SESSION()
        setActive(s.id)
        return [s]
      }
      setActive(remaining[0].id)
      return remaining
    })
  }

  const clearAll = () => {
    localStorage.removeItem('chatbot_sessions')
    localStorage.removeItem('chatbot_active')
    const s = INIT_SESSION()
    setSessions([s])
    setActive(s.id)
    addLog('DELETE', '/api/v1/chat/sessions/', '200')
  }

  const triggerSummarise = () => {
    addLog('POST', `/api/v1/chat/sessions/${active.slice(0, 8)}/summarise/`, '202')
  }

  const updateMsg = (sessionId, msgId, updates) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id !== sessionId
          ? s
          : { ...s, ...updates._session, msgs: s.msgs.map((m) => (m.id === msgId ? { ...m, ...updates } : m)) }
      )
    )
  }

  const send = async () => {
    const content = inp.trim()
    if (!content || busy) return
    setInp('')
    setBusy(true)

    setRl((r) => ({ m: r.m + 1, h: r.h + 1, d: r.d + 1 }))
    addLog('POST', '/api/v1/chat/messages/send/', '202')

    const uId = uid()
    const aId = uid()
    const taskId = 'tsk_' + uid()
    const currentActive = active

    // Capture current session messages for history BEFORE state update
    const currentMsgs = sess.msgs
      .filter((m) => m.status !== 'pending' && m.status !== 'processing')
      .map((m) => ({ role: m.role, content: m.content }))
    currentMsgs.push({ role: 'user', content })

    setSessions((prev) =>
      prev.map((s) =>
        s.id !== currentActive
          ? s
          : {
              ...s,
              title: s.msgs.length === 0
                ? content.slice(0, 44) + (content.length > 44 ? '…' : '')
                : s.title,
              msgs: [
                ...s.msgs,
                { id: uId, role: 'user', content, time: ts(), tokens: 0 },
                { id: aId, role: 'assistant', content: '', status: 'pending', taskId, time: ts(), tokens: 0 },
              ],
            }
      )
    )

    // Simulate Celery task dispatch delay
    await sleep(550)

    setSessions((prev) =>
      prev.map((s) =>
        s.id !== currentActive
          ? s
          : { ...s, msgs: s.msgs.map((m) => (m.id === aId ? { ...m, status: 'processing' } : m)) }
      )
    )
    addLog('GET', `/api/v1/chat/messages/${aId.slice(0, 8)}/status/`, '200')

    try {
      const result = await callAI(currentMsgs, sysPr)

      setSessions((prev) =>
        prev.map((s) =>
          s.id !== currentActive
            ? s
            : {
                ...s,
                tokens: (s.tokens || 0) + result.tokens,
                msgs: s.msgs.map((m) =>
                  m.id === aId
                    ? { ...m, content: result.content, status: 'done', tokens: result.tokens, model: result.model, time: ts() }
                    : m
                ),
              }
        )
      )
      setTotTok((t) => t + result.tokens)
      setTotMsg((n) => n + 1)
      addLog('GET', `/api/v1/chat/messages/${aId.slice(0, 8)}/status/`, '200')
    } catch (err) {
      const msg = err.message || 'Unknown error'
      setSessions((prev) =>
        prev.map((s) =>
          s.id !== currentActive
            ? s
            : {
                ...s,
                msgs: s.msgs.map((m) =>
                  m.id === aId
                    ? { ...m, content: `Error: ${msg}\n\nMake sure your API key is set in the .env file (see .env.example).`, status: 'error', time: ts() }
                    : m
                ),
              }
        )
      )
      addLog('GET', `/api/v1/chat/messages/${aId.slice(0, 8)}/status/`, '500')
    }

    setBusy(false)
  }

  const statusText = busy
    ? '⏳ Celery worker processing via ai_processing queue…'
    : `POST /api/v1/chat/messages/send/ → 202 Accepted [${PROVIDER}]`

  return (
    <div className="shell">
      <Sidebar
        sessions={sessions}
        active={active}
        onSwitch={switchSess}
        onCreate={newSess}
        onClearAll={clearAll}
        rl={rl}
      />

      <div className="col">
        <Topbar
          title={sess.title}
          model={sess.msgs.find((m) => m.model)?.model}
          onSummarise={triggerSummarise}
          onArchive={archiveSess}
        />
        <MessageList msgs={sess.msgs} msgsRef={msgsRef} />
        <InputArea
          value={inp}
          onChange={setInp}
          onSend={send}
          busy={busy}
          statusText={statusText}
        />
      </div>

      <AnalyticsPanel
        totTok={totTok}
        totMsg={totMsg}
        logs={logs}
        sysPr={sysPr}
        onSysPrChange={setSysPr}
        hasKey={HAS_KEY}
      />
    </div>
  )
}
