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

  useEffect(() => {
    if (done) return;

    const enterDuration = 400;
    const visibleDuration = 900;
    const exitDuration = 400;

    let timeout: ReturnType<typeof setTimeout>;

    const runCycle = (index: number) => {
      setCurrentIndex(index);
      setPhase('enter');

      timeout = setTimeout(() => {
        setPhase('visible');
        timeout = setTimeout(() => {
          setPhase('exit');
          timeout = setTimeout(() => {
            if (index < greetings.length - 1) {
              runCycle(index + 1);
            } else {
              setDone(true);
              setTimeout(onComplete, 300);
            }
          }, exitDuration);
        }, visibleDuration);
      }, enterDuration);
    };

    runCycle(0);

    return () => clearTimeout(timeout);
  }, [done, onComplete]);

  const translateY =
    phase === 'enter' ? 'translateY(28px)' : phase === 'exit' ? 'translateY(-28px)' : 'translateY(0)';
  const opacity = phase === 'visible' ? 1 : 0;

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '32px',
          opacity: 0.4,
        }}
      >
        <BrandMark className="w-7 h-7 object-contain" alt="" />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#6B7280',
            textTransform: 'uppercase',
          }}
        >
          Coffee on QR
        </span>
      </div>

      <div
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(28px, 8vw, 52px)',
            fontWeight: 600,
            color: '#F9FAFB',
            opacity,
            transform: translateY,
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          {greetings[currentIndex].text}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '40px',
        }}
      >
        {greetings.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? '20px' : '4px',
              height: '4px',
              borderRadius: '2px',
              background: i === currentIndex ? '#3B82F6' : '#1F2937',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
