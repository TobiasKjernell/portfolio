import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const ModelVsSchemaDiagram = () => (
  <Panel label="Model vs. Schema — Two Different Jobs" caption="Never return a database model directly from a route">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">models.User — describes a row in the database (has password_hash!)</Box>
      <Arrow />
      <Box className="w-full">schemas.UserPublic — describes exactly what the API is allowed to send back</Box>
      <Arrow />
      <Box className="w-full">JSON response — only the fields the schema listed, nothing else leaks out</Box>
    </div>
  </Panel>
)

export const PydanticSchemasSection = () => (
  <SectionShell
    title="Pydantic Schemas"
    paragraphs={[
      "A SQLAlchemy model describes what's in the database. A Pydantic schema describes what's allowed to cross the wire — as a request coming in, or a response going out. They are deliberately kept separate: a User model has a password_hash column, but no response schema should ever include it.",
      "The common pattern for every resource is a small family of schemas: a Create schema for what's required to make a new one, an Update schema where every field is optional (so a PATCH can send just the fields that changed), and a Response schema for what the API sends back.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="schemas.py">{`from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, EmailStr

class UserBase(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    email: EmailStr = Field(max_length=120)

class UserCreate(UserBase):
    password: str = Field(min_length=8)

class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    image_path: str

class UserPrivate(UserPublic):
    email: EmailStr  # only ever returned to the user themselves, e.g. from /me

class PostBase(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=100)
    content: str | None = Field(default=None, min_length=1)

class PostResponse(PostBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    date_posted: datetime
    author: UserPublic

class PaginatedPostsresponse(BaseModel):
    posts: list[PostResponse]
    total: int
    skip: int
    limit: int
    has_more: bool`}</CodeBlock>

      <ModelVsSchemaDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">from_attributes=True</span>
        <p className="text-white leading-relaxed text-sm">
          By default, Pydantic expects a dict-like input. SQLAlchemy models aren't dicts — they're regular Python
          objects with attributes. <code>ConfigDict(from_attributes=True)</code> tells a schema "it's fine to build
          yourself from <code>post.title</code>, <code>post.content</code>, etc. instead of requiring{' '}
          <code>post["title"]</code>." Any response schema wrapping a database model needs this set.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why Update Schemas Make Everything Optional</span>
        <p className="text-white leading-relaxed text-sm">
          <code>PostCreate</code> requires both <code>title</code> and <code>content</code> — you can't create a
          post without them. <code>PostUpdate</code> makes both optional with <code>default=None</code>, because a
          PATCH request might only want to change the title. In the router, that gets applied with:
        </p>
        <CodeBlock>{`updates = post_update.model_dump(exclude_unset=True)
for field, value in updates.items():
    setattr(post, field, value)`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          <code>exclude_unset=True</code> is the key detail — it only includes fields the client actually sent,
          not every field that happens to be <code>None</code>.
        </p>
      </div>
    </div>
  </SectionShell>
)
