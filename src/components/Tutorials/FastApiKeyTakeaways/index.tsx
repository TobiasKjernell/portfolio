import { SectionShell } from '../Shared'

export const FastApiKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "We started from an empty folder and ended with a real, JWT-authenticated blog API: async Postgres access, validated requests and responses, ownership-checked routes, versioned schema migrations, a real test suite, and a Docker Compose setup anyone can run with one command.",
      "From here, the same project has room to grow — profile picture uploads to S3 with Pillow for resizing, email-based password reset with background tasks, and eventually deploying the containerized stack to Kubernetes, which the Docker & Kubernetes series on this site picks up right where this one leaves off.",
    ]}
    points={[
      'Type hints are not decoration in FastAPI — they drive validation, serialization and the auto-generated docs all at once',
      'Keep models (what\'s in the database) and schemas (what crosses the API) separate, always — never return a model straight from a route',
      'A dependency like get_db or get_current_user is just a function FastAPI calls before your route runs — that swappability is exactly what makes testing with dependency_overrides possible',
      'Authentication proves who someone is (401 if it fails); authorization decides what they\'re allowed to do (403 if it fails) — they are two separate checks',
      'Schema changes go through Alembic migrations, not create_all() or hand-written SQL, the moment a table has real data in it',
      'Containerizing the app and the database removes the last piece of "works on my machine" — one docker compose up gets everyone the same environment',
    ]}
  />
)
