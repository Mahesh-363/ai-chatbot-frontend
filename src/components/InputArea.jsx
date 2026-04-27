import { useRef } from 'react'

export default function InputArea({ value, onChange, onSend, busy, statusText }) {
  const taRef = useRef(null)

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() }
  }

  const handleInput = (e) => {
    onChange(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px'
  }

  return (
    <div className="ia">
      <div className="iw">
        <textarea
          ref={taRef}
          className="mta"
          placeholder="Send a message… (Enter to send, Shift+Enter for newline)"
          value={value}
          rows={1}
          disabled={busy}
          onChange={handleInput}
          onKeyDown={handleKey}
        />
        <button className="sbtn" onClick={onSend} disabled={!value.trim() || busy}>↑</button>
      </div>
      <div className="imeta">
        <span className="imt">{statusText}</span>
        <span className="imt">{value.length}/10000</span>
      </div>
    </div>
  )
}
