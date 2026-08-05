import { CodeBlock, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      JavaScript only tells you that something is wrong once the code actually runs — sometimes that's in a
      user's browser, in production, days after you wrote it. TypeScript is the same language with a layer on
      top that checks your assumptions while you type: "this prop is supposed to be a string, but you're passing
      a number" shows up as a red squiggle in your editor instead of a crash in someone else's browser. In React
      specifically, components pass data to each other constantly — props down, callbacks up, state in between —
      and every one of those handoffs is a place a typo or a wrong shape can slip through silently in plain JS.
    </p>
  </div>
)

const WithoutTypesExample = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What This Looks Like in Practice</span>
    <p className="text-white leading-relaxed text-sm">
      In plain JavaScript, this component compiles and runs fine — right up until someone forgets to pass{' '}
      <code className="text-[#cea86f]">onSave</code>, and the app crashes at click time instead of at build time:
    </p>
    <CodeBlock label="UserCard.jsx">{`const UserCard = ({ user, onSave }) => (
  <button onClick={() => onSave(user.id)}>
    Save {user.name}
  </button>
)

// Nothing stops this from compiling — onSave is undefined
<UserCard user={{ id: 1, name: 'Ada' }} />`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      With TypeScript, the same mistake is a compile-time error, caught the moment you write it — not the moment
      a user clicks the button:
    </p>
    <CodeBlock label="UserCard.tsx">{`interface UserCardProps {
  user: { id: number; name: string }
  onSave: (id: number) => void
}

const UserCard = ({ user, onSave }: UserCardProps) => (
  <button onClick={() => onSave(user.id)}>
    Save {user.name}
  </button>
)

// Error: Property 'onSave' is missing in type '{ user: ... }'
<UserCard user={{ id: 1, name: 'Ada' }} />`}</CodeBlock>
  </div>
)

export const WhyTypeScriptSection = () => (
  <SectionShell
    title="Why TypeScript With React?"
    paragraphs={[
      "TypeScript adds static type checking on top of JavaScript. In a React app, that means the editor and compiler can verify — before the code ever runs — that a component is receiving the props it expects, that a piece of state is the shape you think it is, and that an event handler is wired up correctly.",
      "None of this changes what ships to the browser: TypeScript compiles down to plain JavaScript, and its types disappear entirely at runtime. The value is entirely at development time — better autocomplete, safer refactors, and errors caught in the editor instead of in production.",
    ]}
    points={[
      'Self-documenting components: reading a component\'s props tells you exactly what it needs, no need to trace through the JSX to find out',
      'Safer refactors: rename a prop or change its shape, and every place that breaks lights up immediately, instead of failing silently at runtime',
      'Better autocomplete: the editor knows the exact shape of your props, state and API responses, so it can suggest real fields instead of guessing',
      'Types are free at runtime: they\'re erased entirely during compilation — TypeScript never makes your bundle bigger or your app slower',
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <WithoutTypesExample />
    </div>
  </SectionShell>
)
