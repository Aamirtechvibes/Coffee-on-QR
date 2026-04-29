import { useIntersection } from '../hooks/useIntersection';
import { QrCode, Gift, MessageCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: QrCode,
    title: 'Customer Scans QR',
    description:
      'Place our QR code at the counter. Customers scan once with their phone — no app download, no friction.',
    iconColor: 'var(--accent-primary)',
    iconBg: 'rgba(145,162,79,0.10)',
    iconBorder: 'rgba(145,162,79,0.25)',
  },
  {
    step: '02',
    icon: Gift,
    title: 'They Earn Points',
    description:
      'Every visit adds to their loyalty score. A beautiful progress bar shows them exactly how close they are to the next reward.',
    iconColor: '#E9A87C',
    iconBg: 'rgba(233,168,124,0.10)',
    iconBorder: 'rgba(233,168,124,0.25)',
  },
  {
    step: '03',
    icon: MessageCircle,
    title: 'You Automate the Rest',
    description:
      'WhatsApp messages go out automatically — visit reminders, reward alerts, birthday offers. Zero manual effort from you.',
    iconColor: 'var(--accent-hover)',
    iconBg: 'rgba(175,189,107,0.10)',
    iconBorder: 'rgba(175,189,107,0.25)',
  },
];

export default function Solution() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
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
            The System
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            Three steps.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}
            >
              Infinite returns.
            </span>
          </h2>
          <p
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            No complicated setup. No new devices. Works on every smartphone.
          </p>
        </div>

        {/* Step cards — 1 col mobile, 3 col md+ */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {steps.map(({ step, icon: Icon, title, description, iconColor, iconBg, iconBorder }, i) => (
            <div
              key={step}
              className={`relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 2px 12px rgba(26,26,26,0.05)',
                transitionDelay: `${i * 150 + 200}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center"
                  style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                >
                  <Icon size={20} style={{ color: iconColor }} />
                </div>
                <span
                  className="text-4xl sm:text-5xl font-black"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--accent-soft)', opacity: 0.6 }}
                >
                  {step}
                </span>
              </div>
              <h3
                className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Setup note */}
        <div
          className={`mt-6 sm:mt-10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            background: 'rgba(145,162,79,0.06)',
            border: '1.5px solid rgba(145,162,79,0.20)',
          }}
        >
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(145,162,79,0.12)', border: '1px solid rgba(145,162,79,0.25)' }}
            >
              <QrCode size={18} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                Setup time
              </p>
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--accent-primary)' }}
              >
                Under 10 min
              </p>
            </div>
          </div>
          <div
            className="w-full h-px sm:h-10 sm:w-px"
            style={{ background: 'var(--border-soft)' }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
          >
            We configure everything for you. Print your QR code, place it at the counter, and your loyalty
            system is live. Your customers start scanning. You start retaining.
          </p>
        </div>

      </div>
    </section>
  );
}
