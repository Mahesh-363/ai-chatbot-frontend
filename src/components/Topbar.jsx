export default function Topbar({ title, model, onSummarise, onArchive }) {
  return (
    <div className="topbar">
      <div className="tb-l">
        <div className="tb-title">{title}</div>
        <div className="badge b-act">ACTIVE</div>
        <div className="badge b-mod">{model || 'claude-haiku-4-5'}</div>
      </div>
      <div className="tb-r">
        <button className="ibtn" title="Trigger background summarisation" onClick={onSummarise}>∑</button>
        <button className="ibtn" title="Archive session" onClick={onArchive}>⊡</button>
      </div>
    </div>
  )
}
