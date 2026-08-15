import { CodeBlock, SectionShell } from '../Shared'

export const RagBackendSetupSection = () => (
  <SectionShell
    title="Backend — Project Setup & Config"
    paragraphs={[
      "Same skeleton as the FastAPI tutorial's blog API — config.py, database.py, auth.py, models.py, schemas.py, a routers/ package — plus one new piece: a providers/ package holding the abstraction the rest of the backend is built against.",
      'The only real difference in config.py is what it now needs to hold: one secret per provider you support, and a couple of plain settings saying which provider is active for chat and for embeddings.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="project layout">{`rag_backend/
├── main.py
├── config.py
├── database.py
├── auth.py
├── models.py
├── schemas.py
├── routers/
│   ├── ingest.py
│   └── query.py
└── providers/
    ├── base.py         # abstract ChatProvider / EmbeddingProvider
    ├── openai.py
    ├── anthropic.py
    ├── ollama.py        # local LLM
    └── factory.py       # picks a concrete provider from settings`}</CodeBlock>

      <CodeBlock label="config.py">{`from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    database_url: str
    secret_key: SecretStr
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Which provider handles each responsibility — swap these, nothing else changes
    chat_provider: str = "openai"        # "openai" | "anthropic" | "ollama"
    embedding_provider: str = "openai"   # "openai" | "ollama"

    # One key per hosted provider — only the ones you actually use need real values
    openai_api_key: SecretStr | None = None
    anthropic_api_key: SecretStr | None = None

    # Local LLM — no key, just where Ollama is listening
    ollama_base_url: str = "http://localhost:11434"

    chat_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"

settings = Settings()  # type: ignore[call-arg]`}</CodeBlock>

      <CodeBlock label=".env">{`DATABASE_URL=postgresql+psycopg://raguser:ragpass@localhost/ragdb
SECRET_KEY=change-me-to-a-long-random-string

CHAT_PROVIDER=openai
EMBEDDING_PROVIDER=openai
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_BASE_URL=http://localhost:11434`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why chat_provider Is A String, Not A Boolean</span>
        <p className="text-white leading-relaxed text-sm">
          A boolean like <code>use_local_llm</code> only ever supports two options. A string setting read by a
          factory function (built in the next section) supports any number of providers without touching{' '}
          <code>config.py</code> again — adding a fourth provider later means writing one new class, not adding a
          new setting and an if/else branch everywhere the old one was checked.
        </p>
      </div>
    </div>
  </SectionShell>
)
