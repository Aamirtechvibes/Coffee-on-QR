import { useIntersection } from '../hooks/useIntersection';
import { Gift, Star, CheckCircle } from 'lucide-react';
import BrandMark from './BrandMark';

function LoyaltyCard() {
  return (
    <div
      className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-sm mx-auto"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-soft)',
        boxShadow: '0 8px 32px rgba(26,26,26,0.09)',
      }}
    >
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <p
            className="text-[10px] sm:text-xs uppercase tracking-widest"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}
          >
            Coffee on QR
          </p>
          <p
            className="text-base sm:text-lg font-semibold mt-0.5"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            Priya's Cafe Card
          </p>
        </div>
        <BrandMark className="w-9 h-9 sm:w-10 sm:h-10 object-contain" alt="" />
      </div>

      {/* Progress */}
      <div className="mb-5 sm:mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span
            className="text-xs sm:text-sm"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            Loyalty Points
          </span>
          <span
            className="text-xl sm:text-2xl font-bold"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            420{' '}
            <span className="text-xs sm:text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/ 500</span>
          </span>
        </div>
        <div className="h-2 sm:h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: '84%', background: 'linear-gradient(90deg, #91A24F, #afbd6b)' }}
          />
        </div>
        <p
          className="text-[11px] sm:text-xs mt-2 font-medium"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
        >
          80 points away from a Free Coffee!
        </p>
      </div>

      {/* Reward tiers */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {[
          { visits: '5 visits', reward: 'Free Cookie', unlocked: true },
          { visits: '10 visits', reward: 'Free Coffee', unlocked: false },
          { visits: '20 visits', reward: 'VIP Status', unlocked: false },
        ].map((r) => (
          <div
            key={r.visits}
            className="p-2.5 sm:p-3 rounded-xl text-center"
            style={{
              border: r.unlocked ? '1px solid rgba(145,162,79,0.30)' : '1px solid var(--border-soft)',
              background: r.unlocked ? 'rgba(145,162,79,0.07)' : 'var(--bg-secondary)',
            }}
          >
            {r.unlocked ? (
              <CheckCircle size={14} className="mx-auto mb-1" style={{ color: 'var(--accent-primary)' }} />
            ) : (
              <Gift size={14} className="mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
            )}
            <p
              className="text-[9px] sm:text-[10px] leading-tight"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}
            >
              {r.visits}
            </p>
            <p
              className="text-[9px] sm:text-[10px] font-semibold mt-0.5 leading-tight"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: r.unlocked ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              {r.reward}
            </p>
          </div>
        ))}
      </div>

      {/* Bonus nudge */}
      <div
        className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl"
        style={{ background: 'rgba(233,168,124,0.08)', border: '1px solid rgba(233,168,124,0.22)' }}
      >
        <Star size={13} style={{ color: '#E9A87C', flexShrink: 0 }} />
        <p className="text-[11px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#D97706' }}>
          Visit again this week for a <strong>2x points bonus</strong>
        </p>
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-[10px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
          Member since March 2024 · 14 total visits
        </p>
      </div>
    </div>
  );
}

export default function ProductExperience() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Card first on mobile, text first on desktop */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-14 md:gap-16 items-center">

          {/* On mobile: show card first using order */}
          <div
            className={`order-2 md:order-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
            >
              What Your Customer Sees
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              A loyalty card
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}
              >
                they actually use.
              </span>
            </h2>
            <p
              className="mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
            >
              No plastic cards. No apps to download. The entire loyalty experience lives in the browser —
              scannable in seconds, beautiful to use.
            </p>

            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                'Real-time points balance after every visit',
                'Visual progress toward the next reward',
                'Personalized offers based on visit history',
                'Instant redemption — no staff training needed',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`order-1 md:order-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <LoyaltyCard />
          </div>

        </div>
      </div>
    </section>
  );
}
