import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { CoreInitiatives } from "./components/CoreInitiatives"
import { ImpactNumbers } from "./components/ImpactNumbers"
import { OurReach } from "./components/OurReach"
import { StoriesOfImpact } from "./components/StoriesOfImpact"
import { Footer } from "./components/Footer"
import { CommitmentSection } from "./components/CommitmentSection"
import { DonationTypes } from "./components/DonationTypes"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="relative z-0">
        <Hero />
        <About />
        <CoreInitiatives />
        <ImpactNumbers />
        <OurReach />
  <CommitmentSection />
        <StoriesOfImpact />
  <DonationTypes />
      </main>
      <Footer />
    </div>
  )
}