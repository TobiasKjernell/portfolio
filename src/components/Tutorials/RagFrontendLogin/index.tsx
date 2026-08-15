import { CodeBlock, SectionShell } from '../Shared'

export const RagFrontendLoginSection = () => (
  <SectionShell
    title="Frontend — Login"
    paragraphs={[
      "No sign-up screen, on purpose. Accounts get created the same way the backend section demonstrated — with curl against POST /api/users, by whoever runs the API. This is a tool for people who already have a login, not a public product, so the frontend only needs a way in, never a way to self-register.",
      'A Zustand store holds the token once login succeeds, and a login gate in App.tsx decides which screen to show — the chat UI never even mounts until a token exists.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="src/store/authStore.ts">{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: 'rag-auth' }, // persists to localStorage, so a refresh doesn't log you out
  ),
)`}</CodeBlock>

      <CodeBlock label="src/hooks/useAuthToken.ts">{`import { useAuthStore } from '../store/authStore'

// Safe to assert non-null: App.tsx only renders anything that calls this
// once a token exists in the store.
export const useAuthToken = () => useAuthStore((state) => state.token)!`}</CodeBlock>

      <CodeBlock label="src/api/authApi.ts">{`const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export const login = async (email: string, password: string): Promise<string> => {
  // POST /api/users/token is an OAuth2PasswordRequestForm endpoint — form-encoded, not JSON,
  // and it calls the email field "username"
  const body = new URLSearchParams({ username: email, password })

  const response = await fetch(\`\${API_BASE_URL}/api/users/token\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  const data = await response.json()
  return data.access_token
}`}</CodeBlock>

      <CodeBlock label="src/components/LoginForm.tsx">{`import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api/authApi'
import { useAuthStore } from '../store/authStore'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setToken = useAuthStore((state) => state.setToken)

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: setToken,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutate()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto mt-24 p-6 rounded-lg bg-slate-800">
      <h1 className="text-lg font-semibold text-white">Sign In</h1>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="rounded bg-slate-700 text-white px-3 py-2 outline-none"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="rounded bg-slate-700 text-white px-3 py-2 outline-none"
      />
      <button type="submit" disabled={isPending} className="rounded bg-indigo-600 text-white py-2 disabled:opacity-50">
        {isPending ? 'Signing in…' : 'Sign In'}
      </button>
      {isError && <p className="text-sm text-red-400">Invalid email or password.</p>}
    </form>
  )
}`}</CodeBlock>

      <CodeBlock label="src/App.tsx — the login gate">{`import { useAuthStore } from './store/authStore'
import { LoginForm } from './components/LoginForm'
import { ChatWindow } from './components/ChatWindow'
import { DocumentUpload } from './components/DocumentUpload'

const App = () => {
  const token = useAuthStore((state) => state.token)

  if (!token) return <LoginForm />

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      <DocumentUpload />
      <ChatWindow />
    </div>
  )
}

export default App`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why persist(), Not Just useState</span>
        <p className="text-white leading-relaxed text-sm">
          Zustand's <code>persist</code> middleware writes the store to <code>localStorage</code> on every change and
          rehydrates it on load, so refreshing the tab doesn't drop back to the login screen. It's the same store
          used everywhere else — <code>useAuthToken</code>, <code>useAskQuestion</code>, and the upload flow all read
          from this one place, so there's only one thing to invalidate when a token expires or on logout.
        </p>
      </div>
    </div>
  </SectionShell>
)
