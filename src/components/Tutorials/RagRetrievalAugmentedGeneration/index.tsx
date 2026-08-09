import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const WhyRagExistsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Problem RAG Solves</span>
    <p className="text-white leading-relaxed text-sm">
      An LLM's knowledge is frozen at whenever its training data was collected (its{' '}
      <span className="text-[#cea86f]">knowledge cutoff</span>), and it has no idea about your private data — your
      company's docs, a customer's account, yesterday's support ticket. You could try to fine-tune those facts in,
      but fine-tuning is expensive, slow to update, and bad at reliably storing large numbers of discrete facts —
      it nudges behavior and style far more reliably than it inserts precise, retrievable knowledge.{' '}
      <span className="text-[#cea86f]">RAG (Retrieval-Augmented Generation)</span> sidesteps the problem
      entirely: instead of trying to bake facts into the model's weights, fetch the relevant facts at the moment
      of the question and hand them to the model as plain text in the prompt, and let it just read them.
    </p>
  </div>
)

const PipelineDiagramSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Two Halves Of A RAG System</span>
    <Panel label="1 — Indexing (done ahead of time, whenever your data changes)" caption="Turns your documents into a searchable vector index">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">Your documents (docs, PDFs, tickets, wiki pages...)</Box>
        <Arrow />
        <Box className="w-full">Split into chunks (a few hundred tokens each)</Box>
        <Arrow />
        <Box className="w-full">Embed every chunk, store in a vector database</Box>
      </div>
    </Panel>
    <Panel label="2 — Query Time (runs on every user question)" caption="Retrieves only what's relevant, then generates a grounded answer">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">User asks a question</Box>
        <Arrow />
        <Box className="w-full">Embed the question, search the vector database</Box>
        <Arrow />
        <Box className="w-full">Top-matching chunks get inserted into the prompt as context</Box>
        <Arrow />
        <Box className="w-full">LLM answers, grounded in that retrieved text</Box>
      </div>
    </Panel>
  </div>
)

const StepByStepSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Step By Step</span>
    <StepList
      steps={[
        'Chunk your documents — split long text into overlapping pieces small enough to embed meaningfully and to fit several of them in the context window at once.',
        'Embed every chunk with an embedding model and store the vectors (plus the original text) in a vector database.',
        "At query time, embed the user's question with the same embedding model.",
        'Run a similarity search to pull back the handful of chunks whose vectors are closest to the question.',
        'Insert those chunks into the prompt, typically under a system instruction like "answer using only the context below."',
        'The LLM generates its answer, now grounded in real retrieved text instead of only what it memorized during training.',
      ]}
    />
    <CodeBlock label="Conceptually, a RAG query">{`const question = "What's our refund policy for annual plans?"
const queryVector = await embed(question)
const chunks = await vectorDb.query({ vector: queryVector, topK: 4 })

const context = chunks.map((c) => c.text).join("\\n\\n")

const answer = await llm.chat({
  system: "Answer using only the context provided. If the answer isn't in the context, say so.",
  messages: [{ role: "user", content: \`Context:\\n\${context}\\n\\nQuestion: \${question}\` }],
})`}</CodeBlock>
  </div>
)

const ChunkingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Chunk Size Is A Real Tradeoff</span>
    <p className="text-white leading-relaxed text-sm">
      Chunks too small (a sentence) lose surrounding context and produce noisy, fragmented matches. Chunks too
      large (a whole document) waste context window space on irrelevant text and dilute the similarity search — a
      10,000-token chunk with one relevant sentence still scores as "somewhat relevant" overall. Most systems land
      somewhere around a few hundred tokens per chunk, with a small overlap between consecutive chunks so an idea
      that straddles a chunk boundary isn't cut off entirely on either side.
    </p>
  </div>
)

const RerankingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Reranking (An Optional Extra Step)</span>
    <p className="text-white leading-relaxed text-sm">
      Vector similarity search is fast but approximate — it's optimized to search millions of chunks quickly, not
      to perfectly judge relevance. A common refinement is to retrieve a wider set of candidates (say, the top 20
      by vector similarity), then run a smaller, more precise{' '}
      <span className="text-[#cea86f]">reranker model</span> over just those 20 to re-score and keep only the
      true top 4–5 before they go into the prompt. It's slower per-candidate than vector search, but only has to
      run on a shortlist, so it's a net win in retrieval quality for a small latency cost.
    </p>
  </div>
)

export const RagRetrievalAugmentedGenerationSection = () => (
  <SectionShell
    title="RAG: Retrieval-Augmented Generation"
    paragraphs={[
      "RAG is the single most common pattern for connecting an LLM to knowledge it wasn't trained on — it's how most \"chat with your docs\" or internal knowledge-base assistants actually work under the hood, and it's built entirely out of the embedding search covered in the previous section.",
    ]}
  >
    <div className="space-y-6">
      <WhyRagExistsSection />
      <PipelineDiagramSection />
      <StepByStepSection />
      <ChunkingSection />
      <RerankingSection />
    </div>
  </SectionShell>
)
