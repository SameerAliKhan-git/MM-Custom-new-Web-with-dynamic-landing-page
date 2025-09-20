import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { AboutPage } from "./components/AboutPage"
import { CoreInitiatives } from "./components/CoreInitiatives"
import { ImpactNumbers } from "./components/ImpactNumbers"
// import { OurReach } from "./components/OurReach" // Temporarily disabled per user request
import { StoriesOfImpact } from "./components/StoriesOfImpact"
import { Footer } from "./components/Footer"
import { CommitmentSection } from "./components/CommitmentSection"
import { DonationTypes } from "./components/DonationTypes"
import { Sitemap } from "./components/Sitemap"
import { Disclaimer } from "./components/Disclaimer"
import { Contact } from "./components/Contact"
import { Privacy } from "./components/Privacy"
import { DonorPortal } from "./components/DonorPortal"
import { Login } from "./components/Login"
import { AdminDashboard } from "./components/AdminDashboard"
import { VisionMissionValues } from "./components/VisionMissionValues"
import { Governance } from "./components/Governance"
import { Programmes } from "./components/Programmes"
import DonationPage from "./components/DonationPage"
import { isLoggedIn, getRole } from "./components/auth"
import { Toaster } from "./components/ui/sonner"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { verifySession } from "./components/auth"

function HomeMain() {
  return (
    <main className="relative z-0">
      <Hero />
      <About />
      <CoreInitiatives />
      <ImpactNumbers />
  {/* <OurReach /> */}
      <StoriesOfImpact />
      <DonationTypes />
    </main>
  )
}

export default function App() {
  useEffect(() => {
    // Prime session and CSRF token cookie on first load
    verifySession();
  }, []);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black">
        <Header />
        <Routes>
          <Route path="/" element={<HomeMain />} />
          
          <Route
            path="/about"
            element={
              <main className="relative z-0">
                <AboutPage />
              </main>
            }
          />
          <Route
            path="/programmes"
            element={
              <main className="relative z-0">
                <Programmes />
              </main>
            }
          />
          <Route
            path="/sitemap"
            element={
              <main className="relative z-0">
                <Sitemap />
              </main>
            }
          />
          <Route
            path="/disclaimer"
            element={
              <main className="relative z-0">
                <Disclaimer />
              </main>
            }
          />
          <Route
            path="/privacy"
            element={
              <main className="relative z-0">
                <Privacy />
              </main>
            }
          />
          <Route
            path="/vision-mission-values"
            element={
              <main className="relative z-0">
                <VisionMissionValues />
              </main>
            }
          />
          <Route
            path="/contact"
            element={
              <main className="relative z-0">
                <Contact />
              </main>
            }
          />
          <Route
            path="/donate"
            element={
              <main className="relative z-0">
                <DonationPage />
              </main>
            }
          />
          <Route
            path="/governance"
            element={
              <main className="relative z-0">
                <Governance />
              </main>
            }
          />
          <Route
            path="/donor-portal"
            element={
              <main className="relative z-0">
                <DonorPortal />
              </main>
            }
          />
          <Route
            path="/donor-portal/login"
            element={<Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={
              <main className="relative z-0">
                <Login />
              </main>
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn() && getRole() === "admin" ? (
                <main className="relative z-0">
                  <AdminDashboard />
                </main>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </BrowserRouter>
  )
}