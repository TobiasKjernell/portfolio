import { CodeBlock, SectionShell, StepList } from '../Shared'

export const RagBackendAuthSection = () => (
  <SectionShell
    title="Backend — Auth & Protecting Your Keys"
    paragraphs={[
      "Every call to /ingest or /query eventually calls a provider — that's a real API bill (or real GPU time, for the local model). Leaving those routes open to the internet means anyone can run up that bill, so they get the exact same JWT bearer-token protection as any other authenticated route: the auth.py module from the FastAPI tutorial, unchanged.",
      'This is deliberately not new code — reusing a battle-tested get_current_user dependency instead of writing bespoke auth for the AI routes is exactly the kind of consistency that keeps a codebase auditable.',
    ]}
  >
    <div className="space-y-6">
      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">First, Something Has To Issue The Token</span>
        <p className="text-white leading-relaxed text-sm">
          <code>CurrentUser</code> below only verifies a token that already exists — it doesn't create one. If you
          followed the FastAPI tutorial, this part is already built: its blog API exposes{' '}
          <code>POST /api/users</code> to create an account and <code>POST /api/users/token</code> to log in, which
          is exactly why <code>OAuth2PasswordBearer(tokenUrl="api/users/token")</code> below points there. Building
          the standalone version from the minimal <code>User</code> model in the database section instead? Here's
          the same two endpoints, trimmed to just what issuing a token needs:
        </p>
      </div>

      <CodeBlock label="terminal">{`pip install pwdlib[argon2] pyjwt`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why Argon2, Not bcrypt</span>
        <p className="text-white leading-relaxed text-sm">
          <code>pwdlib[argon2]</code> pulls in the Argon2 backend, and <code>PasswordHash.recommended()</code> picks
          it by default — Argon2id is the current winner of the Password Hashing Competition and the OWASP-recommended
          choice: it's deliberately memory-hard, which makes GPU/ASIC cracking attempts far more expensive than an
          older algorithm like bcrypt for the same security level. Nothing in the code above names "argon2" directly
          — <code>recommended()</code> is what makes it swappable if pwdlib's default ever changes.
        </p>
      </div>

      <CodeBlock label="schemas.py">{`from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"`}</CodeBlock>

      <CodeBlock label="auth.py — hashing and issuing tokens">{`from datetime import UTC, datetime, timedelta
from pwdlib import PasswordHash
from config import settings
import jwt

password_hash = PasswordHash.recommended()  # Argon2id under the hood

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hash=hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key.get_secret_value(), algorithm=settings.algorithm)`}</CodeBlock>

      <CodeBlock label="routers/users.py — signup and login">{`from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from auth import create_access_token, hash_password, verify_password
from config import settings
from schemas import Token, UserCreate
import models

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).where(models.User.email == user.email.lower()))
    if result.scalars().first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = models.User(email=user.email.lower(), password_hash=hash_password(user.password))
    db.add(new_user)
    await db.commit()
    return {"id": new_user.id, "email": new_user.email}

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    # OAuth2PasswordRequestForm always calls the field "username" — we treat it as an email
    result = await db.execute(select(models.User).where(models.User.email == form_data.username.lower()))
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token)`}</CodeBlock>

      <CodeBlock label="main.py">{`app.include_router(users.router, prefix="/api/users", tags=["Users"])`}</CodeBlock>

      <StepList
        steps={[
          'POST /api/users with {"email": "...", "password": "..."} creates an account.',
          'POST /api/users/token with form fields username (your email) and password logs in and returns a JWT.',
          'Send that token back as Authorization: Bearer <token> on every call to /api/ingest and /api/query.',
        ]}
      />

      <CodeBlock label="terminal — trying it end to end">{`curl -X POST http://localhost:8000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "correct-horse-battery-staple"}'

curl -X POST http://localhost:8000/api/users/token \\
  -d "username=you@example.com&password=correct-horse-battery-staple"
# → {"access_token": "eyJhbGciOi...", "token_type": "bearer"}

curl -X POST http://localhost:8000/api/query \\
  -H "Authorization: Bearer eyJhbGciOi..." \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What does my uploaded doc say about refunds?"}'`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Now, Verifying That Token On Every Request</span>
        <p className="text-white leading-relaxed text-sm">
          Login only runs once per session — every other request needs the token checked and turned back into a{' '}
          <code>User</code>. That's <code>CurrentUser</code>, unchanged from the FastAPI tutorial:
        </p>
      </div>

      <CodeBlock label="auth.py — same CurrentUser dependency as the blog API">{`from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import models
from database import get_db
from config import settings
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/token")

def verify_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token, settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm],
            options={"require": ["exp", "sub"]},
        )
    except jwt.InvalidTokenError:
        return None
    return payload.get("sub")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[AsyncSession, Depends(get_db)]) -> models.User:
    user_id = verify_access_token(token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    result = await db.execute(select(models.User).where(models.User.id == int(user_id)))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

CurrentUser = Annotated[models.User, Depends(get_current_user)]`}</CodeBlock>

      <CodeBlock label="routers/query.py — the dependency, dropped into a route signature">{`from fastapi import APIRouter
from auth import CurrentUser

router = APIRouter()

@router.post("/query")
async def query(request: QueryRequest, current_user: CurrentUser):
    # current_user is guaranteed valid here — FastAPI ran the auth check before this line
    ...`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">One More Reason: Data Isolation</span>
        <p className="text-white leading-relaxed text-sm">
          Beyond cost control, <code>current_user</code> gives ingestion and retrieval a natural owner. The ingestion
          pipeline stamps every uploaded <code>Document</code> with <code>owner_id = current_user.id</code>, and the
          query endpoint's similarity search can filter chunks down to that user's own documents — the same
          ownership check pattern the FastAPI tutorial uses for post editing, just applied to documents instead.
        </p>
      </div>
    </div>
  </SectionShell>
)
