import { CodeBlock, SectionShell, StepList } from '../Shared'

export const PgvectorSearchSection = () => (
  <SectionShell
    title="DB — Similarity Search"
    paragraphs={[
      "Retrieval is just a query: embed the question with the same model used to embed the chunks, then ask Postgres for the rows whose embedding column is closest to that vector. pgvector adds distance operators for this — <=> for cosine distance, the standard choice for text embeddings.",
      'SQLAlchemy exposes it as a method on the mapped column, so it reads like any other ordered query — no raw SQL required for the common case.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="crud.py — top-k similarity search">{`from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import models

async def search_chunks(db: AsyncSession, query_vector: list[float], top_k: int = 4) -> list[models.Chunk]:
    result = await db.execute(
        select(models.Chunk)
        .order_by(models.Chunk.embedding.cosine_distance(query_vector))
        .limit(top_k)
    )
    return list(result.scalars().all())`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Distance, Not Similarity</span>
        <p className="text-white leading-relaxed text-sm">
          <code>cosine_distance</code> returns a smaller number for closer vectors, so ordering ascending and taking
          the first <code>top_k</code> gives the best matches — it's the inverse of "similarity score," which is why
          the query has no <code>.desc()</code>. pgvector also ships <code>l2_distance</code> and{' '}
          <code>max_inner_product</code> for other embedding models that expect a different metric — cosine is the
          right default for OpenAI and most sentence-embedding models.
        </p>
      </div>

      <StepList
        steps={[
          "Without an index, this is a sequential scan — Postgres computes the distance to every row, exact but linear in table size.",
          "That's fine up to roughly tens of thousands of chunks; past that, add an approximate-nearest-neighbor index.",
          'HNSW is the better default in modern pgvector — better query speed/recall tradeoff, though slower to build than IVFFlat.',
        ]}
      />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Where This SQL Actually Runs</span>
        <p className="text-white leading-relaxed text-sm">
          This is plain SQL, not a Python API — it doesn't have a SQLAlchemy equivalent to call. While you're
          developing and just want the index to exist right now, run it directly against the database with{' '}
          <code>psql</code>:
        </p>
        <CodeBlock label="psql -U raguser -d ragdb -h localhost">{`CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);

-- or, the older/cheaper-to-build alternative:
CREATE INDEX ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          But an index is still part of the schema, so once this is more than a local experiment it belongs in an
          Alembic migration — the same one from the schema section — so it's created automatically by{' '}
          <code>alembic upgrade head</code> on every environment instead of being a manual step someone has to
          remember to run against production. This is the one part of that migration <code>--autogenerate</code>{' '}
          won't write for you: HNSW/ivfflat aren't Postgres's default index type, so unless the index is also
          declared explicitly on the model as a SQLAlchemy <code>Index</code> with{' '}
          <code>postgresql_using="hnsw"</code> and matching <code>postgresql_ops</code>, Alembic has no way to know
          it should exist — simplest is to add it as a plain <code>op.execute()</code> call in the generated file
          instead:
        </p>
        <CodeBlock label="alembic/versions/xxxx_add_chunks_table.py">{`def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")
    op.create_table("chunks", ...)
    op.execute("CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops)")

def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS chunks_embedding_idx")
    op.drop_table("chunks")`}</CodeBlock>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Approximate Means Approximate</span>
        <p className="text-white leading-relaxed text-sm">
          Both index types trade a small amount of recall (occasionally missing the true nearest neighbor) for a
          large speedup — the same tradeoff behind every ANN index. For a RAG system pulling the top 4-5 chunks out
          of a much larger candidate set, that tradeoff is almost always worth it; the operator (<code>vector_cosine_ops</code>) has to match the distance function used at query time, or the index won't be used at all.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
        <span className="text-sm font-semibold gold-text">Putting It All Together: The Complete Migration</span>
        <p className="text-white leading-relaxed text-sm">
          That's every piece the database section has touched — the extension, both tables, the embedding column,
          and the index — in the single migration file that actually creates them, autogenerated parts and
          hand-written parts together:
        </p>
        <CodeBlock label="alembic/versions/c1a2b3d4e5f6_add_documents_and_chunks.py">{`"""add documents and chunks tables with pgvector"""
from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector

# revision identifiers, used by Alembic
revision = "c1a2b3d4e5f6"
down_revision = "b7220b746d29"  # whatever your latest revision was before this one


def upgrade() -> None:
    # hand-written — autogenerate never creates extensions
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")

    # autogenerated — diffed straight from models.py
    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("filename", sa.String(), nullable=False),
        sa.Column("owner_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
    )
    op.create_table(
        "chunks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("document_id", sa.Integer(), sa.ForeignKey("documents.id"), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("embedding", Vector(1536), nullable=False),
    )

    # hand-written — autogenerate doesn't know about pgvector's index types
    op.execute("CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops)")


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS chunks_embedding_idx")
    op.drop_table("chunks")
    op.drop_table("documents")`}</CodeBlock>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Getting It Onto The Database</span>
        <p className="text-white leading-relaxed text-sm">
          This file on its own does nothing — it's a plan, not a change. It only touches the database when Alembic
          runs it, using the same <code>alembic.ini</code> / <code>alembic/env.py</code> setup from the FastAPI
          tutorial, which points Alembic at <code>settings.database_url</code>.
        </p>
        <StepList
          steps={[
            'Add the Document and Chunk models to models.py first — autogenerate diffs against them, so the migration is generated from real model definitions, not written from scratch.',
            'Run alembic revision --autogenerate -m "add documents and chunks tables" — this writes the file above, minus the two hand-written op.execute() lines.',
            'Open the generated file and add those two lines yourself: CREATE EXTENSION before the table creation, CREATE INDEX after it.',
            'Run alembic upgrade head — Alembic connects using database_url, checks which revisions have already been applied, and runs every unapplied one, in order, up to this one.',
            'Verify it landed: \\d chunks in psql should show the embedding column as vector(1536), and \\di should list the new hnsw index.',
          ]}
        />
        <CodeBlock label="terminal">{`alembic revision --autogenerate -m "add documents and chunks tables"
# edit the generated file: add CREATE EXTENSION + CREATE INDEX
alembic upgrade head`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          From here, the database side is done — documents and chunks exist, embeddings can be stored, and{' '}
          <code>search_chunks</code> from earlier in this section can run against real data. The backend section
          picks up right here.
        </p>
      </div>
    </div>
  </SectionShell>
)
