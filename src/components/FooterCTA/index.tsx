export const FooterCTA = () => {
  return (
    <section className="py-16 px-4 bg-[#0f0f0f] text-center border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-4">
          Im currently looking for work!
        </h2>
       
          <a
          href="https://www.linkedin.com/in/tobias-kjernell-4b50b113a/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-2 border-2 border-[#cea86f] text-[#cea86f] font-semibold rounded-lg hover:bg-[#cea86f] hover:text-[#222222] transition-all duration-300 inline-block"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}
