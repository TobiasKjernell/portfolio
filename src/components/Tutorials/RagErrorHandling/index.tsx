import { CodeBlock, SectionShell, StepList } from '../Shared'

export const RagErrorHandlingSection = () => (
  <SectionShell
    title="Backend — Error Handling"
    paragraphs={[
      "The FastAPI tutorial's main.py registers handlers for StarletteHTTPException and RequestValidationError so every /api error comes back as clean JSON. This backend keeps both, unchanged, and adds one more layer: providers fail in their own specific ways — timeouts, rate limits, an unreachable local Ollama — and those shouldn't surface as a raw 500 with a stack trace.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="providers/errors.py">{`class ProviderError(Exception):
    """Base class for anything a provider adapter can raise."""

class ProviderTimeoutError(ProviderError):
    pass

class ProviderRateLimitError(ProviderError):
    pass

class ProviderUnavailableError(ProviderError):
    """Covers a local Ollama instance that isn't running, or a hosted API that's down."""`}</CodeBlock>

      <CodeBlock label="providers/ollama.py — translating a low-level error into a domain one">{`import httpx
from .errors import ProviderTimeoutError, ProviderUnavailableError

class OllamaChatProvider(ChatProvider):
    async def chat(self, system: str, messages: list[dict[str, str]]) -> str:
        try:
            async with httpx.AsyncClient(base_url=settings.ollama_base_url, timeout=60) as client:
                response = await client.post("/api/chat", json={...})
                response.raise_for_status()
        except httpx.TimeoutException as err:
            raise ProviderTimeoutError("Local model took too long to respond") from err
        except httpx.ConnectError as err:
            raise ProviderUnavailableError("Could not reach Ollama — is it running?") from err

        return response.json()["message"]["content"]`}</CodeBlock>

      <CodeBlock label="main.py — same pattern as the blog API, one more handler added">{`from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exception_handlers import http_exception_handler, request_validation_exception_handler
from providers.errors import ProviderError, ProviderRateLimitError, ProviderTimeoutError

app = FastAPI(title="RAG API")

@app.exception_handler(StarletteHTTPException)
async def general_http_exception_handler(request: Request, exception: StarletteHTTPException):
    if request.url.path.startswith("/api"):
        return await http_exception_handler(request, exception)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exception: RequestValidationError):
    if request.url.path.startswith("/api"):
        return await request_validation_exception_handler(request, exception)

@app.exception_handler(ProviderError)
async def provider_error_handler(request: Request, exception: ProviderError):
    status_code = 429 if isinstance(exception, ProviderRateLimitError) else 503 if isinstance(exception, ProviderTimeoutError) else 502
    return JSONResponse(status_code=status_code, content={"detail": str(exception)})`}</CodeBlock>

      <StepList
        steps={[
          'Each provider adapter catches its own SDK/HTTP exceptions and re-raises one of the small ProviderError subclasses.',
          'Routes never catch these themselves — they just let a ProviderError propagate, same as any other exception.',
          'One app-level handler maps the exception type to an HTTP status and a safe message, so every provider — present or future — gets consistent error responses for free.',
        ]}
      />
    </div>
  </SectionShell>
)
