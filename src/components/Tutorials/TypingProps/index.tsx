import { CodeBlock, SectionShell } from '../Shared'

const BasicPropsExample = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Baseline Pattern</span>
    <p className="text-white leading-relaxed text-sm">
      Declare an interface next to the component, name it{' '}
      <code className="text-[#cea86f]">ComponentNameProps</code>, and destructure straight from the function
      signature — no need for the old <code className="text-[#cea86f]">React.FC</code> wrapper type:
    </p>
    <CodeBlock label="ProductCard.tsx">{`interface ProductCardProps {
  name: string
  price: number
  inStock: boolean
  onAddToCart: (id: string) => void
}

const ProductCard = ({ name, price, inStock, onAddToCart }: ProductCardProps) => (
  <div>
    <h3>{name}</h3>
    <span>\${price.toFixed(2)}</span>
    <button disabled={!inStock} onClick={() => onAddToCart(name)}>
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  </div>
)`}</CodeBlock>
  </div>
)

const OptionalDefaultsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Optional Props and Defaults</span>
    <p className="text-white leading-relaxed text-sm">
      A <code className="text-[#cea86f]">?</code> marks a prop optional. Pair it with a default value in the
      destructure, and the type stays accurate without needing <code className="text-[#cea86f]">| undefined</code>{' '}
      spelled out everywhere the prop is used inside the component:
    </p>
    <CodeBlock>{`interface AvatarProps {
  src: string
  size?: number // optional
}

const Avatar = ({ src, size = 40 }: AvatarProps) => (
  <img src={src} width={size} height={size} />
)`}</CodeBlock>
  </div>
)

const ChildrenAndFcSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why Not React.FC?</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">React.FC</code> used to be the recommended way to type a component, but it
      quietly adds an implicit, always-optional <code className="text-[#cea86f]">children</code> prop — even to
      components that never render children — and makes generics awkward to write. Typing props directly on the
      function's parameter is more explicit and is now the more common approach:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CodeBlock label="Avoid">{`const Card: React.FC<CardProps> = ({
  title
}) => <div>{title}</div>

// children is silently allowed
// here even though CardProps
// never declared it`}</CodeBlock>
      <CodeBlock label="Prefer">{`const Card = ({ title }: CardProps) => (
  <div>{title}</div>
)

// only the props you declared
// are allowed`}</CodeBlock>
    </div>
  </div>
)

export const TypingPropsSection = () => (
  <SectionShell
    title="Typing Props"
    paragraphs={[
      "Props are the most common thing you'll type in a React + TypeScript codebase — it's the contract for what a component needs to render correctly, and the first line of defense against a parent passing the wrong data.",
    ]}
    points={[
      'Declare a ComponentNameProps interface right above the component that uses it — colocated types are easier to find than a shared types.ts file',
      'Use ? for optional props, and give them a default value in the destructure so the rest of the component doesn\'t need to guard against undefined',
      'Type props directly on the function parameter instead of wrapping the component in React.FC<Props>',
    ]}
  >
    <div className="space-y-6">
      <BasicPropsExample />
      <OptionalDefaultsSection />
      <ChildrenAndFcSection />
    </div>
  </SectionShell>
)
