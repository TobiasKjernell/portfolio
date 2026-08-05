import { CodeBlock, SectionShell } from '../Shared'

const ReturnInferenceSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Let the Return Type Infer — Usually</span>
    <p className="text-white leading-relaxed text-sm">
      Most custom hooks don't need an explicit return type — TypeScript infers it from what's returned, and that
      inferred type is exactly as accurate as one you'd write by hand:
    </p>
    <CodeBlock>{`const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue((v) => !v)
  return { value, toggle } // return type inferred: { value: boolean; toggle: () => void }
}`}</CodeBlock>
  </div>
)

const TupleReturnPitfall = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Tuple-Return Pitfall</span>
    <p className="text-white leading-relaxed text-sm">
      Hooks that mimic <code className="text-[#cea86f]">useState</code>'s array-return style run into a real
      inference gap: TypeScript widens a plain returned array into a generic array type, losing the fact that
      position 0 is always the value and position 1 is always the setter:
    </p>
    <CodeBlock>{`const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial)
  const increment = () => setCount((c) => c + 1)
  return [count, increment] // inferred as (number | (() => void))[] — wrong
}

// as const locks each position's exact type in place, producing a real tuple
const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial)
  const increment = () => setCount((c) => c + 1)
  return [count, increment] as const // now: readonly [number, () => void]
}`}</CodeBlock>
  </div>
)

const ExplicitEffectSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">useEffect Needs No Type at All</span>
    <p className="text-white leading-relaxed text-sm">
      Unlike state, refs or props, <code className="text-[#cea86f]">useEffect</code> almost never needs an
      annotation — its callback is required to return either nothing or a cleanup function, and TypeScript
      already enforces that shape on its own:
    </p>
    <CodeBlock>{`useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000)
  return () => clearInterval(id) // cleanup — inferred, not annotated
}, [])`}</CodeBlock>
  </div>
)

const AsyncDataHookSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">A Realistic Data-Fetching Hook</span>
    <p className="text-white leading-relaxed text-sm">
      Putting it together — a generic hook, explicit state typing where inference can't reach, and no unnecessary
      annotations elsewhere:
    </p>
    <CodeBlock>{`interface FetchState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: T) => setState({ data, error: null, loading: false }))
      .catch((err) => setState({ data: null, error: String(err), loading: false }))
  }, [url])

  return state
}

const { data, loading } = useFetch<User[]>('/api/users')`}</CodeBlock>
  </div>
)

const TanStackQuerySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Swapping useFetch for TanStack Query</span>
    <p className="text-white leading-relaxed text-sm">
      The hand-rolled <code className="text-[#cea86f]">useFetch</code> above tracks loading, error and data by
      hand. TanStack Query's <code className="text-[#cea86f]">useQuery</code> replaces that state machine outright
      — you just type the fetcher and let the hook infer everything downstream:
    </p>
    <CodeBlock label="api.ts — types + fetcher">{`interface IGetAppOverview {
  appName: string
  totalStatisticRows: number
  totalClicksStatValue: number
  totalTimeStatValue: number
  latestTimeStamp: string
  uniqueStatNames: number
}

interface FetchApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
}

export class ApiError extends Error {
  public statusCode: number
  public originalError?: unknown

  constructor(statusCode: number, message: string, originalError?: unknown) {
    super(message)
    this.statusCode = statusCode
    this.originalError = originalError
    this.name = 'ApiError'
  }
}

const fetchApi = async <T,>(url: string, options: FetchApiOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers } = options
  const response = await fetch(url, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json', ...headers } : headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new ApiError(response.status, \`HTTP Error: \${response.status} \${response.statusText}\`)
  }

  return response.json() as Promise<T>
}

const getAppOverview = (clientName: string): Promise<IGetAppOverview[]> =>
  fetchApi<IGetAppOverview[]>(\`/api/Dashboard/GetAppOverview?clientName=\${clientName}\`)`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Then the hook itself — no <code className="text-[#cea86f]">FetchState&lt;T&gt;</code>, no{' '}
      <code className="text-[#cea86f]">useEffect</code>, no manual loading/error tracking:
    </p>
    <CodeBlock label="useAppOverview.ts">{`const useAppOverview = (clientName: string) =>
  useQuery({
    queryKey: ['appOverview', clientName],
    queryFn: () => getAppOverview(clientName),
  })`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      And consuming it in a component — <code className="text-[#cea86f]">data</code>'s type flows straight from{' '}
      <code className="text-[#cea86f]">getAppOverview</code>'s return type, through{' '}
      <code className="text-[#cea86f]">queryFn</code>, with nothing annotated by hand:
    </p>
    <CodeBlock label="AppOverview.tsx">{`const { data, isLoading, error } = useAppOverview('acme')
// data: IGetAppOverview[] | undefined`}</CodeBlock>
  </div>
)

export const CustomHooksSection = () => (
  <SectionShell
    title="Typing Custom Hooks"
    paragraphs={[
      "Custom hooks are ordinary functions, so most of what already applies to typing state and generics carries over directly. The two spots that trip people up are tuple returns and knowing when NOT to annotate.",
    ]}
    points={[
      'Let the return type infer for object-returning hooks — an explicit return type is usually just duplicating what TypeScript already knows',
      'A hook returning [value, setter] needs "as const" on the return so TypeScript keeps it a tuple instead of widening it to a generic array',
      'useEffect callbacks essentially never need annotation — their shape (nothing, or a cleanup function) is already enforced structurally',
      'Make the hook generic when it wraps something data-agnostic, like fetching or storage, so callers get their real type back instead of unknown',
      'Prefer TanStack Query over a hand-rolled fetch hook for real data fetching — it infers data from the query function and drops the manual loading/error state entirely',
    ]}
  >
    <div className="space-y-6">
      <ReturnInferenceSection />
      <TupleReturnPitfall />
      <ExplicitEffectSection />
      <AsyncDataHookSection />
      <TanStackQuerySection />
    </div>
  </SectionShell>
)
