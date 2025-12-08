import { ArrowRight, Shield, Zap, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import HeroShowcase from './HeroShowcase';

const FloatingCard = ({ icon: Icon, title, delay }: { icon: any; title: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 h-full
        transform transition-all duration-1000 hover:scale-110 hover:shadow-blue-500/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        animation: 'float 6s ease-in-out infinite',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm font-semibold text-gray-900">{title}</p>
    </div>
  );
};

interface HeroProps {
  onGetStartedClick?: () => void;
}

export default function Hero({ onGetStartedClick }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCalculateEMI = () => {
    const element = document.getElementById('emi-calculator');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-20 pb-12 md:pt-32 md:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Next-gen lending platform
                </span>
              </div>

              <h1 className={`text-6xl sm:text-7xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="block text-gray-900">Your path to</span>
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  financial strength
                </span>
              </h1>

              <p className={`text-lg md:text-xl text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Join 500,000+ borrowers who've experienced lending without boundaries. Instant approvals, transparent rates, and a platform built on trust.
              </p>

              <div className={`space-y-4 mb-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  'Approved in under 60 seconds',
                  'Rates from 6.5% APR',
                  'Build credit with every payment',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button
                  onClick={onGetStartedClick}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Start your journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleCalculateEMI}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Calculate EMI
                </button>
              </div>

              <div className={`mt-10 pt-10 border-t border-gray-200 flex items-center gap-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  { value: '500K+', label: 'Borrowers' },
                  { value: '$2.5B', label: 'Disbursed' },
                  { value: '98.5%', label: 'Approval Rate' },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <HeroShowcase />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
}

Hero.defaultProps = {
  onGetStartedClick: () => {},
};
