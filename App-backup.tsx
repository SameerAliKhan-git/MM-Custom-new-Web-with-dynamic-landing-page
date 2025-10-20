import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreInitiatives } from './components/CoreInitiatives';
import { ImpactNumbers } from './components/ImpactNumbers';
import { StoriesOfImpact } from './components/StoriesOfImpact';
import { WaysToHelp } from './components/WaysToHelp';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div className="bg-white relative z-10">
          <CoreInitiatives />
          <ImpactNumbers />
          <StoriesOfImpact />
          <WaysToHelp />
        </div>
      </main>
      <Footer />
    </div>
  );
}