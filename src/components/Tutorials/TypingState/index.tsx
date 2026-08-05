import { CodeBlock, SectionShell } from '../Shared'

const InferredStateSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Let Inference Do the Work</span>
    <p className="text-white leading-relaxed text-sm">
      When a piece of state has an obvious initial value, TypeScript infers its type on its own — no annotation
      needed. Adding one anyway is just noise:
    </p>
    <CodeBlock>{`const [count, setCount] = useState(0)          // inferred: number
const [name, setName] = useState('')            // inferred: string
const [isOpen, setIsOpen] = useState(false)      // inferred: boolean`}</CodeBlock>
  </div>
)

const ExplicitGenericSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">When You Need the Generic</span>
    <p className="text-white leading-relaxed text-sm">
      Inference breaks down for two common cases: state that starts as <code className="text-[#cea86f]">null</code>{' '}
      or <code className="text-[#cea86f]">undefined</code> before data arrives, and state whose shape is wider
      than any single initial value. Pass the type explicitly to{' '}
      <code className="text-[#cea86f]">useState&lt;T&gt;</code> in both cases:
    </p>
    <CodeBlock>{`interface User {
  id: string
  name: string
}

// Without the generic, TS would infer "null" forever,
// and setUser(someUser) would be a type error
const [user, setUser] = useState<User | null>(null)

// A list that starts empty still needs its element type spelled out
const [items, setItems] = useState<string[]>([])`}</CodeBlock>
  </div>
)

const RefsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Typing useRef</span>
    <p className="text-white leading-relaxed text-sm">
      A ref pointing at a DOM node should be initialized with <code className="text-[#cea86f]">null</code> and
      typed with the element it targets. React treats the <code className="text-[#cea86f]">.current</code>{' '}
      property as read-only in this form, which correctly reflects that React itself controls when it attaches
      the node:
    </p>
    <CodeBlock>{`const inputRef = useRef<HTMLInputElement>(null)

const focusInput = () => {
  // TS knows .current might be null, so it forces the check
  inputRef.current?.focus()
}

return <input ref={inputRef} />`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      A mutable ref used to hold a value across renders (not attached to the DOM) is typed the same way, but with
      an initial value that isn't null — that changes <code className="text-[#cea86f]">.current</code> into a
      normal, freely-mutable property:
    </p>
    <CodeBlock>{`const renderCount = useRef<number>(0)
renderCount.current += 1 // allowed — no DOM element, no read-only lock`}</CodeBlock>
  </div>
)

export const TypingStateSection = () => (
  <SectionShell
    title="Typing State and Refs"
    paragraphs={[
      "useState infers its type from the initial value you give it, and most of the time that's enough. The generic form only earns its place when inference can't reach the type you actually need.",
    ]}
    points={[
      'Skip the generic when the initial value already makes the type obvious — useState(0), useState(\'\'), useState(false)',
      'Reach for useState<T>(...) when state starts null/undefined but won\'t stay that way, or when an empty array/object needs a wider type than its empty initial value implies',
      'Type a DOM ref as useRef<HTMLElement>(null) — React makes .current read-only in this form, matching that React itself attaches the node',
      'A mutable ref for holding a plain value across renders gets an initial value, not null — that keeps .current freely writable',
    ]}
  >
    <div className="space-y-6">
      <InferredStateSection />
      <ExplicitGenericSection />
      <RefsSection />
    </div>
  </SectionShell>
)
