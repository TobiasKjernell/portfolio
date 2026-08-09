import { SectionShell } from '../Shared'

const NestingDiagramSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Each Term Is A Subset Of The One Before It</span>
    <p className="text-white leading-relaxed text-sm">
      These four words get used almost interchangeably in casual conversation, but they name nested circles, not
      four different things. Every LLM is deep learning. Every deep learning system is machine learning. Every
      machine learning system is AI. The reverse isn't true.
    </p>
    <div className="flex items-center justify-center py-4">
      <div className="relative border-2 border-[#cea86f]/40 rounded-xl p-5 pt-7 w-full max-w-md">
        <span className="absolute top-2 left-3 text-[10px] uppercase tracking-wider text-gray-500">
          Artificial Intelligence
        </span>
        <div className="relative border-2 border-[#cea86f]/55 rounded-xl p-5 pt-7">
          <span className="absolute top-2 left-3 text-[10px] uppercase tracking-wider text-gray-500">
            Machine Learning
          </span>
          <div className="relative border-2 border-[#cea86f]/70 rounded-xl p-5 pt-7">
            <span className="absolute top-2 left-3 text-[10px] uppercase tracking-wider text-gray-500">
              Deep Learning
            </span>
            <div className="border-2 border-[#cea86f] rounded-lg py-4 text-center">
              <span className="text-sm font-semibold gold-text">LLMs</span>
              <p className="text-[11px] text-gray-400 mt-1 px-3">GPT, Claude, Gemini, Llama...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const AiSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Artificial Intelligence — The Umbrella Term</span>
    <p className="text-white leading-relaxed text-sm">
      AI is any system that performs a task we'd normally say requires human intelligence — recognizing a face,
      translating a sentence, deciding a chess move. That definition is deliberately broad: a chess engine from the
      1990s built entirely from hand-written{' '}
      <code className="text-[#cea86f]">if this position, then that move</code> rules counts as AI, and so does a
      modern chatbot. They share almost nothing under the hood.
    </p>
  </div>
)

const MlSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Machine Learning — Learning From Examples Instead</span>
    <p className="text-white leading-relaxed text-sm">
      Machine learning is the subset of AI where, instead of a programmer writing the rules by hand, the system
      learns its own rules from data. Show it thousands of emails labeled "spam" or "not spam," and it works out
      the patterns itself. The output isn't code you can read line by line — it's a set of learned numbers
      (parameters, or weights) that encode the pattern.
    </p>
  </div>
)

const DlSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Deep Learning — Neural Networks With Many Layers</span>
    <p className="text-white leading-relaxed text-sm">
      Deep learning is machine learning done with{' '}
      <span className="text-[#cea86f]">neural networks</span> — layers of simple math units ("neurons") loosely
      inspired by the brain, stacked many layers deep (hence "deep"). Each layer transforms its input a little,
      and by stacking enough layers, the network learns to represent increasingly abstract concepts: early layers
      in an image model might detect edges, later ones detect faces. Deep learning is what unlocked modern AI —
      it scales well with more data and more compute in a way older ML methods didn't.
    </p>
  </div>
)

const LlmSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">LLMs — Deep Learning Specialized For Language</span>
    <p className="text-white leading-relaxed text-sm">
      A Large Language Model is a deep learning system, specifically a <span className="text-[#cea86f]">transformer</span>{' '}
      (the architecture behind the "T" in GPT), trained on enormous amounts of text with one deceptively simple
      job: predict the next chunk of text. "Large" refers to the number of learned parameters — modern models
      range from a few billion to well over a trillion. Everything else in this tutorial — embeddings, RAG,
      fine-tuning, agents — is about how to build useful software around that one core capability.
    </p>
  </div>
)

export const WhatIsAiSection = () => (
  <SectionShell
    title="What Is AI, Really?"
    paragraphs={[
      '"AI," "machine learning," "deep learning" and "LLM" get thrown around as if they were synonyms. They\'re not — they\'re nested categories, each one a more specific version of the last. Understanding that nesting is the fastest way to cut through the buzzword fog before diving into anything else.',
    ]}
  >
    <div className="space-y-6">
      <NestingDiagramSection />
      <AiSection />
      <MlSection />
      <DlSection />
      <LlmSection />
    </div>
  </SectionShell>
)
