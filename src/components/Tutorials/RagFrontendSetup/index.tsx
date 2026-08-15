import { CodeBlock, SectionShell } from '../Shared'

export const RagFrontendSetupSection = () => (
  <SectionShell
    title="Frontend — Project Setup"
    paragraphs={[
      'A standard Vite + React + TypeScript + Tailwind app, with Zustand for the chat/session state and TanStack Query for every call to the FastAPI backend — nothing exotic, just the two libraries that pull their weight here: server state (what TanStack Query is for) and small pieces of local UI state (what Zustand is for) are kept separate rather than shoved into one giant store.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="terminal">{`npm create vite@latest rag-frontend -- --template react-ts
cd rag-frontend
npm install zustand @tanstack/react-query
npm install -D tailwindcss @tailwindcss/vite`}</CodeBlock>

      <CodeBlock label="vite.config.ts">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`}</CodeBlock>

      <CodeBlock label="src/index.css">{`@import "tailwindcss";`}</CodeBlock>

      <CodeBlock label="project layout">{`src/
├── main.tsx           # wraps <App /> in a QueryClientProvider
├── App.tsx
├── api/
│   └── ragClient.ts    # fetch wrappers for /ingest and /query
├── store/
│   └── chatStore.ts    # Zustand store — messages, current session
└── components/
    ├── ChatWindow.tsx
    ├── MessageList.tsx
    └── DocumentUpload.tsx`}</CodeBlock>

      <CodeBlock label="src/main.tsx">{`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">The Frontend Never Sees A Provider Key</span>
        <p className="text-white leading-relaxed text-sm">
          Everything the frontend needs is a single base URL for the FastAPI backend and, once logged in, a JWT. It
          never imports an OpenAI or Anthropic SDK, and it never has an environment variable for a provider key —
          that boundary is what makes the backend's key storage actually secure, not just a formality.
        </p>
      </div>
    </div>
  </SectionShell>
)
