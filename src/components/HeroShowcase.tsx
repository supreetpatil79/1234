import { useEffect, useState } from 'react';

export default function HeroShowcase() {
  const [activeCard, setActiveCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const cards = [
    {
      number: '01',
      title: 'Smart Assessment',
      description: 'AI-powered analysis in seconds',
      gradient: 'from-blue-600 to-cyan-600',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Instant Decision',
      description: 'Real-time approval status',
      gradient: 'from-cyan-600 to-teal-600',
      icon: '⚡',
    },
    {
      number: '03',
      title: 'Quick Funding',
      description: 'Same-day disbursement available',
      gradient: 'from-teal-600 to-blue-600',
      icon: '💰',
    },
  ];

  return (
    <div className="relative mt-20 md:mt-32 w-full">
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 p-1">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900" />

        <div className="relative w-full h-full bg-gradient-to-br from-blue-950 to-cyan-950 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="max-w-4xl w-full px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 transform cursor-pointer ${
                      activeCard === index
                        ? 'scale-105 md:scale-110'
                        : 'scale-95 opacity-50 hover:opacity-75'
                    }`}
                    onClick={() => {
                      setActiveCard(index);
                      setIsAnimating(false);
                    }}
                    onMouseEnter={() => {
                      setActiveCard(index);
                      setIsAnimating(false);
                    }}
                  >
                    <div
                      className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 md:p-8 h-full shadow-2xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all`}
                    >
                      <div className="text-4xl md:text-5xl font-black text-white/20 mb-2">
                        {card.number}
                      </div>
                      <div className="text-4xl mb-4">{card.icon}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base">
                        {card.description}
                      </p>

                      <div
                        className={`mt-4 h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-1000 ${
                          activeCard === index ? 'opacity-100' : 'opacity-50'
                        }`}
                      >
                        {activeCard === index && (
                          <div className="h-full bg-white rounded-full animate-pulse" style={{
                            animation: 'progress 4s ease-out forwards'
                          }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl ring-2 ring-gradient-to-r from-blue-500/30 to-cyan-500/30" />
        </div>

        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-3xl blur-xl -z-10 opacity-50" />
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
