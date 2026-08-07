import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const MigrationFlowDiagram = () => (
  <Panel label="The Alembic Loop" caption="Every schema change goes through this cycle, never a manual ALTER TABLE">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">1. Edit models.py (add a column, a table, change a type)</Box>
      <Arrow />
      <Box className="w-full">2. alembic revision --autogenerate -m "..." → writes a new file in alembic/versions/</Box>
      <Arrow />
      <Box className="w-full">3. Read the generated file — autogenerate is a draft, not gospel</Box>
      <Arrow />
      <Box className="w-full">4. alembic upgrade head → actually runs it against the database</Box>
    </div>
  </Panel>
)

export const MigrationsWithAlembicSection = () => (
  <SectionShell
    title="Migrations With Alembic"
    paragraphs={[
      "So far, nothing has actually created the users or posts tables in Postgres — models.py only describes them in Python. A common early-project shortcut is Base.metadata.create_all(), which creates any missing tables at startup. It's fine for a first prototype, but it can't handle changing an existing table — renaming a column, adding a NOT NULL constraint to a table that already has rows, adding a foreign key. That's what Alembic is for: a proper migration tool that tracks schema changes as an ordered series of small, reviewable Python scripts.",
      "Run alembic init alembic once to scaffold the folder structure.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="terminal">{`pip install alembic`}</CodeBlock>

      <StepList
        steps={[
          'alembic init alembic — creates alembic.ini and an alembic/ folder with env.py and versions/',
          'Point alembic/env.py at your models\' Base.metadata and your DATABASE_URL, so autogenerate can compare them against the real database',
          'Change a model, then run alembic revision --autogenerate -m "add likes to posts"',
          'Open the generated file in alembic/versions/ and read it — autogenerate is good, not infallible',
          'Run alembic upgrade head to apply it',
        ]}
      />

      <MigrationFlowDiagram />

      <CodeBlock label="alembic/versions/b7220b746d29_add_likes_to_posts.py">{`from alembic import op
import sqlalchemy as sa

revision = "b7220b746d29"
down_revision = "1e567657e081"

def upgrade() -> None:
    op.add_column(
        "posts",
        sa.Column("likes", sa.Integer(), nullable=False, server_default="0"),
    )

def downgrade() -> None:
    op.drop_column("posts", "likes")`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">upgrade / downgrade, revision / down_revision</span>
        <p className="text-white leading-relaxed text-sm">
          Every migration file has an <code>upgrade()</code> (apply this change) and a <code>downgrade()</code>{' '}
          (undo it) — Alembic can move a database forward or backward through the whole history one file at a time.{' '}
          <code>revision</code> and <code>down_revision</code> chain the files together into an ordered list, the
          same way each Git commit points at its parent, so Alembic always knows what order to apply them in
          regardless of the filenames.
        </p>
      </div>

      <CodeBlock label="terminal">{`alembic revision --autogenerate -m "add likes to posts"
alembic upgrade head    # apply every migration up to the latest
alembic downgrade -1    # undo just the most recent one`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why This Replaces create_all()</span>
        <p className="text-white leading-relaxed text-sm">
          <code>create_all()</code> only ever creates tables that don't exist yet — it never alters an existing
          one, so the moment you add a column to a table with real rows in it, the database and your models.py
          silently drift apart. Alembic migrations are files, so they get committed to Git, reviewed in pull
          requests, and applied identically on every developer's machine and in production — the schema change has a
          history, the same way the code does.
        </p>
      </div>
    </div>
  </SectionShell>
)
