import { useIntersection } from '../hooks/useIntersection';
import { Gift, Star, CheckCircle } from 'lucide-react';
import BrandMark from './BrandMark';

function LoyaltyCard() {
  return (
    <div className="bg-[#111] border border-white/8 rounded-3xl p-6 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Coffee on QR</p>
          <p className="text-lg font-semibold text-white mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Priya's Cafe Card</p>
        </div>
        <BrandMark className="w-10 h-10 object-contain" alt="" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Loyalty Points</span>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            420 <span className="text-sm font-normal text-gray-500">/ 500</span>
          </span>
        </div>
        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            style={{ width: '84%' }}
          />
        </div>
        <p className="text-xs text-blue-400 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          80 points away from a Free Coffee!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { visits: '5 visits', reward: 'Free Cookie', unlocked: true },
          { visits: '10 visits', reward: 'Free Coffee', unlocked: false },
          { visits: '20 visits', reward: 'VIP Status', unlocked: false },
        ].map((r) => (
          <div
            key={r.visits}
            className={`p-3 rounded-xl text-center border ${
              r.unlocked
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-white/5 bg-white/[0.02]'
            }`}
          >
            {r.unlocked ? (
              <CheckCircle size={16} className="text-emerald-400 mx-auto mb-1" />
            ) : (
              <Gift size={16} className="text-gray-600 mx-auto mb-1" />
            )}
            <p className="text-[10px] text-gray-500 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{r.visits}</p>
            <p className={`text-[10px] font-medium mt-0.5 leading-tight ${r.unlocked ? 'text-emerald-400' : 'text-gray-400'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              {r.reward}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
        <Star size={14} className="text-amber-400 flex-shrink-0" />
        <p className="text-xs text-amber-300/80" style={{ fontFamily: 'Inter, sans-serif' }}>
          Visit again this week for a <strong>2x points bonus</strong>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          Member since March 2024 · 14 total visits
        </p>
      </div>
    </div>
  );
}

export default function ProductExperience() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="bg-[#080808] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              What Your Customer Sees
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              A loyalty card
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                they actually use.
              </span>
            </h2>
            <p className="text-gray-400 mt-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              No plastic cards. No apps to download. The entire loyalty experience lives in the browser —
              scannable in seconds, beautiful to use.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Real-time points balance after every visit',
                'Visual progress toward the next reward',
                'Personalized offers based on visit history',
                'Instant redemption — no staff training needed',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <LoyaltyCard />
          </div>
        </div>
      </div>
    </section>
  );
}
