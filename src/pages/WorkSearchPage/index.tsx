import { Link } from 'react-router-dom'

type ApplicationStatus = 'Waiting' | 'Declined' | 'Approved'

interface JobApplication {
    id: number
    company: string
    workTitle: string
    country: string
    appliedDate: string
    status: ApplicationStatus
    interview: boolean
}

const applications: JobApplication[] = [
    {
        id: 1,
        company: 'Mojang Studios',
        workTitle: 'Frontend Developer',
        country: 'Sweden',
        appliedDate: '2026-04-23',
        status: 'Waiting',
        interview: false,
    },
    {
        id: 2,
        company: 'BookBeat',
        workTitle: 'Frontend Developer',
        country: 'Sweden',
        appliedDate: '2026-04-28',
        status: 'Waiting',
        interview: false,
    },  
    {
        id: 3,
        company: 'Hacksaw Studios',
        workTitle: 'Game Developer (Frontend)',
        country: 'Sweden',
        appliedDate: '2026-04-28',
        status: 'Waiting',
        interview: false,
    },      
    {
        id: 4,
        company: 'Platform24',
        workTitle: 'Frontend Engineer',
        country: 'Sweden',
        appliedDate: '2026-04-29',
        status: 'Declined',
        interview: false,
    },       
    {
        id: 5,
        company: 'Newcode.ai',
        workTitle: 'Frontend Engineer',
        country: 'Sweden',
        appliedDate: '2026-04-29',
        status: 'Waiting',
        interview: false,
    },       
]

const statusStyles: Record<ApplicationStatus, string> = {
    Waiting: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40',
    Declined: 'bg-red-500/10 text-red-400 border-red-500/40',
    Approved: 'bg-green-500/10 text-green-400 border-green-500/40',
}

const WorkSearchPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white noScrollbar">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-[#cea86f] hover:bg-[#cea86f] hover:text-[#222222] border border-[#cea86f] px-4 py-2 rounded transition-all duration-300 mb-8"
                >
                    ← Back
                </Link>

                <header className="mb-12 space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold gold-text">Work Search ({applications.length})</h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        A public log of the positions I'm applying for — feel free to follow along.
                    </p>
                </header>

                <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 text-xs uppercase tracking-wider text-gray-500 border-b border-[#1a1a1a]">
                    <span>Company</span>
                    <span>Work Title</span>
                    <span>Country</span>
                    <span>Applied</span>
                    <span>Status</span>
                    <span className="text-center">Interview</span>
                </div>

                <ul className="space-y-3 mt-3">
                    {applications.map((app) => (
                        <li
                            key={app.id}
                            className="bg-[#1a1a1a] rounded-lg border-2 border-transparent hover:border-[#cea86f] hover:shadow-lg hover:shadow-[#cea86f]/20 transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 items-center">
                                <div>
                                    <span className="md:hidden text-xs uppercase text-gray-500 block">Company</span>
                                    <span className="gold-text font-semibold">{app.company}</span>
                                </div>
                                <div>
                                    <span className="md:hidden text-xs uppercase text-gray-500 block">Title</span>
                                    <span className="text-white">{app.workTitle}</span>
                                </div>
                                <div>
                                    <span className="md:hidden text-xs uppercase text-gray-500 block">Country</span>
                                    <span className="text-gray-300">{app.country}</span>
                                </div>
                                <div>
                                    <span className="md:hidden text-xs uppercase text-gray-500 block">Applied</span>
                                    <span className="text-gray-400 text-sm">{app.appliedDate}</span>
                                </div>
                                <div>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusStyles[app.status]}`}
                                    >
                                        {app.status}
                                    </span>
                                </div>
                                <div className="md:text-center">
                                    <span className="md:hidden text-xs uppercase text-gray-500 block">Interview</span>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${app.interview
                                                ? 'bg-[#cea86f]/10 text-[#cea86f] border-[#cea86f]/40'
                                                : 'bg-[#222222] text-gray-400 border-[#333333]'
                                            }`}
                                    >
                                        {app.interview ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {applications.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No applications logged yet.</p>
                )}
            </div>
        </div>
    )
}

export default WorkSearchPage
