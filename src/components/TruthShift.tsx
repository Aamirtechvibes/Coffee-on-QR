import { useIntersection } from '../hooks/useIntersection';
import { useState, useEffect } from 'react';

interface BarProps {
  label: string;
  percentage: number;
  value: string;
  color: string;
  delay: number;
  isVisible: boolean;
}

function Bar({ label, percentage, value, color, delay, isVisible }: BarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const shouldShowImmediately =
      window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches;

    if (shouldShowImmediately) {
      setWidth(percentage);
      return;
    }

    const t = setTimeout(() => setWidth(percentage), delay);
    return () => clearTimeout(t);
  }, [isVisible, percentage, delay]);

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex justify-between items-baseline">
        <span
          className="text-xs sm:text-sm"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
        >
          {label}
        </span>
        <span
          className="text-base sm:text-lg font-bold"
          style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
        >
          {value}
        </span>
      </div>
      <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function TruthShift() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
            >
              The Business Truth
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              Repeat customers
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}
              >
                drive everything.
              </span>
            </h2>
          </div>

          {/* Bars + stat cards — stacked on mobile */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-start">
            <div className="space-y-5 sm:space-y-6">
              <Bar label="Revenue from Repeat Customers" percentage={72} value="72%" color="linear-gradient(90deg, #91A24F, #afbd6b)" delay={300} isVisible={isVisible} />
              <Bar label="Revenue from New Customers" percentage={28} value="28%" color="linear-gradient(90deg, #c4c9ae, #d1d5c0)" delay={500} isVisible={isVisible} />
              <Bar label="Profit Margin on Repeat vs. New" percentage={65} value="65% higher" color="linear-gradient(90deg, #E9A87C, #f0c09a)" delay={700} isVisible={isVisible} />

              <div
                className={`mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'rgba(145,162,79,0.07)', border: '1.5px solid rgba(145,162,79,0.22)' }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
                >
                  A customer who visits 10 times generates{' '}
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>3x more lifetime value</span>
                  {' '}than 10 one-time visitors — at zero acquisition cost.
                </p>
              </div>
            </div>

            <div
              className={`space-y-3 sm:space-y-4 transition-all duration-700 delay-300 min-w-0 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {[
                { label: 'Average repeat customer value', value: '₹4,200/yr', sub: 'vs ₹340 one-time' },
                { label: 'Loyalty program lift', value: '+35%', sub: 'average order size' },
                { label: 'Retention vs. acquisition cost', value: '5x', sub: 'cheaper to retain' },
                { label: 'Referrals from loyal customers', value: '60%', sub: 'of new customers' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-soft)',
                    boxShadow: '0 1px 6px rgba(26,26,26,0.04)',
                  }}
                >
                  <div>
                    <p className="text-[11px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                    <p className="text-[11px] sm:text-xs mt-0.5" style={{ color: 'var(--accent-soft)' }}>{stat.sub}</p>
                  </div>
                  <span
                    className="text-base sm:text-xl font-bold shrink-0 text-right"
                    style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
