import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Bash (Bourne Again SHell) is both the program that reads what you type into a terminal and runs it, and a
      full programming language in its own right. Every command you've ever typed — <code>cd</code>,{' '}
      <code>ls</code>, <code>git status</code> — is Bash parsing your input, finding a matching program, and
      running it. The step up from "typing commands" to "writing Bash" is realizing that same syntax —
      variables, conditionals, loops — works just as well saved in a file and run as a script.
    </p>
    <p className="text-white leading-relaxed text-sm">
      It's the default shell on almost every Linux distro and on macOS until a few years ago (now zsh, which is
      very similar), and it's what every CI pipeline step, Docker <code>RUN</code> line, and deploy script you'll
      ever touch is written in under the hood.
    </p>
  </div>
)

const FlowDiagram = () => (
  <Panel
    label="What Happens When You Press Enter"
    caption="This same loop runs whether you type one command or run a 500-line script"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>You type: grep "error" app.log | wc -l</Box>
      <Arrow />
      <Box>Bash parses it — splits into words, expands variables, finds the pipe</Box>
      <Arrow />
      <Box>Finds each program (grep, wc) on your PATH</Box>
      <Arrow />
      <Box className="border-green-500/60">Runs them, connects their input/output, shows you the result</Box>
    </div>
  </Panel>
)

const InteractiveVsScriptSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Interactive Shell vs. Script</span>
    <p className="text-white leading-relaxed text-sm">
      Everything in this tutorial works identically whether you type it directly at a prompt or save it in a
      file and run that file. The only difference is that a script usually starts with a shebang line telling
      the OS which interpreter to use:
    </p>
    <CodeBlock label="hello.sh">{`#!/usr/bin/env bash
echo "Hello from a script"`}</CodeBlock>
    <CodeBlock label="terminal">{`chmod +x hello.sh   # make it executable
./hello.sh           # run it
# or, without making it executable:
bash hello.sh`}</CodeBlock>
  </div>
)

export const WhatIsBashSection = () => (
  <SectionShell
    title="What Is Bash"
    paragraphs={[
      "This tutorial goes from typing your very first command to writing real automation scripts with functions, loops and error handling — all in Bash, the shell almost every Linux and macOS terminal starts you in.",
      "If you haven't used a terminal before, start here. If you already know the basics, skip ahead — each section builds on the last but is written to stand on its own too.",
    ]}
    points={[
      'Shell: a program that reads commands and runs them — Bash is one specific, extremely common shell',
      'Interactive mode: typing commands one at a time and seeing results immediately — what you do at a normal prompt',
      'Script: a text file full of Bash commands, run all at once as a program',
      'POSIX / sh: an older, stricter standard Bash is mostly compatible with — not something you need to worry about yet',
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <FlowDiagram />
      <InteractiveVsScriptSection />
    </div>
  </SectionShell>
)
