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
]
