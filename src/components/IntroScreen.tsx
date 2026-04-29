import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';

const greetings = [
  { text: 'Hello Cafe', lang: 'English' },
  { text: 'नमस्ते ☕', lang: 'Hindi' },
  { text: 'नमस्कार', lang: 'Marathi' },
  { text: 'سلام', lang: 'Urdu' },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'Punjabi' },
  { text: 'வணக்கம்', lang: 'Tamil' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '안녕하세요', lang: 'Korean' },
];

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncViewport = () => setIsMobile(window.innerWidth < 768);
    syncViewport();
    window.addEventListener('resize', syncViewport, { passive: true });
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  useEffect(() => {
    const shouldSkipIntro =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldSkipIntro) {
      setDone(true);
      onComplete();
      return;
    }

    if (done) return;

    const sequence = isMobile ? greetings.slice(0, 3) : greetings;
    const enterDuration = isMobile ? 240 : 400;
    const visibleDuration = isMobile ? 420 : 900;
    const exitDuration = isMobile ? 220 : 400;

    let timeout: ReturnType<typeof setTimeout>;

    const runCycle = (index: number) => {
      setCurrentIndex(index);
      setPhase('enter');

      timeout = setTimeout(() => {
        setPhase('visible');
        timeout = setTimeout(() => {
          setPhase('exit');
          timeout = setTimeout(() => {
            if (index < sequence.length - 1) {
              runCycle(index + 1);
            } else {
              setDone(true);
              setTimeout(onComplete, isMobile ? 150 : 300);
            }
          }, exitDuration);
        }, visibleDuration);
      }, enterDuration);
    };

    runCycle(0);
    return () => clearTimeout(timeout);
  }, [done, isMobile, onComplete]);

  const translateY =
    phase === 'enter' ? `translateY(${isMobile ? 14 : 28}px)` : phase === 'exit' ? `translateY(-${isMobile ? 14 : 28}px)` : 'translateY(0)';
  const opacity = phase === 'visible' ? 1 : 0;

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '12px' : '16px',
        padding: isMobile ? '24px' : '32px',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '24px' : '32px', opacity: 0.55 }}>
        <BrandMark className="w-7 h-7 object-contain" alt="" />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          Coffee on QR
        </span>
      </div>

      {/* Greeting text */}
      <div
        style={{
          height: isMobile ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: isMobile ? 'clamp(26px, 8vw, 34px)' : 'clamp(28px, 8vw, 52px)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            opacity,
            transform: translateY,
            transition: isMobile
              ? 'opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          {greetings[currentIndex].text}
        </span>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '6px', marginTop: isMobile ? '28px' : '40px' }}>
        {(isMobile ? greetings.slice(0, 3) : greetings).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? (isMobile ? '16px' : '20px') : '4px',
              height: '4px',
              borderRadius: '2px',
              background: i === currentIndex ? 'var(--accent-primary)' : 'var(--accent-soft)',
              transition: isMobile ? 'all 0.22s ease' : 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
