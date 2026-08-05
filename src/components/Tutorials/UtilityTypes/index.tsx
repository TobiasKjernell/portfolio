import { CodeBlock, SectionShell } from '../Shared'

const PartialSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Partial&lt;T&gt; — Every Field Optional</span>
    <p className="text-white leading-relaxed text-sm">
      Common for an "update" function, where the caller only sends the fields that changed rather than the whole
      object again:
    </p>
    <CodeBlock>{`interface User {
  id: string
  name: string
  email: string
}

const updateUser = (id: string, changes: Partial<User>) => {
  // changes might be { name: 'New Name' } — every field is optional
}`}</CodeBlock>
  </div>
)

const PickOmitSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Pick&lt;T, K&gt; and Omit&lt;T, K&gt;</span>
    <p className="text-white leading-relaxed text-sm">
      Both build a new type from an existing one instead of retyping fields by hand — useful for props that only
      need a slice of a larger domain type, like a form that creates a{' '}
      <code className="text-[#cea86f]">User</code> before it has an <code className="text-[#cea86f]">id</code>:
    </p>
    <CodeBlock>{`type UserPreview = Pick<User, 'id' | 'name'>       // { id: string; name: string }
type NewUser = Omit<User, 'id'>                     // { name: string; email: string }

const CreateUserForm = (props: { onSubmit: (user: NewUser) => void }) => ...`}</CodeBlock>
  </div>
)

const RecordSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Record&lt;K, V&gt; — Typed Lookup Objects</span>
    <p className="text-white leading-relaxed text-sm">
      Instead of typing a lookup object as loose <code className="text-[#cea86f]">Record&lt;string, string&gt;</code>,
      pairing it with a union key catches typos and guarantees every case is handled:
    </p>
    <CodeBlock>{`type Status = 'idle' | 'loading' | 'success' | 'error'

const statusColor: Record<Status, string> = {
  idle: 'gray',
  loading: 'blue',
  success: 'green',
  error: 'red',
  // missing a key here is a compile error — not a runtime "undefined"
}`}</CodeBlock>
  </div>
)

const RequiredReadonlySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Required&lt;T&gt; and Readonly&lt;T&gt;</span>
    <p className="text-white leading-relaxed text-sm">
      Less common day-to-day, but useful at the edges: <code className="text-[#cea86f]">Required</code> strips
      every <code className="text-[#cea86f]">?</code> away — handy after a form's optional fields have all been
      validated and filled in — and <code className="text-[#cea86f]">Readonly</code> locks every field against
      reassignment, a good fit for config objects and constants:
    </p>
    <CodeBlock>{`interface DraftUser {
  name?: string
  email?: string
}

// After validation, every field is guaranteed present
const submitUser = (user: Required<DraftUser>) => { ... }

const DEFAULT_CONFIG: Readonly<{ retries: number; timeout: number }> = {
  retries: 3,
  timeout: 5000,
}`}</CodeBlock>
  </div>
)

export const UtilityTypesSection = () => (
  <SectionShell
    title="Utility Types Worth Knowing"
    paragraphs={[
      "TypeScript ships a set of built-in utility types that transform an existing type instead of making you redeclare it. In a React codebase, they show up constantly around props, forms and API data — knowing them means fewer duplicated interfaces.",
    ]}
    points={[
      'Partial<T> — every field becomes optional; the standard shape for an "update" or "patch" payload',
      'Pick<T, K> / Omit<T, K> — build a narrower or wider-minus-some-fields type from an existing one, instead of retyping it',
      'Record<K, V> — a typed lookup object; pairing K with a union catches missing or misspelled keys at compile time',
      'Required<T> / Readonly<T> — force every field present, or lock every field against reassignment',
    ]}
  >
    <div className="space-y-6">
      <PartialSection />
      <PickOmitSection />
      <RecordSection />
      <RequiredReadonlySection />
    </div>
  </SectionShell>
)
