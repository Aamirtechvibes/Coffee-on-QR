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
    <section className="bg-[#0A0A0A] py-28 px-5">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Early Access Offer
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Lock in founding
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              member pricing.
            </span>
          </h2>
        </div>

        <div
          className={`relative p-8 md:p-12 rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="px-5 py-2 rounded-full bg-blue-500 text-white text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              Most Popular
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-gray-500 line-through text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>₹25,000</span>
                <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded">regular price</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-6xl font-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>₹10,000</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <p className="text-blue-400 text-sm font-medium mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                60% off for the first 50 cafes only
              </p>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-6">
                <Clock size={16} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-400" style={{ fontFamily: 'Inter, sans-serif' }}>Limited Availability</p>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Only 50 early access spots. 34 already claimed.
                  </p>
                </div>
              </div>

              <button
                onClick={onCTAClick}
                className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-base transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Claim My Spot — ₹10,000/mo
              </button>
              <p className="text-center text-xs text-gray-600 mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                No long-term contract · Cancel anytime
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-blue-400" />
                <p className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Everything included:</p>
              </div>
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-8 grid md:grid-cols-3 gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { label: 'Setup', value: 'We do it for you', icon: '⚡' },
            { label: 'Support', value: 'WhatsApp priority', icon: '💬' },
            { label: 'Trial', value: '30-day money back', icon: '🛡️' },
          ].map((g) => (
            <div key={g.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <span className="text-2xl">{g.icon}</span>
              <div>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{g.label}</p>
                <p className="text-sm font-semibold text-white mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{g.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
