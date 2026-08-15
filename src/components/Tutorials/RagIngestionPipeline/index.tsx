import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const IngestDiagram = () => (
  <Panel label="Ingestion, End To End" caption="Runs once per uploaded document, not on every query">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">Client uploads a text/markdown file</Box>
      <Arrow />
      <Box className="w-full">Split into overlapping chunks</Box>
      <Arrow />
      <Box className="w-full">EmbeddingProvider.embed(chunks) — one HTTP call, many chunks</Box>
      <Arrow />
      <Box className="w-full">Bulk insert Document + Chunk rows into Postgres</Box>
    </div>
  </Panel>
)

export const RagIngestionPipelineSection = () => (
  <SectionShell
    title="Backend — Ingestion Pipeline"
    paragraphs={[
      "The /ingest route is where a document becomes searchable. It reads the upload, splits it into chunks, hands the whole batch to whichever EmbeddingProvider is active, and writes the results — text and vector, together — into the chunks table.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="chunking.py — a simple, dependency-free splitter">{`def chunk_text(text: str, chunk_size: int = 800, overlap: int = 100) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks`}</CodeBlock>

      <CodeBlock label="routers/ingest.py">{`from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from auth import CurrentUser
from database import get_db
from providers.base import EmbeddingProvider
from providers.factory import get_embedding_provider
from chunking import chunk_text
import models

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
async def ingest_document(
    file: UploadFile,
    current_user: CurrentUser,
    db: AsyncSession = Depends(get_db),
    embedder: EmbeddingProvider = Depends(get_embedding_provider),
):
    raw = await file.read()
    text = raw.decode("utf-8", errors="ignore")
    if not text.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty")

    pieces = chunk_text(text)
    vectors = await embedder.embed(pieces)

    document = models.Document(filename=file.filename or "untitled", owner_id=current_user.id)
    db.add(document)
    await db.flush()  # assigns document.id without committing yet

    db.add_all([
        models.Chunk(document_id=document.id, text=piece, embedding=vector)
        for piece, vector in zip(pieces, vectors)
    ])
    await db.commit()

    return {"document_id": document.id, "chunks_created": len(pieces)}`}</CodeBlock>

      <IngestDiagram />

      <StepList
        steps={[
          'One embed() call per upload, not one per chunk — batching keeps latency and rate-limit usage down.',
          'db.flush() (not commit) gets document.id assigned so the chunks can reference it, while still inside one transaction.',
          "If the embedding call fails partway, nothing has committed yet — either the whole document is indexed, or none of it is.",
        ]}
      />
    </div>
  </SectionShell>
)
