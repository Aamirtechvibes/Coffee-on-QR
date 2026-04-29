import { useEffect, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface StickyBarProps {
  onCTAClick: () => void;
}

export default function StickyBar({ onCTAClick }: StickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="px-4 sm:px-5 py-3 sm:py-4"
        style={{
          background: 'rgba(248,248,245,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(196,201,174,0.40)',
          boxShadow: '0 -4px 24px rgba(26,26,26,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Urgency text — hidden on very small screens to save space */}
          <div className="hidden sm:flex items-center gap-2.5 flex-1 min-w-0">
            <Clock size={13} style={{ color: '#D97706', flexShrink: 0 }} />
            <span className="text-xs truncate" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
              Only{' '}
              <span style={{ color: '#D97706', fontWeight: 700 }}>16 spots</span>
              {' '}remaining at ₹10,000/mo
            </span>
          </div>

          {/* On mobile: show a shorter message inline with button */}
          <div className="flex sm:hidden items-center gap-2 flex-1 min-w-0">
            <Clock size={12} style={{ color: '#D97706', flexShrink: 0 }} />
            <span className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: '#D97706' }}>
              16 spots left
            </span>
          </div>

          <button
            onClick={onCTAClick}
            className="group flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 flex-shrink-0"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'var(--accent-primary)',
              color: '#1A1A1A',
              boxShadow: '0 4px 16px rgba(145,162,79,0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(145,162,79,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(145,162,79,0.25)';
            }}
          >
            Get Early Access
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
