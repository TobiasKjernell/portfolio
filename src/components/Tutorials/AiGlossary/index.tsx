import { SectionShell } from '../Shared'

const glossaryTerms: { term: string; definition: string }[] = [
  { term: 'Token', definition: 'The smallest unit of text a model reads or writes — usually a word-piece, not a full word or single character.' },
  { term: 'Context Window', definition: 'The maximum number of tokens (prompt + history + response) a model can consider at once.' },
  { term: 'Parameters / Weights', definition: "A model's learned numeric values, set during training. \"70B\" means 70 billion of them." },
  { term: 'Inference', definition: 'Running an already-trained model to produce output — as opposed to training it.' },
  { term: 'Temperature', definition: 'A setting that controls randomness in the next token chosen — low is focused and deterministic, high is more varied.' },
  { term: 'Top-p / Top-k', definition: 'Sampling settings that restrict which tokens are eligible to be picked next, trimming away unlikely options.' },
  { term: 'Embedding', definition: 'A piece of text converted into a list of numbers (a vector) that captures its meaning for comparison.' },
  { term: 'Vector Database', definition: 'A database built to store embeddings and quickly find the ones closest in meaning to a query.' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation — fetching relevant text at query time and feeding it to the model as context.' },
  { term: 'Fine-Tuning', definition: 'Continuing to train an already-pretrained model on a smaller, curated dataset to change its behavior.' },
  { term: 'LoRA / QLoRA', definition: 'Parameter-efficient fine-tuning — training a small set of adapter weights instead of the full model.' },
  { term: 'RLHF', definition: 'Reinforcement Learning from Human Feedback — training a model to prefer responses humans rate more highly.' },
  { term: 'Hallucination', definition: 'A confident, fluent, but factually wrong output — the model predicting plausible text, not verified facts.' },
  { term: 'Prompt Engineering', definition: 'Deliberately structuring instructions, examples and context to get better, more reliable model output.' },
  { term: 'Zero-Shot / Few-Shot', definition: 'Asking for a task with no examples (zero-shot) vs with a few examples included in the prompt (few-shot).' },
  { term: 'Chain-of-Thought', definition: "Prompting a model to reason step by step before giving a final answer, which often improves accuracy." },
  { term: 'System Prompt', definition: "Standing instructions set for an entire conversation — persona, rules, format — weighted heavily by the model." },
  { term: 'Function / Tool Calling', definition: 'A model outputting a structured request to invoke an external tool, which your application code executes.' },
  { term: 'Agent', definition: 'A model given tools and looped — read, decide, act, observe — until it completes a multi-step task.' },
  { term: 'MCP', definition: 'Model Context Protocol — an open standard for connecting models to tools and data sources consistently.' },
  { term: 'Multimodal', definition: 'A model that can process more than just text — images, audio, video — as input, output, or both.' },
  { term: 'Quantization', definition: 'Reducing the numeric precision of a model\'s weights to shrink its size and speed up inference, at some quality cost.' },
  { term: 'Latency vs Throughput', definition: 'Latency is how long one request takes; throughput is how many requests can be served per unit of time.' },
  { term: 'Grounding', definition: "Basing a model's answer on real, verifiable source text (like retrieved documents) instead of only what it memorized." },
  { term: 'Guardrails', definition: 'Checks wrapped around a model in production — validating inputs, restricting tool access, filtering output.' },
  { term: 'Knowledge Cutoff', definition: "The date after which a model's training data stops — it has no built-in awareness of anything more recent." },
]

const GlossaryGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {glossaryTerms.map(({ term, definition }) => (
      <div key={term} className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-4 space-y-1.5">
        <span className="text-sm font-semibold gold-text">{term}</span>
        <p className="text-gray-300 text-sm leading-relaxed">{definition}</p>
      </div>
    ))}
  </div>
)

export const AiGlossarySection = () => (
  <SectionShell
    title="Buzzword Glossary"
    paragraphs={[
      "A quick-reference version of every term covered above, plus a few more that show up constantly in AI development conversations and documentation.",
    ]}
  >
    <GlossaryGrid />
  </SectionShell>
)
