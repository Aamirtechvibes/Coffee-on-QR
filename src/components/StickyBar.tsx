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
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#111]/95 backdrop-blur-md border-t border-white/8 px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <Clock size={14} className="text-amber-400" />
            <span className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              Only <span className="text-amber-400 font-semibold">16 spots</span> remaining at ₹10,000/mo
            </span>
          </div>
          <button
            onClick={onCTAClick}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Get Early Access
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
