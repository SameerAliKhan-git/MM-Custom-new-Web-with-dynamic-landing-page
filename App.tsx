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
import { Sitemap } from "./components/Sitemap"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function HomeMain() {
  return (
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
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black">
        <Header />
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route
            path="/sitemap"
            element={
              <main className="relative z-0">
                <Sitemap />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}