import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const TestClientDiagram = () => (
  <Panel label="No Real Network Involved" caption="ASGITransport calls the app in-process — fast, and no server needs to be running">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">Test calls client.post("/api/users", json=&#123;...&#125;)</Box>
      <Arrow />
      <Box className="w-full">httpx.AsyncClient(transport=ASGITransport(app)) hands the request straight to your FastAPI app object</Box>
      <Arrow />
      <Box className="w-full">Your route runs for real, against a real (test) database session</Box>
      <Arrow />
      <Box className="w-full">Response comes back as a normal httpx.Response, asserted against like any HTTP client</Box>
    </div>
  </Panel>
)

export const TestingFastApiSection = () => (
  <SectionShell
    title="Testing With Pytest"
    paragraphs={[
      'The core idea: httpx\'s AsyncClient can be pointed at your FastAPI app object directly (via ASGITransport) instead of a real running server, and FastAPI\'s dependency_overrides lets a test swap the real get_db dependency for one that points at a separate test database.',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="terminal">{`pip install pytest pytest-asyncio httpx`}</CodeBlock>

      <CodeBlock label="tests/conftest.py">{`import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from main import app
from database import Base, get_db

test_engine = create_async_engine("postgresql+psycopg://bloguser:bogpass@localhost/test_blog")
TestSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)

@pytest.fixture(scope="session", autouse=True)
async def setup_database():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.fixture
async def db_session():
    async with TestSessionLocal() as session:
        yield session

@pytest.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()`}</CodeBlock>

      <TestClientDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">dependency_overrides</span>
        <p className="text-white leading-relaxed text-sm">
          Every route that declared <code>Depends(get_db)</code> gets whatever <code>app.dependency_overrides</code>{' '}
          maps that function to — no route code changes between tests and real usage. This is the whole reason{' '}
          <code>get_db</code> was written as a small, swappable function back in the database step instead of
          importing a global session everywhere.
        </p>
      </div>

      <CodeBlock label="tests/test_posts.py">{`import pytest

@pytest.mark.anyio
async def test_create_post_requires_auth(client):
    response = await client.post("/api/posts", json={"title": "Hi", "content": "Hello"})
    assert response.status_code == 401

@pytest.mark.anyio
async def test_create_and_read_post(client):
    await client.post("/api/users", json={
        "username": "tester", "email": "t@example.com", "password": "password123",
    })
    login = await client.post("/api/users/token", data={
        "username": "t@example.com", "password": "password123",
    })
    token = login.json()["access_token"]

    response = await client.post(
        "/api/posts",
        json={"title": "First Post", "content": "Hello, world!"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    assert response.json()["title"] == "First Post"`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why A Real Test Database, Not Mocks</span>
        <p className="text-white leading-relaxed text-sm">
          These tests hit a real (separate) Postgres database rather than mocking SQLAlchemy. Mocking the database
          would only prove your code calls the right methods — it wouldn't catch a genuinely broken query, a
          missing foreign key, or a migration that doesn't match the models. Running the real thing against a
          disposable test database catches classes of bugs mocks structurally cannot.
        </p>
      </div>
    </div>
  </SectionShell>
)
