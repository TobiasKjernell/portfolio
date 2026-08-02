import { SectionShell } from '../Shared'

export const WhatIsSystemDesignSection = () => (
  <SectionShell
    title="What is System Design?"
    paragraphs={[
      'System design is the process of defining the architecture, components and data flow of a software system so that it meets both functional requirements (what it does) and non-functional requirements (how well it does it — speed, reliability, scale, cost).',
      'Where a single feature might be solved with a clever algorithm, system design is about how many moving pieces — servers, databases, caches, queues — work together reliably as traffic and data grow from hundreds to millions of users.',
    ]}
  />
)
