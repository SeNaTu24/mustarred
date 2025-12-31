export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  category: 'ai' | 'data-protection' | 'grc';
  description: string;
  objectives?: string[];
  modules?: CourseModule[];
  price: number;
  duration?: string;
  level?: string;
  includes: string[];
  isBundle?: boolean;
  savings?: number;
}

export const courses: Course[] = [
  // AI Courses
  {
    id: 'iso-42001-foundation',
    title: 'Artificial Intelligence Management System (ISO/IEC 42001) Foundation Course',
    category: 'ai',
    description: 'This course covers the essential aspects of Artificial Intelligence Management System (AIMS), including context understanding, policy establishment, risk management planning, support, operation, and performance evaluation, emphasizing the importance of internal audits, management reviews, and continual improvement.',
    objectives: [
      'Understand the fundamental concepts and principles of artificial intelligence management',
      'Understand the main requirements of ISO/IEC 42001 for an artificial intelligence management system (AIMS)',
      'Identify approaches, methods, and techniques used for implementing, managing, and improving an AIMS'
    ],
    price: 250,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'certified-ai-professional',
    title: 'Certified Artificial Intelligence Professional',
    category: 'ai',
    description: 'This course will explore advanced AI methodologies, including machine learning, deep learning and natural language processing, computer vision, robotics and expert systems, along with best practices for ensuring compliance, managing AI risks, and upholding ethical standards.',
    modules: [
      {
        title: 'Module 1: Foundations of AI and Data Analysis',
        topics: [
          'Fundamental concepts and principles of artificial intelligence',
          'Data analysis and visualization'
        ]
      },
      {
        title: 'Module 2: Machine Learning',
        topics: [
          'Foundations of data science and machine learning',
          'Machine learning workflow',
          'Supervised learning',
          'Unsupervised learning',
          'Advanced ML'
        ]
      },
      {
        title: 'Module 3: Natural Language Processing (NLP) and Deep Learning',
        topics: [
          'Foundational NLP concepts',
          'Classical and intermediate NLP techniques',
          'Modern NLP – Transformers and large language models',
          'NLP applications and future directions',
          'Fundamental concepts of deep learning',
          'Deep learning architectures and advanced techniques'
        ]
      },
      {
        title: 'Module 4: Computer Vision, Robotics, AI Governance, Ethics, and Security',
        topics: [
          'Generative models and specialized architectures',
          'Deep learning and future directions',
          'Computer vision',
          'Robotics',
          'AI security',
          'AI ethics',
          'AI governance and strategy'
        ]
      }
    ],
    price: 550,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'lead-ai-risk-manager',
    title: 'Lead AI Risk Manager',
    category: 'ai',
    description: 'This course is to help participants enhance their knowledge and expertise in identifying, assessing, and mitigating AI-related risks while ensuring compliance with industry frameworks and regulations.',
    objectives: [
      'Introduction to AI risk management',
      'Organizational context, AI risk governance, and AI risk identification',
      'Analysis, evaluation, and treatment of AI risks',
      'AI risk monitoring and reporting, training and awareness, and optimizing AI risk performance'
    ],
    price: 550,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'ai-master-bundle',
    title: 'The AI Master Bundle Offer: Certified Lead AI Risk Manager and CAIP',
    category: 'ai',
    description: 'Get both the Certified Lead AI Risk Manager and Certified Artificial Intelligence Professional courses in one comprehensive bundle.',
    price: 1000,
    isBundle: true,
    savings: 200,
    includes: [
      'Instructor-led training for both courses',
      'All course materials',
      'Certificates issued by PECB'
    ]
  },
  // Data Protection Courses
  {
    id: 'gdpr-foundation',
    title: 'Certified GDPR Foundation Course',
    category: 'data-protection',
    description: 'This course enables you to learn the basic elements to implement and manage a compliance framework with regard to the protection of personal data. During this training course, you will be able to understand the fundamental privacy principles and become familiar with the role of the Data Protection Officer.',
    objectives: [
      'Understand the General Data Protection Regulation requirements and the fundamental principles of privacy',
      'Understand the obligations, roles and responsibilities of the Data Protection Officer',
      'Understand the concepts, approaches, methods and techniques to effectively participate in the implementation process of a compliance framework with regard to the protection of personal data'
    ],
    price: 250,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'certified-dpo',
    title: 'Certified Data Protection Officer',
    category: 'data-protection',
    description: 'Participants will develop the competencies and knowledge necessary to lead all the processes to comply with the requirements of the General Data Protection Regulation (GDPR) in an organization.',
    modules: [
      {
        title: 'Module 1: Introduction to the GDPR concepts and principles',
        topics: [
          'General Data Protection Regulation (GDPR)',
          'Core considerations for the GDPR'
        ]
      },
      {
        title: 'Module 2: Designation of the DPO and analysis of the GDPR compliance program',
        topics: [
          'Designation of the DPO',
          'Analysis of the GDPR compliance program',
          'Maintaining relationship with the top management',
          'Creation and implementation of a data protection policy',
          'Operationalising a register of processing activities',
          'Data protection risk management process'
        ]
      },
      {
        title: 'Module 3: DPO operations',
        topics: [
          'Data protection impact assessment',
          'Documentation management',
          'Evaluation of the data protection controls',
          'Data protection and technology',
          'Awareness, training, and communication'
        ]
      },
      {
        title: 'Module 4: Monitoring and continual improvement of GDPR compliance',
        topics: [
          'Incident management and personal data breaches',
          'Monitoring and measuring compliance',
          'Data protection internal audit',
          'Treatment of nonconformities',
          'Continual improvement of the privacy program'
        ]
      }
    ],
    price: 550,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  // GRC Courses
  {
    id: 'it-governance-manager',
    title: 'IT Corporate Governance Manager',
    category: 'grc',
    description: 'This training enables you to gain a thorough understanding of the core principles for good governance of IT based on ISO/IEC 38500.',
    modules: [
      {
        title: 'Module 1: Introduction to IT Governance and ISO/IEC 38500',
        topics: [
          'Normative frameworks for IT Governance',
          'IT Governance & ISO/IEC 38500',
          'IT Governance model, responsibilities and strategy',
          'Strategic alignment through goal cascading',
          'Changes in business strategy and barriers to strategic alignment'
        ]
      },
      {
        title: 'Module 2: Principles for the effective, efficient and acceptable use of IT',
        topics: [
          'Strategic management of IT',
          'Acquisition; Manage & report IT investments and cost optimization',
          'Performance management',
          'Risk management as an integral part of performance',
          'Context establishment & risk assessment',
          'Risk treatment, risk communication and monitoring'
        ]
      },
      {
        title: 'Module 3: Outcomes, performance measurement techniques and Certification Exam',
        topics: [
          'Resource management - Introduction',
          'Human resource management',
          'IT resources planning methods',
          'Outsourcing',
          'Outcome and performance measurement techniques',
          'Conformance',
          'Human behavior'
        ]
      }
    ],
    price: 400,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'corporate-governance-manager',
    title: 'Corporate Governance Manager',
    category: 'grc',
    description: 'Participants will acquire the knowledge and ability to integrate the governance principles of ISO 37000 in an organization, and equip them with the necessary tools and insights to improve ethical governance structures while ensuring sustainable performance.',
    modules: [
      {
        title: 'Module 1: Introduction to ISO 37000 and governance of organizations, principles of governance',
        topics: [
          'ISO 37000 and international frameworks for good governance',
          'Foundations of good governance',
          'Integrated governance',
          'The governing body',
          'Purpose and value generation of good governance'
        ]
      },
      {
        title: 'Module 2: Principles of governance (cont\'d)',
        topics: [
          'Strategy',
          'Oversight',
          'Accountability',
          'Stakeholder engagement',
          'Leadership',
          'Data and decisions',
          'Risk governance',
          'Social responsibility'
        ]
      },
      {
        title: 'Module 3: Key governance outcomes, and governance maturity',
        topics: [
          'Viability and performance over time',
          'Governance outcomes and maturity'
        ]
      }
    ],
    price: 400,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  },
  {
    id: 'iso-38500-foundation',
    title: 'ISO/IEC 38500 Foundation',
    category: 'grc',
    description: 'Foundation course covering the basics of IT Corporate Governance based on ISO/IEC 38500.',
    price: 250,
    includes: [
      'Instructor-led training',
      'Course materials',
      'Certificate issued by PECB'
    ]
  }
];

export const courseCategories = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Master AI management, risk, and professional competencies'
  },
  {
    id: 'data-protection',
    name: 'Data Protection & Privacy',
    description: 'Learn GDPR compliance and data protection officer skills'
  },
  {
    id: 'grc',
    name: 'Governance, Risk & Compliance',
    description: 'Develop expertise in IT and corporate governance'
  }
] as const;