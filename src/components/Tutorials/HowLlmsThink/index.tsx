import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const TokensSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Tokens — The Model's Actual Alphabet</span>
    <p className="text-white leading-relaxed text-sm">
      An LLM doesn't read words or letters — it reads <span className="text-[#cea86f]">tokens</span>, chunks of
      text produced by a fixed tokenizer. Most tokens are short word-pieces, roughly ¾ of a word in English on
      average. Common words are often a single token; rare or made-up words get split into several.
    </p>
    <CodeBlock label="Roughly how a tokenizer splits this word">{`"unhappiness"  →  ["un", "happ", "iness"]   (3 tokens)
"the"          →  ["the"]                    (1 token)
"tokenization" →  ["token", "ization"]        (2 tokens)`}</CodeBlock>
    <p className="text-gray-400 text-sm leading-relaxed">
      This is why token count, not word count or character count, is what pricing, rate limits and the context
      window are measured in — and why a model can occasionally stumble on letter-level tasks (like counting the
      "r"s in a word): it never actually sees individual letters, only token IDs.
    </p>
  </div>
)

const NextTokenPredictionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">"Thinking" Is Predicting One Token At A Time</span>
    <p className="text-white leading-relaxed text-sm">
      At its core, an LLM does one thing, over and over: given all the tokens so far, output a probability for
      every possible next token, pick one, append it, and repeat. There's no separate "thinking module" —
      generating a whole response is just this loop running until the model produces a special "stop" token.
    </p>
    <Panel label="The Generation Loop" caption="Each pass produces exactly one new token, appended to the input for the next pass">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">Prompt so far: "The capital of France is"</Box>
        <Arrow />
        <Box className="w-full">Model scores every token in its vocabulary</Box>
        <Arrow />
        <Box className="w-full">Sample one — likely "Paris" (~95%), maybe "Lyon" (~1%)...</Box>
        <Arrow />
        <Box className="w-full">Append it, feed the whole thing back in, repeat</Box>
      </div>
    </Panel>
  </div>
)

const AttentionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Attention — How It Decides What's Relevant</span>
    <p className="text-white leading-relaxed text-sm">
      The mechanism that makes this prediction good is <span className="text-[#cea86f]">self-attention</span>: for
      every token, the model computes how much every other token in the context should influence it. In "the
      animal didn't cross the street because <span className="text-[#cea86f]">it</span> was too tired," attention
      is what lets the model connect "it" back to "the animal" rather than "the street," by weighing every earlier
      token's relevance rather than only looking at the words immediately before it. Stacking many attention
      layers — the "transformer" architecture — is what lets the model build up increasingly rich representations
      of meaning and process the whole context in parallel, which is also why transformers train so much faster
      than older, sequential architectures.
    </p>
  </div>
)

const ContextWindowSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Context Window</span>
    <p className="text-white leading-relaxed text-sm">
      The <span className="text-[#cea86f]">context window</span> is the maximum number of tokens the model can
      consider at once — prompt, conversation history, any documents pasted in, and the response it's generating,
      all combined. Modern models range from tens of thousands to over a million tokens, but a bigger window isn't
      free: models tend to pay less attention to information buried in the middle of a very long context (often
      called "context rot" or the "lost in the middle" effect), and every token in the window costs money and
      latency. This is the core problem <span className="text-[#cea86f]">RAG</span> exists to solve later in this
      tutorial — fitting only the relevant information into the window instead of everything you have.
    </p>
  </div>
)

const SamplingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Temperature & Top-p — Controlling Randomness</span>
    <p className="text-white leading-relaxed text-sm">
      The model outputs a probability for every possible next token, but which one gets picked is controlled by
      sampling settings you can usually configure per API call.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        'Temperature (0–2, typically): scales the probabilities before sampling. Near 0, the model almost always picks the single highest-probability token — deterministic, focused, good for code or factual Q&A. Higher values flatten the distribution, giving lower-probability tokens more of a chance — more varied and creative, but more error-prone.',
        'Top-p (nucleus sampling): instead of considering every token, only sample from the smallest set of tokens whose combined probability reaches p (e.g. 0.9). This trims away the long tail of very unlikely tokens regardless of temperature.',
        'Top-k: a simpler variant — only consider the k most likely tokens at each step.',
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

const HallucinationSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why Models Hallucinate</span>
    <p className="text-white leading-relaxed text-sm">
      A <span className="text-[#cea86f]">hallucination</span> is a confident, fluent, wrong answer — a made-up
      citation, a function that doesn't exist, a plausible-sounding but false fact. It follows directly from how
      generation works: the model is optimized to produce the most statistically plausible next token, not to
      consult a database of verified facts (it doesn't have one). When it doesn't "know" something, it doesn't
      have a built-in mechanism to say so — it just keeps predicting the most plausible-sounding continuation,
      which can be indistinguishable in tone from a correct answer. This single fact motivates several techniques
      later in this tutorial — RAG and grounding in particular — that reduce hallucination by giving the model
      real source text to work from instead of relying purely on what it memorized during training.
    </p>
  </div>
)

export const HowLlmsThinkSection = () => (
  <SectionShell
    title='How LLMs "Think"'
    paragraphs={[
      "There's no ghost in the machine — an LLM is a very large, very well-tuned function that repeatedly answers one question: \"given the text so far, what token is most likely to come next?\" Almost every AI buzzword you'll encounter is really just a detail about how that one loop is set up, constrained, or fed.",
    ]}
  >
    <div className="space-y-6">
      <TokensSection />
      <NextTokenPredictionSection />
      <AttentionSection />
      <ContextWindowSection />
      <SamplingSection />
      <HallucinationSection />
    </div>
  </SectionShell>
)
