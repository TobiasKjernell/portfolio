import { CodeBlock, SectionShell } from '../Shared'

const RolesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">System, User & Assistant — The Three Roles</span>
    <p className="text-white leading-relaxed text-sm">
      Nearly every chat-style API structures a conversation as a list of role-tagged messages, not one long blob
      of text. The <span className="text-[#cea86f]">system prompt</span> sets standing instructions for the whole
      conversation — persona, constraints, output format — and is generally given more weight than anything a
      user says afterward. <span className="text-[#cea86f]">User</span> messages are the human's turns,{' '}
      <span className="text-[#cea86f]">assistant</span> messages are the model's previous replies, included again
      on every call so the model has the full conversation history — the model itself has no memory between API
      calls; the illusion of memory is just the app resending the transcript each time.
    </p>
    <CodeBlock label="A typical chat request">{`{
  "system": "You are a concise support agent. Answer in 2 sentences max.",
  "messages": [
    { "role": "user", "content": "How do I reset my password?" },
    { "role": "assistant", "content": "Go to Settings > Security > Reset Password." },
    { "role": "user", "content": "And if I don't have access to my email?" }
  ]
}`}</CodeBlock>
  </div>
)

const ZeroFewShotSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Zero-Shot vs Few-Shot Prompting</span>
    <p className="text-white leading-relaxed text-sm">
      <span className="text-[#cea86f]">Zero-shot</span> means asking for a task with no examples — just an
      instruction, relying entirely on what the model already learned during training.{' '}
      <span className="text-[#cea86f]">Few-shot</span> means showing the model a small number of example
      input/output pairs directly in the prompt before the real request. This is often enough to lock in a
      specific format or tone without any fine-tuning at all — it works because the model is, at its core, still
      just predicting the most plausible continuation, and a few clear examples make that continuation obvious.
    </p>
    <CodeBlock label="Few-shot prompt for classifying support ticket urgency">{`Classify each ticket as "low", "medium", or "high" urgency.

Ticket: "Love the new dashboard, small suggestion for a future update."
Urgency: low

Ticket: "Getting a 500 error on checkout, customers can't pay."
Urgency: high

Ticket: "My export is taking a long time to download."
Urgency:`}</CodeBlock>
  </div>
)

const ChainOfThoughtSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Chain-Of-Thought & Reasoning Models</span>
    <p className="text-white leading-relaxed text-sm">
      Because generation is sequential — each token conditions on everything before it — a model that's asked to
      "think step by step" before giving a final answer tends to get harder problems right more often than one
      asked to answer immediately. Writing out intermediate steps gives the model more tokens of relevant context
      to condition its final answer on, effectively more "compute" spent per problem. This idea is now often
      built directly into the model rather than left to prompting: dedicated{' '}
      <span className="text-[#cea86f]">reasoning models</span> are trained to generate an extended internal
      reasoning process before responding, trading extra latency and tokens for meaningfully better accuracy on
      hard problems.
    </p>
  </div>
)

const ContextManagementSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Managing The Context Window In Practice</span>
    <p className="text-white leading-relaxed text-sm">
      A large context window doesn't mean you should always fill it. Beyond the raw token cost, stuffing in
      everything you have tends to dilute attention on what actually matters for the current question — the same
      "context rot" problem mentioned earlier. Production systems generally manage this deliberately rather than
      just hoping a bigger window fixes it.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        'Retrieve only what\'s relevant (RAG) instead of pasting an entire knowledge base into every prompt',
        'Summarize older parts of a long conversation instead of keeping the full transcript verbatim forever',
        'Put the most important instructions in the system prompt, since the model tends to weight it heavily and consistently',
        "Trim or compact tool outputs before feeding them back in — a raw API response is often far more verbose than what's actually needed",
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

export const PromptingAndContextSection = () => (
  <SectionShell
    title="Prompting & Context"
    paragraphs={[
      "Prompt engineering is really just the practice of controlling what goes into the context window, and in what shape, since that's the only lever you have over next-token prediction. A handful of well-understood patterns cover most of what's needed.",
    ]}
  >
    <div className="space-y-6">
      <RolesSection />
      <ZeroFewShotSection />
      <ChainOfThoughtSection />
      <ContextManagementSection />
    </div>
  </SectionShell>
)
