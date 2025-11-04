import { ImageWithFallback } from "./figma/ImageWithFallback"

const commitments = [
  "Ensure minimum higher secondary school education",
  "One employable skill for every youth",
  "Ensure employment prior to exiting our care",
  "Basic Information Technology and communication skills",
  "Working knowledge of English with basic conversational skills",
  "Character building and pertinent social skills to navigate life",
  "Increase family income of caregivers and community beneficiaries",
]

export function CommitmentSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1920&auto=format&fit=crop"
          alt="Background community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block h-1.5 w-16 bg-white rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Our Commitment to Every Child</h2>
        </div>

        {/* Pills grid: two rows on lg like in the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {commitments.map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-sm px-4 py-4 text-white"
            >
              <div className="shrink-0 h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center font-semibold">
                {i + 1}
              </div>
              <p className="text-sm leading-snug opacity-95">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* SDG strip */}
        <div className="mt-10 text-center">
          <div className="text-white/90 mb-3 text-xl">Our contribution to</div>
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            {/* SDG wordmark logo (prefers local asset; falls back to public SVG if missing) */}
            <img
              src="/sdg-logo.png"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                if (target.src.indexOf('wikipedia') === -1) {
                  target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sustainable_Development_Goals_logo.svg'
                }
              }}
              alt="Sustainable Development Goals"
              className="h-10 sm:h-12"
            />
            {/* Sample SDG icons */}
            <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg" className="h-10 rounded" alt="No Poverty" />
            <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg" className="h-10 rounded" alt="Quality Education" />
            <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg" className="h-10 rounded" alt="Decent Work" />
            <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg" className="h-10 rounded" alt="Reduced Inequalities" />
            <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg" className="h-10 rounded" alt="Peace, Justice and Strong Institutions" />
          </div>
        </div>
      </div>
    </section>
  )
}
