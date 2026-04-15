import { useIntersection } from '../hooks/useIntersection';
import { MessageCircle, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const messages = [
  {
    type: 'out',
    text: "Hey Priya! You're just 2 coffees away from your FREE drink. Come in this week! ☕",
    time: '9:31 AM',
    delay: 600,
  },
  {
    type: 'in',
    text: 'Oh wow, thank you! Coming today!',
    time: '9:45 AM',
    delay: 1400,
  },
  {
    type: 'out',
    text: "Happy Birthday, Priya! Your free dessert is waiting for you today. We miss you! 🎂",
    time: 'Yesterday',
    delay: 2200,
  },
  {
    type: 'out',
    text: 'You just earned your FREE Coffee! Show this at the counter. 🎉',
    time: '11:02 AM',
    delay: 3000,
  },
  {
    type: 'in',
    text: "This is amazing!! I'll be there in 10 mins",
    time: '11:05 AM',
    delay: 3800,
  },
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
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isOut
            ? 'bg-[#1F2937] text-gray-200 rounded-tl-sm'
            : 'bg-blue-500 text-white rounded-tr-sm'
        }`}
      >
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{msg.text}</p>
        <div className={`flex items-center gap-1 mt-1.5 ${isOut ? 'justify-start' : 'justify-end'}`}>
          <span className="text-[10px] opacity-50">{msg.time}</span>
          {!isOut && <CheckCheck size={12} className="opacity-50" />}
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
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setVisibleMessages((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, msg.delay);
    });
  }, [isVisible]);

  return (
    <section className="bg-[#080808] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Automated Engagement
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              WhatsApp messages
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                that feel personal.
              </span>
            </h2>
            <p className="text-gray-400 mt-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Our system sends the right message at the right moment — automatically.
              No manual outreach. No copy-pasting. Just results.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { trigger: 'After 5 visits', message: 'Points milestone + reward unlock notification' },
                { trigger: '7 days inactive', message: '"We miss you" re-engagement message' },
                { trigger: "Customer's birthday", message: 'Personalized birthday offer with free item' },
                { trigger: '80% to reward', message: 'Nudge to cross the finish line this week' },
              ].map((item) => (
                <div key={item.trigger} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-xs text-blue-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{item.trigger}</p>
                    <p className="text-sm text-gray-300 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="bg-[#111] border border-white/8 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0D1117]">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <MessageCircle size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Coffee on QR Loyalty</p>
                  <p className="text-xs text-emerald-400">Online</p>
                </div>
              </div>

              <div className="p-5 space-y-3 min-h-[360px] bg-[#0A0A0A]/50">
                {messages.map((msg, i) => (
                  <WhatsAppBubble key={i} msg={msg} visible={visibleMessages[i]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
