import { ProsConsCard, SectionShell } from '../Shared'

const HostedVsSelfHostedSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ProsConsCard
      title="Hosted / SaaS CI (GitHub Actions, GitLab CI, CircleCI)"
      pros={[
        'Nothing to install or maintain — the vendor runs and patches the servers',
        'Lives right next to the code — GitHub Actions and GitLab CI in particular need zero extra setup to talk to the repo',
        'Scales up and down automatically, and usually has a generous free tier for small projects',
      ]}
      cons={[
        'Usage-based pricing can add up fast for a large team or a long-running test suite',
        'Less control over the exact hardware, OS version or network the pipeline runs on',
        'Locked in somewhat to that vendor\'s specific YAML syntax and features',
      ]}
    />
    <ProsConsCard
      title="Self-Hosted (Jenkins, self-hosted runners)"
      pros={[
        'Full control over hardware — useful for specialized needs like GPU builds or strict network access',
        'No per-minute billing — cost is just the server itself, however much it\'s used',
        'Works entirely inside a private network with no code ever leaving it',
      ]}
      cons={[
        'Someone on the team now owns patching, scaling and securing that server, forever',
        'Slower to get started — Jenkins in particular has a real learning curve and an aging plugin ecosystem',
        'No automatic scaling — heavy pipeline usage means the team feels it directly',
      ]}
    />
  </div>
)

const ConfigAsCodeSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">One Thing Every Tool Agrees On: Config as Code</span>
    <p className="text-white leading-relaxed text-sm">
      Regardless of which tool a team picks, the pipeline definition itself almost always lives as a plain text
      file committed right alongside the application code — not configured by hand through a web dashboard. That
      means the pipeline is versioned, reviewed in pull requests, and rolls back exactly like any other code
      change. Where that file lives is really the only thing that differs between tools:
    </p>
    <ul className="space-y-2">
      {[
        'GitHub Actions: one or more YAML files under .github/workflows/',
        'GitLab CI/CD: a single .gitlab-ci.yml at the repo root',
        'CircleCI: a single .circleci/config.yml',
        'Jenkins: a Jenkinsfile, usually written in a Groovy-based DSL',
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

export const CiCdToolsSection = () => (
  <SectionShell
    title="Different Ways to Implement It"
    paragraphs={[
      "The concepts behind CI/CD are universal, but the tool that runs them varies a lot by team, and the biggest fork in the road is hosted versus self-hosted.",
      "Most projects — this portfolio included — never need anything past a hosted option; self-hosting is a decision made for control or cost at real scale, not a default starting point.",
    ]}
  >
    <div className="space-y-6">
      <HostedVsSelfHostedSection />
      <ConfigAsCodeSection />
    </div>
  </SectionShell>
)
