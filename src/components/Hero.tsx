import { ArrowRight, QrCode, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-5 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs text-blue-400 font-medium tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            Early Access — Limited Spots
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Turn Your Customers
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Into Regulars
          </span>
        </h1>

        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          The loyalty system built for cafes. Scan, earn, return —
          automated WhatsApp engagement that keeps customers coming back without lifting a finger.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onCTAClick}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-base transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Get Early Access
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 text-base transition-all duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <QrCode size={18} />
            See How It Works
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex -space-x-2">
            {['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500'].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-bold text-white`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Trusted by 120+ cafes in beta
            </p>
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 mt-16 w-full max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-10 h-full top-1/2" />
          <img
            src="/coffee-on-qr-cover.png"
            alt="Coffee on QR loyalty setup on a cafe table"
            className="w-full h-[300px] md:h-[420px] object-cover rounded-xl opacity-75"
            loading="lazy"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex gap-4 flex-wrap justify-center px-4">
              {[
                { label: 'Repeat Rate', value: '+68%', color: 'text-blue-400' },
                { label: 'Avg. Visits/Month', value: '4.2x', color: 'text-emerald-400' },
                { label: 'Revenue Lift', value: '+42%', color: 'text-amber-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#111]/90 border border-white/10 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <p className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
