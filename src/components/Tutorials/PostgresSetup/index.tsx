import { CodeBlock, SectionShell } from '../Shared'

export const PostgresSetupSection = () => (
  <SectionShell
    title="Setting Up PostgreSQL"
    paragraphs={[
      "The .env file from the last step points at a database that doesn't exist yet — postgresql+psycopg://bloguser:bogpass@localhost/blog. Install Postgres through your OS package manager, start it, then create that exact user and database by hand.",
      "Everything here — the user, password and database name — matches what the connection string expects, so nothing needs to change later.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="macOS">{`brew install postgresql@16
brew services start postgresql@16`}</CodeBlock>

      <CodeBlock label="Ubuntu/Debian">{`sudo apt install postgresql
sudo systemctl start postgresql`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Creating The User And Database</span>
        <p className="text-white leading-relaxed text-sm">
          Postgres installs with a default superuser called <code>postgres</code>. Use it to create the app's own
          user and database:
        </p>
        <CodeBlock>{`sudo -u postgres createuser -P bloguser   # prompts for a password — use bogpass
sudo -u postgres createdb -O bloguser blog`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          <code>-P</code> prompts for a password for the new role, and <code>-O bloguser</code> makes{' '}
          <code>bloguser</code> the owner of the <code>blog</code> database, so it has full rights on it without
          needing to be a superuser.
        </p>
      </div>

      <CodeBlock label="terminal — verifying it worked">{`psql -U bloguser -d blog -h localhost`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Starting It Later</span>
        <p className="text-white leading-relaxed text-sm">
          The database and user persist once created — you only run the steps above once. After a reboot, just make
          sure the service is running again:
        </p>
        <CodeBlock label="macOS">{`brew services start postgresql@16`}</CodeBlock>
        <CodeBlock label="Ubuntu/Debian">{`sudo systemctl start postgresql`}</CodeBlock>
      </div>
    </div>
  </SectionShell>
)
