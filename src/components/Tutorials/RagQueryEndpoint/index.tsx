import { CodeBlock, SectionShell } from '../Shared'

export const RagQueryEndpointSection = () => (
  <SectionShell
    title="Backend — The RAG Query Endpoint"
    paragraphs={[
      "This is where everything from the previous sections meets: the schema and search query from the database sections, the provider abstraction, and CurrentUser from auth all come together in a single route. It embeds the question, retrieves the closest chunks scoped to that user's own documents, builds a grounded prompt, and asks the active ChatProvider for an answer.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="schemas.py">{`from pydantic import BaseModel

class QueryRequest(BaseModel):
    question: str

class SourceChunk(BaseModel):
    document_id: int
    text: str

class QueryResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]`}</CodeBlock>

      <CodeBlock label="routers/query.py">{`from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from auth import CurrentUser
from database import get_db
from providers.base import ChatProvider, EmbeddingProvider
from providers.factory import get_chat_provider, get_embedding_provider
from schemas import QueryRequest, QueryResponse, SourceChunk
import models

router = APIRouter()

SYSTEM_PROMPT = (
    "Answer using only the context below. If the answer isn't in the context, say you don't know."
)

@router.post("/query", response_model=QueryResponse)
async def query(
    request: QueryRequest,
    current_user: CurrentUser,
    db: AsyncSession = Depends(get_db),
    embedder: EmbeddingProvider = Depends(get_embedding_provider),
    chat: ChatProvider = Depends(get_chat_provider),
):
    [query_vector] = await embedder.embed([request.question])

    result = await db.execute(
        select(models.Chunk)
        .join(models.Document)
        .where(models.Document.owner_id == current_user.id)
        .order_by(models.Chunk.embedding.cosine_distance(query_vector))
        .limit(4)
    )
    chunks = list(result.scalars().all())

    context = "\\n\\n".join(chunk.text for chunk in chunks)
    prompt = f"Context:\\n{context}\\n\\nQuestion: {request.question}"

    answer = await chat.chat(system=SYSTEM_PROMPT, messages=[{"role": "user", "content": prompt}])

    return QueryResponse(
        answer=answer,
        sources=[SourceChunk(document_id=c.document_id, text=c.text) for c in chunks],
    )`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Notice What's Not Here</span>
        <p className="text-white leading-relaxed text-sm">
          Nothing in this route imports <code>openai</code>, <code>anthropic</code>, or knows Ollama exists — that's
          the entire point of the abstraction from the earlier section. Switching the whole app from a hosted model
          to a fully local one is a one-line change in <code>.env</code>, with this route untouched.
        </p>
      </div>
    </div>
  </SectionShell>
)
