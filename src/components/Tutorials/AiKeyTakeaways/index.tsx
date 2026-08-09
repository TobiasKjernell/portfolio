import { SectionShell } from '../Shared'

export const AiKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "Almost every AI buzzword traces back to one of three questions: how does the model generate text, how was it trained, and what is it allowed to see or do. Keep those three buckets straight and new terminology stops being intimidating.",
    ]}
    points={[
      'An LLM only ever predicts the next token — everything else is infrastructure built around that one loop',
      "Pretraining teaches language and knowledge; instruction tuning and RLHF teach it to behave like a helpful assistant",
      'Embeddings turn meaning into numbers, which is what makes semantic search — and RAG — possible',
      "RAG grounds answers in real, current, private data by retrieving it at query time instead of hoping the model memorized it",
      'Prompting, RAG and fine-tuning solve different problems — start with prompting, add RAG for missing knowledge, fine-tune for consistent behavior',
      'Agents are just a model with tools, looping — read, decide, act, observe — until the task is done, with guardrails to keep that loop safe',
      "Hallucination isn't a bug to patch out, it's the direct consequence of predicting plausible text — grounding and retrieval are what actually reduce it",
    ]}
  />
)
