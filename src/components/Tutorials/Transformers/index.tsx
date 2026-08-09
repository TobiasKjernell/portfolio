import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const WhatIsATransformerSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Architecture Behind Almost Every Modern Model</span>
    <p className="text-white leading-relaxed text-sm">
      The <span className="text-[#cea86f]">Transformer</span> is a neural network architecture introduced in a
      2017 paper by Google researchers, titled, memorably, "Attention Is All You Need." It's called a Transformer
      because it transforms a sequence of input tokens into a sequence of output tokens — and its central trick
      is doing that using only the attention mechanism covered earlier, with no recurrence or step-by-step
      sequential processing. Every widely-used LLM today — GPT, Claude, Gemini, Llama — is a Transformer, or a
      close variant of one. Understanding its handful of moving parts explains why LLMs behave the way they do.
    </p>
  </div>
)

const WhatItReplacedSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What It Replaced, And Why That Mattered</span>
    <p className="text-white leading-relaxed text-sm">
      Before Transformers, the standard architecture for text was the{' '}
      <span className="text-[#cea86f]">RNN (recurrent neural network)</span> — it read a sequence one token at a
      time, carrying a running summary forward to the next step. That's inherently sequential: token 500 can't be
      processed until token 499 finishes, which makes training slow and makes it easy for information from far
      earlier in a long sequence to fade out by the time it's needed. The Transformer's self-attention lets every
      token look directly at every other token in one pass, regardless of distance between them, and lets all of
      that happen <span className="text-[#cea86f]">in parallel</span> on a GPU. That single change is what made
      it practical to train models on the scale of the entire internet — the sequential bottleneck was gone.
    </p>
  </div>
)

const BlockDiagramSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">One Transformer Block</span>
    <p className="text-white leading-relaxed text-sm">
      A Transformer is built by stacking many identical "blocks" on top of each other — often dozens, sometimes
      over a hundred. Each block does the same two-step job: let tokens exchange information via attention, then
      let each token think about what it just learned on its own.
    </p>
    <Panel label="Inside One Block" caption="This whole block repeats N times — the model's 'depth' — before producing final output probabilities">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">Token embeddings + positional encoding</Box>
        <Arrow />
        <Box className="w-full">Multi-head self-attention (tokens exchange information)</Box>
        <Arrow />
        <Box className="w-full">Add & normalize (residual connection)</Box>
        <Arrow />
        <Box className="w-full">Feed-forward network (each token processed independently)</Box>
        <Arrow />
        <Box className="w-full">Add & normalize (residual connection)</Box>
      </div>
    </Panel>
  </div>
)

const PositionalEncodingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Positional Encoding — Giving It A Sense Of Order</span>
    <p className="text-white leading-relaxed text-sm">
      Self-attention, by itself, treats the input as a bag of tokens — it has no built-in notion that "dog bites
      man" and "man bites dog" are different sentences, since attention compares every token to every other token
      symmetrically regardless of position. <span className="text-[#cea86f]">Positional encoding</span> fixes
      this: before the first block, a pattern of numbers representing each token's position in the sequence is
      added directly to its embedding, so the model can tell not just what each token is, but where it sits
      relative to the others.
    </p>
  </div>
)

const MultiHeadAttentionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Multi-Head Attention — Several Relationships At Once</span>
    <p className="text-white leading-relaxed text-sm">
      A single attention pass answers one version of "what should this token pay attention to." In practice, a
      token needs to track several different kinds of relationships at once — grammatical role, factual
      reference, tone. <span className="text-[#cea86f]">Multi-head attention</span> runs several independent
      attention computations ("heads") in parallel on the same input, each one free to specialize in a different
      pattern, then combines their results. In the sentence "the trophy didn't fit in the suitcase because it was
      too big," one head might learn to track pronoun references ("it" → "the trophy"), while another tracks
      broader sentence structure — all learned automatically from data, not hand-designed.
    </p>
  </div>
)

const FeedForwardAndResidualsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Feed-Forward Layers & Residual Connections</span>
    <p className="text-white leading-relaxed text-sm">
      After attention lets tokens exchange information, a{' '}
      <span className="text-[#cea86f]">feed-forward network</span> — a small, ordinary neural network — processes
      each token's resulting vector independently, giving the model extra capacity to transform what it just
      gathered from attention into something more useful for the next block. Wrapped around both the attention
      step and the feed-forward step is a{' '}
      <span className="text-[#cea86f]">residual connection</span>: the block's input is added back onto its
      output, so each layer only has to learn a small adjustment on top of what came in — that shortcut path is
      what lets a useful gradient signal reach dozens or hundreds of stacked blocks during training.
      Without this, stacking that many layers tends to make training unstable or simply fail to improve — residual
      connections are a big part of what made very deep Transformers trainable at all.
    </p>
  </div>
)

const VariantsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Encoder, Decoder, Or Both</span>
    <p className="text-white leading-relaxed text-sm">
      The original Transformer paper actually described two stacks — an encoder and a decoder — and different
      families of models kept different halves, depending on the job.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        'Decoder-only: what GPT, Claude and almost every modern chat model use — each token can only attend to tokens before it, which is exactly what next-token prediction needs.',
        "Encoder-only: models like BERT, built to produce a rich representation of a whole input at once (used for classification, search, embeddings) rather than generate new text token by token.",
        'Encoder-decoder: models like T5 or the original translation model the paper introduced — an encoder reads the full input, a decoder generates the output conditioned on it, useful when input and output are distinct sequences (translation, summarization).',
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
    <CodeBlock label="Where this shows up in an API">{`// Decoder-only generation - the pattern behind almost every chat API
model.generate(promptTokens)  // attends only backward, produces one token at a time

// Encoder-only - one forward pass, no generation
model.encode(text)  // -> a single vector representing the whole input (used for embeddings)`}</CodeBlock>
  </div>
)

export const TransformersSection = () => (
  <SectionShell
    title="Transformers — The Architecture Inside The Model"
    paragraphs={[
      "The previous section described next-token prediction and attention as if they were separate ideas — in reality, both are just what a Transformer does. This section opens up that architecture specifically: the actual stack of layers that turns token embeddings into the next-token probabilities covered earlier.",
    ]}
  >
    <div className="space-y-6">
      <WhatIsATransformerSection />
      <WhatItReplacedSection />
      <BlockDiagramSection />
      <PositionalEncodingSection />
      <MultiHeadAttentionSection />
      <FeedForwardAndResidualsSection />
      <VariantsSection />
    </div>
  </SectionShell>
)
