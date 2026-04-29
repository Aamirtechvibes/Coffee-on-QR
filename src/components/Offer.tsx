import { useIntersection } from '../hooks/useIntersection';
import { CheckCircle, Clock, Zap } from 'lucide-react';

interface OfferProps {
  onCTAClick: () => void;
}

const features = [
  'Branded QR code + loyalty card',
  'Unlimited customer enrollments',
  'Automated WhatsApp messages',
  'Birthday & milestone campaigns',
  'Real-time analytics dashboard',
  'Dedicated onboarding support',
  'Custom reward tiers',
  'WhatsApp Business integration',
];

export default function Offer({ onCTAClick }: OfferProps) {
  const { ref, isVisible } = useIntersection();

  return (
    <section id='pricing' className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div ref={ref} className="max-w-4xl mx-auto">

        {/* Heading */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
            Early Access Offer
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            Lock in founding
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}>
              member pricing.
            </span>
          </h2>
        </div>

        {/* Pricing card */}
        <div
          className={`relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'var(--bg-card)',
            border: '2px solid rgba(145,162,79,0.28)',
            boxShadow: '0 12px 48px rgba(145,162,79,0.12)',
          }}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'var(--accent-primary)',
                color: '#1A1A1A',
                boxShadow: '0 4px 12px rgba(145,162,79,0.30)',
              }}
            >
              Most Popular
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start mt-2">
            <div>
              {/* Strikethrough price */}
              <div className="flex items-baseline gap-2 mb-1.5 sm:mb-2">
                <span className="line-through text-xl sm:text-2xl" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-muted)' }}>
                  ₹25,000
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-1 rounded" style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)', fontFamily: 'Inter, sans-serif' }}>
                  regular price
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                  ₹10,000
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>/month</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
                60% off for the first 50 cafes only
              </p>

              {/* Urgency */}
              <div
                className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl mb-5 sm:mb-6"
                style={{ background: 'rgba(233,168,124,0.08)', border: '1px solid rgba(233,168,124,0.22)' }}
              >
                <Clock size={14} style={{ color: '#E9A87C', flexShrink: 0 }} />
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: '#D97706' }}>
                    Limited Availability
                  </p>
                  <p className="text-[10px] sm:text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                    Only 50 spots. 34 already claimed.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onCTAClick}
                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
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
                Claim My Spot — ₹10,000/mo
              </button>
              <p className="text-center text-[10px] sm:text-xs mt-2.5 sm:mt-3" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                No long-term contract · Cancel anytime
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Zap size={13} style={{ color: 'var(--accent-primary)' }} />
                <p className="text-xs sm:text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                  Everything included:
                </p>
              </div>
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span className="text-xs sm:text-sm" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div
          className={`mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { label: 'Setup', value: 'We do it for you', icon: '⚡' },
            { label: 'Support', value: 'WhatsApp priority', icon: '💬' },
            { label: 'Trial', value: '30-day money back', icon: '🛡️' },
          ].map((g) => (
            <div
              key={g.label}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4"
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 2px 10px rgba(26,26,26,0.05)',
              }}
            >
              <span className="text-xl sm:text-2xl shrink-0">{g.icon}</span>
              <div>
                <p className="text-[9px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                  {g.label}
                </p>
                <p className="text-[10px] sm:text-sm font-semibold mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                  {g.value}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
