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
    const t = setTimeout(() => setWidth(percentage), delay);
    return () => clearTimeout(t);
  }, [isVisible, percentage, delay]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</span>
        <span className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
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
    <section className="bg-[#080808] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              The Business Truth
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Repeat customers
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                drive everything.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <Bar
                label="Revenue from Repeat Customers"
                percentage={72}
                value="72%"
                color="linear-gradient(90deg, #3B82F6, #60A5FA)"
                delay={300}
                isVisible={isVisible}
              />
              <Bar
                label="Revenue from New Customers"
                percentage={28}
                value="28%"
                color="linear-gradient(90deg, #374151, #6B7280)"
                delay={500}
                isVisible={isVisible}
              />
              <Bar
                label="Profit Margin on Repeat vs. New"
                percentage={65}
                value="65% higher"
                color="linear-gradient(90deg, #10B981, #34D399)"
                delay={700}
                isVisible={isVisible}
              />

              <div
                className={`mt-8 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 transition-all duration-700 delay-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-blue-300 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  A customer who visits 10 times generates{' '}
                  <span className="text-blue-400 font-semibold">3x more lifetime value</span> than
                  10 one-time visitors — at zero acquisition cost.
                </p>
              </div>
            </div>

            <div
              className={`space-y-4 transition-all duration-700 delay-300 ${
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
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{stat.label}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{stat.sub}</p>
                  </div>
                  <span className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
