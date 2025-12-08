import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(36);

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = tenure;

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Smart Planning</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Calculate your monthly payment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant insights into your loan structure with our intelligent calculator
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700">Loan Amount</label>
                  <span className="text-2xl font-bold text-blue-600">${loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$5,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700">Interest Rate (Annual)</label>
                  <span className="text-2xl font-bold text-cyan-600">{interestRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700">Loan Tenure</label>
                  <span className="text-2xl font-bold text-teal-600">{tenure} months</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>6 months</span>
                  <span>60 months</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-white" />
                </div>

                <div className="mb-8">
                  <p className="text-blue-100 text-sm mb-2">Monthly Payment (EMI)</p>
                  <p className="text-5xl md:text-6xl font-bold">${emi.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-blue-100 text-xs mb-1">Principal Amount</p>
                    <p className="text-xl font-bold">${loanAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-blue-100 text-xs mb-1">Total Interest</p>
                    <p className="text-xl font-bold">${totalInterest.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-8">
                  <p className="text-blue-100 text-xs mb-1">Total Amount Payable</p>
                  <p className="text-3xl font-bold">${totalAmount.toLocaleString()}</p>
                </div>

                <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply for This Loan
                </button>

                <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-blue-500/50 to-cyan-500/50 rounded-3xl blur-3xl" />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Payment Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Principal Component</span>
                    <span className="font-semibold text-gray-900">
                      {((loanAmount / totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">Interest Component</span>
                    <span className="font-semibold text-gray-900">
                      {((totalInterest / totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </section>
  );
}
