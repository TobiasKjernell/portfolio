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

const MqSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Think of a restaurant. A waiter takes your order, pins the ticket to a rail in the kitchen, and immediately
      goes to serve other tables — they don't stand at the kitchen window waiting for your food to finish
      cooking. Whichever cook is free next grabs the next ticket off the rail and makes the dish. The rail is the
      queue: it lets the waiter (producer) hand off work without waiting, and lets the cooks (consumers) work
      through it at their own pace, even if a rush of orders comes in all at once.
    </p>
    <p className="text-white leading-relaxed text-sm">
      A message queue does exactly this for software. One part of your system (a web server, say) drops a small
      message — "resize this image," "send this email," "charge this card" — onto the queue and immediately
      moves on to the next request. A separate worker process picks messages off the queue whenever it's free and
      actually does the slow part, completely decoupled from however long that takes.
    </p>
  </div>
)

const SyncVsAsyncDiagram = () => (
  <Panel
    label="Without a Queue vs With a Queue"
    caption="Synchronous work makes the user wait for the slow part; a queue lets them move on immediately"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1 w-24 text-right">No queue</span>
        <Box>Client</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Server does the slow work — client waits 2 min</Box>
        <Arrow dir="right" />
        <Box>Response</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1 w-24 text-right">With queue</span>
        <Box>Client</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Server queues the job — responds instantly</Box>
        <Arrow dir="right" />
        <Box>Worker does the slow work, later</Box>
      </div>
    </div>
  </Panel>
)

const SyncVsAsyncSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why This Matters: Sync vs Async</span>
    <p className="text-white leading-relaxed text-sm">
      Say a user uploads a video that needs to be transcoded into three resolutions — a job that takes two
      minutes. Handled synchronously, the browser's upload request just sits there for two minutes waiting for a
      response, tying up a server thread and a connection the entire time, and timing out if anything hiccups.
      Handled asynchronously, the server saves the raw file, drops a "transcode this" message on the queue, and
      responds "got it, we'll email you" in under a second. A worker picks up the job whenever it's free and does
      the actual transcoding completely out of band.
    </p>
    <ul className="space-y-2">
      {[
        'The request path stays fast no matter how slow the real work is — users aren\'t stuck staring at a spinner',
        'A burst of 10,000 uploads doesn\'t overwhelm anything — they just pile up on the queue and get worked through at a steady pace',
        'If the worker crashes mid-job, the message is still sitting safely in the queue and gets picked up again — nothing is lost',
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

const MqMechanicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">How a Queue Actually Works</span>
    <p className="text-white leading-relaxed text-sm">
      A message isn't removed the instant a worker reads it — that would lose work if the worker crashed
      mid-task. Instead the broker hands a worker a message and waits for confirmation before deleting it.
    </p>
    <ul className="space-y-2">
      {[
        'Ack (acknowledge): the worker finishes the job and tells the broker "done" — only then is the message actually deleted from the queue',
        'Nack / visibility timeout: if a worker crashes or times out without acking, the broker assumes the job failed and puts the message back for another worker to pick up',
        'At-least-once delivery: the common default — a message might be redelivered and processed twice if a worker acks just after crashing, so consumers should be idempotent (safe to run twice, e.g. checking "have I already charged this order?" before charging again)',
        'At-most-once delivery: the message is removed before processing starts — faster, but a crash mid-job means the work is simply lost. Rarely worth the trade-off',
        'Exactly-once delivery: the message is guaranteed to be processed exactly one time — the strongest guarantee, but expensive to implement correctly and often approximated rather than truly guaranteed',
        'Dead-letter queue (DLQ): after a message fails and gets redelivered too many times (a "poison message" that always crashes the worker), it\'s moved to a separate DLQ instead of retrying forever, so it can be inspected by a human without blocking the rest of the queue',
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

const CompetingConsumersDiagram = () => (
  <Panel
    label="Competing Consumers"
    caption="Add more workers and they automatically share the backlog — each message still goes to exactly one of them"
  >
    <div className="flex items-center gap-3 flex-wrap justify-center py-2">
      <div className="flex gap-1 border-2 border-[#cea86f] rounded px-2 py-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <Box>Worker A ← 1, 3, 5</Box>
        <Box>Worker B ← 2, 4</Box>
        <Box>Worker C ← 6</Box>
      </div>
    </div>
  </Panel>
)

const CompetingConsumersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <p className="text-white leading-relaxed text-sm">
      This is how a queue scales the processing side horizontally: throw more worker instances at the same
      queue, and the broker splits the backlog between them automatically — no code change required. If the
      backlog is growing faster than workers can drain it, that's the signal to add more workers (or scale them
      down when it's empty), the same autoscaling idea used for web servers behind a load balancer.
    </p>
  </div>
)

const QueueVsPubSubDiagram = () => (
  <Panel
    label="Queue vs Pub/Sub"
    caption="A queue: one consumer gets each message. Pub/sub: every subscriber gets a copy of every message."
  >
    <div className="flex flex-col gap-6 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-gray-400 uppercase mr-1 w-20 text-right">Queue</span>
        <Box>Message</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">One worker only</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-gray-400 uppercase mr-1 w-20 text-right">Pub/Sub</span>
        <Box>Event</Box>
        <Arrow dir="right" />
        <div className="flex flex-col gap-1.5">
          <Box className="border-green-500/60">Email service</Box>
          <Box className="border-green-500/60">Analytics service</Box>
          <Box className="border-green-500/60">Fraud check service</Box>
        </div>
      </div>
    </div>
  </Panel>
)

const QueueVsPubSubSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Queue vs Pub/Sub — a Common Mix-Up</span>
    <p className="text-white leading-relaxed text-sm">
      A plain queue is point-to-point: each message is consumed by exactly one worker, which is what you want
      for jobs like "resize this image" — you don't want three workers all resizing the same image. Pub/sub
      (publish/subscribe) is different: a published event is delivered to every subscriber independently. When an
      order is placed, the email service, the analytics pipeline, and the fraud-check service might all need to
      react to that same event — pub/sub fans it out to all three without the order service needing to know they
      exist.
    </p>
    <ul className="space-y-2">
      {[
        'SQS, and RabbitMQ queues (by default): classic point-to-point queues — one message, one consumer',
        'SNS, Kafka topics with multiple consumer groups, Redis Pub/Sub: broadcast the same message to every independent subscriber',
        'Kafka is actually both at once: within one consumer group, messages are split across workers like a queue; across different consumer groups, each group gets its own full copy of the stream like pub/sub',
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

const MqOrderingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Ordering and Backpressure</span>
    <ul className="space-y-2">
      {[
        'Ordering isn\'t free once you have multiple workers: if message 1 and message 2 for the same user are picked up by two different workers, message 2 might finish first — a plain queue with parallel consumers only guarantees rough, not strict, ordering',
        'The fix is partitioning by key: Kafka routes all messages with the same key (e.g. the same user_id) to the same partition, which is always read by one consumer at a time — order is preserved per key, while different keys still process in parallel',
        'Backpressure: if producers publish faster than consumers can keep up, the queue\'s backlog just grows — monitoring queue depth (how many unprocessed messages are waiting) is the key signal for when to add workers or throttle producers before the backlog spirals',
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

export const MessageQueuesSection = () => (
  <SectionShell
    title="Message Queues & Async Processing"
    paragraphs={[
      'Queues (e.g. Kafka, RabbitMQ, SQS) decouple producers from consumers: a service publishes an event or job and moves on, while one or more workers process it independently.',
      'This smooths out traffic spikes, isolates slow operations (like sending emails or generating reports) from the request path, and makes it easy to retry failed work.',
    ]}
    points={[
      'Point-to-point queues: RabbitMQ, Amazon SQS, Redis Lists/Streams — one message, one consumer',
      'Pub/Sub & event streaming: Apache Kafka, Amazon SNS, Google Pub/Sub — one event, every subscriber gets a copy',
    ]}
  >
    <div className="space-y-6">
      <MqSimpleSection />
      <MessageQueueDiagram />
      <SyncVsAsyncDiagram />
      <SyncVsAsyncSection />
      <MqMechanicsSection />
      <CompetingConsumersDiagram />
      <CompetingConsumersSection />
      <QueueVsPubSubDiagram />
      <QueueVsPubSubSection />
      <MqOrderingSection />
    </div>
  </SectionShell>
)
