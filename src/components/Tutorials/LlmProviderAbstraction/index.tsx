import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const AbstractionDiagram = () => (
  <Panel label="One Interface, Several Backends" caption="Routes and business logic only ever depend on the abstract interface, never a specific SDK">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">Routes call ChatProvider.chat(...) / EmbeddingProvider.embed(...)</Box>
      <Arrow />
      <Box className="w-full">get_chat_provider() reads settings.chat_provider and returns one concrete class</Box>
      <Arrow />
      <Box className="w-full">OpenAIChatProvider · AnthropicChatProvider · OllamaChatProvider (local)</Box>
    </div>
  </Panel>
)

export const LlmProviderAbstractionSection = () => (
  <SectionShell
    title="Backend — A Scalable Provider Abstraction"
    paragraphs={[
      "This is the piece that makes the backend “scalable to different providers” in practice, not just in principle: define what a chat model and an embedding model can do as two small abstract base classes, then write one thin adapter per provider that implements them. Every route in the app is written against the abstract interface — it has no idea, and no reason to care, whether it's talking to OpenAI, Anthropic, or a model running locally through Ollama.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="providers/base.py">{`from abc import ABC, abstractmethod

class ChatProvider(ABC):
    @abstractmethod
    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        """Send a conversation, return the model's text reply."""

class EmbeddingProvider(ABC):
    @abstractmethod
    async def embed(self, texts: list[str]) -> list[list[float]]:
        """Return one embedding vector per input string, same order."""`}</CodeBlock>

      <StepList
        steps={[
          'Every provider — hosted or local — implements these same two methods, so nothing outside providers/ ever branches on which one is active.',
          'Each concrete class owns its own SDK/HTTP client and its own error translation, keeping provider-specific quirks out of the routes.',
          'A factory function reads settings.chat_provider / settings.embedding_provider once and returns the matching instance.',
          'Routes depend on the factory through FastAPI\'s Depends(), the same dependency-injection pattern get_db already uses.',
        ]}
      />

      <CodeBlock label="providers/openai.py">{`from openai import AsyncOpenAI
from config import settings
from .base import ChatProvider, EmbeddingProvider

class OpenAIChatProvider(ChatProvider):
    def __init__(self) -> None:
        self._client = AsyncOpenAI(api_key=settings.openai_api_key.get_secret_value())

    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        response = await self._client.chat.completions.create(
            model=settings.chat_model,
            messages=[{"role": "system", "content": system}, *messages],
        )
        return response.choices[0].message.content or ""

class OpenAIEmbeddingProvider(EmbeddingProvider):
    def __init__(self) -> None:
        self._client = AsyncOpenAI(api_key=settings.openai_api_key.get_secret_value())

    async def embed(self, texts: list[str]) -> list[list[float]]:
        response = await self._client.embeddings.create(model=settings.embedding_model, input=texts)
        return [item.embedding for item in response.data]`}</CodeBlock>

      <CodeBlock label="providers/anthropic.py">{`from anthropic import AsyncAnthropic
from config import settings
from .base import ChatProvider

class AnthropicChatProvider(ChatProvider):
    def __init__(self) -> None:
        self._client = AsyncAnthropic(api_key=settings.anthropic_api_key.get_secret_value())

    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        response = await self._client.messages.create(
            model=settings.chat_model,
            system=system,
            messages=messages,
            max_tokens=1024,
        )
        return response.content[0].text`}</CodeBlock>

      <CodeBlock label="providers/ollama.py — local LLM, same interface">{`import httpx
from config import settings
from .base import ChatProvider, EmbeddingProvider

class OllamaChatProvider(ChatProvider):
    """No API key — just an HTTP call to a model running on your own machine."""

    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        async with httpx.AsyncClient(base_url=settings.ollama_base_url, timeout=60) as client:
            response = await client.post(
                "/api/chat",
                json={
                    "model": settings.chat_model,
                    "messages": [{"role": "system", "content": system}, *messages],
                    "stream": False,
                },
            )
            response.raise_for_status()
            return response.json()["message"]["content"]

class OllamaEmbeddingProvider(EmbeddingProvider):
    async def embed(self, texts: list[str]) -> list[list[float]]:
        async with httpx.AsyncClient(base_url=settings.ollama_base_url, timeout=60) as client:
            vectors = []
            for text in texts:
                response = await client.post("/api/embeddings", json={"model": settings.embedding_model, "prompt": text})
                response.raise_for_status()
                vectors.append(response.json()["embedding"])
            return vectors`}</CodeBlock>

      <CodeBlock label="providers/factory.py">{`from functools import lru_cache
from config import settings
from .base import ChatProvider, EmbeddingProvider
from .openai import OpenAIChatProvider, OpenAIEmbeddingProvider
from .anthropic import AnthropicChatProvider
from .ollama import OllamaChatProvider, OllamaEmbeddingProvider

@lru_cache
def get_chat_provider() -> ChatProvider:
    match settings.chat_provider:
        case "openai":
            return OpenAIChatProvider()
        case "anthropic":
            return AnthropicChatProvider()
        case "ollama":
            return OllamaChatProvider()
        case other:
            raise ValueError(f"Unknown chat_provider: {other!r}")

@lru_cache
def get_embedding_provider() -> EmbeddingProvider:
    match settings.embedding_provider:
        case "openai":
            return OpenAIEmbeddingProvider()
        case "ollama":
            return OllamaEmbeddingProvider()
        case other:
            raise ValueError(f"Unknown embedding_provider: {other!r}")`}</CodeBlock>

      <AbstractionDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why @lru_cache Instead Of A New Instance Per Request</span>
        <p className="text-white leading-relaxed text-sm">
          <code>get_chat_provider</code> is called through <code>Depends()</code> on every request, but the provider
          itself — its HTTP client, its SDK instance — is safe and cheap to reuse across requests. Caching it means
          FastAPI's dependency injection still gives every route a clean, swappable seam (exactly what makes the
          testing section's fake provider possible), without paying to reconnect a client on every single call.
        </p>
      </div>
    </div>
  </SectionShell>
)
