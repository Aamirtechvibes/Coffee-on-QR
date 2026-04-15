import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';

interface NavigationProps {
  onCTAClick: () => void;
}

export default function Navigation({ onCTAClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark className="w-8 h-8 object-contain" alt="" />
          <span
            className="font-semibold text-white tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Coffee on QR
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['How it works', 'Features', 'Pricing'].map((item) => (
            <button
              key={item}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={onCTAClick}
          className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Get Early Access
        </button>
      </div>
    </nav>
  );
}
