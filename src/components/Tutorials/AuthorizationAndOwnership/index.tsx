import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const AuthVsAuthzDiagram = () => (
  <Panel label="401 vs. 403" caption="Two different failures, two different status codes">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">401 Unauthorized — "I don't know who you are" (missing/invalid/expired token)</Box>
      <Arrow />
      <Box className="w-full">403 Forbidden — "I know who you are, and you're not allowed to do this"</Box>
    </div>
  </Panel>
)

export const AuthorizationAndOwnershipSection = () => (
  <SectionShell
    title="Authorization & Ownership"
    paragraphs={[
      'Authentication (previous step) answers "who is this?" Authorization answers a different question: "are they allowed to do this specific thing?" This project keeps that simple — there are no admin roles or permission levels, just one rule: you may only edit or delete your own posts and your own account.',
      "The mechanism starts with a reusable dependency, get_current_user, that turns a bearer token into an actual User row from the database. Every protected route just declares it needs one.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="auth.py — resolving the current user">{`from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

import models
from database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/token")

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> models.User:
    user_id = verify_access_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    result = await db.execute(select(models.User).where(models.User.id == int(user_id)))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

# a reusable shorthand for "this route requires a logged-in user"
CurrentUser = Annotated[models.User, Depends(get_current_user)]`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">OAuth2PasswordBearer Doesn't Do The Checking</span>
        <p className="text-white leading-relaxed text-sm">
          <code>oauth2_scheme</code> only knows how to pull the raw token string out of the{' '}
          <code>Authorization: Bearer &lt;token&gt;</code> header — that's its entire job, plus telling{' '}
          <code>/docs</code> where the login route lives so the "Authorize" button works. All of the actual
          verification happens afterward, inside <code>get_current_user</code>.
        </p>
      </div>

      <CodeBlock label="routers/posts.py — using CurrentUser">{`from auth import CurrentUser

@router.post("", response_model=schemas.PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post_in: schemas.PostCreate, db: DbSession, current_user: CurrentUser):
    post = models.Post(**post_in.model_dump(), user_id=current_user.id)
    db.add(post)
    await db.commit()
    await db.refresh(post, attribute_names=["author"])
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: int, db: DbSession, current_user: CurrentUser):
    post = await db.get(models.Post, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this post")

    await db.delete(post)
    await db.commit()`}</CodeBlock>

      <AuthVsAuthzDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">The Pattern To Remember</span>
        <p className="text-white leading-relaxed text-sm">
          Adding <code>current_user: CurrentUser</code> to a route's parameters is enough to require a valid login —
          FastAPI runs the dependency before your function body, and it raises 401 itself if the token is missing or
          bad. Ownership, on the other hand, is never automatic: every route that needs it does an explicit{' '}
          <code>if resource.user_id != current_user.id</code> check and raises 403 by hand. There is no built-in
          "owns this row" mechanism in FastAPI — you write that check once per protected route.
        </p>
      </div>
    </div>
  </SectionShell>
)
