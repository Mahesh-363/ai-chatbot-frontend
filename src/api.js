/**
 * AI API client — FREE providers only.
 *
 * Supported (all free):
 *  - groq       → https://console.groq.com  (free, very fast, llama/mixtral)
 *  - gemini     → https://aistudio.google.com/app/apikey  (free tier)
 *  - ollama     → http://localhost:11434  (100% free, runs locally)
 *
 * Set VITE_AI_PROVIDER in your .env to choose.
 */

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
const PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'groq'

export function getProvider() {
  return PROVIDER
}

export const checkKey = () => {
  if (PROVIDER === 'groq') return !!GROQ_KEY && GROQ_KEY !== 'gsk_your_key_here'
  if (PROVIDER === 'gemini') return !!GEMINI_KEY
  return false
}

export async function callAI(history, systemPrompt) {
  switch (PROVIDER) {
    case 'groq':   return callGroq(history, systemPrompt)
    case 'gemini': return callGemini(history, systemPrompt)
    case 'ollama': return callOllama(history, systemPrompt)
    default: throw new Error(`Unknown provider: ${PROVIDER}`)
  }
}

// ── Groq (FREE) ───────────────────────────────────────────────────────────────
// Sign up at https://console.groq.com — free API key, no card needed.
// Models: llama-3.3-70b-versatile, llama3-8b-8192, mixtral-8x7b-32768
async function callGroq(history, systemPrompt) {
  if (!GROQ_KEY) throw new Error('Set VITE_GROQ_API_KEY in your .env file.\nGet a free key at https://console.groq.com')

  const messages = [{ role: 'system', content: systemPrompt }, ...history]
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Groq API error ${res.status}`)
  }
  const data = await res.json()
  const choice = data.choices?.[0]
  return {
    content: choice?.message?.content || '(empty)',
    model: data.model || 'llama-3.3-70b',
    tokens: data.usage?.total_tokens || 0,
    inputTokens: data.usage?.prompt_tokens || 0,
    outputTokens: data.usage?.completion_tokens || 0,
  }
}

// ── Google Gemini (FREE tier) ─────────────────────────────────────────────────
// Get free key at https://aistudio.google.com/app/apikey — no card needed.
// Free: 15 req/min, 1M tokens/day with gemini-1.5-flash
async function callGemini(history, systemPrompt) {
  if (!GEMINI_KEY) throw new Error('Set VITE_GEMINI_API_KEY in your .env file.\nGet a free key at https://aistudio.google.com/app/apikey')

  // Convert to Gemini format
  const contents = history.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini API error ${res.status}`)
  }
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '(empty)'
  const usage = data.usageMetadata || {}
  return {
    content: text,
    model: 'gemini-1.5-flash',
    tokens: (usage.promptTokenCount || 0) + (usage.candidatesTokenCount || 0),
    inputTokens: usage.promptTokenCount || 0,
    outputTokens: usage.candidatesTokenCount || 0,
  }
}

// ── Ollama (100% FREE — runs locally) ────────────────────────────────────────
// Install: https://ollama.com/download
// Then run: ollama pull llama3
// No API key needed, no internet required after model download.
async function callOllama(history, systemPrompt) {
  const messages = [{ role: 'system', content: systemPrompt }, ...history]
  let res
  try {
    res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, messages, stream: false }),
    })
  } catch (e) {
    throw new Error(
      `Cannot connect to Ollama at ${OLLAMA_URL}.\n` +
      `Make sure Ollama is running: https://ollama.com/download\n` +
      `Then run: ollama pull ${OLLAMA_MODEL}`
    )
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Ollama error ${res.status}`)
  }
  const data = await res.json()
  const usage = data.eval_count || 0
  return {
    content: data.message?.content || '(empty)',
    model: data.model || OLLAMA_MODEL,
    tokens: (data.prompt_eval_count || 0) + usage,
    inputTokens: data.prompt_eval_count || 0,
    outputTokens: usage,
  }
}
