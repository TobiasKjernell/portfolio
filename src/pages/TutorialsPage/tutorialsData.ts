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
  {
    slug: 'ci-cd-fundamentals',
    title: 'CI/CD Fundamentals',
    description:
      'What CI/CD actually means, how a pipeline runs from commit to production, the tools people use to build one, and the deployment strategies that keep releases boring.',
    tags: ['CI/CD', 'DevOps', 'GitHub Actions', 'Deployment'],
  },
  {
    slug: 'linux-fundamentals',
    title: 'Linux Fundamentals',
    description:
      'An introduction to Linux from zero — essential commands, permissions, user management, SSH, Ubuntu vs. Ubuntu Server, and the habits that make a terminal feel like home.',
    tags: ['Linux', 'Ubuntu', 'SSH', 'DevOps'],
  },
  {
    slug: 'bash',
    title: 'Bash: Beginner to Advanced',
    description:
      'What Bash is and how it works, from your first command to real scripts — variables, quoting, globbing, pipes, conditionals, loops, job control, functions, argument parsing, arrays, regex and shell config.',
    tags: ['Bash', 'Shell Scripting', 'Linux', 'Automation'],
  },
  {
    slug: 'ubuntu-server',
    title: 'Ubuntu Servers',
    description:
      'Running Ubuntu Server in production today — initial hardening, SSH and firewall security, automated patching, systemd, Nginx + TLS, Docker, monitoring and backups.',
    tags: ['Ubuntu', 'Server', 'DevOps', 'Security'],
  },
]
