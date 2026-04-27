export const uid = () => Math.random().toString(36).slice(2, 9)

export const ts = () =>
  new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const fmtNumber = (n) => n.toLocaleString()

export function rlColor(used, limit) {
  const pct = used / limit
  if (pct > 0.8) return '#e05050'
  if (pct > 0.5) return '#e8921a'
  return '#2ab86e'
}

export function trimTitle(str, max = 40) {
  return str.length > max ? str.slice(0, max) + '…' : str
}
