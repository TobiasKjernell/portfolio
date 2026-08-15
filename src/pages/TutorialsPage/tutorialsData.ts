export interface TutorialMeta {
  slug: string
  title: string
  description: string
  tags: string[]
}

export const tutorials: TutorialMeta[] = [
  {
    slug: 'system-design',
    title: 'System Design',
    description:
      'Scalability, availability, load balancing, caching and databases — the core building blocks behind large scale systems.',
    tags: ['Scalability', 'Databases', 'Architecture'],
  },
  {
    slug: 'typescript-with-react',
    title: 'TypeScript with React',
    description:
      'Typing props, state, events and hooks the right way — plus when to just let inference do the work instead.',
    tags: ['TypeScript', 'React', 'Best Practices'],
  },
  {
    slug: 'docker-and-kubernetes',
    title: 'Docker & Kubernetes',
    description:
      'Containerizing a full stack — frontend, backend and database — with Docker Compose locally, then deploying it all on Kubernetes.',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Fullstack'],
  },
  {
    slug: 'fastapi',
    title: 'FastAPI',
    description:
      'Building a real Python backend from zero — routing, async SQLAlchemy, Pydantic schemas, JWT auth, Alembic migrations, testing and Docker.',
    tags: ['Python', 'FastAPI', 'Backend', 'PostgreSQL'],
  },
  {
    slug: 'git',
    title: 'Git',
    description:
      'Version control from first principles — branching and merging, working with remotes, safely undoing mistakes, and a branching pipeline that holds up on a real team.',
    tags: ['Git', 'Version Control', 'Workflow', 'Collaboration'],
  },
  {
    slug: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description:
      'How language models actually work — tokens, embeddings, RAG, fine-tuning, agents, and every buzzword in between, plus the libraries used to build with them.',
    tags: ['AI', 'LLMs', 'RAG', 'Machine Learning'],
  },
  {
    slug: 'rag-app',
    title: 'Building A RAG App',
    description:
      'A real RAG stack, step by step — a FastAPI backend with a swappable multi-provider (and local LLM) abstraction, Postgres with pgvector, and a React + Tailwind frontend.',
    tags: ['RAG', 'FastAPI', 'React', 'pgvector'],
  },
]
