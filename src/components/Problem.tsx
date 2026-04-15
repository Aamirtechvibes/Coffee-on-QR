import { useIntersection } from '../hooks/useIntersection';
import { TrendingDown, UserX, DollarSign, Repeat } from 'lucide-react';

export default function Problem() {
  const { ref, isVisible } = useIntersection();

  const pains = [
    { icon: UserX, text: 'A new customer walks in, has a great experience — and never returns.' },
    { icon: TrendingDown, text: 'You spend on Instagram ads, but retention stays flat.' },
    { icon: DollarSign, text: 'Acquiring new customers costs 5x more than keeping existing ones.' },
    { icon: Repeat, text: 'No system exists to bring them back automatically.' },
  ];

  return (
    <section className="bg-[#0A0A0A] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              The Real Problem
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Customers come…
              <br />
              <span className="text-gray-500">but they don't return.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {pains.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-red-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 rounded-3xl overflow-hidden relative transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <img
              src="https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Empty cafe"
              className="w-full h-64 object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent">
              <div className="text-center px-4">
                <p
                  className="text-2xl md:text-3xl font-semibold text-white"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Every empty seat
                  <br />
                  <span className="text-gray-500">is lost revenue.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
