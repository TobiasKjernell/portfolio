import { Arrow, Box, Panel, SectionShell } from '../Shared'

const MessageQueueDiagram = () => (
  <Panel label="Async Processing" caption="Producers and consumers scale independently — the queue absorbs bursts">
    <div className="flex items-center gap-3 flex-wrap justify-center py-2">
      <Box>Producer</Box>
      <Arrow dir="right" />
      <div className="flex gap-1 border-2 border-[#cea86f] rounded px-2 py-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded bg-[#cea86f]/15 border border-[#cea86f]/40 flex items-center justify-center text-[10px] text-gray-300"
          >
            {i}
          </div>
        ))}
      </div>
      <Arrow dir="right" />
      <div className="flex flex-col gap-2">
        <Box>Worker A</Box>
        <Box>Worker B</Box>
      </div>
    </div>
  </Panel>
)

export const MessageQueuesSection = () => (
  <SectionShell
    title="Message Queues & Async Processing"
    paragraphs={[
      'Queues (e.g. Kafka, RabbitMQ, SQS) decouple producers from consumers: a service publishes an event or job and moves on, while one or more workers process it independently.',
      'This smooths out traffic spikes, isolates slow operations (like sending emails or generating reports) from the request path, and makes it easy to retry failed work.',
    ]}
  >
    <MessageQueueDiagram />
  </SectionShell>
)
