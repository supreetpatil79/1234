import { Check, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

const steps: Step[] = [
  {
    id: '1',
    title: 'Application Submitted',
    description: 'Your application has been received and is under review',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Identity Verification',
    description: 'Documents verified and identity confirmed',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Credit Assessment',
    description: 'Analyzing your credit profile and financial history',
    status: 'current',
  },
  {
    id: '4',
    title: 'Underwriting Review',
    description: 'Final review and approval process',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Funds Disbursement',
    description: 'Funds will be transferred to your account',
    status: 'pending',
  },
];

export default function LoanStatus() {
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

    const element = document.getElementById('loan-status');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="loan-status" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Track Your Journey</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Your loan journey, visualized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience complete transparency with real-time status updates at every step
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                >
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                          step.status === 'completed'
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500 shadow-lg shadow-blue-500/50'
                            : step.status === 'current'
                            ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/30 animate-pulse'
                            : 'bg-gray-100 border-gray-300'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <Circle className={`w-6 h-6 ${step.status === 'current' ? 'text-blue-500' : 'text-gray-400'}`} />
                        )}
                      </div>

                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-24 mt-2 relative overflow-hidden bg-gray-200">
                          <div
                            className={`absolute inset-0 bg-gradient-to-b from-blue-500 to-cyan-500 transition-all duration-1000 ${
                              step.status === 'completed' ? 'translate-y-0' : '-translate-y-full'
                            }`}
                            style={{
                              boxShadow: step.status === 'completed' ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <h3
                        className={`text-lg font-semibold mb-1 transition-colors ${
                          step.status === 'completed' || step.status === 'current' ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm transition-colors ${
                          step.status === 'completed' || step.status === 'current' ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {step.description}
                      </p>
                      {step.status === 'current' && (
                        <div className="mt-3 flex items-center gap-2 text-blue-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                          <span className="text-xs font-medium">In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Loan Amount</span>
                    <span className="text-2xl font-bold text-gray-900">$50,000</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                    <p className="text-2xl font-bold text-blue-600">6.5%</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-4 border border-teal-100">
                    <p className="text-sm text-gray-600 mb-1">Term</p>
                    <p className="text-2xl font-bold text-teal-600">36 mo</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                  <p className="text-sm text-blue-100 mb-2">Estimated Monthly Payment</p>
                  <p className="text-4xl font-bold mb-4">$1,532</p>
                  <button className="w-full py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl font-semibold transition-all duration-300 border border-white/20">
                    View Full Details
                  </button>
                </div>
              </div>

              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
