import { CodeBlock, SectionShell } from '../Shared'

export const RagBackendAuthSection = () => (
  <SectionShell
    title="Backend — Auth & Protecting Your Keys"
    paragraphs={[
      "Every call to /ingest or /query eventually calls a provider — that's a real API bill (or real GPU time, for the local model). Leaving those routes open to the internet means anyone can run up that bill, so they get the exact same JWT bearer-token protection as any other authenticated route: the auth.py module from the FastAPI tutorial, unchanged.",
      'This is deliberately not new code — reusing a battle-tested get_current_user dependency instead of writing bespoke auth for the AI routes is exactly the kind of consistency that keeps a codebase auditable.',
    ]}
  >
    <div className="space-y-6">
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
