import { CodeBlock, SectionShell } from '../Shared'

export const RoutersAndCrudSection = () => (
  <SectionShell
    title="Routers, Params & CRUD"
    paragraphs={[
      "Once there's more than a couple of routes, they get split out of main.py into APIRouter modules, grouped by resource — one for users, one for posts. Each router is mounted onto the main app with a URL prefix and a tag (the tag is just for grouping in the /docs page).",
      "CRUD stands for Create, Read, Update, Delete — the four operations almost every resource needs. FastAPI maps these onto HTTP methods: POST to create, GET to read, PUT/PATCH to update, DELETE to remove.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="routers/posts.py">{`from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import models
import schemas
from database import get_db

router = APIRouter()
DbSession = Annotated[AsyncSession, Depends(get_db)]

@router.get("", response_model=schemas.PaginatedPostsresponse)
async def list_posts(db: DbSession, skip: int = 0, limit: int = 10):
    total = (await db.execute(select(func.count()).select_from(models.Post))).scalar_one()

    result = await db.execute(
        select(models.Post)
        .options(selectinload(models.Post.author))
        .order_by(models.Post.date_posted.desc())
        .offset(skip)
        .limit(limit)
    )
    posts = result.scalars().all()

    return schemas.PaginatedPostsresponse(
        posts=posts, total=total, skip=skip, limit=limit, has_more=skip + limit < total,
    )

@router.get("/{post_id}", response_model=schemas.PostResponse)
async def get_post(post_id: int, db: DbSession):
    post = await db.get(models.Post, post_id, options=[selectinload(models.Post.author)])
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post

@router.post("", response_model=schemas.PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post_in: schemas.PostCreate, db: DbSession):
    post = models.Post(**post_in.model_dump(), user_id=1)  # user_id hardcoded until auth exists
    db.add(post)
    await db.commit()
    await db.refresh(post, attribute_names=["author"])
    return post`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Path Params vs. Query Params</span>
        <p className="text-white leading-relaxed text-sm">
          <code>post_id</code> in <code>/&#123;post_id&#125;</code> is a <strong>path parameter</strong> — it's part
          of the URL itself and identifies exactly one resource. <code>skip</code> and <code>limit</code> in{' '}
          <code>list_posts</code> are <strong>query parameters</strong> — anything after a <code>?</code> in the URL
          (<code>/api/posts?skip=10&amp;limit=10</code>), used for options that modify a request rather than
          identify a resource. FastAPI tells them apart automatically: a plain function argument that also appears
          in the route's <code>&#123;braces&#125;</code> is a path param, everything else with a type hint and a
          default becomes an optional query param.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Assembling The Real main.py</span>
        <p className="text-white leading-relaxed text-sm">
          This is the point where <code>main.py</code> stops being the one-route toy from the first step and
          becomes the file that actually ties the whole app together: CORS, both routers, cleanup on shutdown, and
          consistent error responses.
        </p>
        <CodeBlock label="main.py">{`from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.exception_handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from starlette.exceptions import HTTPException as StarletteHTTPException

from database import engine
from routers import posts, users

@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield
    # runs once, on shutdown — release the database engine's connection pool cleanly
    await engine.dispose()

app = FastAPI(title="Blog Dev Test", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # the frontend dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])

@app.exception_handler(StarletteHTTPException)
async def http_exception_override(request: Request, exception: StarletteHTTPException):
    if request.url.path.startswith("/api"):
        return await http_exception_handler(request, exception)

@app.exception_handler(RequestValidationError)
async def validation_exception_override(request: Request, exception: RequestValidationError):
    if request.url.path.startswith("/api"):
        return await request_validation_exception_handler(request, exception)`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          <code>app.include_router(...)</code> is the part that actually connects the router modules from above —
          every route defined with <code>@router.get("")</code> inside <code>posts.py</code> is now served at{' '}
          <code>/api/posts</code>, with the prefix applied once here instead of repeated on every route.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why lifespan Instead Of Just Letting The Process Exit</span>
        <p className="text-white leading-relaxed text-sm">
          <code>lifespan</code> is an async context manager FastAPI runs once around the whole life of the app:
          everything before <code>yield</code> runs at startup, everything after it runs at shutdown. Here there's
          nothing to do at startup, but shutdown matters — <code>engine</code> (from the database step) is holding
          open a pool of real TCP connections to Postgres. <code>await engine.dispose()</code> closes all of them
          cleanly instead of letting the process die with connections still open, which is the difference between a
          graceful restart and Postgres logging a pile of abruptly dropped connections every time you redeploy.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why Override The Default Exception Handlers</span>
        <p className="text-white leading-relaxed text-sm">
          FastAPI already turns a raised <code>HTTPException</code> or a failed Pydantic validation into a JSON
          error response without any of this — so why override the handlers at all? Because this project also
          serves things that aren't part of the JSON API (interactive docs at <code>/docs</code>, the OpenAPI
          schema at <code>/openapi.json</code>), and the two checks —{' '}
          <code>if request.url.path.startswith("/api")</code> — make sure this custom error formatting only ever
          applies to actual API routes, leaving FastAPI's own defaults in place everywhere else. It's a pattern
          worth knowing even before you need it: register a handler for an exception type with{' '}
          <code>@app.exception_handler(...)</code>, and every route that raises it (or lets Pydantic raise it) gets
          routed through your function instead of the built-in one.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">A Note On selectinload</span>
        <p className="text-white leading-relaxed text-sm">
          <code>PostResponse</code> includes the post's <code>author</code>. Without telling SQLAlchemy to fetch it
          upfront, accessing <code>post.author</code> later would trigger a separate, lazy database query per post —
          fine for one post, a real performance problem for a list of fifty.{' '}
          <code>selectinload(models.Post.author)</code> fetches every post's author in one extra query instead of
          one per post.
        </p>
      </div>
    </div>
  </SectionShell>
)
