import { CodeBlock, SectionShell } from '../Shared'

const WhyGenericsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Problem They Solve</span>
    <p className="text-white leading-relaxed text-sm">
      A reusable list or select component doesn't know in advance whether it'll render users, products, or
      orders. Typing its items as <code className="text-[#cea86f]">any</code> throws away all safety;
      hardcoding <code className="text-[#cea86f]">User[]</code> throws away the reuse. A generic lets the
      component stay reusable while the caller's specific type flows all the way through:
    </p>
    <CodeBlock>{`interface SelectProps<T> {
  items: T[]
  getLabel: (item: T) => string
  onSelect: (item: T) => void
}

const Select = <T,>({ items, getLabel, onSelect }: SelectProps<T>) => (
  <select onChange={(e) => onSelect(items[Number(e.target.value)])}>
    {items.map((item, i) => (
      <option key={i} value={i}>{getLabel(item)}</option>
    ))}
  </select>
)

// T is inferred as User here — getLabel and onSelect are fully typed
<Select items={users} getLabel={(u) => u.name} onSelect={(u) => console.log(u.id)} />`}</CodeBlock>
  </div>
)

const TrailingCommaNote = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why the Trailing Comma in &lt;T,&gt;</span>
    <p className="text-white leading-relaxed text-sm">
      In a <code className="text-[#cea86f]">.tsx</code> file, <code className="text-[#cea86f]">&lt;T&gt;</code>{' '}
      alone is ambiguous with JSX syntax. Writing <code className="text-[#cea86f]">&lt;T,&gt;</code> (with a
      trailing comma) tells the parser this is a generic, not the start of a JSX element. This only matters for
      arrow function components — a regular <code className="text-[#cea86f]">function</code> declaration doesn't
      need the workaround:
    </p>
    <CodeBlock>{`// Arrow function in .tsx — needs the trailing comma
const List = <T,>({ items }: { items: T[] }) => ...

// Function declaration — no ambiguity, no comma needed
function List<T>({ items }: { items: T[] }) { ... }`}</CodeBlock>
  </div>
)

const GenericHookSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Generics in Hooks</span>
    <p className="text-white leading-relaxed text-sm">
      The same idea applies to custom hooks that wrap something type-agnostic, like localStorage — the hook
      shouldn't need to know whether it's storing a string, a number, or an object:
    </p>
    <CodeBlock>{`function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  const setAndPersist = (next: T) => {
    setValue(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return [value, setAndPersist] as const
}

// T is inferred as boolean from the initial value
const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)`}</CodeBlock>
  </div>
)

export const GenericsInReactSection = () => (
  <SectionShell
    title="Generics in Components and Hooks"
    paragraphs={[
      "Generics let a component or hook stay reusable across many data shapes without giving up type safety. They're the answer whenever you'd otherwise reach for any just to make something generic enough to reuse.",
    ]}
    points={[
      'Reach for a generic when a component genuinely doesn\'t care what shape its data is — lists, selects, tables, wrappers around storage/fetching',
      'In a .tsx file, an arrow-function generic component needs the trailing comma: <T,> — otherwise the parser reads it as JSX',
      'TypeScript infers the generic from how the component or hook is called — callers rarely need to specify it explicitly',
    ]}
  >
    <div className="space-y-6">
      <WhyGenericsSection />
      <TrailingCommaNote />
      <GenericHookSection />
    </div>
  </SectionShell>
)
