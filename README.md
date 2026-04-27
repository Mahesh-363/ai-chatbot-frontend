# 🤖 AI Chatbot UI — 100% Free Providers

No paid API needed. Choose from 3 free options.

---

## ⚡ Quick Start

```bash
npm install
cp .env.example .env    # then edit .env with your free key
npm run dev
```
Open http://localhost:5173

---

## 🆓 Free AI Provider Options

### Option 1: Groq ← RECOMMENDED (fastest)
1. Go to https://console.groq.com
2. Sign up free (no credit card)
3. API Keys → Create Key
4. In `.env`:
```env
VITE_AI_PROVIDER=groq
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxx
```

### Option 2: Google Gemini (free tier)
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API key" (free, no card)
3. In `.env`:
```env
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=AIzaxxxxxxxxxx
```

### Option 3: Ollama (fully local, zero cost, no internet after setup)
1. Download Ollama: https://ollama.com/download
2. Run: `ollama pull llama3`
3. In `.env`:
```env
VITE_AI_PROVIDER=ollama
```
No API key needed!

---

## 🚀 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
# Add your VITE_GROQ_API_KEY env var when prompted
vercel --prod
```

Or: push to GitHub → import at vercel.com → add env vars → deploy.

> Note: Ollama (local) won't work on Vercel — use Groq or Gemini for deployed version.

---

## Project Structure
```
src/
├── App.jsx              # Root + state
├── api.js               # Groq / Gemini / Ollama client
├── utils.js             # Helpers
├── styles.js            # All CSS
├── index.css            # Base reset
├── main.jsx             # Entry
└── components/
    ├── Sidebar.jsx
    ├── Topbar.jsx
    ├── MessageList.jsx
    ├── InputArea.jsx
    └── AnalyticsPanel.jsx
```
