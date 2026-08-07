import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const EngineSessionDiagram = () => (
  <Panel label="Engine vs. Session" caption="One engine for the whole app, one fresh session per request">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">create_async_engine(DATABASE_URL) — one, created once at startup</Box>
      <Arrow />
      <Box className="w-full">async_sessionmaker(engine) — a factory that produces sessions</Box>
      <Arrow />
      <Box className="w-full">get_db() dependency — opens a session, yields it, closes it after the request</Box>
      <Arrow />
      <Box className="w-full">Route function — talks to the database through that one session</Box>
    </div>
  </Panel>
)

export const DatabaseConnectionSection = () => (
  <SectionShell
    title="Connecting To The Database"
    paragraphs={[
      "This project uses PostgreSQL through SQLAlchemy 2.0's async API. SQLAlchemy is an ORM (Object-Relational Mapper): it lets you work with Python classes and objects instead of writing raw SQL strings by hand.",
      "The async part matters for a web server specifically: while one request is waiting on the database to respond, async lets the same process pick up and start handling a different request instead of sitting idle. That's the whole reason FastAPI is fast under real load with a database in the picture.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="terminal">{`pip install "sqlalchemy[asyncio]" psycopg[binary]`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
        <span className="text-sm font-semibold gold-text">What SQLAlchemy Actually Does</span>
        <p className="text-white leading-relaxed text-sm">
          Without an ORM, talking to Postgres from Python means writing SQL as raw strings, sending them over the
          connection by hand, and manually turning the rows that come back into objects your code can use:
        </p>
        <CodeBlock label="raw SQL — what you'd write without an ORM">{`cursor.execute("SELECT id, title, content FROM posts WHERE id = %s", (post_id,))
row = cursor.fetchone()
post = {"id": row[0], "title": row[1], "content": row[2]}  # by hand, every time`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          SQLAlchemy lets you express the same thing as Python objects and method calls instead. It builds the SQL
          for you, sends it, and turns the result rows back into real instances of your model classes:
        </p>
        <CodeBlock label="the same query through SQLAlchemy">{`result = await db.execute(select(Post).where(Post.id == post_id))
post = result.scalars().first()  # already a real Post object — post.title, post.content, ...`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          That's the whole value of an ORM: you write and think in Python (classes, attributes, method chains), and
          SQLAlchemy is the layer translating that into correct SQL underneath. It also tracks which objects came
          from the database, so calling <code>db.add(post)</code> and <code>await db.commit()</code> later knows
          exactly what changed and generates the right <code>INSERT</code>/<code>UPDATE</code> statements itself.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">SQLAlchemy vs. psycopg — Two Different Layers</span>
        <p className="text-white leading-relaxed text-sm">
          SQLAlchemy never actually opens a network connection to Postgres itself — that low-level job belongs to a{' '}
          <strong>database driver</strong>, and for Postgres that's <code>psycopg</code>. Psycopg knows how to open a
          TCP connection, authenticate, and speak Postgres' specific wire protocol; it has no idea what an ORM or a
          model class is. SQLAlchemy sits on top, generates the SQL text, and hands it to psycopg to actually send.
          You'll rarely import psycopg directly — it's installed so SQLAlchemy has something to talk to Postgres
          with, referenced only in the connection string:
        </p>
        <CodeBlock>{`postgresql+psycopg://bloguser:bogpass@localhost/blog
#            ^^^^^^^ this segment is what tells SQLAlchemy which driver to load`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          Swapping to a different database later (say, MySQL) would mean changing this driver segment and installing
          a different driver package — the SQLAlchemy code above it, your models and your queries, would stay
          exactly the same.
        </p>
      </div>

      <CodeBlock label="database.py">{`from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from config import settings

# the connection to Postgres — created once, reused for the app's lifetime
engine = create_async_engine(settings.database_url)

# a factory that hands out new sessions on demand
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# a dependency: opens a session, gives it to the route, closes it when the request is done
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session`}</CodeBlock>

      <EngineSessionDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why get_db() Is A Generator</span>
        <p className="text-white leading-relaxed text-sm">
          <code>get_db</code> uses <code>yield</code> instead of <code>return</code> on purpose. FastAPI runs
          everything before the <code>yield</code> first (opening the session), hands that session to your route via{' '}
          <code>Depends(get_db)</code>, waits for the route to finish, and only then runs whatever comes after the{' '}
          <code>yield</code> — here, nothing extra is needed because the <code>async with</code> block closes the
          session automatically. This guarantees every request gets its own session and that session is always
          cleaned up, even if the route raises an error.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">expire_on_commit=False</span>
        <p className="text-white leading-relaxed text-sm">
          By default, SQLAlchemy "expires" every object after a <code>commit()</code>, forcing a fresh query the
          next time you touch one of its attributes. Turning that off means you can keep reading an object's fields
          right after saving it — useful in a request/response cycle where you commit a new post and then
          immediately serialize it back to the client.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Using The Dependency In A Route</span>
        <CodeBlock>{`from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db

@app.get("/ping-db")
async def ping_db(db: Annotated[AsyncSession, Depends(get_db)]):
    return {"connected": db.is_active}`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          <code>Annotated[AsyncSession, Depends(get_db)]</code> is the pattern you'll see on nearly every route from
          here on — it tells FastAPI "before running this function, call get_db(), and pass whatever it yields in as
          this argument."
        </p>
      </div>
    </div>
  </SectionShell>
)
