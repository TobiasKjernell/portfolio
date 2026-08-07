import { CodeBlock, SectionShell } from '../Shared'

const DiscriminatedUnionsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Discriminated Unions — Modeling Mutually Exclusive State</span>
    <p className="text-white leading-relaxed text-sm">
      A union of object types that share one literal "tag" field. TypeScript uses that field to narrow the rest
      of the shape automatically, so invalid combinations — like <code className="text-[#cea86f]">data</code>{' '}
      existing while <code className="text-[#cea86f]">loading</code> is still true — become impossible to
      represent instead of just unlikely:
    </p>
    <CodeBlock>{`type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

const UserProfile = ({ state }: { state: RequestState<User> }) => {
  switch (state.status) {
    case 'idle':
      return null
    case 'loading':
      return <Spinner />
    case 'success':
      return <UserCard user={state.data} /> // state.data is User, no '!' needed
    case 'error':
      return <ErrorMessage message={state.message} />
  }
}`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Use it when a value has states that can't coexist — a fetch that's either idle, loading, succeeded, or
      failed, never several at once. It replaces the more common but weaker{' '}
      <code className="text-[#cea86f]">{'{ loading: boolean; error?: string; data?: T }'}</code> shape, where
      nothing stops <code className="text-[#cea86f]">loading</code> and <code className="text-[#cea86f]">data</code>{' '}
      from both being truthy at the same time.
    </p>
  </div>
)

const TypeGuardsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Custom Type Guards — Narrowing Data TypeScript Can't See</span>
    <p className="text-white leading-relaxed text-sm">
      A function whose return type is <code className="text-[#cea86f]">arg is Type</code> instead of{' '}
      <code className="text-[#cea86f]">boolean</code>. Calling it inside an <code className="text-[#cea86f]">if</code>{' '}
      narrows the variable for the rest of that branch, the same way <code className="text-[#cea86f]">typeof</code>{' '}
      or a discriminated union's tag does — except you control the check yourself:
    </p>
    <CodeBlock>{`interface AdminUser extends User {
  permissions: string[]
}

const isAdmin = (user: User | AdminUser): user is AdminUser =>
  'permissions' in user

const Toolbar = ({ user }: { user: User | AdminUser }) => {
  if (isAdmin(user)) {
    return <AdminPanel permissions={user.permissions} /> // narrowed, no cast
  }
  return null
}`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Reach for it when validating data TypeScript can't verify on its own — an API response typed as{' '}
      <code className="text-[#cea86f]">unknown</code>, a webhook payload, or a prop union that a discriminated
      tag doesn't cover. It's the compile-time-safe alternative to reaching for{' '}
      <code className="text-[#cea86f]">as AdminUser</code>, which just tells the compiler to trust you.
    </p>
  </div>
)

const ConditionalInferSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Conditional Types & infer — Deriving Types Instead of Duplicating Them</span>
    <p className="text-white leading-relaxed text-sm">
      A conditional type branches on <code className="text-[#cea86f]">T extends U ? X : Y</code>, evaluated at
      the type level. <code className="text-[#cea86f]">infer</code> lets that check pull a type back out — most
      often used to unwrap something that's built-in library types already do for you, like{' '}
      <code className="text-[#cea86f]">ReturnType</code> or <code className="text-[#cea86f]">Awaited</code>:
    </p>
    <CodeBlock>{`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

declare function fetchUser(id: string): Promise<User>

type Data = UnwrapPromise<ReturnType<typeof fetchUser>> // User, not Promise<User>

// A hook's return type, derived instead of hand-typed alongside it
type UseAuthReturn = ReturnType<typeof useAuth>

const withUser = (user: UseAuthReturn['user']) => { ... }`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      This is mostly library and hook-author territory rather than everyday component code. Reach for it when
      you catch yourself retyping a shape that already exists on a function, promise, or another type — deriving
      it keeps the two from drifting apart as the source changes.
    </p>
  </div>
)

const TemplateLiteralSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Template Literal Types — Building String Unions</span>
    <p className="text-white leading-relaxed text-sm">
      String types built the same way template literal strings are, but combined across every member of a
      union — producing every combination without listing them by hand:
    </p>
    <CodeBlock>{`type Entity = 'user' | 'post' | 'comment'
type Action = 'created' | 'updated' | 'deleted'

type CrudEvent = \`\${Entity}:\${Action}\`
// 'user:created' | 'user:updated' | ... all 9 combinations

const emit = (event: CrudEvent, payload: unknown) => { ... }

emit('user:created', newUser)  // ok
emit('user:renamed', newUser)  // compile error — 'renamed' isn't an Action`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Useful anywhere string values follow a predictable pattern: a typed event bus, CSS custom property names
      (<code className="text-[#cea86f]">`--color-${'{'}Token{'}'}`</code>), or route params like{' '}
      <code className="text-[#cea86f]">`/users/${'{'}id{'}'}`</code>. It catches typos in those strings the same
      way a plain union catches typos in an enum-like value.
    </p>
  </div>
)

const SatisfiesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">satisfies — Validate Without Widening</span>
    <p className="text-white leading-relaxed text-sm">
      Annotating a value with <code className="text-[#cea86f]">: Type</code> checks it against that type but
      also widens it to that type — losing the specific literal keys and values.{' '}
      <code className="text-[#cea86f]">satisfies</code> checks it too, but keeps the narrower inferred type:
    </p>
    <CodeBlock>{`type Theme = Record<string, string>

// Annotated: checked, but widened — colors.gold is just 'string' now
const colorsAnnotated: Theme = { gold: '#cea86f', bg: '#0a0a0a' }

// satisfies: checked against Theme, but the literal type is kept
const colors = { gold: '#cea86f', bg: '#0a0a0a' } satisfies Theme

colors.gold  // typed as the literal '#cea86f', autocompletes correctly
colors.blue  // compile error — caught by satisfies, same as the annotation would`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Reach for it on config objects, theme maps, and route tables — anywhere you want the compiler to validate
      the shape but still want precise autocomplete on the value afterward.
    </p>
  </div>
)

const AsConstSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">as const — Locking a Value to Its Narrowest Type</span>
    <p className="text-white leading-relaxed text-sm">
      Without it, TypeScript widens literals to their general type — an array of strings becomes{' '}
      <code className="text-[#cea86f]">string[]</code>. <code className="text-[#cea86f]">as const</code> keeps
      each element as its own literal, which makes it possible to derive a union straight from the array instead
      of maintaining both by hand:
    </p>
    <CodeBlock>{`const ROLES = ['admin', 'editor', 'viewer'] as const
type Role = (typeof ROLES)[number]  // 'admin' | 'editor' | 'viewer'

const RolePicker = ({ role }: { role: Role }) => (
  <select value={role}>
    {ROLES.map((r) => (
      <option key={r} value={r}>{r}</option>
    ))}
  </select>
)`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Use it as the single source of truth for a set of string options that need to drive both runtime values —
      a dropdown's options, an array to <code className="text-[#cea86f]">.map</code> over — and a type used
      elsewhere, so the two can never fall out of sync.
    </p>
  </div>
)

export const AdvancedTypeScriptSection = () => (
  <SectionShell
    title="Advanced & Expert TypeScript"
    paragraphs={[
      "The previous sections cover what shows up on every page — props, state, events, generics, utility types. These patterns show up less often, but they're what separates a codebase that merely compiles from one where invalid states genuinely can't be constructed. Each one below solves a specific problem; skip straight to the one you need rather than reading top to bottom.",
    ]}
    points={[
      'Discriminated unions — model mutually exclusive states so invalid combinations become unrepresentable',
      "Custom type guards (`arg is Type`) — narrow a union safely when validating data TypeScript can't verify itself, like API responses",
      "Conditional types & infer — derive a type from another type (a function's return, a promise's payload) instead of hand-duplicating it",
      'Template literal types — build a string union from other unions, e.g. typed event names or route patterns',
      'satisfies — validate a value against a type while keeping its precise inferred literal type, instead of widening it',
      'as const — lock an array or object to its narrowest literal type, useful as a single source of truth for a derived union',
    ]}
  >
    <div className="space-y-6">
      <DiscriminatedUnionsSection />
      <TypeGuardsSection />
      <ConditionalInferSection />
      <TemplateLiteralSection />
      <SatisfiesSection />
      <AsConstSection />
    </div>
  </SectionShell>
)
