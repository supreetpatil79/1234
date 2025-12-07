import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotHandle {
  open: () => void;
}

const TypingIndicator = () => (
  <div className="flex gap-1 p-4">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const Chatbot = forwardRef<ChatbotHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Good evening. I\'m your personal wealth advisor. How may I assist you with your financial journey today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        'I understand you\'re looking for loan options. Based on your profile, I can offer you personalized rates starting at 6.5% APR with flexible repayment terms. Would you like me to prepare a detailed proposal?',
        'Excellent question. Our platform offers instant pre-approval with zero impact on your credit score. The process takes less than 60 seconds. Shall we begin your application?',
        'I see you\'re interested in refinancing. Our current rates are highly competitive, and we can potentially save you thousands over the life of your loan. May I analyze your current loan terms?',
        'For that loan amount, I recommend our Premium tier, which includes dedicated relationship management, priority processing, and exclusive rate benefits. Let me show you the details.',
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110 transform transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full" />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[420px] h-[600px] z-50 animate-slideUp">
          <div className="h-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Financial Advisor</h3>
                  <p className="text-blue-100 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-messageSlide`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about loans..."
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-messageSlide {
          animation: messageSlide 0.3s ease-out both;
        }
      `}</style>
    </>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;
