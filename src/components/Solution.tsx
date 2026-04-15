import { useIntersection } from '../hooks/useIntersection';
import { QrCode, Gift, MessageCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: QrCode,
    title: 'Customer Scans QR',
    description:
      'Place our QR code at the counter. Customers scan once with their phone — no app download, no friction.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    step: '02',
    icon: Gift,
    title: 'They Earn Points',
    description:
      'Every visit adds to their loyalty score. A beautiful progress bar shows them exactly how close they are to the next reward.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    step: '03',
    icon: MessageCircle,
    title: 'You Automate the Rest',
    description:
      'WhatsApp messages go out automatically — visit reminders, reward alerts, birthday offers. Zero manual effort from you.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export default function Solution() {
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
            The System
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Three steps.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Infinite returns.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            No complicated setup. No new devices. Works on every smartphone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ step, icon: Icon, title, description, color, bg, border }, i) => (
            <div
              key={step}
              className={`relative p-7 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${bg} border ${border} flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
                <span
                  className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {step}
                </span>
              </div>
              <h3
                className="text-xl font-semibold text-white mb-3"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 p-6 rounded-3xl border border-white/5 bg-white/[0.015] flex flex-col md:flex-row items-center gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <QrCode size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Setup time</p>
              <p className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Poppins, sans-serif' }}>Under 10 min</p>
            </div>
          </div>
          <div className="h-px md:h-10 w-full md:w-px bg-white/5" />
          <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
            We configure everything for you. Print your QR code, place it at the counter, and your loyalty
            system is live. Your customers start scanning. You start retaining.
          </p>
        </div>
      </div>
    </section>
  );
}
