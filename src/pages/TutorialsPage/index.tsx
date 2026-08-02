import { Link } from 'react-router-dom'
import { tutorials } from './tutorialsData'

const TutorialsPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Tutorials</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Write-ups on topics I've been studying — mostly notes to self, shared in case they help someone else.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              to={`/tutorials/${tutorial.slug}`}
              className="group bg-[#1a1a1a] rounded-lg border-2 border-transparent hover:border-[#cea86f] hover:shadow-xl hover:shadow-[#cea86f]/20 transition-all duration-200 hover:scale-105 p-6 flex flex-col gap-4"
            >
              <h2 className="text-xl font-bold gold-text group-hover:text-white transition-colors duration-200">
                {tutorial.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {tutorial.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {tutorial.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {tutorials.length === 0 && (
          <p className="text-center text-gray-500 py-12">No tutorials yet — check back soon.</p>
        )}
      </div>
    </div>
  )
}

export default TutorialsPage
