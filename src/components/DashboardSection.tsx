import { useIntersection } from '../hooks/useIntersection';
import { TrendingUp, Users, Coffee, BarChart2 } from 'lucide-react';

const stats = [
  { icon: Users,      label: 'Active Members',   value: '284',  change: '+12 this week',    iconColor: 'var(--accent-primary)', iconBg: 'rgba(145,162,79,0.10)', iconBorder: 'rgba(145,162,79,0.22)' },
  { icon: TrendingUp, label: 'Repeat Rate',      value: '68%',  change: '+4% vs last month', iconColor: '#E9A87C',              iconBg: 'rgba(233,168,124,0.10)', iconBorder: 'rgba(233,168,124,0.22)' },
  { icon: Coffee,     label: 'Rewards Redeemed', value: '143',  change: '22 this week',      iconColor: 'var(--accent-hover)',  iconBg: 'rgba(175,189,107,0.10)', iconBorder: 'rgba(175,189,107,0.22)' },
  { icon: BarChart2,  label: 'Revenue Lift',     value: '+38%', change: 'vs pre-loyalty',    iconColor: '#ccb2c8',              iconBg: 'rgba(204,178,200,0.12)', iconBorder: 'rgba(204,178,200,0.28)' },
];

const chartData = [18, 24, 20, 32, 28, 42, 38, 52, 47, 62, 58, 74];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function MiniChart({ isVisible }: { isVisible: boolean }) {
  const shouldAnimate =
    typeof window !== 'undefined' &&
    !window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches;
  const max = Math.max(...chartData);
  const height = 100;
  const points = chartData.map((v, i) => {
    const x = (i / (chartData.length - 1)) * 280;
    const y = height - (v / max) * height;
    return `${x},${y}`;
  });

  return (
    <div
      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-soft)',
        boxShadow: '0 2px 12px rgba(26,26,26,0.05)',
      }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
            Repeat Customer Growth
          </p>
          <p className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
            +311%
          </p>
        </div>
        <span
          className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-semibold"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: 'rgba(145,162,79,0.10)',
            border: '1px solid rgba(145,162,79,0.22)',
            color: 'var(--accent-primary)',
          }}
        >
          12 months
        </span>
      </div>
      <svg viewBox="0 0 280 100" className="w-full h-16 sm:h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#91A24F" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#91A24F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#91A24F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: shouldAnimate ? (isVisible ? 0 : 1000) : 0,
            transition: 'stroke-dashoffset 2s ease',
          }}
        />
        <polygon
          points={`0,${height} ${points.join(' ')} 280,${height}`}
          fill="url(#chartGrad)"
          style={{ opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1, transition: 'opacity 2s ease 0.5s' }}
        />
      </svg>
      <div className="flex justify-between mt-1.5 sm:mt-2">
        {[months[0], months[3], months[6], months[9], months[11]].map((m) => (
          <span key={m} className="text-[9px] sm:text-[10px]" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardSection() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-14 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
            Your Dashboard
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            Data that turns into
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}>
              decisions.
            </span>
          </h2>
          <p
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            See who's returning, what rewards they love, and when to reach out.
          </p>
        </div>

        {/* Stat cards — 2 col always */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {stats.map(({ icon: Icon, label, value, change, iconColor, iconBg, iconBorder }, i) => (
            <div
              key={label}
              className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 2px 10px rgba(26,26,26,0.05)',
                transitionDelay: `${i * 100 + 200}ms`,
              }}
            >
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center mb-2.5 sm:mb-3"
                style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
              >
                <Icon size={14} style={{ color: iconColor }} />
              </div>
              <p className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                {value}
              </p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                {label}
              </p>
              <p className="text-[10px] sm:text-xs mt-1 font-medium" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <MiniChart isVisible={isVisible} />
        </div>

        {/* Insight cards — 1 col mobile, 3 col md+ */}
        <div
          className={`mt-3 sm:mt-4 grid sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { label: 'Top Reward', value: 'Free Cappuccino', sub: '67 redemptions' },
            { label: 'Best Visit Day', value: 'Saturday', sub: '31% of loyalty visits' },
            { label: 'At-Risk Customers', value: '18 members', sub: 'Not visited in 14 days' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3.5 sm:p-4 rounded-xl flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 1px 6px rgba(26,26,26,0.04)',
              }}
            >
              <div>
                <p className="text-[10px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                  {item.value}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-soft)' }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
