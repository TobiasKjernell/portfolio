import { CodeBlock, SectionShell } from '../Shared'

export const RagTestingAndDockerSection = () => (
  <SectionShell
    title="Backend — Testing & Docker"
    paragraphs={[
      "Tests shouldn't spend real API budget or need a local model running — the same dependency-injection seam that lets the app swap providers at runtime also lets tests swap in a fake one, using FastAPI's app.dependency_overrides, the exact mechanism the FastAPI tutorial already uses to override get_db in tests.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="tests/fakes.py">{`from providers.base import ChatProvider, EmbeddingProvider

class FakeChatProvider(ChatProvider):
    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        return "This is a fake answer for testing."

class FakeEmbeddingProvider(EmbeddingProvider):
    async def embed(self, texts: list[str]) -> list[list[float]]:
        # Deterministic, cheap, and dimension-matched — good enough to exercise the search query
        return [[0.1] * 1536 for _ in texts]`}</CodeBlock>

      <CodeBlock label="tests/conftest.py">{`from main import app
from providers.factory import get_chat_provider, get_embedding_provider
from .fakes import FakeChatProvider, FakeEmbeddingProvider

app.dependency_overrides[get_chat_provider] = lambda: FakeChatProvider()
app.dependency_overrides[get_embedding_provider] = lambda: FakeEmbeddingProvider()`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">This Is Why The Abstraction Pays For Itself</span>
        <p className="text-white leading-relaxed text-sm">
          Because <code>get_chat_provider</code> was written to be a normal FastAPI dependency instead of a
          module-level import, tests never touch OpenAI, Anthropic, or Ollama at all — the ingestion and query tests
          run fast, offline, and free, and they still exercise the real chunking, embedding-storage, and similarity
          search code paths end to end.
        </p>
      </div>

      <CodeBlock label="Dockerfile">{`FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}</CodeBlock>

      <CodeBlock label="docker-compose.yml — full backend + database">{`services:
  api:
    build: .
    env_file: .env
    ports:
      - "8000:8000"
    depends_on:
      - db

  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: raguser
      POSTGRES_PASSWORD: ragpass
      POSTGRES_DB: ragdb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}</CodeBlock>

      <p className="text-white leading-relaxed text-sm">
        If you're pointing <code>chat_provider</code> at Ollama, it needs to be reachable from inside the{' '}
        <code>api</code> container too — either run Ollama on the host and set{' '}
        <code>OLLAMA_BASE_URL=http://host.docker.internal:11434</code>, or add it as a third service in the same
        compose file.
      </p>
    </div>
  </SectionShell>
)
