import { CodeBlock, SectionShell, StepList } from '../Shared'

const WorkflowFileSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">A Real GitHub Actions Workflow</span>
    <p className="text-white leading-relaxed text-sm">
      This is a complete, working pipeline for a small React app — it builds and tests every push and pull
      request, and only deploys when a change actually lands on <code className="text-[#cea86f]">main</code>:
    </p>
    <CodeBlock label=".github/workflows/ci.yml">{`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run deploy`}</CodeBlock>
  </div>
)

const WalkthroughSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Reading It Line by Line</span>
    <StepList
      steps={[
        'on: tells GitHub when to run this — here, any push to main and any pull request targeting main',
        'jobs: a workflow is made of one or more jobs; each runs on its own fresh virtual machine ("runs-on: ubuntu-latest")',
        'steps: the commands inside a job run in order, top to bottom, on that same machine',
        'actions/checkout@v4 pulls the repo\'s code onto the runner — nothing exists there until this step runs',
        'npm ci installs dependencies from the lockfile exactly — safer for CI than npm install, which can drift',
        'needs: build-and-test on the deploy job means it will only start after that job finishes successfully — this is what stops a broken build from ever reaching deploy',
        "if: github.ref == 'refs/heads/main' is the guard that keeps pull requests from ever triggering a real deployment — only main does",
      ]}
    />
  </div>
)

const StatusChecksSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Turning This Into a Real Gate</span>
    <p className="text-white leading-relaxed text-sm">
      On its own, this file already runs on every pull request — but it doesn't stop anyone from merging a PR
      with a red build. That last piece is a repository setting, not YAML: under branch protection rules,
      requiring the <code className="text-[#cea86f]">build-and-test</code> check to pass before merging is what
      actually turns "the pipeline ran" into "the pipeline is enforced."
    </p>
  </div>
)

export const CiCdPipelineExampleSection = () => (
  <SectionShell
    title="A Real Pipeline, Step by Step"
    paragraphs={[
      "Reading about stages in the abstract only goes so far — here's an actual, minimal CI/CD pipeline using GitHub Actions, since it's free, and needs no separate account to try on any GitHub repo.",
      "The shape of this file — trigger, build, test, then a guarded deploy job — is close to identical in GitLab CI, CircleCI or Jenkins; only the exact YAML keys and syntax change between them.",
    ]}
  >
    <div className="space-y-6">
      <WorkflowFileSection />
      <WalkthroughSection />
      <StatusChecksSection />
    </div>
  </SectionShell>
)
