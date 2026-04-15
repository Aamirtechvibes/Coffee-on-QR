import { useIntersection } from '../hooks/useIntersection';
import { TrendingUp, Users, Coffee, BarChart2 } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Active Members', value: '284', change: '+12 this week', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { icon: TrendingUp, label: 'Repeat Rate', value: '68%', change: '+4% vs last month', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Coffee, label: 'Rewards Redeemed', value: '143', change: '22 this week', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: BarChart2, label: 'Revenue Lift', value: '+38%', change: 'vs pre-loyalty', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
];

const chartData = [18, 24, 20, 32, 28, 42, 38, 52, 47, 62, 58, 74];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function MiniChart({ isVisible }: { isVisible: boolean }) {
  const max = Math.max(...chartData);
  const height = 100;

  const points = chartData.map((v, i) => {
    const x = (i / (chartData.length - 1)) * 280;
    const y = height - (v / max) * height;
    return `${x},${y}`;
  });

  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Repeat Customer Growth</p>
          <p className="text-2xl font-bold text-white mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>+311%</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" style={{ fontFamily: 'Inter, sans-serif' }}>
          12 months
        </span>
      </div>
      <svg viewBox="0 0 280 100" className="w-full h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isVisible ? 0 : 1000,
            transition: 'stroke-dashoffset 2s ease',
          }}
        />
        <polygon
          points={`0,${height} ${points.join(' ')} 280,${height}`}
          fill="url(#chartGrad)"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 2s ease 0.5s',
          }}
        />
      </svg>
      <div className="flex justify-between mt-2">
        {[months[0], months[3], months[6], months[9], months[11]].map((m) => (
          <span key={m} className="text-[10px] text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardSection() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="bg-[#0A0A0A] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Dashboard
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Data that turns into
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              decisions.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            See exactly who's returning, what rewards they love, and when to reach out — all from a clean, simple dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, change, color, bg, border }, i) => (
            <div
              key={label}
              className={`p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center mb-3`}>
                <Icon size={16} className={color} />
              </div>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</p>
              <p className="text-xs text-emerald-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{change}</p>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <MiniChart isVisible={isVisible} />
        </div>

        <div
          className={`mt-4 grid md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { label: 'Top Reward', value: 'Free Cappuccino', sub: '67 redemptions' },
            { label: 'Best Visit Day', value: 'Saturday', sub: '31% of loyalty visits' },
            { label: 'At-Risk Customers', value: '18 members', sub: 'Not visited in 14 days' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</p>
                <p className="text-sm font-semibold text-white mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{item.value}</p>
              </div>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
