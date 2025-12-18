import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findBestMatch } from '@/data/chatbot-knowledge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const greeting = "Hi! I'm Mustarred's business advisory assistant. I help startups with data protection, compliance, corporate governance, and transaction advisory. How can I assist you today?";

const defaultResponse = "I understand you're asking about that. While I can help with general information about our services, our expert team can provide detailed guidance specific to your situation.";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(greeting);
    }
  }, [isOpen]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, suggestTeam: boolean = false) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(text, true);
      setIsTyping(false);
      
      // Only suggest speaking to team when explicitly requested
      if (suggestTeam) {
        setTimeout(() => {
          addMessage("Would you like to speak with one of our experts for personalized guidance? They can provide detailed answers specific to your business needs.", true);
        }, 1500);
      }
    }, 1000);
  };

  const getBotResponse = (userMessage: string): { response: string; suggestTeam: boolean } => {
    // Handle greetings
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi') || userMessage.toLowerCase().includes('hey')) {
      return { response: greeting, suggestTeam: false };
    }
    
    // Try to find a match in knowledge base
    const match = findBestMatch(userMessage);
    
    if (match) {
      // Suggest team for pricing or complex queries
      const suggestTeam = match.category === 'pricing' || match.category === 'contact';
      return { response: match.response, suggestTeam };
    }
    
    // Default response if no match found - suggest team for unknown queries
    return { response: defaultResponse, suggestTeam: true };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, false);
    const { response, suggestTeam } = getBotResponse(inputValue);
    addBotMessage(response, suggestTeam);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactTeam = () => {
    const newWindow = window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com', '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--brand-primary)), hsl(var(--brand-accent)))'
          }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-xl shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b rounded-t-xl" style={{background: 'linear-gradient(135deg, hsl(var(--brand-primary)), hsl(var(--brand-accent)))'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white">Mustarred Assistant</h3>
                  <p className="text-xs text-white/80">Business Advisory Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'hsl(var(--brand-accent) / 0.2)'}}>
                    <Bot className="h-4 w-4" style={{color: 'hsl(var(--brand-primary))'}} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'text-white'
                  }`}
                  style={!message.isBot ? {background: 'linear-gradient(135deg, hsl(var(--brand-primary)), hsl(var(--brand-accent)))'} : {}}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: 'hsl(var(--brand-accent) / 0.2)'}}>
                  <Bot className="h-4 w-4" style={{color: 'hsl(var(--brand-primary))'}} />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleContactTeam}
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
            >
              💬 Speak with Our Team
            </Button>
          </div>
        </div>
      )}
    </>
  );
}