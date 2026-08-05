import { CodeBlock, SectionShell } from '../Shared'

const InlineInferenceSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Inline Handlers Type Themselves</span>
    <p className="text-white leading-relaxed text-sm">
      When a handler is written inline, directly inside the JSX prop, TypeScript already knows which DOM element
      it's attached to and infers the event type automatically — no annotation needed:
    </p>
    <CodeBlock>{`// e is inferred as React.MouseEvent<HTMLButtonElement>
<button onClick={(e) => console.log(e.currentTarget)}>Click</button>

// e is inferred as React.ChangeEvent<HTMLInputElement>
<input onChange={(e) => setValue(e.target.value)} />`}</CodeBlock>
  </div>
)

const ExtractedHandlerSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Extracted Handlers Need an Explicit Type</span>
    <p className="text-white leading-relaxed text-sm">
      The moment a handler is pulled out into its own named function — usually to keep the component readable —
      that inference disappears, because the function no longer has JSX context to infer from. Annotate the
      event parameter using React's built-in event types:
    </p>
    <CodeBlock>{`const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // ...
}

return (
  <form onSubmit={handleSubmit}>
    <input onChange={handleChange} />
  </form>
)`}</CodeBlock>
  </div>
)

const CommonEventTypesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Ones You'll Actually Reach For</span>
    <ul className="space-y-2">
      {[
        'React.MouseEvent<HTMLButtonElement> — clicks',
        'React.ChangeEvent<HTMLInputElement> — text input, checkbox and select changes',
        'React.FormEvent<HTMLFormElement> — form submission',
        'React.KeyboardEvent<HTMLInputElement> — keydown / keyup / keypress',
        'React.FocusEvent<HTMLInputElement> — focus / blur',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20 font-mono"
        >
          <span className="gold-text font-sans">→</span>
          {point}
        </li>
      ))}
    </ul>
    <p className="text-white leading-relaxed text-sm">
      Every one of these takes the target element as a generic — matching it to the element the handler actually
      sits on keeps <code className="text-[#cea86f]">e.target</code> and{' '}
      <code className="text-[#cea86f]">e.currentTarget</code> correctly typed instead of falling back to a vague{' '}
      <code className="text-[#cea86f]">EventTarget</code>.
    </p>
  </div>
)

export const TypingEventsSection = () => (
  <SectionShell
    title="Typing Event Handlers"
    paragraphs={[
      "React wraps native DOM events in its own SyntheticEvent types, and which one you need depends only on where the handler is written — inline in JSX, or extracted into its own function.",
    ]}
    points={[
      'Inline handlers get their event type inferred for free — write them with no annotation and let TypeScript figure it out from the JSX prop they\'re attached to',
      'Handlers extracted into a named function or a custom hook lose that context and need the event type spelled out explicitly',
      'Match the generic to the actual element the handler is on (HTMLInputElement, HTMLButtonElement, HTMLFormElement...) — a mismatched one is a common source of confusing type errors on e.target',
    ]}
  >
    <div className="space-y-6">
      <InlineInferenceSection />
      <ExtractedHandlerSection />
      <CommonEventTypesSection />
    </div>
  </SectionShell>
)
