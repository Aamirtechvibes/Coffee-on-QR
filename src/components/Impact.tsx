import { useIntersection } from '../hooks/useIntersection';

interface ImpactProps {
  onCTAClick: () => void;
}

export default function Impact({ onCTAClick }: ImpactProps) {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
              The Transformation
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              From empty tables
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}>
                to a full house.
              </span>
            </h2>
          </div>

          {/* Before / After — stacked on mobile */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {/* Before */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(26,26,26,0.08)' }}>
              <img
                src="https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Empty cafe before loyalty"
                className="w-full aspect-[4/3] sm:h-72 object-cover"
                style={{ opacity: 0.55 }}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(248,248,245,0.90) 0%, transparent 55%)' }} />
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5">
                <span
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#DC2626', fontFamily: 'Inter, sans-serif' }}
                >
                  Before Coffee on QR
                </span>
                <p className="font-semibold mt-2 text-sm sm:text-base" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                  New faces, but no return
                </p>
                <p className="text-xs sm:text-sm" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>12% repeat rate</p>
              </div>
            </div>

            {/* After */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(26,26,26,0.08)' }}>
              <img
                src="https://images.pexels.com/photos/1992926/pexels-photo-1992926.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Busy cafe after loyalty"
                className="w-full aspect-[4/3] sm:h-72 object-cover"
                style={{ opacity: 0.70 }}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(248,248,245,0.90) 0%, transparent 55%)' }} />
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5">
                <span
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold"
                  style={{ background: 'rgba(145,162,79,0.12)', border: '1px solid rgba(145,162,79,0.28)', color: 'var(--accent-primary)', fontFamily: 'Inter, sans-serif' }}
                >
                  After Coffee on QR
                </span>
                <p className="font-semibold mt-2 text-sm sm:text-base" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                  Regulars every single day
                </p>
                <p className="text-xs sm:text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>68% repeat rate</p>
              </div>
            </div>
          </div>

          {/* Stats — 2 col mobile, 4 col md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {[
              { label: 'Avg. revenue increase', value: '₹38k/mo' },
              { label: 'Customer retention', value: '68%' },
              { label: 'Setup time', value: '< 10 min' },
              { label: 'ROI in first 90 days', value: '6x' },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-soft)',
                  boxShadow: '0 2px 10px rgba(26,26,26,0.05)',
                }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-5 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
              Cafes that implemented Coffee on QR saw results within the first 30 days.
            </p>
            <button
              onClick={onCTAClick}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
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
              Start My Transformation
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
