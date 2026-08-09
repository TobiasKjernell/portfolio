import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const WhatIsAnEmbeddingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Turning Meaning Into Numbers</span>
    <p className="text-white leading-relaxed text-sm">
      An <span className="text-[#cea86f]">embedding</span> is a piece of text (or an image, or audio) converted
      into a fixed-length list of numbers — a vector, typically hundreds or thousands of numbers long. A separate,
      much smaller model (an embedding model) produces it. What makes embeddings useful isn't the numbers
      themselves, it's that the embedding model places pieces of text with similar meaning close together in that
      numeric space, and dissimilar text far apart — even if they don't share a single word in common.
    </p>
    <Panel label="Text → Vector" caption="An embedding model maps meaning onto a point in high-dimensional space">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">"a happy dog playing in the park"</Box>
        <Arrow />
        <Box className="w-full">Embedding model</Box>
        <Arrow />
        <Box className="w-full font-mono">[0.12, -0.87, 0.33, 0.05, ..., 0.41]</Box>
      </div>
    </Panel>
  </div>
)

const SimilaritySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Measuring "Closeness"</span>
    <p className="text-white leading-relaxed text-sm">
      Once meaning is a point in space, comparing meaning becomes ordinary geometry. The most common measure is{' '}
      <span className="text-[#cea86f]">cosine similarity</span> — the angle between two vectors, ignoring their
      length. A score near 1 means "essentially the same meaning," near 0 means "unrelated," and negative means
      "opposite." "A happy dog in the park" and "a joyful puppy outside" would land close together even though
      they share almost no words, because the embedding model captured meaning, not just vocabulary.
    </p>
  </div>
)

const UseCasesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Embeddings Are Actually Used For</span>
    <ul className="space-y-2 mt-2">
      {[
        'Semantic search: find documents by meaning instead of exact keyword match — searching "how to cancel my plan" also surfaces a doc titled "ending your subscription."',
        'Retrieval-Augmented Generation (RAG): the retrieval half of RAG is nothing more than an embedding similarity search — see the next section.',
        'Recommendations: "more like this" by finding nearby vectors to something a user already liked.',
        'Clustering & deduplication: group similar support tickets, or detect near-duplicate documents, without predefined categories.',
        'Classification: a lightweight alternative to training a full classifier — embed examples of each category, then classify new text by which category\'s average vector it\'s closest to.',
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

const VectorDatabasesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Vector Databases</span>
    <p className="text-white leading-relaxed text-sm">
      Comparing a query vector against a handful of documents is trivial. Comparing it against millions is not —
      brute-force comparison against every stored vector doesn't scale. A{' '}
      <span className="text-[#cea86f]">vector database</span> solves this by indexing embeddings so it can return
      the nearest matches in milliseconds using{' '}
      <span className="text-[#cea86f]">approximate nearest neighbor (ANN)</span> search — trading a tiny bit of
      accuracy for a massive speedup. Options range from dedicated managed services (Pinecone, Weaviate, Qdrant
      Cloud) to self-hosted or embedded options (Chroma, Qdrant, Milvus) to an extension on a database you likely
      already run (<code className="text-[#cea86f]">pgvector</code> for Postgres).
    </p>
    <CodeBlock label="Conceptually, what a vector search call looks like">{`const queryVector = await embed("how do I reset my password?")

const matches = await vectorDb.query({
  vector: queryVector,
  topK: 5,          // return the 5 closest stored vectors
})
// matches[0].text -> the most semantically similar chunk on record`}</CodeBlock>
  </div>
)

export const EmbeddingsAndVectorSearchSection = () => (
  <SectionShell
    title="Embeddings & Vector Space"
    paragraphs={[
      "Embeddings are the piece of AI infrastructure that makes \"search by meaning\" possible, and they're the foundation everything in the next section (RAG) is built on. If tokens are how a model reads text, embeddings are how software compares text.",
    ]}
  >
    <div className="space-y-6">
      <WhatIsAnEmbeddingSection />
      <SimilaritySection />
      <UseCasesSection />
      <VectorDatabasesSection />
    </div>
  </SectionShell>
)
