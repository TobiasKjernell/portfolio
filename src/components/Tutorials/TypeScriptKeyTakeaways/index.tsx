import { SectionShell } from '../Shared'

export const TypeScriptKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "None of this is about typing every last variable — it's about typing the boundaries where mistakes actually happen: props between components, state that starts empty, and event handlers pulled out of JSX. Let inference handle everything else.",
    ]}
    points={[
      'Type the boundaries — props, state that starts null/empty, and extracted event handlers — and let inference cover the rest',
      'Default to interface for object/props shapes, reach for type when you need a union, tuple, or alias',
      'Skip React.FC — type props directly on the function parameter, and declare children: ReactNode explicitly when a component needs it',
      'Reach for a generic (<T,>) when a component or hook is genuinely data-agnostic, instead of typing it as any to make it "reusable"',
      'Remember as const on tuple-style hook returns ([value, setter]), or TypeScript widens them into a plain array',
      'Lean on built-in utility types — Partial, Pick, Omit, Record — to derive new shapes instead of hand-duplicating interfaces',
      'If you\'re fighting the compiler more than it\'s helping you, you\'re probably over-annotating — TypeScript\'s inference is usually smarter than the type you were about to write',
    ]}
  />
)
