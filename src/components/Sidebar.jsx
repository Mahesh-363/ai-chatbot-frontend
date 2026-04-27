import { trimTitle, rlColor } from '../utils'

function timeAgo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

export default function Sidebar({ sessions, active, onSwitch, onCreate, onClearAll, rl }) {
  return (
    <div className="col bdr sb-col">
      <div className="sbar-top">
        <div className="logo">
          <div className="logo-sq">AI</div>
          <div>
            <div className="logo-name">ChatBot API</div>
            <div className="logo-sub">Django · DRF · Celery · Redis</div>
          </div>
        </div>
        <button className="nbtn" onClick={onCreate}>
          <span style={{ fontSize: 14 }}>+</span> New Session
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 13px 5px' }}>
        <div className="slbl" style={{ padding: 0 }}>Sessions ({sessions.length})</div>
        {sessions.length > 0 && (
          <button
            onClick={onClearAll}
            style={{ background: 'none', border: 'none', color: 'var(--t3)', fontSize: 9, cursor: 'pointer', fontFamily: 'var(--mono)', padding: '2px 4px', borderRadius: 3, transition: 'color .12s' }}
            onMouseEnter={e => e.target.style.color = 'var(--rd)'}
            onMouseLeave={e => e.target.style.color = 'var(--t3)'}
            title="Clear all sessions"
          >
            clear all
          </button>
        )}
      </div>

      <div className="slist">
        {sessions.map((s) => (
          <div key={s.id} className={`si ${s.id === active ? 'act' : ''}`} onClick={() => onSwitch(s.id)}>
            <div className="si-t">
              <div className="sdot" />
              {trimTitle(s.title, 26)}
            </div>
            <div className="si-m" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{s.msgs.length} msg{s.msgs.length !== 1 ? 's' : ''}{s.tokens > 0 ? ` · ${s.tokens.toLocaleString()} tok` : ''}</span>
              <span>{timeAgo(s.createdAt)}</span>
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <div style={{ padding: '20px 10px', textAlign: 'center', color: 'var(--t3)', fontSize: 10 }}>
            No sessions yet.<br />Click + New Session
          </div>
        )}
      </div>

      <div className="rlp">
        <div className="rlt">Rate Limits</div>
        {[['min', rl.m, 20], ['hr', rl.h, 200], ['day', rl.d, 1000]].map(([label, used, limit]) => (
          <div className="rlr" key={label}>
            <div className="rll">{label}</div>
            <div className="rltr">
              <div className="rlf" style={{ width: `${Math.min(100, (used / limit) * 100)}%`, background: rlColor(used, limit) }} />
            </div>
            <div className="rln">{used}/{limit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
