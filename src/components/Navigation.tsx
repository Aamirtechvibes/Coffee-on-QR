import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavigationProps {
  onCTAClick: () => void;
}

export default function Navigation({ onCTAClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useBodyScrollLock(menuOpen);

  const handleCTA = () => {
    setMenuOpen(false);
    onCTAClick();
  };

  const navLinks = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Problem', id: 'problem' },
  { label: 'Pricing', id: 'pricing' },
];
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled || menuOpen ? 'rgba(248,248,245,0.97)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(196,201,174,0.40)' : 'none',
          boxShadow: scrolled ? '0 2px 12px rgba(26,26,26,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <BrandMark className="w-7 h-7 sm:w-8 sm:h-8 object-contain" alt="" />
            <span
              className="font-semibold tracking-tight text-sm sm:text-base"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              Coffee on QR
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
  <button
    key={item.id}
    onClick={() => {
      document.getElementById(item.id)?.scrollIntoView({
        behavior: 'smooth',
      });
    }}
    className="text-sm transition-colors duration-200"
    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
  >
    {item.label}
  </button>
))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <button
              onClick={handleCTA}
              className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'var(--accent-primary)',
                color: '#1A1A1A',
                boxShadow: '0 2px 10px rgba(145,162,79,0.22)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(145,162,79,0.30)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(145,162,79,0.22)';
              }}
            >
              Get Early Access
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: menuOpen ? 'var(--bg-secondary)' : 'transparent',
                color: 'var(--text-primary)',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '400px' : '0px',
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div
            className="px-4 pb-6 pt-3 flex flex-col gap-1"
            style={{ borderTop: '1px solid rgba(196,201,174,0.30)' }}
          >
            {navLinks.map((item) => (
  <button
    key={item.id}
    className="w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-colors"
    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
    onClick={() => {
      document.getElementById(item.id)?.scrollIntoView({
        behavior: 'smooth',
      });
      setMenuOpen(false);
    }}
  >
    {item.label}
  </button>
))}

            {/* Mobile CTA inside menu */}
            <button
              onClick={handleCTA}
              className="w-full mt-2 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'var(--accent-primary)',
                color: '#1A1A1A',
                boxShadow: '0 4px 16px rgba(145,162,79,0.25)',
              }}
            >
              Get Early Access →
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay behind menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(26,26,26,0.15)', backdropFilter: 'blur(2px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
