import { CodeBlock, SectionShell } from '../Shared'

const ModelProvidersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Model Providers & SDKs</span>
    <p className="text-white leading-relaxed text-sm">
      Most projects reach a hosted model through a thin official SDK rather than raw HTTP calls — it handles
      auth, streaming, retries and typed request/response shapes.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        '@anthropic-ai/sdk (Claude) and openai (GPT) — the two most common Node/Python SDKs for hosted, closed-weight models',
        '@anthropic-ai/claude-agent-sdk — for building agents on top of Claude with tool use and the agentic loop handled for you',
        'Google (Gemini), Mistral and Cohere ship comparable official SDKs for their own models',
        'Ollama and vLLM — for running open-weight models (Llama, Mistral, Qwen...) locally or on your own infrastructure instead of a hosted API',
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

const JsEcosystemSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">JavaScript / TypeScript — For A React Frontend Like This One</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">ai</code> (the Vercel AI SDK) is the most common choice for wiring an LLM
      into a React app — it standardizes streaming across providers and ships a <code className="text-[#cea86f]">useChat</code>{' '}
      hook that manages message state, streaming tokens and tool-call results for you, which pairs naturally with{' '}
      <span className="text-[#cea86f]">TanStack Query</span> for everything else you're already fetching.{' '}
      <code className="text-[#cea86f]">zod</code> is the standard way to define and validate the argument schema
      for a tool call before your code executes it. <code className="text-[#cea86f]">langchain.js</code> and{' '}
      <code className="text-[#cea86f]">llamaindex</code> (TS port) offer higher-level orchestration —
      chaining prompts, retrieval and tools — at the cost of more abstraction to learn.
    </p>
    <CodeBlock label="Streaming a chat UI with the Vercel AI SDK">{`import { useChat } from 'ai/react'

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
})

// messages streams in token-by-token as the model responds`}</CodeBlock>
  </div>
)

const PythonEcosystemSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Python — The Default For Model Training & Heavier Pipelines</span>
    <ul className="space-y-2 mt-2">
      {[
        'transformers (Hugging Face) — load, run and fine-tune thousands of open-weight models with a consistent API',
        'sentence-transformers — the standard library specifically for generating embeddings',
        'PyTorch — the underlying deep learning framework most modern models (and transformers itself) are built on',
        'LangChain and LlamaIndex — the two dominant Python orchestration frameworks for building RAG pipelines and agents',
        'PEFT — Hugging Face\'s library for parameter-efficient fine-tuning (LoRA, QLoRA, and similar techniques)',
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

const VectorDbOptionsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Vector Databases</span>
    <ul className="space-y-2 mt-2">
      {[
        'Pinecone, Weaviate, Qdrant — fully managed, built specifically for vector search at scale',
        'Chroma — lightweight and open-source, popular for local development and smaller projects',
        'pgvector — a Postgres extension; the natural choice if you\'re already running Postgres and don\'t want a separate database',
        'FAISS (Facebook AI Similarity Search) — a library, not a database, for very fast in-memory similarity search',
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

const EvalObservabilitySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Evaluation & Observability</span>
    <p className="text-white leading-relaxed text-sm">
      Once an LLM feature is in production, "does it still work" stops being obvious from reading code — output
      is non-deterministic text, not a value you can assert equality on. A small ecosystem exists specifically
      for this: <span className="text-[#cea86f]">Ragas</span> scores RAG pipeline quality (retrieval relevance,
      answer faithfulness), and <span className="text-[#cea86f]">LangSmith</span> and{' '}
      <span className="text-[#cea86f]">Helicone</span> trace and log real production prompts and responses so
      regressions and cost spikes are visible rather than invisible.
    </p>
  </div>
)

export const AiLibrariesAndToolsSection = () => (
  <SectionShell
    title="Libraries & Tools"
    paragraphs={[
      "A practical map of what's actually reached for when building AI features — split by language, since a frontend app calling a hosted model looks very different from a Python pipeline training or fine-tuning one.",
    ]}
  >
    <div className="space-y-6">
      <ModelProvidersSection />
      <JsEcosystemSection />
      <PythonEcosystemSection />
      <VectorDbOptionsSection />
      <EvalObservabilitySection />
    </div>
  </SectionShell>
)
