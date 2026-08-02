import { SectionShell } from '../Shared'

export const KeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      'There is no universally "correct" architecture — every choice above is a trade-off between consistency, availability, latency, cost and complexity. Good system design starts from the actual requirements (read/write ratio, latency budget, consistency needs, expected scale) and picks the simplest architecture that satisfies them.',
    ]}
  />
)
