import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const LoginFlowDiagram = () => (
  <Panel label="The Login Flow" caption="A JWT is a signed, self-contained proof of identity — the server never has to store it">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">Client POSTs email + password to /api/users/token</Box>
      <Arrow />
      <Box className="w-full">Server looks up the user, verifies the password against the stored hash</Box>
      <Arrow />
      <Box className="w-full">Server creates a JWT containing the user's id, signed with SECRET_KEY</Box>
      <Arrow />
      <Box className="w-full">Client stores the token and sends it as "Authorization: Bearer &lt;token&gt;" on every future request</Box>
    </div>
  </Panel>
)

export const AuthenticationWithJwtSection = () => (
  <SectionShell
    title="Authentication With JWT"
    paragraphs={[
      "Authentication answers one question: who is making this request? The standard approach for an API is: hash and store passwords (never the plain text), verify a submitted password against that hash at login, and if it matches, hand the client back a signed token — a JWT (JSON Web Token) — that proves their identity on every future request without them having to log in again each time.",
      "Install pwdlib[argon2] for password hashing and pyjwt for creating/reading tokens.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="auth.py — password hashing">{`from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()  # Argon2 under the hood

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why Hash Instead Of Encrypt</span>
        <p className="text-white leading-relaxed text-sm">
          Encryption is reversible — whoever holds the key can get the original password back. Hashing is one-way:
          <code> hash_password</code> turns a password into a fixed-length string there is no key to reverse. To
          check a login, you don't decrypt anything — you hash the submitted password again and compare the two
          hashes. Even if a database leaks, the real passwords are never recoverable from it.
        </p>
      </div>

      <CodeBlock label="auth.py — creating a JWT">{`import jwt
from datetime import UTC, datetime, timedelta
from config import settings

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key.get_secret_value(), algorithm=settings.algorithm)

def verify_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token, settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm], options={"require": ["exp", "sub"]},
        )
    except jwt.InvalidTokenError:
        return None
    return payload.get("sub")`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">What's Actually Inside A JWT</span>
        <p className="text-white leading-relaxed text-sm">
          A JWT is three base64 chunks separated by dots: a header, a payload (the data you put in it — here just{' '}
          <code>sub</code>, the user's id, and <code>exp</code>, an expiry time), and a signature. The payload is{' '}
          <strong>readable by anyone</strong> who has the token — it is not encrypted, only signed. The signature is
          what can't be forged without knowing <code>SECRET_KEY</code>, which is why that value has to stay out of
          the codebase (see the config step). Never put a password inside a JWT payload.
        </p>
      </div>

      <CodeBlock label="routers/users.py — the login route">{`from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select

import models, schemas
from auth import create_access_token, verify_password
from database import get_db

router = APIRouter()

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(select(models.User).where(models.User.email == form_data.username.lower()))
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": str(user.id)})
    return schemas.Token(access_token=token, token_type="bearer")`}</CodeBlock>

      <LoginFlowDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why form_data.username Is Actually An Email</span>
        <p className="text-white leading-relaxed text-sm">
          <code>OAuth2PasswordRequestForm</code> is a standard FastAPI helper that expects a form body with fields
          literally named <code>username</code> and <code>password</code> — that's part of the OAuth2 spec it
          implements, not a naming choice this project made. Since this project's users log in with an email
          instead of a separate username, the code simply treats whatever arrives in that <code>username</code>{' '}
          field as an email address.
        </p>
      </div>
    </div>
  </SectionShell>
)
