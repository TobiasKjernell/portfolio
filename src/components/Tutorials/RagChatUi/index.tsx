import { CodeBlock, SectionShell } from '../Shared'

export const RagChatUiSection = () => (
  <SectionShell
    title="Frontend — Chat & Upload UI"
    paragraphs={[
      'Two small components on top of the store and hooks from the previous section: a message list with an input box, and a document upload panel. Neither one talks to fetch directly — they read from useChatStore and call the hooks that wrap useMutation.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="src/components/ChatWindow.tsx">{`import { useState } from 'react'
import { useChatStore } from '../store/chatStore'
import { useAskQuestion } from '../hooks/useAskQuestion'

export const ChatWindow = () => {
  const [input, setInput] = useState('')
  const messages = useChatStore((state) => state.messages)
  const { mutate: ask, isPending } = useAskQuestion()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    ask(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
            <div
              className={\`inline-block rounded-lg px-4 py-2 max-w-[80%] \${
                message.role === 'user' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-100'
              }\`}
            >
              {message.content}
            </div>
            {message.sources && message.sources.length > 0 && (
              <div className="mt-1 text-xs text-slate-400">
                Sources: {message.sources.map((s) => \`#\${s.documentId}\`).join(', ')}
              </div>
            )}
          </div>
        ))}
        {isPending && <div className="text-sm text-slate-400">Thinking…</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-slate-700">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question about your documents..."
          className="flex-1 rounded-lg bg-slate-800 text-white px-3 py-2 outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}`}</CodeBlock>

      <CodeBlock label="src/components/DocumentUpload.tsx">{`import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ingestDocument } from '../api/ragClient'
import { useAuthToken } from '../hooks/useAuthToken'

export const DocumentUpload = () => {
  const token = useAuthToken()
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate: upload, isPending, isSuccess } = useMutation({
    mutationFn: (file: File) => ingestDocument(file, token),
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) upload(file)
  }

  return (
    <div className="flex items-center gap-3 p-4 border-b border-slate-700">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm text-white"
      >
        Upload Document
      </button>
      <input ref={inputRef} type="file" onChange={handleChange} className="hidden" />
      {isPending && <span className="text-xs text-slate-400">Indexing…</span>}
      {isSuccess && <span className="text-xs text-emerald-400">Indexed ✓</span>}
    </div>
  )
}`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">The Pattern To Notice</span>
        <p className="text-white leading-relaxed text-sm">
          Neither component holds request state itself — <code>ChatWindow</code> reads messages from Zustand and
          fires a mutation; <code>DocumentUpload</code> does the same for uploads. That split is what makes it easy
          to add a second consumer later — a sidebar showing "documents indexed," say — without duplicating any
          fetch logic.
        </p>
      </div>
    </div>
  </SectionShell>
)
