import { CodeBlock, SectionShell, StepList } from '../Shared'

export const RagFrontendStateAndApiSection = () => (
  <SectionShell
    title="Frontend — State & API Layer"
    paragraphs={[
      "Zustand holds the chat transcript — plain client state, no server round-trip needed to read it. TanStack Query owns the actual network calls to /ingest and /query, including loading and error state, so components never manage isLoading flags by hand.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="src/store/chatStore.ts">{`import { create } from 'zustand'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  sources?: { documentId: number; text: string }[]
}

type ChatState = {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clear: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clear: () => set({ messages: [] }),
}))`}</CodeBlock>

      <CodeBlock label="src/api/ragClient.ts">{`const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type QueryResponse = {
  answer: string
  sources: { document_id: number; text: string }[]
}

export const queryRag = async (question: string, token: string): Promise<QueryResponse> => {
  const response = await fetch(\`\${API_BASE_URL}/api/query\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.detail ?? 'Query failed')
  }

  return response.json()
}

export const ingestDocument = async (file: File, token: string): Promise<{ document_id: number; chunks_created: number }> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(\`\${API_BASE_URL}/api/ingest\`, {
    method: 'POST',
    headers: { Authorization: \`Bearer \${token}\` },
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.detail ?? 'Upload failed')
  }

  return response.json()
}`}</CodeBlock>

      <CodeBlock label="src/hooks/useAskQuestion.ts">{`import { useMutation } from '@tanstack/react-query'
import { queryRag } from '../api/ragClient'
import { useChatStore } from '../store/chatStore'
import { useAuthToken } from './useAuthToken'

export const useAskQuestion = () => {
  const token = useAuthToken()
  const addMessage = useChatStore((state) => state.addMessage)

  return useMutation({
    mutationFn: (question: string) => queryRag(question, token),
    onMutate: (question) => {
      addMessage({ role: 'user', content: question })
    },
    onSuccess: (data) => {
      addMessage({
        role: 'assistant',
        content: data.answer,
        sources: data.sources.map((s) => ({ documentId: s.document_id, text: s.text })),
      })
    },
  })
}`}</CodeBlock>

      <StepList
        steps={[
          'onMutate optimistically appends the user\'s question to the store before the request resolves, so the UI feels instant.',
          'onSuccess appends the assistant\'s reply — including sources — once the backend responds.',
          'useMutation exposes isPending/isError to the component for free, without any manual loading state.',
        ]}
      />
    </div>
  </SectionShell>
)
