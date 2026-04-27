export default function MessageList({ msgs, msgsRef }) {
  if (msgs.length === 0) {
    return (
      <div className="msgs" ref={msgsRef}>
        <div className="empty">
          <div className="ei">⬡</div>
          <div className="eh">Production AI Chatbot Backend</div>
          <div className="ep">
            Messages flow through the full async pipeline:<br />
            <span className="chip">POST /send</span>
            <span className="chip">202 Accepted</span>
            <span className="chip">Celery Task</span>
            <span className="chip">AI API</span>
            <span className="chip">GET /status</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="msgs" ref={msgsRef}>
      {msgs.map((m) => <Message key={m.id} msg={m} />)}
    </div>
  )
}

function Message({ msg: m }) {
  const isUser = m.role === 'user'
  return (
    <div className={`mw ${isUser ? 'user' : ''}`}>
      <div className={`av ${isUser ? 'av-u' : 'av-ai'}`}>{isUser ? 'U' : '⬡'}</div>
      <div className="bc">
        <div className={`bub ${isUser ? 'ub' : ''} ${m.status === 'error' ? 'err' : ''}`}>
          {m.status === 'pending' && (
            <div className="dots"><div className="d"/><div className="d"/><div className="d"/></div>
          )}
          {m.status === 'processing' && (
            <>
              <div className="dots"><div className="d"/><div className="d"/><div className="d"/></div>
              <div className="pline"><div className="pdot"/>Processing via Celery ai_processing queue…</div>
            </>
          )}
          {(m.status === 'done' || m.status === 'error' || isUser) && m.content}
        </div>
        <div className="bmeta">
          <span>{m.time}</span>
          {m.tokens > 0 && <span className="tbadge">{m.tokens} tok</span>}
          {m.model && !isUser && m.status === 'done' && (
            <span className="model-pill">{m.model}</span>
          )}
          {!isUser && m.status === 'done' && m.taskId && (
            <span className="tpill"><span className="tpd"/>{m.taskId}</span>
          )}
        </div>
      </div>
    </div>
  )
}
