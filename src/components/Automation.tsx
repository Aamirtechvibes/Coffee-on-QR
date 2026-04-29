import { useIntersection } from '../hooks/useIntersection';
import { MessageCircle, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const messages = [
  { type: 'out', text: "Hey Priya! You're just 2 coffees away from your FREE drink. Come in this week! ☕", time: '9:31 AM', delay: 600 },
  { type: 'in', text: 'Oh wow, thank you! Coming today!', time: '9:45 AM', delay: 1400 },
  { type: 'out', text: "Happy Birthday, Priya! Your free dessert is waiting for you today. We miss you! 🎂", time: 'Yesterday', delay: 2200 },
  { type: 'out', text: 'You just earned your FREE Coffee! Show this at the counter. 🎉', time: '11:02 AM', delay: 3000 },
  { type: 'in', text: "This is amazing!! I'll be there in 10 mins", time: '11:05 AM', delay: 3800 },
];

function WhatsAppBubble({ msg, visible }: { msg: typeof messages[0]; visible: boolean }) {
  const isOut = msg.type === 'out';
  return (
    <div
      className={`flex ${isOut ? 'justify-start' : 'justify-end'} transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        className="max-w-[85%] px-3.5 sm:px-4 py-2.5 sm:py-3"
        style={{
          background: isOut ? 'var(--bg-secondary)' : 'var(--accent-primary)',
          color: isOut ? 'var(--text-primary)' : '#1A1A1A',
          borderRadius: isOut ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          boxShadow: '0 2px 8px rgba(26,26,26,0.08)',
        }}
      >
        <p className="text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{msg.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isOut ? 'justify-start' : 'justify-end'}`}>
          <span className="text-[9px] sm:text-[10px]" style={{ opacity: 0.55 }}>{msg.time}</span>
          {!isOut && <CheckCheck size={10} style={{ opacity: 0.55 }} />}
        </div>
      </div>
    </div>
  );
}

export default function Automation() {
  const { ref, isVisible } = useIntersection();
  const [visibleMessages, setVisibleMessages] = useState<boolean[]>(new Array(messages.length).fill(false));

  useEffect(() => {
    if (!isVisible) return;

    const shouldShowImmediately =
      window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches;

    if (shouldShowImmediately) {
      setVisibleMessages(new Array(messages.length).fill(true));
      return;
    }

    const timers = messages.map((msg, i) =>
      window.setTimeout(() => {
        setVisibleMessages((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, msg.delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isVisible]);

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">

          {/* WhatsApp mock — on mobile, show first */}
          <div className={`order-1 md:order-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-soft)',
                boxShadow: '0 8px 32px rgba(26,26,26,0.08)',
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-soft)' }}
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(145,162,79,0.15)', border: '1px solid rgba(145,162,79,0.28)' }}
                >
                  <MessageCircle size={14} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                    Coffee on QR Loyalty
                  </p>
                  <p className="text-[10px] sm:text-xs" style={{ color: 'var(--accent-primary)' }}>Online</p>
                </div>
              </div>
              {/* Messages */}
              <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 min-h-[280px] sm:min-h-[340px]" style={{ background: '#FAF9F6' }}>
                {messages.map((msg, i) => (
                  <WhatsAppBubble key={i} msg={msg} visible={visibleMessages[i]} />
                ))}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className={`order-2 md:order-1 transition-all duration-700 min-w-0 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}
            >
              Automated Engagement
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
            >
              WhatsApp messages
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #91A24F, #afbd6b)' }}
              >
                that feel personal.
              </span>
            </h2>
            <p
              className="mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
            >
              Our system sends the right message at the right moment — automatically. No manual outreach. Just results.
            </p>

            <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
              {[
                { trigger: 'After 5 visits', message: 'Points milestone + reward unlock notification' },
                { trigger: '7 days inactive', message: '"We miss you" re-engagement message' },
                { trigger: "Customer's birthday", message: 'Personalized birthday offer with free item' },
                { trigger: '80% to reward', message: 'Nudge to cross the finish line this week' },
              ].map((item) => (
                <div
                  key={item.trigger}
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-soft)',
                    boxShadow: '0 1px 6px rgba(26,26,26,0.05)',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--accent-primary)' }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--accent-primary)' }}>
                      {item.trigger}
                    </p>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
