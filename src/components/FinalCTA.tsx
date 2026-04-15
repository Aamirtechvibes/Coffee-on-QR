import { useIntersection } from '../hooks/useIntersection';
import { ArrowRight } from 'lucide-react';
import BrandMark from './BrandMark';

interface FinalCTAProps {
  onCTAClick: () => void;
}

export default function FinalCTA({ onCTAClick }: FinalCTAProps) {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="bg-[#080808] py-28 px-5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-8 mx-auto">
            <BrandMark className="w-11 h-11 object-contain" alt="" />
          </div>

          <h2
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Your regulars are
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              waiting for a reason.
            </span>
          </h2>

          <p
            className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Give them one. Every cafe that implements a loyalty system sees more repeat visits.
            The question isn't whether it works — it's whether you'll act before your competitor does.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onCTAClick}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Start Building Loyalty Today
              <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['No app downloads', '10-min setup', '30-day guarantee', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-20 pt-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandMark className="w-8 h-8 object-contain" alt="" />
            <div>
              <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Coffee on QR</span>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>QR loyalty for cafes</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 Coffee on QR. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <button key={item} className="text-xs text-gray-600 hover:text-gray-400 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
