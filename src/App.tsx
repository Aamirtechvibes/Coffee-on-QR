import { useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import TruthShift from './components/TruthShift';
import Solution from './components/Solution';
import ProductExperience from './components/ProductExperience';
import Psychology from './components/Psychology';
import Automation from './components/Automation';
import DashboardSection from './components/DashboardSection';
import Impact from './components/Impact';
import Offer from './components/Offer';
import FinalCTA from './components/FinalCTA';
import SignupModal from './components/SignupModal';
import StickyBar from './components/StickyBar';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const shouldShowImmediately =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldShowImmediately) {
      setIntroComplete(true);
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}

      <div
        className="transition-opacity duration-700"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        <Navigation onCTAClick={openModal} />
        <Hero onCTAClick={openModal} />
        <Problem />
        <TruthShift />
        <Solution />
        <ProductExperience />
        <Psychology />
        <Automation />
        <DashboardSection />
        <Impact onCTAClick={openModal} />
        <Offer onCTAClick={openModal} />
        <FinalCTA onCTAClick={openModal} />
        <StickyBar onCTAClick={openModal} />
      </div>

      <SignupModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
