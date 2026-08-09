import { ProsConsCard, SectionShell } from '../Shared'

const CardsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <ProsConsCard
      title="Prompting"
      pros={[
        'Instant to change — edit text, no training or infrastructure',
        'Cheapest option by far, nothing to host or maintain',
        'Works with any off-the-shelf model, day one',
      ]}
      cons={[
        "Limited by the model's existing knowledge and the context window",
        "Every relevant example or instruction costs prompt tokens on every call",
        "Can't reliably add knowledge the model was never trained on",
      ]}
    />
    <ProsConsCard
      title="RAG"
      pros={[
        'Grounds answers in real, current, private data — updatable instantly',
        'Reduces hallucination by giving the model source text to cite',
        'No retraining needed when the underlying documents change',
      ]}
      cons={[
        'More moving parts — a chunking pipeline and a vector database to run',
        'Retrieval quality directly caps answer quality — garbage in, garbage out',
        "Doesn't change the model's underlying style, tone or reasoning behavior",
      ]}
    />
    <ProsConsCard
      title="Fine-Tuning"
      pros={[
        'Best for teaching a consistent style, tone or output format',
        'Can shrink prompt size by baking instructions into the weights',
        'Good for narrow, repetitive tasks at high volume',
      ]}
      cons={[
        'Requires a labeled training dataset and infra to run the training job',
        'Slow to iterate — every change to behavior means retraining',
        'A poor tool for adding or updating discrete facts reliably',
      ]}
    />
  </div>
)

export const FineTuningVsRagVsPromptingSection = () => (
  <SectionShell
    title="Fine-Tuning vs RAG vs Prompting"
    paragraphs={[
      "These three techniques answer the same underlying question — \"how do I make a general-purpose model behave the way my use case needs?\" — but they change fundamentally different things: prompting changes what you ask, RAG changes what the model can see, and fine-tuning changes the model's weights themselves.",
    ]}
    points={[
      'Default to prompting first — it\'s free to iterate on and solves more than people expect',
      "Reach for RAG when the model needs facts it wasn't trained on, especially private or frequently changing data",
      "Only fine-tune when you need consistent behavior — a specific tone, output format, or narrow skill — that careful prompting alone can't reliably achieve",
      'These aren\'t mutually exclusive — a lot of production systems use all three: a fine-tuned model, with RAG for current facts, wrapped in a carefully engineered system prompt',
    ]}
  >
    <CardsSection />
  </SectionShell>
)
