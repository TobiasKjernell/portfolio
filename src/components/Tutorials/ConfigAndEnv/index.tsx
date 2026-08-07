import { CodeBlock, SectionShell } from '../Shared'

const WhyNotHardcode = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">Why Not Just Hardcode These Values?</span>
    <p className="text-white leading-relaxed text-sm">
      A database password, a JWT signing secret and an S3 access key are all things that must never be committed to
      Git and must be different between your laptop, a teammate's laptop, and production. The fix is to keep them
      out of the code entirely: put them in a local <code>.env</code> file (excluded from Git by{' '}
      <code>.gitignore</code>) and load them into the app at startup through a typed settings object.
    </p>
  </div>
)

export const ConfigAndEnvSection = () => (
  <SectionShell
    title="Configuration With Pydantic Settings"
    paragraphs={[
      'pydantic-settings gives you a typed, validated way to load environment variables. You describe every setting your app needs as a field on a class, and it reads the actual values from a .env file (or real environment variables in production) at startup.',
    ]}
    points={[
      'BaseSettings works like a normal Pydantic model, except its default source of data is environment variables',
      'SecretStr hides the value from logs and error messages — printing it shows "**********" instead of the real secret',
      'A single settings = Settings() instance is created once and imported everywhere the app needs a config value',
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="terminal">{`pip install pydantic-settings`}</CodeBlock>

      <CodeBlock label="config.py">{`from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    database_url: str

    secret_key: SecretStr
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

settings = Settings()  # loaded once, from .env, at import time`}</CodeBlock>

      <CodeBlock label=".env">{`SECRET_KEY=change-me-to-a-long-random-string
DATABASE_URL=postgresql+psycopg://bloguser:bogpass@localhost/blog`}</CodeBlock>

      <WhyNotHardcode />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Using It Elsewhere</span>
        <p className="text-white leading-relaxed text-sm">
          Any other file just imports the single shared instance instead of re-reading the environment itself:
        </p>
        <CodeBlock>{`from config import settings

print(settings.database_url)
print(settings.secret_key.get_secret_value())  # explicit unwrap required for SecretStr`}</CodeBlock>
      </div>
    </div>
  </SectionShell>
)
