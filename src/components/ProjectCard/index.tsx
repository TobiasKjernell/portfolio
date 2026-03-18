
interface ProjectCardProps {
  title: string
  description: string
  techs: string[],
  git: string,
  url: string,
  img?:string
}

export const ProjectCard = ({ title, description, techs, git, url, img }: ProjectCardProps) => {
  return (
    <div className="project-card bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#cea86f] border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#cea86f]/20">
      {/* Project Image Placeholder */}
      <div className="w-full h-48 bg-linear-to-br from-[#222222] to-[#1a1a1a] flex items-center justify-center border-b border-[#1a1a1a]">
        {img ? <img src={img} width="100px" height="auto" alt="project pic" className="flex-1" /> :
          <div className="text-center">
            <p className="text-gray-500 text-xs">Student, Supabase limit :(</p>
          </div>
        }
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold gold-text">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {techs.map((tech) => (
            <span
              key={tech}
              className="inline-block bg-[#222222] text-white text-xs px-3 py-1 rounded-full border border-[#333333] hover:border-[#cea86f] transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="px-6 pb-6 flex flex-col text-center gap-2 ">
        {git &&
          <a href={git} target="_blank" className="w-full py-2 border text-[#cea86f] font-semibold text-sm hover:bg-[#cea86f] hover:text-[#222222] rounded transition-all duration-300">
            View Git →
          </a>}
        {url &&
          <a href={url} target="_blank" className="w-full border py-2 text-[#cea86f] font-semibold text-sm hover:bg-[#cea86f] hover:text-[#222222] rounded transition-all duration-300">
            View Demo →
          </a>}
      </div>
    </div>
  )
}
