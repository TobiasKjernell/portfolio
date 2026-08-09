import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const FunctionCallingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Function Calling / Tool Use</span>
    <p className="text-white leading-relaxed text-sm">
      By itself, an LLM can only produce text — it can't look up today's weather, query a database, or run code.{' '}
      <span className="text-[#cea86f]">Function calling</span> (also called tool use) closes that gap: you
      describe a set of tools to the model — a name, a description, and the shape of its arguments — and instead
      of answering directly, the model can output a structured request to call one, with arguments it fills in
      based on the conversation. Your application code is what actually executes it; the model never runs
      anything itself.
    </p>
    <CodeBlock label="Describing one tool to the model">{`{
  "name": "get_weather",
  "description": "Get the current weather for a city",
  "input_schema": {
    "type": "object",
    "properties": { "city": { "type": "string" } },
    "required": ["city"]
  }
}`}</CodeBlock>
  </div>
)

const AgentLoopSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Agentic Loop</span>
    <p className="text-white leading-relaxed text-sm">
      An <span className="text-[#cea86f]">agent</span>, in this context, is simply an LLM given tools and allowed
      to call them repeatedly, in a loop, until it decides the task is done — rather than being limited to one
      question and one answer. Each tool result gets appended to the conversation as new context, which is often
      what lets the model decide what to do next.
    </p>
    <Panel label="One Iteration Of The Loop" caption="Repeats until the model responds with a final answer instead of another tool call">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">Model reads the conversation so far</Box>
        <Arrow />
        <Box className="w-full">Decides: answer directly, or call a tool?</Box>
        <Arrow />
        <Box className="w-full">Your code executes the tool call, gets a result</Box>
        <Arrow />
        <Box className="w-full">Result is appended to the conversation — loop repeats</Box>
      </div>
    </Panel>
    <p className="text-gray-400 text-sm leading-relaxed">
      This is exactly how coding agents like Claude Code work in practice: reading a file, running a search,
      editing code and running tests are all just tool calls, chained in this loop until the task is finished.
    </p>
  </div>
)

const McpSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">MCP — Model Context Protocol</span>
    <p className="text-white leading-relaxed text-sm">
      Before function calling was standardized, every application had to write custom, one-off integration code
      to connect a model to each tool or data source.{' '}
      <span className="text-[#cea86f]">MCP (Model Context Protocol)</span>, introduced by Anthropic, is an open
      standard that fixes this: an MCP server exposes a set of tools and resources in one consistent format, and
      any MCP-compatible client (a chat app, an IDE, an agent framework) can connect to it and use those tools
      immediately, without custom glue code per integration — the same idea as a USB port standardizing how
      peripherals connect to a computer, applied to how models connect to external systems.
    </p>
  </div>
)

const MultiAgentSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Multi-Agent Systems & Guardrails</span>
    <p className="text-white leading-relaxed text-sm">
      Complex tasks are sometimes split across several agent calls instead of one — an{' '}
      <span className="text-[#cea86f]">orchestrator</span> agent breaks a task down and delegates focused
      sub-tasks to specialized <span className="text-[#cea86f]">subagents</span>, each with its own narrower
      context and tools, then combines their results. This trades extra latency and cost for better focus per
      call and the ability to run independent sub-tasks in parallel.{' '}
      <span className="text-[#cea86f]">Guardrails</span> is the general term for the checks wrapped around any of
      this in production — validating tool arguments before executing them, restricting which tools an agent can
      call, capping how many loop iterations it can run, and reviewing or filtering output before it reaches a
      user — since a model executing real actions autonomously, not just returning text, raises the stakes of a
      mistake.
    </p>
  </div>
)

export const AgentsAndToolsSection = () => (
  <SectionShell
    title="Agents & Tool Use"
    paragraphs={[
      "This is the step from \"a model that answers questions\" to \"a model that gets things done\": giving it the ability to call real tools, observe the results, and decide what to do next — looping until the task is actually finished.",
    ]}
  >
    <div className="space-y-6">
      <FunctionCallingSection />
      <AgentLoopSection />
      <McpSection />
      <MultiAgentSection />
    </div>
  </SectionShell>
)
