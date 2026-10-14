import { CodeBlock, SectionShell } from '../Shared'

const BasicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Defining & Calling A Function</span>
    <CodeBlock label="terminal">{`greet() {
    echo "Hello, $1!"
}

greet "Sarah"       # Hello, Sarah!
greet "Tom"         # Hello, Tom!`}</CodeBlock>
  </div>
)

const ArgsAndReturnSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Arguments, Return Values & Local Variables</span>
    <p className="text-white leading-relaxed text-sm">
      A function sees its own arguments as <code>$1</code>, <code>$2</code>... just like a script does.{' '}
      <code>return</code> only hands back an exit code (0–255) — to return actual data, <code>echo</code> it and
      capture that with command substitution instead.
    </p>
    <CodeBlock label="terminal">{`is_even() {
    local num=$1          # local keeps this variable out of the global scope
    if (( num % 2 == 0 )); then
        return 0           # success/true
    else
        return 1           # failure/false
    fi
}

if is_even 4; then
    echo "4 is even"
fi

add() {
    local sum=$(( $1 + $2 ))
    echo $sum              # "returning" data by printing it
}

result=$(add 3 5)
echo "Result: $result"    # Result: 8`}</CodeBlock>
  </div>
)

const AllArgsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">$@ vs $* — Handling All Arguments</span>
    <CodeBlock label="terminal">{`show_args() {
    echo "Count: $#"      # number of arguments
    for arg in "$@"; do    # "$@" keeps each argument separate, even with spaces inside
        echo "- $arg"
    done
}

show_args "first one" second`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Always quote it as <code>"$@"</code>, not <code>$@</code> or <code>$*</code> — unquoted or with{' '}
      <code>*</code>, an argument containing a space gets split into two.
    </p>
  </div>
)

export const BashFunctionsSection = () => (
  <SectionShell
    title="Functions"
    paragraphs={[
      "Once a script repeats the same handful of lines in two or three places, it's time for a function — same idea as in any programming language: a named, reusable block that takes arguments and can hand back a result.",
    ]}
  >
    <div className="space-y-6">
      <BasicsSection />
      <ArgsAndReturnSection />
      <AllArgsSection />
    </div>
  </SectionShell>
)
