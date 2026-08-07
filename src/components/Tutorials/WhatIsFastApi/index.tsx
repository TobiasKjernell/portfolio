import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const SimpleVersion = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      A backend is just a program that listens for requests over the network and sends back answers — "give me the
      latest blog posts," "log this user in," "save this new post." FastAPI is a Python framework whose entire job
      is making that easier: you write a small Python function, put a decorator on it that says "run this when
      someone visits <code>/api/posts</code>," and FastAPI takes care of turning raw HTTP requests into Python
      objects and Python objects back into JSON responses.
    </p>
    <p className="text-white leading-relaxed text-sm">
      What sets it apart from older Python frameworks is that it leans entirely on Python type hints. You annotate a
      function argument as <code>title: str</code> and FastAPI automatically validates that the incoming data really
      is a string, rejects it with a clear error if it isn't, and — as a side effect of the same type hints — writes
      interactive API documentation for you. This whole tutorial series builds a real project, a small blog API,
      piece by piece, so every concept below is grounded in actual working code rather than a toy example.
    </p>
  </div>
)

const RequestFlowDiagram = () => (
  <Panel label="Anatomy Of One Request" caption="Every endpoint in this series follows this same shape">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">Browser / Frontend sends HTTP request → GET /api/posts</Box>
      <Arrow />
      <Box className="w-full">FastAPI matches the route, validates params with Pydantic</Box>
      <Arrow />
      <Box className="w-full">Your Python function runs, talks to the database (SQLAlchemy)</Box>
      <Arrow />
      <Box className="w-full">Return value is validated + serialized back to JSON</Box>
      <Arrow />
      <Box className="w-full">Response sent back to the browser</Box>
    </div>
  </Panel>
)

const ReferenceProjectNote = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">What We're Building</span>
    <p className="text-white leading-relaxed text-sm">
      Every step in this series builds toward the same real project: a JSON blog API with user registration and
      login, posts that belong to a user, JWT-based authentication, database migrations and tests — the kind of
      backend a small React or Vue frontend would talk to. We'll start from a completely empty folder and add one
      layer at a time, so nothing shows up in the code before you've seen why it's needed.
    </p>
  </div>
)

const LIBRARIES: { name: string; role: string }[] = [
  { name: 'FastAPI', role: 'The web framework itself — turns a Python function into an HTTP endpoint and validates its inputs/outputs using type hints.' },
  { name: 'Uvicorn', role: 'The ASGI server — the actual process that accepts network connections and hands each request to your FastAPI app.' },
  { name: 'Pydantic', role: 'Validates and serializes data using Python type hints. FastAPI is built directly on top of it — every schema you write is a Pydantic model.' },
  { name: 'pydantic-settings', role: 'Loads typed, validated configuration from environment variables and a .env file, instead of scattering os.environ calls through the code.' },
  { name: 'SQLAlchemy', role: 'The ORM — lets you read and write the database using Python classes and objects instead of hand-written SQL strings.' },
  { name: 'psycopg', role: 'The low-level PostgreSQL driver that actually opens the network connection and speaks Postgres\' wire protocol. SQLAlchemy sits on top of it and never talks to the database directly.' },
  { name: 'Alembic', role: 'Generates and applies versioned migration scripts as the models change, so the database schema has a reviewable history instead of drifting silently.' },
  { name: 'pwdlib', role: 'Hashes and verifies passwords with Argon2, so a real password is never stored anywhere — only a one-way hash of it.' },
  { name: 'PyJWT', role: 'Creates and verifies the signed JSON Web Tokens issued at login, which prove a user\'s identity on every later request.' },
  { name: 'pytest / pytest-asyncio', role: 'The test runner, plus the plugin that lets it run and await async test functions.' },
  { name: 'httpx', role: 'An HTTP client. In tests, it calls the FastAPI app directly in-process — no real server or network needed.' },
]

const LibraryGlossary = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <div>
      <span className="text-sm font-semibold gold-text">The Toolbox: Every Library We'll Use, And Why</span>
      <p className="text-white leading-relaxed text-sm mt-2">
        Each of these gets installed and explained properly the first time it's actually needed — this is just a
        map of the whole toolbox up front, so nothing that shows up later feels like it came out of nowhere.
      </p>
    </div>
    <ul className="space-y-2">
      {LIBRARIES.map(({ name, role }) => (
        <li
          key={name}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <code className="gold-text shrink-0 sm:w-40">{name}</code>
          <span className="text-gray-300">{role}</span>
        </li>
      ))}
    </ul>
  </div>
)

const WhyFastApiCard = () => (
  <ProsConsCard
    title="FastAPI vs. Older Python Web Frameworks"
    pros={[
      'Type hints double as validation — wrong data types are rejected automatically, before your code even runs',
      'Interactive docs (Swagger UI + ReDoc) are generated for free from the same type hints',
      'Built on Starlette + async/await, so it can handle many slow I/O-bound requests (database calls, emails) concurrently',
      'Editor autocomplete works throughout, because everything is a typed Python object instead of a dictionary',
    ]}
    cons={[
      'Async code has a learning curve if you have only written synchronous Python before',
      'Smaller plugin ecosystem than Django — things like an admin panel or ORM are not bundled in',
      'The type-hint-heavy style takes some getting used to coming from plain Flask',
    ]}
  />
)

export const WhatIsFastApiSection = () => (
  <SectionShell
    title="What Is FastAPI"
    paragraphs={[
      "FastAPI is a modern Python web framework for building APIs. It's built on top of Starlette (for the actual web server plumbing) and Pydantic (for data validation), and it's designed around one core idea: describe your data shapes once, with normal Python type hints, and get validation, serialization and documentation for free.",
      "This series is completely beginner-friendly — it assumes you know basic Python (functions, classes, imports) but nothing about web backends, databases or FastAPI itself. Every step adds one new concept and shows the exact code for it, using a real project (a small blog API) as the running example throughout.",
    ]}
    points={[
      'Path operation: FastAPI\'s term for "a Python function wired to a URL + HTTP method," e.g. GET /api/posts',
      'Pydantic model: a Python class that describes a data shape and validates incoming/outgoing data against it',
      'ASGI: the async server interface FastAPI runs on — it is what lets one process handle many requests at once',
      "Uvicorn: the actual server program that runs your FastAPI app and listens for real HTTP connections",
    ]}
  >
    <div className="space-y-6">
      <SimpleVersion />
      <RequestFlowDiagram />
      <WhyFastApiCard />
      <ReferenceProjectNote />
      <LibraryGlossary />
    </div>
  </SectionShell>
)
