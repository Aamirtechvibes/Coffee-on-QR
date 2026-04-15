import { useIntersection } from '../hooks/useIntersection';
import { Zap, RotateCcw, Trophy, Heart } from 'lucide-react';

const loopSteps = [
  {
    icon: Zap,
    title: 'Trigger',
    description: 'QR code at the counter creates an instant cue to participate',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    position: 'top-0 left-1/2 -translate-x-1/2',
  },
  {
    icon: Trophy,
    title: 'Action',
    description: 'Customer scans, sees their points — feels rewarded',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    position: 'top-1/2 right-0 translate-y-[-50%]',
  },
  {
    icon: Heart,
    title: 'Reward',
    description: 'Progress bar moves. A free reward gets closer. Dopamine.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    position: 'bottom-0 left-1/2 -translate-x-1/2',
  },
  {
    icon: RotateCcw,
    title: 'Investment',
    description: 'They return — because leaving means losing what they earned',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    position: 'top-1/2 left-0 translate-y-[-50%]',
  },
];

export default function Psychology() {
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
            Behavioral Science
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            We use the same psychology
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              as Starbucks & Nike.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            The habit loop is a proven behavioral framework. Coffee on QR embeds it into every cafe visit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loopSteps.map(({ icon: Icon, title, description, color, bg, border }, i) => (
            <div
              key={title}
              className={`p-7 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-600 font-mono">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 p-7 rounded-3xl border border-blue-500/15 bg-blue-500/5 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                The Endowment Effect
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Once a customer has 80 points toward a free coffee, they feel they own those points.
                The psychological cost of "losing" them by going elsewhere is higher than the effort of returning.
                <span className="text-blue-400"> That's why loyalty programs work — and why Coffee on QR is built on this principle.</span>
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="text-4xl font-black text-blue-400" style={{ fontFamily: 'Poppins, sans-serif' }}>87%</div>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>retention rate<br />post-enrollment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
