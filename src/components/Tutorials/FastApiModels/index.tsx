import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const RelationshipDiagram = () => (
  <Panel label="One User, Many Posts" caption="A one-to-many relationship, the most common shape in a relational schema">
    <div className="flex items-center gap-4 w-full">
      <Box className="flex-1">User (id, username, email)</Box>
      <Arrow dir="right" />
      <div className="flex-1 flex flex-col gap-2">
        <Box>Post (id, title, user_id → User.id)</Box>
        <Box>Post (id, title, user_id → User.id)</Box>
      </div>
    </div>
  </Panel>
)

export const FastApiModelsSection = () => (
  <SectionShell
    title="Database Models"
    paragraphs={[
      'A model is a Python class that describes one database table. SQLAlchemy 2.0\'s declarative style uses Mapped[...] type annotations and mapped_column() so the shape of the table lives right next to the shape of the Python object — no separate schema file to keep in sync by hand.',
      "We start with the two tables the blog actually needs: User and Post. Every model inherits from the Base class we defined in database.py in the previous step.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="models.py">{`from datetime import UTC, datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(200), nullable=False)

    posts: Mapped[list["Post"]] = relationship(
        back_populates="author", cascade="all, delete-orphan"
    )

class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    date_posted: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC)
    )

    author: Mapped["User"] = relationship(back_populates="posts")`}</CodeBlock>

      <RelationshipDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Reading mapped_column</span>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><code>Mapped[int]</code> / <code>Mapped[str]</code> — the Python-side type, used for editor autocomplete and static type checking</li>
          <li><code>mapped_column(...)</code> — the database-side details: column type, whether it's unique, nullable, a primary key</li>
          <li><code>ForeignKey("users.id")</code> — tells Postgres that every post's user_id must point at a real row in users</li>
          <li><code>relationship(...)</code> — not a real column at all; it's a convenience so Python code can write post.author or user.posts instead of writing the join manually</li>
        </ul>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">cascade="all, delete-orphan"</span>
        <p className="text-white leading-relaxed text-sm">
          Without this, deleting a User whose posts still exist would either fail (a foreign key violation) or leave
          orphaned rows behind. This cascade tells SQLAlchemy: when a user is deleted, delete their posts too, in the
          same transaction.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">A Computed Field That Isn't A Column</span>
        <p className="text-white leading-relaxed text-sm">
          Not everything on a model has to be a stored column. A profile picture URL, for example, can be derived on
          the fly from a stored filename plus some config, using a plain Python <code>@property</code>:
        </p>
        <CodeBlock>{`class User(Base):
    ...
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True, default=None)

    @property
    def image_path(self) -> str:
        if self.image_file:
            return f"https://{settings.s3_bucket_name}.s3.{settings.s3_region}.amazonaws.com/profile_pics/{self.image_file}"
        return ""`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          <code>image_file</code> is what actually lives in the database; <code>image_path</code> is computed
          fresh every time it's accessed and never stored — a useful distinction to keep in mind once we get to
          schemas in the next step.
        </p>
      </div>
    </div>
  </SectionShell>
)
