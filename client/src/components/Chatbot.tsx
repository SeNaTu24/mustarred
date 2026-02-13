import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: QuickReply[];
}

interface QuickReply {
  text: string;
  action: string; 
}

const greeting = "Welcome to Mustarred! I'm here to help you with business advisory services. What would you like to know about?";

const quickReplies: QuickReply[] = [
  { text: "Company Incorporation", action: "incorporation" },
  { text: "Data Protection (NDPR & GAID)", action: "ndpr" },
  { text: "Compliance Services", action: "compliance" },
  { text: "Corporate Governance", action: "governance" },
  { text: "Contact Our Team", action: "contact" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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
      addBotMessage(greeting, quickReplies);
    }
  }, [isOpen]);

  const addMessage = (text: string, isBot: boolean, buttons?: QuickReply[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      buttons
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, buttons?: QuickReply[]) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(text, true, buttons);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (action: string, text: string) => {
    // Add user message
    addMessage(text, false);
    
    // Handle different actions
    switch (action) {
      case 'incorporation':
        addBotMessage(
          "Great! I can help you with company incorporation. This involves registering your business with the Corporate Affairs Commission (CAC).\n\nWe'll need detailed information including company names, shareholders, directors, and required documents.\n\nWould you like to start the incorporation process?",
          [
            { text: "Start Incorporation Process", action: "start_incorporation" },
            { text: "Learn More About Incorporation", action: "incorporation_info" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'start_incorporation':
        window.location.href = '/incorporation';
        addBotMessage(
          "Perfect! I've redirected you to our secure incorporation form. Please fill out all the required information and we'll get started on your company registration right away.",
          [{ text: "Back to Main Menu", action: "main_menu" }]
        );
        break;
        
      case 'incorporation_info':
        addBotMessage(
          "Company incorporation includes:\n\n• Business name reservation\n• Memorandum & Articles of Association\n• CAC registration\n• Tax identification numbers\n• Bank account opening support\n\nTypical timeline: 2-3 weeks\nStarting from ₦150,000",
          [
            { text: "Start Incorporation Now", action: "start_incorporation" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'ndpr':
        addBotMessage(
          "NDPR (Nigeria Data Protection Regulation) compliance is essential for any business handling personal data.\n\nWe help with:\n• Privacy policy drafting\n• Data protection audits\n• Consent management\n• Regulatory filings\n• Staff training\n\nTimeline: 2-4 weeks",
          [
            { text: "Get NDPR Quote", action: "contact" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'compliance':
        addBotMessage(
          "Our compliance services include:\n\n• Regulatory licensing (CBN, NCC, etc.)\n• AML/KYC implementation\n• ISO certifications\n• SOC 2 compliance\n• PCI-DSS certification\n• Ongoing compliance monitoring",
          [
            { text: "Discuss My Requirements", action: "contact" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'governance':
        addBotMessage(
          "Corporate governance services:\n\n• Board structure setup\n• Policy development\n• Risk management\n• Internal controls\n• Regulatory reporting\n• Company secretarial services",
          [
            { text: "Learn More", action: "contact" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'pricing':
        addBotMessage(
          "Our pricing varies based on your specific needs:\n\n• Company Incorporation: From ₦150,000\n• NDPR Compliance: From ₦200,000\n• ISO Certification: From ₦500,000\n• Custom packages available\n\nContact our team for a personalized quote.",
          [
            { text: "Get Custom Quote", action: "contact" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'timeline':
        addBotMessage(
          "Typical project timelines:\n\n• Company Incorporation: 2-3 weeks\n• NDPR Compliance: 2-4 weeks\n• ISO Certification: 3-6 months\n• Corporate Governance Setup: 4-6 weeks\n\nTimelines may vary based on complexity and document readiness.",
          [
            { text: "Discuss My Project", action: "contact" },
            { text: "Back to Main Menu", action: "main_menu" }
          ]
        );
        break;
        
      case 'contact':
        window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=Business Advisory Inquiry', '_blank');
        addBotMessage(
          "Perfect! I've opened your email client to contact our team directly. You can also reach us at:\n\ninfo@mustarred.com\n\nOur experts will respond within 24 hours.",
          [{ text: "Back to Main Menu", action: "main_menu" }]
        );
        break;
        
      case 'main_menu':
        addBotMessage("How else can I help you today?", quickReplies);
        break;
        
      default:
        addBotMessage("I'm not sure about that. Let me show you what I can help with:", quickReplies);
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
                  <p className="text-xs text-white/80">Professional Business Advisory</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
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
                
                {/* Quick Reply Buttons */}
                {message.isBot && message.buttons && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-11">
                    {message.buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 hover:bg-gray-50 border-gray-300"
                        onClick={() => handleQuickReply(button.action, button.text)}
                      >
                        {button.text}
                      </Button>
                    ))}
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

          {/* Footer */}
          <div className="p-4 border-t text-center">
            <p className="text-xs text-gray-500">Choose an option above to continue</p>
          </div>
        </div>
      )}
    </>
  );
}