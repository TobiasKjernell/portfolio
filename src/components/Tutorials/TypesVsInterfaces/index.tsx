import { CodeBlock, SectionShell } from '../Shared'

const SyntaxComparison = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Same Job, Different Syntax</span>
    <p className="text-white leading-relaxed text-sm">
      For describing the shape of an object — like props — <code className="text-[#cea86f]">type</code> and{' '}
      <code className="text-[#cea86f]">interface</code> do almost the same thing:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CodeBlock label="interface">{`interface ButtonProps {
  label: string
  disabled?: boolean
}`}</CodeBlock>
      <CodeBlock label="type">{`type ButtonProps = {
  label: string
  disabled?: boolean
}`}</CodeBlock>
    </div>
  </div>
)

const WhenTheyDiffer = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Where They Actually Diverge</span>
    <ul className="space-y-2">
      {[
        'interface can be "reopened" and extended later by declaring it again — useful for augmenting types from a library, but rarely something you want in your own app code',
        'type can describe things interface can\'t: unions (string | number), tuples, and mapped/conditional types',
        'interface extends another interface with the extends keyword; type combines other types with & (intersection) — both end up expressing similar relationships',
        'Performance and error messages are effectively identical for the object-shape case that props and state need — this is a style choice, not a correctness one',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
)

const UnionExample = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Where type Pulls Ahead: Unions</span>
    <p className="text-white leading-relaxed text-sm">
      A prop that can only be one of a fixed set of strings — like a button's visual variant — is a very common
      React pattern, and it's a union, which only <code className="text-[#cea86f]">type</code> can express directly:
    </p>
    <CodeBlock>{`type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  label: string
  variant: ButtonVariant // interface + type together, which is normal
}`}</CodeBlock>
  </div>
)

export const TypesVsInterfacesSection = () => (
  <SectionShell
    title="Types vs Interfaces"
    paragraphs={[
      "Both type and interface let you describe the shape of an object, and for typing props and state they're interchangeable in practice. The real question isn't which one is \"correct\" — it's which one to reach for by default, and when to switch.",
    ]}
    points={[
      'Default to interface for component props and object shapes — it reads clearly and gives the best error messages when extended',
      'Reach for type when you need a union, a tuple, or to alias a primitive/function signature — things interface literally cannot express',
      'Whichever one you pick, the important part is picking one convention and staying consistent across the codebase',
    ]}
  >
    <div className="space-y-6">
      <SyntaxComparison />
      <WhenTheyDiffer />
      <UnionExample />
    </div>
  </SectionShell>
)
