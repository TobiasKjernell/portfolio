import { Arrow, Box, Panel, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Building a single feature is like building one house — pick good materials, follow the blueprint, done.
      System design is more like planning a whole city: roads, water pipes, and power lines that all have to keep
      working together as the population grows from 100 people to 10 million. No single house falling down
      breaks the plan, but the roads jamming up or the water pressure dropping citywide definitely does. System
      design is about designing those roads and pipes — the servers, databases, caches and queues connecting
      everything — not any one house.
    </p>
  </div>
)

const RequirementsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Functional vs Non-Functional, With an Example</span>
    <p className="text-white leading-relaxed text-sm">
      Take a photo-sharing app. The functional requirement is simple to state: "let a user upload a photo and let
      their followers see it." That part is mostly just writing code. System design is everything non-functional
      hiding behind that one sentence — the questions that decide whether the app actually works at scale:
    </p>
    <ul className="space-y-2">
      {[
        'Speed: does the photo appear in under a second, or does the user sit staring at a spinner?',
        'Scale: does it still work the same way at 10 users and at 10 million users uploading at once?',
        'Reliability: if one server crashes mid-upload, is the photo lost, or does it just quietly retry?',
        'Cost: is the company paying $100 or $100,000 a month to serve the exact same feature?',
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

const BigPictureDiagram = () => (
  <Panel
    label="A Photo-Sharing App, Zoomed Out"
    caption="Every box here gets its own deep dive later on this page — this is just the map"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>User's Phone</Box>
      <Arrow />
      <Box className="">CDN — cached photos, close to the user</Box>
      <Arrow />
      <Box>Load Balancer</Box>
      <Arrow />
      <div className="grid grid-cols-3 gap-2 w-full max-w-70">
        <Box>App Server</Box>
        <Box>App Server</Box>
        <Box>App Server</Box>
      </div>
      <Arrow />
      <div className="flex gap-3 flex-wrap justify-center">
        <Box className="">Cache</Box>
        <Box>Database</Box>
        <Box>Message Queue</Box>
      </div>
    </div>
  </Panel>
)

const BigPictureLegendSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <p className="text-white leading-relaxed text-sm">
      None of these pieces are there by accident — each one is the answer to a specific non-functional question,
      and each gets its own section further down this page:
    </p>
    <ul className="space-y-2">
      {[
        'Three App Servers instead of one, so no single machine is a bottleneck or a single point of failure — see Scalability',
        'Redundant instances and health checks, so one crashing doesn\'t take the app down — see Availability & Reliability',
        'A Load Balancer, so traffic is spread evenly and unhealthy servers get skipped — see Load Balancing',
        'A Cache in front of the database, so the same popular data doesn\'t hit disk on every single request — see Caching',
        'A Database as the source of truth, plus replicas and sharding once one machine isn\'t enough — see Databases',
        'A CDN, so a photo uploaded in New York loads fast for a viewer in Tokyo — see CDNs',
        'A Message Queue, so slow work (like generating thumbnails) doesn\'t make the user wait for it — see Message Queues',
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

export const WhatIsSystemDesignSection = () => (
  <SectionShell
    title="What is System Design?"
    paragraphs={[
      'System design is the process of defining the architecture, components and data flow of a software system so that it meets both functional requirements (what it does) and non-functional requirements (how well it does it — speed, reliability, scale, cost).',
      'Where a single feature might be solved with a clever algorithm, system design is about how many moving pieces — servers, databases, caches, queues — work together reliably as traffic and data grow from hundreds to millions of users.',
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <RequirementsSection />
      <BigPictureDiagram />
      <BigPictureLegendSection />
    </div>
  </SectionShell>
)
