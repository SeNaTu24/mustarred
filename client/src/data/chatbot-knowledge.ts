export interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: string;
}

export const chatbotKnowledge: KnowledgeItem[] = [
  // About Mustarred
  {
    keywords: ['what does mustarred do', 'what is mustarred', 'about mustarred', 'who are you', 'tell me about'],
    response: "Mustarred is a business advisory firm that helps African startups navigate complex regulatory and business challenges. We provide expert guidance on compliance, governance, data protection, and transaction advisory to help you scale faster with confidence.",
    category: "about"
  },

  // Services Overview
  {
    keywords: ['services', 'what do you offer', 'help with', 'what can you do'],
    response: "We offer:\n• Data Protection & Security\n• Regulatory Compliance & Licensing\n• Corporate Governance & IP\n• Transaction Advisory\n• Hands-On Consultation\n• Partnership Success\n\nWhich service interests you most?",
    category: "services"
  },

  // NDPR & Data Protection
  {
    keywords: ['ndpr', 'data protection', 'privacy', 'personal data', 'gdpr'],
    response: "NDPR (Nigeria Data Protection Regulation) compliance involves protecting personal data according to Nigerian law. We help with:\n• Privacy policy drafting\n• Data protection audits\n• Consent management systems\n• Regulatory filings\n• Staff training\n\nThis is essential for any business handling customer data in Nigeria.",
    category: "ndpr"
  },

  // Corporate Governance
  {
    keywords: ['corporate governance', 'governance', 'board', 'compliance framework', 'risk management'],
    response: "Corporate governance includes establishing proper business structures, compliance frameworks, and risk management systems. We help startups with:\n• Board structure and processes\n• Compliance policies\n• Risk assessment\n• Regulatory reporting\n• Internal controls",
    category: "governance"
  },

  // Transaction Advisory
  {
    keywords: ['transaction advisory', 'transactions', 'deals', 'mergers', 'acquisitions', 'funding'],
    response: "Our transaction advisory services help with business deals and funding rounds:\n• Due diligence support\n• Legal structure optimization\n• Compliance readiness\n• Documentation review\n• Risk assessment for investors",
    category: "transactions"
  },

  // Pricing
  {
    keywords: ['price', 'cost', 'fee', 'how much', 'pricing', 'rates', 'charges'],
    response: "Our pricing varies based on your specific needs and company size. We offer flexible packages:\n• NDPR compliance: Starting from competitive rates\n• Corporate governance: Customized based on complexity\n• Transaction advisory: Project-based pricing\n\nI'd recommend speaking with our team for a personalized quote based on your requirements.",
    category: "pricing"
  },

  // Contact & Support
  {
    keywords: ['contact', 'speak', 'talk', 'human', 'team', 'call', 'email'],
    response: "Great! Our expert team is ready to help you. You can reach us:\n📧 Email: info@mustarred.com\n💬 We're here to provide personalized guidance for your business\n📞 Schedule a consultation to discuss your specific needs",
    category: "contact"
  },

  // Location & Coverage
  {
    keywords: ['location', 'where', 'africa', 'nigeria', 'countries', 'regions'],
    response: "We're based in Africa and specialize in helping African startups. We understand the unique regulatory landscape and business challenges across the continent, with particular expertise in Nigerian regulations like NDPR.",
    category: "location"
  },

  // Timeline & Process
  {
    keywords: ['how long', 'timeline', 'process', 'steps', 'duration', 'time'],
    response: "Project timelines vary based on complexity:\n• NDPR compliance: 2-4 weeks typically\n• Corporate governance setup: 3-6 weeks\n• Transaction advisory: Depends on deal complexity\n\nWe'll provide a detailed timeline after understanding your specific requirements.",
    category: "timeline"
  },

  // Getting Started
  {
    keywords: ['get started', 'begin', 'start', 'first step', 'how to'],
    response: "Getting started is easy:\n1. Contact our team for an initial consultation\n2. We'll assess your specific needs\n3. Receive a customized proposal\n4. Begin your compliance journey\n\nWould you like to schedule a consultation to discuss your requirements?",
    category: "getting-started"
  }
];

// Helper function to find best match
export function findBestMatch(userMessage: string): KnowledgeItem | null {
  const message = userMessage.toLowerCase();
  
  // Find matches by checking if keywords are contained in the message
  for (const item of chatbotKnowledge) {
    for (const keyword of item.keywords) {
      const keywordLower = keyword.toLowerCase();
      // Check if the keyword is contained in the message or vice versa
      if (message.includes(keywordLower) || keywordLower.includes(message)) {
        return item;
      }
    }
  }
  
  // Try partial word matching for better results
  for (const item of chatbotKnowledge) {
    for (const keyword of item.keywords) {
      const keywordWords = keyword.toLowerCase().split(' ');
      const messageWords = message.split(' ');
      
      // Check if most words match
      const matchCount = keywordWords.filter(word => 
        messageWords.some(msgWord => msgWord.includes(word) || word.includes(msgWord))
      ).length;
      
      if (matchCount >= Math.min(2, keywordWords.length)) {
        return item;
      }
    }
  }
  
  return null;
}