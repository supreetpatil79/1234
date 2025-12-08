import { useState, useEffect } from 'react';
import { Check, Circle, ChevronRight } from 'lucide-react';
import { supabase, LoanApplication } from '../lib/supabase';

interface StatusStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const steps: StatusStep[] = [
  {
    id: 'submitted',
    title: 'Application Submitted',
    description: 'Your application has been received',
    icon: '📋',
  },
  {
    id: 'verified',
    title: 'Identity Verified',
    description: 'Documents and identity confirmed',
    icon: '✓',
  },
  {
    id: 'assessment',
    title: 'Credit Assessment',
    description: 'Analyzing your profile',
    icon: '📊',
  },
  {
    id: 'underwriting',
    title: 'Final Review',
    description: 'Underwriting in progress',
    icon: '⚙️',
  },
  {
    id: 'disbursed',
    title: 'Funds Disbursed',
    description: 'Money in your account',
    icon: '💰',
  },
];

export default function LoanStatusFunctional() {
  const [loan, setLoan] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setLoan({
            id: 'demo-loan',
            user_id: 'demo-user',
            status: 'assessment',
            loan_amount: 50000,
            interest_rate: 6.5,
            tenure_months: 36,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('loan_applications')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setLoan(data);
        } else {
          setLoan({
            id: 'demo-loan',
            user_id: session.user.id,
            status: 'assessment',
            loan_amount: 50000,
            interest_rate: 6.5,
            tenure_months: 36,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error fetching loan status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanStatus();
  }, []);

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.id === status);
  };

  if (loading) {
    return (
      <section id="loan-status" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="h-96 bg-gray-200 rounded-3xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!loan) return null;

  const currentStepIndex = getStepIndex(loan.status);
  const emi = Math.round(
    (loan.loan_amount * (loan.interest_rate / 12 / 100) * Math.pow(1 + loan.interest_rate / 12 / 100, loan.tenure_months)) /
    (Math.pow(1 + loan.interest_rate / 12 / 100, loan.tenure_months) - 1)
  );
  const totalAmount = emi * loan.tenure_months;
  const totalInterest = totalAmount - loan.loan_amount;

  return (
    <section id="loan-status" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Track Your Loan</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Your loan journey in real-time
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor every step of your application with transparency and confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step.id}
                      className={`relative transition-all duration-700 delay-${index * 100} ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                      }`}
                    >
                      <div className="flex gap-6">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 text-2xl flex-shrink-0 ${
                              isCompleted
                                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500 shadow-lg shadow-blue-500/50 scale-110'
                                : isCurrent
                                ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/30 animate-pulse scale-110'
                                : 'bg-gray-100 border-gray-300'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-6 h-6 text-white" />
                            ) : (
                              step.icon
                            )}
                          </div>

                          {index < steps.length - 1 && (
                            <div className="w-1 h-24 mt-3 relative overflow-hidden bg-gray-200 rounded-full">
                              <div
                                className={`absolute inset-0 bg-gradient-to-b from-blue-500 to-cyan-500 transition-all duration-1000 ${
                                  isCompleted ? 'translate-y-0' : '-translate-y-full'
                                }`}
                                style={{
                                  boxShadow: isCompleted ? '0 0 20px rgba(59, 130, 246, 0.6)' : 'none',
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 pt-2">
                          <h3
                            className={`text-lg font-bold mb-1 transition-colors ${
                              isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm transition-colors ${
                              isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            {step.description}
                          </p>
                          {isCurrent && (
                            <div className="mt-3 flex items-center gap-2 text-blue-600 font-medium">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                              <span className="text-xs">In Progress</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Details</h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Loan Amount</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${loan.loan_amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{loan.interest_rate}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-4 border border-teal-100">
                      <p className="text-sm text-gray-600 mb-1">Tenure</p>
                      <p className="text-2xl font-bold text-teal-600">{loan.tenure_months} mo</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white mb-6">
                  <p className="text-sm text-blue-100 mb-2">Monthly EMI</p>
                  <p className="text-4xl font-bold mb-4">${emi.toLocaleString()}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Total Interest</span>
                      <span className="font-semibold">${totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-blue-400">
                      <span className="text-blue-100">Total Payable</span>
                      <span className="font-bold text-lg">${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 group">
                  View Full Agreement
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
