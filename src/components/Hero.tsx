import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    <section className="relative min-h-screen pt-24 pb-12 md:pt-32 md:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-blue-200/50">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Trusted by 500,000+ borrowers worldwide
                </span>
              </div>
            </div>

            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent">
                Financial freedom
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                reimagined
              </span>
            </h1>

            <p className={`text-lg md:text-xl text-gray-600 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Experience lending without boundaries. Instant approvals, transparent rates, and a journey designed for your success.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={onGetStartedClick}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Get started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleCalculateEMI}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-white hover:border-gray-300 transform hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Calculate EMI
              </button>
            </div>
          </div>

          <div className="relative mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <FloatingCard icon={Shield} title="Bank-grade security" delay={200} />
            </div>
            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <FloatingCard icon={Zap} title="Instant approval" delay={400} />
            </div>
            <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <FloatingCard icon={TrendingUp} title="Build your credit" delay={600} />
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
