import { Arrow, Box, Panel, ProsConsCard, SectionShell, StepList } from '../Shared'

const ArchitectureDiagram = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Three Tiers</span>
    <Panel label="Request Path" caption="The frontend never talks to OpenAI, Anthropic, or Ollama directly — only to your own API">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">React + Tailwind frontend (chat UI, document upload)</Box>
        <Arrow />
        <Box className="w-full">FastAPI backend — holds every provider key, exposes /ingest and /query</Box>
        <Arrow />
        <Box className="w-full">Provider abstraction layer — picks OpenAI, Anthropic, or a local Ollama model</Box>
      </div>
    </Panel>
    <Panel label="Storage Path" caption="Runs alongside the request path, on every ingest and every query">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">FastAPI backend</Box>
        <Arrow />
        <Box className="w-full">Postgres + pgvector — chunks, embeddings, similarity search</Box>
      </div>
    </Panel>
  </div>
)

const ProviderTradeoffs = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ProsConsCard
      title="Hosted Providers (OpenAI, Anthropic)"
      pros={[
        'Best-in-class model quality with zero infrastructure to run',
        'No GPU, no ops — just an API key and a request',
        'Easy to mix — e.g. a cheap hosted model for embeddings, a stronger one for chat',
      ]}
      cons={[
        'Costs scale directly with usage — every call spends real money',
        'Your data leaves your machine on every request',
        "Down if they're down — an external dependency in your critical path",
      ]}
    />
    <ProsConsCard
      title="Local LLM (Ollama)"
      pros={[
        'No per-token cost and no data ever leaves the machine',
        'Works fully offline — useful for demos, dev, and privacy-sensitive data',
        'Same HTTP-shaped API as the hosted providers, so it slots into the same abstraction',
      ]}
      cons={[
        'Needs real hardware (GPU/RAM) to run at usable speed',
        'Open models generally trail the top hosted models in raw quality',
        'You own the ops — updates, model downloads, uptime',
      ]}
    />
  </div>
)

export const RagAppOverviewSection = () => (
  <SectionShell
    title="What We're Building"
    paragraphs={[
      "A working RAG app end to end: upload documents, they get chunked and embedded into Postgres, and a chat endpoint answers questions grounded in that data. The concepts behind RAG itself are covered in the AI Fundamentals tutorial — this one is the build.",
      "Two decisions shape the whole backend. First, every AI provider key lives only on the server, in FastAPI's config — the browser never sees them, the same way a database password never does. Second, the backend is built against a provider abstraction, not a specific SDK, so swapping OpenAI for Anthropic — or for a fully local model through Ollama — is a config change, not a rewrite.",
    ]}
  >
    <div className="space-y-6">
      <ArchitectureDiagram />
      <StepList
        steps={[
          'Database first — install pgvector, design the documents/chunks schema, and write the similarity search query everything else depends on.',
          'Backend next — project setup, the provider abstraction (the scalable part), auth to protect your API budget, the ingestion pipeline, the query endpoint, error handling, and tests.',
          'Frontend last — a React + Tailwind chat UI, using Zustand for chat state and TanStack Query to talk to the backend.',
        ]}
      />
      <ProviderTradeoffs />
    </div>
  </SectionShell>
)
