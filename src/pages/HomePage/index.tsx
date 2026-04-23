import { HeroSection } from '../../components/HeroSection'
import { AboutSection } from '../../components/AboutSection'
import { ProjectsSection } from '../../components/ProjectsSection'
import { FooterCTA } from '../../components/FooterCTA'
import { useIntroStore } from '../../stores/useIntroStore'

const HomePage = () => {
  // Placeholder projects data
  const hobbyProject = [
    {
      id: 1,
      title: 'Afterwork finder',
      description: 'Find a beer friend around you within 5km, using leaflet and Supabase realtime/presence',
      techs: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Zustand', 'Vite', 'Zod', 'Leaflet'],
      url: 'https://darklife-kappa.vercel.app/',
      git: 'https://github.com/TobiasKjernell/darklife',
      img: 'darklife.png'
    },
    {
      id: 2,
      title: 'PSP Dashboard',
      description: 'Kanban for our hobby game projects, using Supabase realtime/presence, fast updates and see all the users currently editing/watching. Login/auth via Supabase. Gantt system and also ingame "Settings" for specific games.',
      techs: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Zustand', 'Vite', 'Zod'],
      git: 'https://github.com/TobiasKjernell/kanbanSPA',
      url: '',
      img: 'kanban.png'
    },
    {
      id: 3,
      title: 'Portfolio',
      description: 'Simple portfolio',
      techs: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Vite', 'GSAP'],
      git: '',
      url: '',
      img: 'portfolio.png'
    },
    {
      id:4,
      title: 'Local LLM',
      description: 'Local LLM chat with OLAMA support. GPU performance and token counter.',
      techs: ['Python', 'Flask', 'React', 'Tailwind', 'Zustand', 'TypeScript', 'Claude'],
      git: 'https://github.com/TobiasKjernell/localLLM',
      url: '',
      img: 'localllm.png'
    }
  ]

  const projects = [
    {
      id: 1,
      title: 'Reddit inspired site. (old version)',
      description: 'Login/Signup, create posts with a theme, comment/nested, admin/user mode over their own posts',
      techs: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'TanStack', 'Vite', 'Zod'],
      url: '',
      git: 'https://github.com/TobiasKjernell/assignment_fullstack_supabase',
    },
    {
      id: 2,
      title: 'RAG Exploration',
      description: 'Upload a document/pdf and then use a chat window to ask. (Uploaded my CV to people could ask about me)',
      techs: ['Next.js', 'Supabase', 'TypeScript', 'OpenAI', 'Tailwind', 'Vercel AI', 'VoyagerAI', 'Vite'],
      url: '',
      git: 'https://github.com/TobiasKjernell/rag_ai_supabase'
    },
    {
      id: 3,
      title: 'Item DB',
      description: 'Learning fundumental React and made a sorting behaviour for items',
      techs: ['React', 'Tailwind', 'Vite'],
      url: 'https://react-spa-assignment.vercel.app/',
      git: 'https://github.com/TobiasKjernell/ReactSPA_Assignment',
      img: 'itemdb.png'
    },
    {
      id: 4,
      title: 'Pokemon DB',
      description: 'Search pokemons and see their information (Pokemon API)',
      techs: ['Javascript', 'CSS', 'API/Fetches Calls'],
      url: 'https://tobiaskjernell.github.io/API_assignment/',
      git: 'https://github.com/TobiasKjernell/API_assignment',
      img: 'pokemondb.png'
    },
    // {
    //   id: 5,
    //   title: 'Newspaper Site',
    //   description: 'Newspaper Site, layout practice with sorting',
    //   techs: ['React', 'CSS Modules', 'Vite'],
    //   url: 'https://react-newsletter.vercel.app/',
    //   git: 'https://github.com/TobiasKjernell/reactNewsletter',
    //   img: 'newspaper.png'
    // },
    {
      id: 6,
      title: 'Hotel App Next.js version',
      description: 'Requests and bookings practice with a "Hotel app" for users.',
      techs: ['Next.js', 'Javascript', 'Tailwind', 'Supabase', 'Google Auth', 'Vite'],
      url: '',
      git: 'https://github.com/TobiasKjernell/hotel_app_nextjs'
    },
    {
      id: 7,
      title: 'Hotel App React version',
      description: 'Dashboard version for employees',
      techs: ['React', 'Javascript', 'TanStack', 'React Forms', 'Recharts', 'Styled-Components', 'Supabase', 'Vite'],
      url: '',
      git: 'https://github.com/TobiasKjernell/hotel_app_practice'
    },
    {
      id: 8,
      title: 'Graduation Project',
      description: 'Focused on layout design and animation for a hobby project. Dashboard controlling Unity information',
      techs: ['Next.js', 'TypeScript', 'TanStack', 'React Forms', 'Supabase/Realtime', 'ShadCN', 'Vite'],
      url: 'https://graduation-project-pearl.vercel.app',
      git: 'https://github.com/TobiasKjernell/graduation_project',
      img: 'graduationblog.png'
    },
    {
      id: 9,
      title: 'JS Game, Hangman',
      description: 'Hangman in pure JS with some animations',
      techs: ['JS', 'Classic CSS'],
      url: 'https://tobiaskjernell.github.io/Second_JS_Game_Assignment/ ',
      git: 'https://github.com/TobiasKjernell/Second_JS_Game_Assignment',
      img: 'game.png'
    },  

  ]
  const { isIntroComplete } = useIntroStore();
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white noScrollbar">
      {isIntroComplete &&
        <>
          <HeroSection />
          <AboutSection />
          <ProjectsSection projects={projects} hobby={hobbyProject} />
          <FooterCTA />
        </>
      }
    </div>
  )
}

export default HomePage