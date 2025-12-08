import { useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import LoanStatusFunctional from './components/LoanStatusFunctional';
import Metrics from './components/Metrics';
import EMICalculator from './components/EMICalculator';
import Footer from './components/Footer';
import Chatbot, { ChatbotHandle } from './components/Chatbot';

function App() {
  const chatbotRef = useRef<ChatbotHandle>(null);

  const handleGetStarted = () => {
    chatbotRef.current?.open();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero onGetStartedClick={handleGetStarted} />
      <Features />
      <LoanStatusFunctional />
      <Metrics />
      <EMICalculator />
      <Footer />
      <Chatbot ref={chatbotRef} />
    </div>
  );
}

export default App;
