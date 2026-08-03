import { Arrow, Box, Panel, SectionShell } from '../Shared'

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

const CapLettersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Each Letter Actually Means</span>
    <p className="text-white leading-relaxed text-sm">
      CAP is about one specific moment: your system runs on more than one machine, and those machines briefly
      can't talk to each other. When that happens, you're forced to pick which promise you're willing to break.
    </p>
    <ul className="space-y-2">
      {[
        'Consistency (C): every read gets the most recent write, no matter which machine answers it. Like a shared Google Doc — the instant one person types, everyone looking at it should see the same word, immediately.',
        'Availability (A): every request gets some response, even if a piece of the system is down. Like an ATM that still gives you cash even when it can\'t currently reach the bank\'s central server to double-check your balance.',
        'Partition tolerance (P): the system keeps working even when a network problem stops some machines from talking to each other. Like two office branches that lose their phone line to each other but each keep serving the customers standing in front of them.',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
    <p className="text-white leading-relaxed text-sm">
      Why isn't P optional? Because networks fail — cables get cut, routers crash, a data center loses its
      connection to the internet. The moment your system runs on more than one machine, that day will come. So P
      is a given, not a choice. The real, everyday decision is: when the network splits, do you sacrifice C or A?
    </p>
  </div>
)

const PartitionWalkthroughDiagram = () => (
  <Panel
    label="Walking Through a Partition"
    caption="Two nodes replicate a bank balance — then the cable between them is cut"
  >
    <div className="flex flex-col items-center gap-4 py-2 w-full">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Box className="border-green-500/60">Node US · $100</Box>
        <Arrow dir="right" />
        <span className="text-[10px] text-gray-500 uppercase">synced</span>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Node EU · $100</Box>
      </div>
      <span className="text-red-400/80 text-xs">✕ network cable cut ✕</span>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Box className="border-[#cea86f]">Node US · $80 (after withdrawal)</Box>
        <span className="text-red-400/80 text-lg">╳</span>
        <Box className="text-gray-400">Node EU · $100 (stuck, can't confirm)</Box>
      </div>
    </div>
  </Panel>
)

const PartitionWalkthroughSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">A Concrete Walkthrough</span>
    <p className="text-white leading-relaxed text-sm">
      Say a bank account balance is replicated on two nodes, one in the US and one in the EU, both showing $100.
      A customer withdraws $20 through the US node, which updates itself to $80 and tries to tell the EU node —
      but right then, the network link between them goes down. A moment later, someone checks their balance
      through the EU node. What should it say?
    </p>
    <ul className="space-y-2">
      {[
        'Choose CP: the EU node knows it might be out of date, so it refuses to answer (or returns an error) rather than risk showing the wrong balance — correct, but the customer gets no answer right now',
        'Choose AP: the EU node answers anyway with the $100 it still has stored — the customer gets a fast response, but it\'s stale, and they might see a balance that no longer exists',
        'There is no third option that keeps both promises perfectly — the network is down, so the EU node genuinely cannot know the true current value',
        'Once the network heals, the nodes reconcile — the EU node catches up to $80, or a conflict-resolution rule decides which write wins if both sides changed something',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
)

const CpVsApSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Picking a Side, With Real Examples</span>
    <p className="text-white leading-relaxed text-sm">
      You don't pick CP or AP for your whole company — you pick it per system, based on what's worse: a wrong
      answer, or no answer.
    </p>
    <ul className="space-y-2">
      {[
        'CP — bank balances, inventory counts, login/leader-election systems: showing the wrong number (or letting two people think they\'re both the leader) causes real damage, so it\'s safer to briefly refuse. Examples: traditional relational databases with synchronous replication, ZooKeeper, etcd.',
        'AP — social media like counts, product catalogs, shopping carts, session data: a slightly stale count or an old product description is harmless, but a spinning error page loses the customer. Examples: Cassandra, DynamoDB, CouchDB, DNS.',
        'CA (consistent + available, but not partition-tolerant) only really exists for a single machine — the instant you add a second node for redundancy, a partition becomes possible, so CA quietly stops being an option for any real distributed system.',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
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
    <div className="space-y-6">
      <CapTheoremDiagram />
      <CapLettersSection />
      <PartitionWalkthroughDiagram />
      <PartitionWalkthroughSection />
      <CpVsApSection />
    </div>
  </SectionShell>
)
