import { Shield, Zap, TrendingUp, Clock, CreditCard, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Zap,
    title: 'Instant Decisions',
    description: 'Get approved in under 60 seconds with our AI-powered underwriting system',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Your data is encrypted with military-grade 256-bit AES encryption',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: TrendingUp,
    title: 'Build Credit Score',
    description: 'Every on-time payment helps improve your credit profile',
    gradient: 'from-teal-500 to-blue-500',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Expert financial advisors available round the clock to assist you',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Choose payment schedules that work best for your lifestyle',
    gradient: 'from-cyan-600 to-teal-600',
  },
  {
    icon: Users,
    title: 'Trusted Platform',
    description: 'Join 500,000+ satisfied customers who trust us with their finances',
    gradient: 'from-teal-600 to-blue-600',
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="features" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Built for your success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of cutting-edge technology and personalized service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative h-full bg-white rounded-3xl p-8 border border-gray-200 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
                  <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
