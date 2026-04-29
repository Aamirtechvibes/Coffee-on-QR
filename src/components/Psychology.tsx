import { useIntersection } from '../hooks/useIntersection';
import { Zap, RotateCcw, Trophy, Heart } from 'lucide-react';

const loopSteps = [
  {
    icon: Zap,
    title: 'Trigger',
    description: 'QR code at the counter creates an instant cue to participate',
    iconColor: '#D97706',
    iconBg: 'rgba(217,119,6,0.08)',
    iconBorder: 'rgba(217,119,6,0.20)',
  },
  {
    icon: Trophy,
    title: 'Action',
    description: 'Customer scans, sees their points — feels rewarded',
    iconColor: 'var(--accent-primary)',
    iconBg: 'rgba(145,162,79,0.08)',
    iconBorder: 'rgba(145,162,79,0.22)',
  },
  {
    icon: Heart,
    title: 'Reward',
    description: 'Progress bar moves. A free reward gets closer. Dopamine.',
    iconColor: '#ccb2c8',
    iconBg: 'rgba(204,178,200,0.12)',
    iconBorder: 'rgba(204,178,200,0.28)',
  },
  {
    icon: RotateCcw,
    title: 'Investment',
    description: 'They return — because leaving means losing what they earned',
    iconColor: 'var(--accent-hover)',
    iconBg: 'rgba(175,189,107,0.08)',
    iconBorder: 'rgba(175,189,107,0.22)',
  },
];

export default function Psychology() {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-14 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span
            className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
          >
            Behavioral Science
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            We use the same
            <br />
            psychology as{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}
            >
              Starbucks.
            </span>
          </h2>
          <p
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            The habit loop is proven. Coffee on QR embeds it into every cafe visit.
          </p>
        </div>

        {/* Loop cards — 1 col mobile, 2 col sm+ */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {loopSteps.map(({ icon: Icon, title, description, iconColor, iconBg, iconBorder }, i) => (
            <div
              key={title}
              className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 2px 12px rgba(26,26,26,0.05)',
                transitionDelay: `${i * 120 + 200}ms`,
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                >
                  <Icon size={18} style={{ color: iconColor }} />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-base sm:text-lg font-semibold"
                      style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Endowment effect callout */}
        <div
          className={`mt-6 sm:mt-12 p-5 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'rgba(145,162,79,0.06)', border: '1.5px solid rgba(145,162,79,0.22)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h3
                className="text-lg sm:text-xl font-semibold mb-2"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
              >
                The Endowment Effect
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
              >
                Once a customer has 80 points toward a free coffee, they feel they own those points.
                The psychological cost of "losing" them is higher than the effort of returning.{' '}
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                  That's why loyalty programs work.
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <div
                className="text-3xl sm:text-4xl font-black"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--accent-primary)' }}
              >
                87%
              </div>
              <p
                className="text-xs mt-1"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}
              >
                retention rate<br />post-enrollment
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
