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
    <section id='problem' className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
            >
              The Real Problem
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              Customers come…
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>but they don't return.</span>
            </h2>
          </div>

          {/* Pain cards — 1 col mobile, 2 col md+ */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {pains.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className={`group p-5 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-soft)',
                  boxShadow: '0 2px 12px rgba(26,26,26,0.05)',
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}
                  >
                    <Icon size={16} style={{ color: '#EF4444' }} />
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div
            className={`mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden relative transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '0 8px 32px rgba(26,26,26,0.10)' }}
          >
            <img
              src="https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Empty cafe"
              className="w-full h-48 sm:h-64 object-cover"
              style={{ opacity: 0.50 }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(to top, rgba(248,248,245,0.85) 0%, rgba(248,248,245,0.30) 60%, transparent 100%)' }}
            >
              <div className="text-center px-4">
                <p
                  className="text-xl sm:text-2xl md:text-3xl font-semibold"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
                >
                  Every empty seat
                  <br />
                  <span style={{ color: 'var(--text-secondary)' }}>is lost revenue.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
