import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import LoanStatus from './components/LoanStatus';
import Metrics from './components/Metrics';
import EMICalculator from './components/EMICalculator';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <LoanStatus />
      <Metrics />
      <EMICalculator />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
