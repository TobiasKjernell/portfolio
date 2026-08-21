import { SectionShell } from '../Shared'

export const CiCdKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "CI/CD isn't one product to install — it's a set of habits (commit small, test everything, never merge on red) backed by a pipeline that automates the parts a human would otherwise forget or skip under deadline pressure.",
    ]}
    points={[
      'Start with CI alone — automated build and test on every push and pull request — before worrying about automating deployment at all',
      'Move to Continuous Delivery once there\'s something worth releasing often, then to full Continuous Deployment only once the test suite is trusted enough to be the sole gate',
      "A hosted tool like GitHub Actions or GitLab CI is the right default for almost every project — reach for self-hosted runners or Jenkins only for real cost or control needs at scale",
      'The pipeline config file belongs in the repo, reviewed like any other code change — never configured by hand through a dashboard',
      'Branch protection rules are what turn a pipeline from "informational" into an actual gate that blocks a broken merge',
      'Rolling deployments are the sane default; reach for blue-green or canary once instant rollback or gradual, metrics-checked rollout is actually worth the added complexity',
    ]}
  />
)
