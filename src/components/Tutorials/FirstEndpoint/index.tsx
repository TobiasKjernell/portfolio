import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const DecoratorExplainer = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">Reading The Decorator</span>
    <p className="text-white leading-relaxed text-sm">
      <code>@app.get("/")</code> is called a <strong>path operation decorator</strong>. It tells FastAPI: "when an
      HTTP GET request comes in for the path <code>/</code>, call the function directly underneath me and send back
      whatever it returns." Whatever the function returns — here a plain Python dict — is automatically converted
      to a JSON response. There is no manual <code>json.dumps</code>, no manual response object; FastAPI does that
      conversion for you.
    </p>
  </div>
)

const RunFlowDiagram = () => (
  <Panel label="What Happens When You Run Uvicorn" caption="uvicorn is the server, FastAPI is the app it runs">
    <div className="flex flex-col items-center gap-2 w-full">
      <Box className="w-full">uvicorn main:app --reload</Box>
      <Arrow />
      <Box className="w-full">Uvicorn imports "app" from main.py and starts listening on port 8000</Box>
      <Arrow />
      <Box className="w-full">A browser/tool requests GET http://127.0.0.1:8000/</Box>
      <Arrow />
      <Box className="w-full">Your read_root() function runs and returns a dict</Box>
      <Arrow />
      <Box className="w-full">{'Response: {"message": "Hello, FastAPI!"}'}</Box>
    </div>
  </Panel>
)

export const FirstEndpointSection = () => (
  <SectionShell
    title="Your First Endpoint"
    paragraphs={[
      "This is the smallest possible FastAPI app — one file, one route. It won't do anything useful yet, but it proves the whole chain works: your Python code, the ASGI server, and an HTTP response.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="main.py">{`from fastapi import FastAPI

app = FastAPI(title="Blog Dev Test")

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}`}</CodeBlock>

      <DecoratorExplainer />

      <CodeBlock label="terminal">{`uvicorn main:app --reload`}</CodeBlock>

      <RunFlowDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">The Docs You Get For Free</span>
        <p className="text-white leading-relaxed text-sm">
          With the server running, open <code>http://127.0.0.1:8000/docs</code> in a browser. FastAPI has generated
          a full interactive Swagger UI for every route you've defined, letting you send test requests straight
          from the browser — no Postman required. A second, more document-like version lives at{' '}
          <code>http://127.0.0.1:8000/redoc</code>. Both are built automatically from the same type hints and
          Pydantic models we'll start adding in the next few steps — this is the payoff for typing everything
          correctly instead of a chore on top of it.
        </p>
        <p className="text-white leading-relaxed text-sm">
          <code>--reload</code> tells uvicorn to watch your files and restart the server automatically every time
          you save — essential during development, and something you'll turn off in production.
        </p>
      </div>
    </div>
  </SectionShell>
)
