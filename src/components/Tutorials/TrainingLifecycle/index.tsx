import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const PipelineDiagramSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">From Raw Text To A Helpful Assistant</span>
    <p className="text-white leading-relaxed text-sm">
      A model like Claude or GPT doesn't come out of training in one shot ready to be a helpful chat assistant —
      it goes through several distinct stages, each one narrowing and shaping what came before.
    </p>
    <Panel label="Training Stages" caption="Each stage starts from the previous one's output and specializes it further">
      <div className="flex flex-col items-center gap-2 w-full">
        <Box className="w-full">Massive raw text corpus (books, websites, code...)</Box>
        <Arrow />
        <Box className="w-full">Pretraining → a "base model" (raw completion, no manners)</Box>
        <Arrow />
        <Box className="w-full">Instruction tuning → follows instructions instead of just continuing text</Box>
        <Arrow />
        <Box className="w-full">RLHF / alignment → helpful, harmless, matches human preference</Box>
        <Arrow />
        <Box className="w-full">The assistant you actually chat with</Box>
      </div>
    </Panel>
  </div>
)

const PretrainingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Pretraining — Learning Language Itself</span>
    <p className="text-white leading-relaxed text-sm">
      Pretraining is where the vast majority of compute and data goes: the model is fed enormous amounts of text
      and trained on nothing but next-token prediction — no labels, no human grading, just "predict the next
      token, check if you were right, adjust." This is called{' '}
      <span className="text-[#cea86f]">self-supervised learning</span> because the text itself provides the
      correct answer at every step. The result is a{' '}
      <span className="text-[#cea86f]">base model</span>: it has absorbed grammar, facts, reasoning patterns and
      style from its training data, but it isn't yet "trying to be helpful" — asked a question, a base model is
      just as likely to continue with more questions in the same style as it saw in its training data as it is to
      answer.
    </p>
  </div>
)

const FineTuningSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Fine-Tuning — Specializing An Already-Trained Model</span>
    <p className="text-white leading-relaxed text-sm">
      <span className="text-[#cea86f]">Fine-tuning</span> takes an already-pretrained model and continues training
      it on a much smaller, curated dataset to change its behavior — its style, format, tone, or how it handles a
      narrow domain. It's dramatically cheaper than pretraining because it's building on everything the model
      already learned, not starting from zero.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        'Full fine-tuning: updates every parameter in the model. Most accurate, but expensive and requires a full copy of the model per fine-tuned variant.',
        'LoRA / QLoRA (parameter-efficient fine-tuning): freezes the original weights and trains a small set of additional "adapter" parameters instead. Far cheaper and faster, and multiple LoRA adapters can be swapped in and out of the same base model.',
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

const InstructionTuningSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Instruction Tuning</span>
    <p className="text-white leading-relaxed text-sm">
      Instruction tuning is a specific, well-known application of fine-tuning: training on thousands of{' '}
      <code className="text-[#cea86f]">(instruction, ideal response)</code> pairs so the model learns the general
      shape "when given a request, produce a direct, helpful response to it" rather than just continuing the
      text pattern statistically. This is the step that turns a base model into what vendors usually call an{' '}
      <span className="text-[#cea86f]">"instruct" or "chat" model</span> — the ones actually exposed through
      chat products and most APIs.
    </p>
    <CodeBlock label="One training example, simplified">{`{
  "instruction": "Summarize this email in one sentence.",
  "input": "<the email text>",
  "response": "<a one-sentence summary>"
}`}</CodeBlock>
  </div>
)

const RlhfSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">RLHF & Alignment</span>
    <p className="text-white leading-relaxed text-sm">
      <span className="text-[#cea86f]">RLHF (Reinforcement Learning from Human Feedback)</span> is the last major
      stage: human raters compare pairs of model responses to the same prompt and pick the better one, that
      preference data trains a separate "reward model" to predict which responses humans prefer, and the main
      model is then further trained to maximize that reward. This is what pushes a model toward being helpful,
      honest and avoiding harmful outputs, beyond what instruction tuning alone achieves — the general goal is
      called <span className="text-[#cea86f]">alignment</span>, and newer variants replace some human feedback
      with AI-generated feedback (RLAIF) or a written set of principles the model critiques itself against
      (Constitutional AI).
    </p>
    <StepList
      steps={[
        'Model generates two or more candidate responses to the same prompt',
        'A human (or another model, in RLAIF) ranks which response is better',
        'A reward model is trained to predict that preference automatically, at scale',
        "The main model is fine-tuned to produce responses the reward model scores highly — nudging its behavior toward what humans actually preferred",
      ]}
    />
  </div>
)

export const TrainingLifecycleSection = () => (
  <SectionShell
    title="The Training Lifecycle"
    paragraphs={[
      'Every major buzzword about "training" an AI model refers to one specific stage in a pipeline, not training as one single event. Knowing which stage a term belongs to makes the rest of the vocabulary click into place.',
    ]}
  >
    <div className="space-y-6">
      <PipelineDiagramSection />
      <PretrainingSection />
      <FineTuningSection />
      <InstructionTuningSection />
      <RlhfSection />
    </div>
  </SectionShell>
)
