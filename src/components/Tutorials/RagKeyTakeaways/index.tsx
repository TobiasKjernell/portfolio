import { SectionShell } from '../Shared'

export const RagKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "The whole system rests on one idea, applied three times: keep the seams narrow. The frontend only ever talks to your own API, never a provider's. Routes only ever talk to an abstract ChatProvider/EmbeddingProvider, never a specific SDK. And the database only ever sees a plain vector column, regardless of which model produced it.",
      "That's what makes the three promises in the brief — scalable across providers, local-LLM-capable, keys never exposed — hold up as the app grows, instead of being true only on day one.",
    ]}
    points={[
      'Provider keys live only in the backend\'s Settings, as SecretStr — the frontend never has one, the same way it never has a database password',
      'A ChatProvider / EmbeddingProvider abstract base class plus a factory function is what makes "add Anthropic" or "go fully local with Ollama" a new class, not a rewrite',
      'The same CurrentUser JWT dependency that protects the blog API\'s routes protects the AI ones too — every call here spends real budget or real compute',
      'pgvector turns Postgres itself into the vector store — one database, one connection, one set of migrations, no separate service to run',
      'cosine_distance with an HNSW index is the right default; add the index once chunk counts move past the tens of thousands',
      'FastAPI\'s dependency injection (Depends) is what makes both the provider swap and testing with fakes possible — it\'s the same mechanism as get_db, just pointed at a different kind of dependency',
    ]}
  />
)
