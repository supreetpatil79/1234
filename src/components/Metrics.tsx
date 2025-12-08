import { useState, useEffect } from 'react';

interface Metric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const metrics: Metric[] = [
  { value: 500000, label: 'Happy Borrowers', suffix: '+' },
  { value: 2.5, label: 'Billion Disbursed', prefix: '$', suffix: 'B' },
  { value: 98.5, label: 'Approval Rate', suffix: '%' },
  { value: 4.9, label: 'Customer Rating', suffix: '/5' },
];

const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

const MetricCard = ({ metric, index, isVisible }: { metric: Metric; index: number; isVisible: boolean }) => {
  const count = useCountUp(metric.value, 2500, isVisible);

  const formatValue = (value: number) => {
    if (metric.suffix === '+') {
      return value.toLocaleString();
    }
    if (metric.suffix === 'B') {
      return value.toFixed(1);
    }
    if (metric.suffix === '%' || metric.suffix === '/5') {
      return value.toFixed(1);
    }
    return value.toString();
  };

  return (
    <div
      className={`text-center transition-all duration-700 delay-${index * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative inline-block">
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {metric.prefix}
          {formatValue(count)}
          {metric.suffix}
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl -z-10 opacity-50" />
      </div>
      <p className="text-lg text-gray-600 font-medium">{metric.label}</p>
    </div>
  );
};

export default function Metrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('metrics');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="metrics" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Trusted Worldwide</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              The numbers speak for themselves
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
