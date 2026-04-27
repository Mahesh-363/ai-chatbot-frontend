import { getProvider } from '../api'

const PROVIDER_INFO = {
  groq:   { label: 'Groq',          color: '#f55036', model: 'llama-3.3-70b',    note: 'Free · console.groq.com' },
  gemini: { label: 'Google Gemini', color: '#4285f4', model: 'gemini-1.5-flash', note: 'Free · aistudio.google.com' },
  ollama: { label: 'Ollama Local',  color: '#2ab86e', model: 'llama3',           note: 'Free · localhost' },
}

export default function AnalyticsPanel({ totTok, totMsg, logs, sysPr, onSysPrChange, hasKey }) {
  const provider = getProvider()
  const info = PROVIDER_INFO[provider] || PROVIDER_INFO.groq

  return (
    <div className="col bdl ap an-col">
      {/* Provider badge */}
      <div className="asec">
        <div className="ah">AI Provider</div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--bd2)', borderRadius: 7, padding: '9px 11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: info.color, boxShadow: `0 0 6px ${info.color}` }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t)' }}>{info.label}</span>
            <span style={{ fontSize: 8.5, background: 'var(--grg)', color: 'var(--gr)', border: '1px solid rgba(42,184,110,0.25)', padding: '1px 6px', borderRadius: 3 }}>FREE</span>
          </div>
          <div style={{ fontSize: 9.5, color: 'var(--t3)' }}>{info.model}</div>
          <div style={{ fontSize: 9, color: 'var(--t3)', marginTop: 2 }}>{info.note}</div>
        </div>

        {!hasKey && provider !== 'ollama' && (
          <div style={{ marginTop: 8, background: 'rgba(224,80,80,0.08)', border: '1px solid rgba(224,80,80,0.25)', borderRadius: 6, padding: '8px 10px', fontSize: 9.5, color: '#f09090', lineHeight: 1.65 }}>
            ⚠ No API key in .env<br/>
            Set <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 4px', borderRadius: 3 }}>VITE_{provider.toUpperCase()}_API_KEY</code>
          </div>
        )}
      </div>

      <div className="asec">
        <div className="ah">System Prompt</div>
        <textarea
          className="systa"
          rows={3}
          value={sysPr}
          onChange={(e) => onSysPrChange(e.target.value)}
        />
      </div>

      <div className="asec">
        <div className="ah">Live Metrics</div>
        <div style={{ marginBottom: 9 }}>
          <div className="sl">TOTAL TOKENS</div>
          <div className="sv">{totTok.toLocaleString()}</div>
          <div className="ss">↑ this session</div>
        </div>
        <div>
          <div className="sl">MESSAGES PROCESSED</div>
          <div className="sv">{totMsg}</div>
        </div>
      </div>

      <div className="asec">
        <div className="ah">Queue Status</div>
        {[
          ['ai_processing', '4 workers'],
          ['background', '2 workers'],
          ['analytics', '1 worker'],
          ['beat', 'scheduler'],
        ].map(([q, w]) => (
          <div className="arow" key={q}>
            <div>
              <div className="arl" style={{ fontSize: 9.5 }}>{q}</div>
              <div style={{ fontSize: 8.5, color: 'var(--t3)' }}>{w}</div>
            </div>
            <div className="sb-ok">READY</div>
          </div>
        ))}
      </div>

      <div className="lga">
        <div className="ah">Request Log</div>
        {logs.map((l) => (
          <div className="le" key={l.id}>
            <span className={`lm m-${l.meth === 'POST' ? 'post' : l.meth === 'DELETE' ? 'del' : 'get'}`}>{l.meth}</span>
            <span className="lp" title={l.path}>{l.path}</span>
            <span className={l.code.startsWith('2') ? 'lc2' : l.code.startsWith('4') ? 'lc4' : 'lc5'}>{l.code}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
