import { useIntersection } from '../hooks/useIntersection';
import { ArrowRight } from 'lucide-react';
import BrandMark from './BrandMark';

interface FinalCTAProps {
  onCTAClick: () => void;
}

export default function FinalCTA({ onCTAClick }: FinalCTAProps) {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Soft bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(196,201,174,0.30)' }}
        />
        <div
          className="absolute -bottom-8 right-0 w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] rounded-full blur-3xl"
          style={{ background: 'rgba(204,178,200,0.18)' }}
        />
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Logo */}
          <div
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 mx-auto"
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-soft)',
              boxShadow: '0 4px 16px rgba(26,26,26,0.08)',
            }}
          >
            <BrandMark className="w-9 h-9 sm:w-11 sm:h-11 object-contain" alt="" />
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 px-2 sm:px-0"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            Your regulars are
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}>
              waiting for a reason.
            </span>
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            Give them one. Every cafe that implements a loyalty system sees more repeat visits.
            The question isn't whether it works — it's whether you'll act before your competitor does.
          </p>

          {/* CTA button — full width on mobile */}
          <button
            onClick={onCTAClick}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-200 active:scale-95 mx-auto mb-8 sm:mb-10"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'var(--accent-primary)',
              color: '#1A1A1A',
              boxShadow: '0 6px 24px rgba(145,162,79,0.28)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(145,162,79,0.38)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(145,162,79,0.28)';
            }}
          >
            Start Building Loyalty Today
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Trust badges — 2 col on mobile */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-8">
            {['No app downloads', '10-min setup', '30-day guarantee', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-primary)' }} />
                <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-5xl mx-auto mt-14 sm:mt-20 pt-8 sm:pt-10"
        style={{ borderTop: '1px solid var(--border-soft)' }}
      >
        <div className="flex flex-col items-center gap-5 sm:gap-0 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <BrandMark className="w-7 h-7 sm:w-8 sm:h-8 object-contain" alt="" />
            <div>
              <span className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                Coffee on QR
              </span>
              <p className="text-[10px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                QR loyalty for cafes
              </p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-center order-last sm:order-none" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
            © 2026 Coffee on QR. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-center sm:text-right" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
            Early access for cafes · Loyalty setup handled by our team
          </p>
        </div>
      </div>
    </section>
  );
}
