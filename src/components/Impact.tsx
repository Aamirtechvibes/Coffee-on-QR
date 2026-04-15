import { useIntersection } from '../hooks/useIntersection';

interface ImpactProps {
  onCTAClick: () => void;
}

export default function Impact({ onCTAClick }: ImpactProps) {
  const { ref, isVisible } = useIntersection();

  return (
    <section className="bg-[#080808] py-28 px-5">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              The Transformation
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              From empty tables
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                to a full house.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Empty cafe before loyalty"
                className="w-full h-72 object-cover opacity-40"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Before Coffee on QR
                </span>
                <p className="text-white font-semibold mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>New faces, but no return</p>
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>12% repeat rate</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1992926/pexels-photo-1992926.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Busy cafe after loyalty"
                className="w-full h-72 object-cover opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  After Coffee on QR
                </span>
                <p className="text-white font-semibold mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Regulars every single day</p>
                <p className="text-emerald-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>68% repeat rate</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Avg. revenue increase', value: '₹38,000/mo' },
              { label: 'Customer retention', value: '68%' },
              { label: 'Setup time', value: '< 10 min' },
              { label: 'ROI in first 90 days', value: '6x' },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-6 max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Cafes that implemented Coffee on QR saw results within the first 30 days.
              You could be next.
            </p>
            <button
              onClick={onCTAClick}
              className="px-10 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-base transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Start My Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
