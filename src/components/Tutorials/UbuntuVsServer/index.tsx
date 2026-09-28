import { ProsConsCard, SectionShell } from '../Shared'

const ComparisonTable = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4 overflow-x-auto">
    <span className="text-sm font-semibold gold-text">Side By Side</span>
    <table className="w-full text-sm text-left border-collapse min-w-[480px]">
      <thead>
        <tr className="text-gray-500 text-xs uppercase tracking-wider">
          <th className="py-2 pr-4">&nbsp;</th>
          <th className="py-2 pr-4">Ubuntu Desktop</th>
          <th className="py-2">Ubuntu Server</th>
        </tr>
      </thead>
      <tbody className="text-gray-300">
        {[
          ['Interface', 'Full GNOME desktop environment', 'None by default — command line only'],
          ['Typical use', 'Personal laptop / workstation', 'Web servers, databases, cloud VMs'],
          ['Resource usage', 'Higher — GUI, apps, background services', 'Minimal — no GUI overhead at all'],
          ['Bundled software', 'Browser, office apps, media players', 'None of that — just the base OS + tools you add'],
          ['How you use it', 'Mouse, keyboard, windows', 'Almost always over SSH from another machine'],
          ['Install size', 'Several GB', 'A few hundred MB'],
        ].map(([label, desktop, server]) => (
          <tr key={label} className="border-t border-[#cea86f]/10">
            <td className="py-2.5 pr-4 text-gray-500">{label}</td>
            <td className="py-2.5 pr-4">{desktop}</td>
            <td className="py-2.5">{server}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const SameKernelNote = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">Same Core, Different Packaging</span>
    <p className="text-white leading-relaxed text-sm">
      Underneath, Ubuntu Desktop and Ubuntu Server are the exact same Linux kernel and the exact same package
      ecosystem — <code>apt install nginx</code> works identically on both. The "Server" edition isn't a
      crippled or different OS, it's just the base system shipped without a desktop environment (and its related
      packages) installed on top. You can even install a full desktop on a Server install later
      (<code>sudo apt install ubuntu-desktop</code>), or strip the desktop off a normal Ubuntu install — the
      distinction is really just "what's installed," not "what it fundamentally is."
    </p>
  </div>
)

export const UbuntuVsServerSection = () => (
  <SectionShell
    title="Ubuntu vs. Ubuntu Server"
    paragraphs={[
      "Ubuntu ships as two main editions, and it's a common early point of confusion: they're not different operating systems, they're the same one, configured for two different jobs.",
    ]}
  >
    <div className="space-y-6">
      <ComparisonTable />
      <SameKernelNote />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProsConsCard
          title="Ubuntu Desktop"
          pros={[
            'Familiar, visual — good for a first Linux experience',
            'Everything you need for daily use is pre-installed',
            'Easy to use a browser, file manager, settings GUI',
          ]}
          cons={[
            'Uses far more RAM/CPU just idling, running a GUI',
            'Larger attack surface — more running services by default',
            'Not what you\'ll deploy real applications on',
          ]}
        />
        <ProsConsCard
          title="Ubuntu Server"
          pros={[
            'Lightweight — every resource goes to your actual workload',
            'Smaller attack surface, fewer things that can go wrong',
            'What production servers and cloud VMs actually run',
          ]}
          cons={[
            'No GUI — everything is done through the terminal',
            'Steeper learning curve if you\'ve never used a shell',
            'Requires SSH access to manage remotely',
          ]}
        />
      </div>
    </div>
  </SectionShell>
)
