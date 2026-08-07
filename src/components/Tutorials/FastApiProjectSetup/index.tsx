import { CodeBlock, SectionShell, StepList } from '../Shared'

const WhyVenv = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">Why A Virtual Environment First</span>
    <p className="text-white leading-relaxed text-sm">
      Every Python project should install its dependencies into its own isolated folder instead of your system-wide
      Python. That isolation is called a <strong>virtual environment</strong> (a "venv"). Without one, two projects
      that need different versions of the same library would conflict with each other. Creating and activating one
      is always the very first command of any new Python backend.
    </p>
  </div>
)

export const FastApiProjectSetupSection = () => (
  <SectionShell
    title="Project Setup"
    paragraphs={[
      "Before writing a single route, we need a project folder, an isolated Python environment, and a way to record which libraries the project depends on. This step is entirely terminal work — no app code yet.",
    ]}
  >
    <div className="space-y-6">
      <WhyVenv />

      <StepList
        steps={[
          'Create an empty project folder and step into it',
          'Create a virtual environment inside it',
          'Activate the virtual environment (your terminal prompt will change to show it is active)',
          'Install FastAPI and an ASGI server to run it',
          'Freeze the installed versions into requirements.txt so anyone can recreate the exact same environment',
        ]}
      />

      <CodeBlock label="terminal">{`mkdir fastapi_blog_backend && cd fastapi_blog_backend

# create the virtual environment (creates a "venv" folder)
python -m venv venv

# activate it — macOS / Linux
source venv/bin/activate

# activate it — Windows (PowerShell)
venv\\Scripts\\Activate.ps1

# install the core dependencies
pip install fastapi uvicorn

# write the exact installed versions to a file
pip freeze > requirements.txt`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Folder Layout We're Building Toward</span>
        <p className="text-white leading-relaxed text-sm">
          You don't need to create all of these files yet — this is the shape the project grows into by the end of
          the series, one file per concept, added exactly when that concept is introduced.
        </p>
        <CodeBlock>{`fastapi_blog_backend/
├── main.py              # FastAPI app instance, routers, CORS
├── config.py            # environment variables (pydantic-settings)
├── database.py           # async SQLAlchemy engine + session
├── models.py             # SQLAlchemy ORM models (User, Post)
├── schemas.py            # Pydantic request/response models
├── auth.py                # password hashing + JWT
├── routers/
│   ├── users.py
│   └── posts.py
├── alembic/               # database migrations
├── tests/
├── .env                   # local secrets (never committed)
├── requirements.txt
└── venv/                  # never committed either`}</CodeBlock>
      </div>

      <CodeBlock label=".gitignore">{`venv/
__pycache__/
*.pyc
.env`}</CodeBlock>
    </div>
  </SectionShell>
)
