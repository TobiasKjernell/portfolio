import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const SshFlowDiagram = () => (
  <Panel
    label="What SSH Actually Does"
    caption="An encrypted tunnel between your machine and a remote one, with a shell running on the other end"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Your laptop runs: ssh user@server-ip</Box>
      <Arrow />
      <Box>Encrypted connection opens over the network (port 22)</Box>
      <Arrow />
      <Box>Server checks your identity (password or SSH key)</Box>
      <Arrow />
      <Box className="border-green-500/60">A remote shell opens — you're now typing commands on the server</Box>
    </div>
  </Panel>
)

const BasicUsageSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Connecting</span>
    <CodeBlock label="terminal">{`ssh sarah@192.168.1.50           # connect as user sarah to that IP
ssh sarah@myserver.com -p 2222   # connect on a non-default port
exit                              # end the session, back to your own machine`}</CodeBlock>
  </div>
)

const SshKeysSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">SSH Keys — Logging In Without A Password</span>
    <p className="text-white leading-relaxed text-sm">
      An SSH key pair is two files: a private key that never leaves your machine, and a public key you hand out
      freely. Anything encrypted with the public key can only be decrypted with the matching private key, so a
      server that has your public key can verify it's really you — no password typed over the network at all.
    </p>
    <CodeBlock label="terminal — on YOUR machine">{`ssh-keygen -t ed25519 -C "sarah@laptop"
# creates ~/.ssh/id_ed25519 (private — keep secret) and id_ed25519.pub (public — share freely)

ssh-copy-id sarah@192.168.1.50
# copies your public key to the server's ~/.ssh/authorized_keys for you

ssh sarah@192.168.1.50
# now logs in instantly, no password prompt`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      If <code>ssh-copy-id</code> isn't available, the manual equivalent is appending the contents of your{' '}
      <code>.pub</code> file to <code>~/.ssh/authorized_keys</code> on the server.
    </p>
  </div>
)

const SshConfigSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Saving Connections In ~/.ssh/config</span>
    <p className="text-white leading-relaxed text-sm">
      Typing out a full user@ip every time gets old fast. An SSH config file lets you give a server a short
      nickname instead.
    </p>
    <CodeBlock label="~/.ssh/config">{`Host myserver
    HostName 192.168.1.50
    User sarah
    Port 22
    IdentityFile ~/.ssh/id_ed25519`}</CodeBlock>
    <CodeBlock label="terminal">{`ssh myserver     # exactly equivalent to: ssh -p 22 -i ~/.ssh/id_ed25519 sarah@192.168.1.50`}</CodeBlock>
  </div>
)

const ScpSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Copying Files Over SSH — scp & rsync</span>
    <CodeBlock label="terminal">{`scp file.txt sarah@myserver:/home/sarah/          # copy a local file TO the server
scp sarah@myserver:/home/sarah/file.txt .         # copy a remote file back to your machine
scp -r my-folder/ sarah@myserver:/home/sarah/     # copy a whole directory (-r)

rsync -avz my-folder/ sarah@myserver:/home/sarah/my-folder/  # smarter, resumable sync`}</CodeBlock>
  </div>
)

export const LinuxSshSection = () => (
  <SectionShell
    title="Connecting Over SSH"
    paragraphs={[
      "SSH (Secure Shell) is how you control a remote Linux machine — a server sitting in a data center, a cloud VM, a Raspberry Pi on your desk — as if you were sitting in front of it, all from your own terminal. It's the single most important tool for anyone who works with servers.",
    ]}
  >
    <div className="space-y-6">
      <SshFlowDiagram />
      <BasicUsageSection />
      <SshKeysSection />
      <SshConfigSection />
      <ScpSection />
      <StepList
        steps={[
          'Prefer SSH keys over passwords everywhere — they\'re both more secure and more convenient once set up',
          'Never share your private key (the file without .pub) with anyone or commit it to a repo — only the .pub file is meant to be shared',
          'On a real server, disable password login entirely once your key works (PasswordAuthentication no in /etc/ssh/sshd_config), so brute-force login attempts can\'t succeed',
        ]}
      />
    </div>
  </SectionShell>
)
