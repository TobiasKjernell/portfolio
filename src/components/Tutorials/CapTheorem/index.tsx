import { Panel, SectionShell } from '../Shared'

const CapTheoremDiagram = () => (
  <Panel
    label="Pick Two — Under a Partition"
    caption="Partition tolerance isn't optional in a distributed system, so the real choice is CP vs AP"
  >
    <svg viewBox="0 0 220 180" width="220" height="180">
      <line x1="110" y1="18" x2="26" y2="160" stroke="#cea86f" strokeOpacity="0.5" />
      <line x1="110" y1="18" x2="194" y2="160" stroke="#cea86f" strokeOpacity="0.5" />
      <line x1="26" y1="160" x2="194" y2="160" stroke="#cea86f" strokeOpacity="0.5" />

      <text x="52" y="95" fill="#9ca3af" fontSize="10">CA</text>
      <text x="150" y="95" fill="#9ca3af" fontSize="10">CP</text>
      <text x="100" y="148" fill="#9ca3af" fontSize="10">AP</text>

      <circle cx="110" cy="18" r="15" fill="#111111" stroke="#cea86f" strokeWidth="2" />
      <text x="110" y="23" textAnchor="middle" fill="#cea86f" fontSize="12">C</text>

      <circle cx="26" cy="160" r="15" fill="#111111" stroke="#cea86f" strokeWidth="2" />
      <text x="26" y="165" textAnchor="middle" fill="#cea86f" fontSize="12">A</text>

      <circle cx="194" cy="160" r="15" fill="#111111" stroke="#cea86f" strokeWidth="2" />
      <text x="194" y="165" textAnchor="middle" fill="#cea86f" fontSize="12">P</text>
    </svg>
  </Panel>
)

export const CapTheoremSection = () => (
  <SectionShell
    title="The CAP Theorem"
    paragraphs={[
      'In a distributed system, when a network partition occurs, you must choose between Consistency (every read gets the latest write) and Availability (every request gets a response, even if not the latest data). Partition tolerance is not optional in a distributed system, so in practice the real trade-off is CP vs AP.',
    ]}
    points={[
      'CP systems (e.g. traditional relational databases with strong replication): refuse requests rather than risk stale data',
      'AP systems (e.g. many NoSQL databases): stay responsive, accept eventual consistency',
    ]}
  >
    <CapTheoremDiagram />
  </SectionShell>
)
