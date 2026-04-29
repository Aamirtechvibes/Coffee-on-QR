import { ArrowRight, QrCode, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShowImmediately =
      window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches;

    if (shouldShowImmediately) {
      setVisible(true);
      return;
    }

    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-24 pb-10 sm:pb-16 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Soft background blobs — scaled down on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl"
          style={{ background: 'rgba(196,201,174,0.30)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-3xl"
          style={{ background: 'rgba(204,178,200,0.15)' }}
        />
        <div
          className="hidden sm:block absolute top-1/3 right-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full blur-3xl"
          style={{ background: 'rgba(145,162,79,0.10)' }}
        />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Badge */}
        <div
          className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border mb-5 sm:mb-8"
          style={{
            borderColor: 'rgba(145,162,79,0.30)',
            background: 'rgba(145,162,79,0.08)',
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--accent-primary)' }}
          />
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
          >
            Early Access — Limited Spots
          </span>
        </div>

        {/* Headline — responsive scale */}
        <h1
          className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight mb-4 sm:mb-6"
          style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
        >
          Turn Your Customers
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #91A24F 0%, #afbd6b 60%, #c4c9ae 100%)' }}
          >
            Into Regulars
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-12 px-1 sm:px-0"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
        >
          The loyalty system built for cafes. Scan, earn, return —
          automated WhatsApp engagement that keeps customers coming back without lifting a finger.
        </p>

        {/* CTA buttons — stacked on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-16 px-0">
          <button
            onClick={onCTAClick}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'var(--accent-primary)',
              color: '#1A1A1A',
              boxShadow: '0 4px 20px rgba(145,162,79,0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(145,162,79,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(145,162,79,0.25)';
            }}
          >
            Get Early Access
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
          onClick={() => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-medium transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1.5px solid var(--border-soft)',
              boxShadow: '0 2px 8px rgba(26,26,26,0.06)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-soft)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-soft)';
            }}
          >
            <QrCode size={16} />
            See How It Works
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap min-h-[2.5rem]">
          <div className="flex -space-x-2">
            {['#E9A87C', '#91A24F', '#ccb2c8', '#c4c9ae'].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-xs font-bold"
                style={{ background: c, borderColor: 'var(--bg-primary)', color: '#fff' }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#E9A87C" color="#E9A87C" />)}
            </div>
            <p className="text-[11px] sm:text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
              Trusted by 120+ cafes in beta
            </p>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div
        className={`relative z-10 mt-8 sm:mt-16 w-full max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-1"
          style={{
            border: '1.5px solid var(--border-soft)',
            background: 'var(--bg-card)',
            boxShadow: '0 12px 40px rgba(26,26,26,0.10)',
          }}
        >
          <img
            src="/coffee-on-qr-cover.png"
            alt="Coffee on QR loyalty setup on a cafe table"
            className="w-full aspect-[4/3] sm:h-[300px] md:h-[400px] object-cover rounded-xl sm:rounded-2xl"
            style={{ opacity: 0.88 }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(248,248,245,0.65) 100%)' }}
          />

          <div className="grid grid-cols-3 gap-2 p-2 sm:hidden" style={{ background: 'rgba(255,255,255,0.96)' }}>
            {[
              { label: 'Repeat Rate', value: '+68%', color: 'var(--accent-primary)' },
              { label: 'Avg. Visits', value: '4.2x', color: '#6B7280' },
              { label: 'Revenue Lift', value: '+42%', color: 'var(--accent-hover)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-2 py-2 text-center"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(196,201,174,0.50)',
                  boxShadow: '0 2px 10px rgba(26,26,26,0.06)',
                }}
              >
                <p className="text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[9px] mt-0.5 leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Stats overlay — desktop/tablet */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex gap-2 sm:gap-4 justify-center px-2 sm:px-4 w-full">
            {[
              { label: 'Repeat Rate', value: '+68%', color: 'var(--accent-primary)' },
              { label: 'Avg. Visits', value: '4.2x', color: '#6B7280' },
              { label: 'Revenue Lift', value: '+42%', color: 'var(--accent-hover)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 text-center backdrop-blur-md flex-1 sm:flex-none"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(196,201,174,0.50)',
                  boxShadow: '0 4px 16px rgba(26,26,26,0.08)',
                }}
              >
                <p
                  className="text-base sm:text-2xl font-bold"
                  style={{ fontFamily: 'Poppins, sans-serif', color: stat.color }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[9px] sm:text-xs mt-0.5 sm:mt-1 leading-tight"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
