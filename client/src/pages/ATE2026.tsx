import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  X,
  Shield,
  Lock,
  Scale,
  BrainCircuit,
  ClipboardCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import ReadinessDashboardGraphic from '@/components/ate2026/ReadinessDashboardGraphic';
import './ATE2026.css';

const SECTIONS = [
  {
    id: 'security',
    part: 'Part 1',
    title: 'Basic Security Assessment',
    description: 'Evaluate your information security foundations.',
    icon: Shield,
    scoreLabel: 'Security Score',
    questions: [
      { q: 'Do you have a documented Information Security Policy?', note: '' },
      { q: 'Is multi-factor authentication (MFA) enforced across your critical systems?', note: '' },
      { q: 'Do you conduct regular security assessments or penetration testing?', note: '' },
      { q: 'Do you have a documented Incident Response Plan?', note: '' },
    ],
  },
  {
    id: 'privacy',
    part: 'Part 2',
    title: 'Data Privacy Assessment',
    description: 'Assess your data protection posture.',
    icon: Lock,
    scoreLabel: 'Data Privacy Score',
    questions: [
      { q: 'Have you filed your Compliance Audit Return (CAR) with the NDPC?', note: 'Required for Data Controllers and Processors of Major Importance under NDPA 2023' },
      { q: 'Are you registered as a Data Controller or Processor of Major Importance (DCMI)?', note: '' },
      { q: 'Do you have an appointed Data Protection Officer (DPO)?', note: '' },
      { q: 'Do you have a publicly accessible Privacy Notice?', note: '' },
    ],
  },
  {
    id: 'legal',
    part: 'Part 3',
    title: 'Legal Compliance Assessment',
    description: 'Review your legal and regulatory foundations.',
    icon: Scale,
    scoreLabel: 'Legal Score',
    questions: [
      { q: 'Is your business duly registered with the Corporate Affairs Commission (CAC)?', note: '' },
      { q: 'Do you have current, legally reviewed commercial agreements (service agreements, T&Cs)?', note: '' },
      { q: 'Do you have documented compliance policies for key regulations in your sector?', note: '' },
      { q: 'Are your consumer-facing contracts reviewed by qualified legal counsel?', note: '' },
    ],
  },
  {
    id: 'ai',
    part: 'Part 4',
    title: 'AI Governance Assessment',
    description: 'Examine governance of AI systems you use.',
    icon: BrainCircuit,
    scoreLabel: 'AI Governance Score',
    questions: [
      { q: 'Do you have a documented AI Use Policy or AI Ethics Policy?', note: '' },
      { q: 'Have you conducted a risk assessment for any AI systems you deploy or rely on?', note: '' },
      { q: 'Is there a defined process for human oversight of AI-generated decisions?', note: '' },
      { q: 'Are affected users notified when AI is used in decisions that impact them?', note: '' },
    ],
  },
];

const RATINGS = {
  0: {
    label: 'Foundational Readiness Needed',
    range: '0–24',
    color: '#A99BF7',
    light: '#191132',
    border: '#4B3FBC',
    message: 'Your readiness foundations require focused attention across key operational areas. Identifying these baseline gaps is the first critical step toward building a resilient posture.',
  },
  25: {
    label: 'Developing Readiness',
    range: '25–49',
    color: '#A99BF7',
    light: '#191132',
    border: '#4B3FBC',
    message: 'Developing readiness indicates early awareness, but meaningful operational gaps remain. A structured action plan will help strengthen your governance and security baselines.',
  },
  50: {
    label: 'Progressing Readiness',
    range: '50–74',
    color: '#A99BF7',
    light: '#191132',
    border: '#4B3FBC',
    message: 'Progressing readiness demonstrates key foundational practices in place. A targeted review of remaining items will help close gaps and advance your overall operational readiness.',
  },
  75: {
    label: 'Substantial Readiness',
    range: '75–99',
    color: '#A99BF7',
    light: '#191132',
    border: '#4B3FBC',
    message: 'Substantial readiness reflects strong processes across most operational areas. Focused remediation on remaining items will help reinforce a comprehensive readiness posture.',
  },
  100: {
    label: 'Strong Readiness',
    range: '100',
    color: '#A99BF7',
    light: '#191132',
    border: '#4B3FBC',
    message: 'Strong readiness demonstrates established governance and security safeguards across all assessed areas. Maintaining this posture requires continuous monitoring as your organization scales.',
  },
} as const;

interface CategoryGuidance {
  id: string;
  categoryTitle: string;
  subtitle: string;
  practicalActions: string[];
}

const CATEGORY_GUIDANCE: Record<string, CategoryGuidance> = {
  security: {
    id: 'security',
    categoryTitle: 'Basic Security',
    subtitle: 'Strengthen security controls, authentication safeguards, and incident readiness.',
    practicalActions: [
      'Formalize and document an Information Security Policy covering access controls and sensitive data handling.',
      'Mandate and enforce Multi-Factor Authentication (MFA) across all administrative, email, and cloud infrastructure.',
      'Schedule routine vulnerability scanning and engage independent penetration testing.',
      'Document and test a formal Incident Response Plan with designated incident owners and response procedures.',
    ],
  },
  privacy: {
    id: 'privacy',
    categoryTitle: 'Data Privacy',
    subtitle: 'Align personal data processing and privacy governance with applicable statutory requirements.',
    practicalActions: [
      'Prepare and file your annual Compliance Audit Return (CAR) with the NDPC if subject to statutory filing obligations.',
      'Evaluate your data volume and processing nature to confirm whether statutory DCMI registration applies.',
      'Formally appoint or engage a qualified Data Protection Officer (DPO) to oversee privacy governance.',
      'Publish an accurate, publicly accessible Privacy Notice detailing data collection, processing purposes, and subject rights.',
    ],
  },
  legal: {
    id: 'legal',
    categoryTitle: 'Legal Compliance',
    subtitle: 'Solidify corporate registration, standard commercial agreements, and sector compliance.',
    practicalActions: [
      'Verify that Corporate Affairs Commission (CAC) corporate status, statutory filings, and annual returns remain active.',
      'Have qualified corporate legal counsel review standard commercial agreements, vendor terms, and service agreements.',
      'Document internal operational compliance policies aligned with regulations in your specific operating sector.',
      'Review consumer-facing terms of service and client contracts to ensure fair and clear consumer protection standards.',
    ],
  },
  ai: {
    id: 'ai',
    categoryTitle: 'AI Governance',
    subtitle: 'Establish oversight, transparency, and risk mitigation for AI models and automated workflows.',
    practicalActions: [
      'Draft and adopt an internal AI Acceptable Use Policy establishing ethical boundaries for staff and contractors.',
      'Conduct documented risk assessments for internal AI systems and external third-party AI APIs deployed.',
      'Implement defined human-in-the-loop oversight mechanisms for automated decision-making workflows.',
      'Ensure clear disclosure and user notifications whenever AI systems impact decisions affecting end users.',
    ],
  },
};

type Answer = 'yes' | 'no' | null;
type ScoreKey = keyof typeof RATINGS;

function getScore(answers: Answer[]) { return answers.filter(a => a === 'yes').length * 25; }
function getScoreTier(score: number): ScoreKey {
  if (score >= 100) return 100;
  if (score >= 75) return 75;
  if (score >= 50) return 50;
  if (score >= 25) return 25;
  return 0;
}
function getRating(score: number) { return RATINGS[getScoreTier(score)]; }

export default function ATE2026() {
  const [answers, setAnswers] = useState<Record<string, Answer[]>>(
    Object.fromEntries(SECTIONS.map(s => [s.id, [null, null, null, null]]))
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showRatingDetails, setShowRatingDetails] = useState<boolean>(false);

  const setAnswer = (sectionId: string, qi: number, val: Answer) =>
    setAnswers(prev => {
      const arr = [...prev[sectionId]];
      arr[qi] = val;
      return { ...prev, [sectionId]: arr };
    });

  const allAnswered = SECTIONS.every(s => answers[s.id].every(a => a !== null));
  const totalScore = Math.round(SECTIONS.reduce((sum, s) => sum + getScore(answers[s.id]), 0) / SECTIONS.length);
  const roundedTotal = getScoreTier(totalScore);

  // Category score calculations and gap identification
  const categoryScores = SECTIONS.map(s => {
    const sectionAnswers = answers[s.id];
    const isComplete = sectionAnswers.every(a => a !== null);
    const score = isComplete ? getScore(sectionAnswers) : null;
    const answeredCount = sectionAnswers.filter(a => a !== null).length;
    const gapIndices = sectionAnswers
      .map((ans, idx) => (ans === 'no' ? idx : null))
      .filter((idx): idx is number => idx !== null);

    return {
      id: s.id,
      title: s.title.replace(' Assessment', ''),
      icon: s.icon,
      score,
      isComplete,
      answeredCount,
      gapIndices,
    };
  });

  const completedCategoriesCount = categoryScores.filter(c => c.isComplete).length;

  // Categories with gaps (score < 100), sorted with lowest score first
  const categoriesWithGaps = categoryScores
    .filter((c): c is typeof c & { score: number } => c.score !== null && c.score < 100)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return a.score - b.score;
      }
      return SECTIONS.findIndex(s => s.id === a.id) - SECTIONS.findIndex(s => s.id === b.id);
    });

  const lowestCategoryScore = categoriesWithGaps.length > 0 ? categoriesWithGaps[0].score : 100;

  const activeSection = SECTIONS.find(s => s.id === activeModal);
  const modalAnswers = activeModal ? answers[activeModal] : [];
  const modalComplete = modalAnswers.every(a => a !== null);
  const modalScore = modalComplete ? getScore(modalAnswers) : null;
  const modalRating = modalScore !== null ? getRating(modalScore) : null;

  return (
    <div className="ate2026-page min-h-screen font-sans">
      <Header />

      {/* Redesigned Hero matching approved mockup */}
      <div className="ate2026-redesign-hero pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 border-b border-white/10">
        <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-7 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Description, Meta, CTA, Disclaimer */}
            <div className="lg:col-span-6 text-left">
              <h1 className="font-serif text-[clamp(2.3rem,4.4vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                Is Your Business <br className="hidden sm:inline" />
                Ready to <span className="text-[#F4C236]">Scale?</span>
              </h1>
              <div className="w-10 h-1 bg-[#6C35E8] rounded-full mt-4 mb-5" aria-hidden="true" />
              <p className="text-[#C4BCD7] text-base sm:text-lg leading-relaxed max-w-xl">
                Check your readiness across Security, Data Privacy, Legal Compliance, and AI Governance.
              </p>
              <div className="flex items-center gap-2.5 mt-5 text-sm sm:text-base font-medium text-[#CBB6F8]">
                <ClipboardCheck className="w-5 h-5 text-[#9A6AFF] flex-shrink-0" aria-hidden="true" />
                <span>16 Questions · Instant Results</span>
              </div>
              <div className="mt-8 flex flex-col items-start gap-3">
                <a
                  href="#assessment"
                  className="ate2026-cta-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#4b3fbc] text-white font-bold text-base shadow-[0_10px_28px_rgba(75,63,188,0.35)] hover:bg-[#3e33a4] hover:shadow-[0_14px_34px_rgba(75,63,188,0.48)] transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('assessment');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
                </a>
                <p className="text-xs sm:text-sm text-[#9A91B0]">
                  Self-assessment only · Not a compliance certification
                </p>
              </div>
            </div>
            {/* Right Column: Decorative Business Readiness Dashboard Graphic */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <ReadinessDashboardGraphic className="w-full max-w-[540px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Assessment */}
      <div id="assessment" className="ate2026-assessment max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ scrollMarginTop: '90px' }}>
        <div className="ate2026-section-intro mb-5" style={{ borderBottom: '1px solid rgba(179,240,14,0.15)', paddingBottom: '1.5rem' }}>
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#5145B5' }}>Mustarred Africa</span>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em', marginTop: '0.25rem', marginBottom: '0.5rem' }}>Regulatory Readiness Check</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Tap on any section below to begin. Answer 4 quick questions and get your score instantly.
          </p>
        </div>

        {/* Section cards */}
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            const sectionAnswers = answers[section.id];
            const complete = sectionAnswers.every(a => a !== null);
            const score = complete ? getScore(sectionAnswers) : null;
            const rating = score !== null ? getRating(score) : null;
            const answeredCount = sectionAnswers.filter(a => a !== null).length;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveModal(section.id)}
                className="ate2026-card rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: complete && rating ? rating.light : '#fff',
                  border: complete && rating ? `2px solid ${rating.border}` : '2px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="ate2026-card-icon w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,17,56,0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: complete && rating ? rating.color : '#9ca3af' }}>{section.part}</p>
                      <h3 className="font-semibold text-base leading-tight" style={{ color: complete && rating ? rating.color : '#111827' }}>{section.title}</h3>
                      <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{section.description}</p>
                    </div>
                  </div>
                  {complete && rating ? (
                    <div className="ate2026-card-score flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: rating.border, color: rating.color }}>
                      {score}
                    </div>
                  ) : (
                    <div className="ate2026-card-count flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-gray-400" style={{ background: '#f3f4f6' }}>
                      {answeredCount}/4
                    </div>
                  )}
                </div>
                {/* Progress bar */}
                <div className="ate2026-progress-track h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                  <div
                    className="ate2026-progress-fill h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(answeredCount / 4) * 100}%`,
                      background: complete && rating ? rating.color : '#160D2B',
                    }}
                  />
                </div>
                <p className="ate2026-progress-status text-xs font-medium mt-2" style={{ color: complete && rating ? rating.color : '#9ca3af' }}>
                  {complete && rating ? rating.label : answeredCount === 0 ? 'Tap to start' : `${answeredCount} of 4 answered`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Overall Score */}
        {allAnswered && (
          <div className="ate2026-subcard ate2026-result-card rounded-2xl sm:rounded-3xl overflow-hidden mb-6 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
              {/* Prominent Score Container */}
              <div className="ate2026-score-display-box flex-shrink-0 flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-2xl sm:rounded-3xl p-4 text-center">
                <span className="text-xs uppercase tracking-widest font-bold text-[#CBB6F8] mb-0.5">Overall Score</span>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                    {totalScore}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#E0DAF5] mt-1.5 px-2.5 py-0.5 rounded-full bg-white/10">
                  out of 100
                </span>
              </div>

              {/* Score Details & Breakdown */}
              <div className="flex-1 text-center lg:text-left min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E0DAF5] mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C236]" aria-hidden="true" />
                  <span>Overall Readiness Assessment</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
                  {getRating(roundedTotal).label}
                </h3>

                <p className="text-[#E0DAF5] text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
                  {getRating(roundedTotal).message}
                </p>

                {/* Category Breakdown Mini-Pills */}
                <div className="pt-4 border-t border-white/15">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#CBB6F8] mb-2.5">
                    Category Breakdown
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categoryScores.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10"
                        >
                          <Icon className="w-4 h-4 text-[#CBB6F8] flex-shrink-0" aria-hidden="true" />
                          <div className="min-w-0 text-left">
                            <p className="text-[11px] text-[#E0DAF5] truncate leading-tight">{cat.title}</p>
                            <p className="text-xs font-bold text-white leading-tight mt-0.5">{cat.score}/100</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 mt-4 text-xs text-[#C4BCD7]">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#CBB6F8]" aria-hidden="true" />
                  <p>
                    Self-assessment only · A high self-assessment score is not certification or proof of regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compact Rating Scale */}
        <div className="ate2026-subcard rounded-2xl overflow-hidden mb-6 bg-white shadow-sm border border-[#e6e1ef]">
          <div className="ate2026-subcard-header px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#191132] border-b-2 border-[#4b3fbc]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#a99bf7] mb-0.5">Reference Guide</p>
              <h3 className="text-white text-base sm:text-lg font-semibold tracking-tight">Readiness Rating Scale</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowRatingDetails(prev => !prev)}
              aria-expanded={showRatingDetails}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors self-start sm:self-auto"
            >
              <span>{showRatingDetails ? 'Collapse Details' : 'View Tier Details'}</span>
              {showRatingDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 sm:p-5">
            {/* Compact 5-tier horizontal bar / stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {([0, 25, 50, 75, 100] as const).map(tierScore => {
                const tier = RATINGS[tierScore];
                const isCurrentTier = allAnswered && roundedTotal === tierScore;

                return (
                  <div
                    key={tierScore}
                    className={`relative rounded-xl p-3 text-left sm:text-center transition-all ${
                      isCurrentTier
                        ? 'bg-[#4b3fbc] text-white shadow-md ring-2 ring-[#4b3fbc] ring-offset-2'
                        : 'bg-[#f8fafc] text-[#39334a] border border-[#e6e1ef]'
                    }`}
                  >
                    {isCurrentTier && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#F4C236] text-[#13062c] text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Your Level
                      </span>
                    )}
                    <p className={`text-xs font-black mb-0.5 ${isCurrentTier ? 'text-[#F4C236]' : 'text-[#4b3fbc]'}`}>
                      {tier.range}
                    </p>
                    <p className={`text-xs font-bold leading-tight ${isCurrentTier ? 'text-white' : 'text-[#1e1138]'}`}>
                      {tier.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Accessible expandable details */}
            {showRatingDetails && (
              <div className="mt-4 pt-4 border-t border-[#eeeaf4] space-y-3">
                {([0, 25, 50, 75, 100] as const).map(tierScore => {
                  const tier = RATINGS[tierScore];
                  const isCurrentTier = allAnswered && roundedTotal === tierScore;

                  return (
                    <div
                      key={tierScore}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center ${
                        isCurrentTier
                          ? 'bg-[#f4f1fc] border-[#4b3fbc]'
                          : 'bg-white border-[#eeeaf4]'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-shrink-0 w-36">
                        <span className={`text-xs font-black px-2 py-1 rounded-md ${
                          isCurrentTier ? 'bg-[#4b3fbc] text-white' : 'bg-[#f1f5f9] text-[#4b3fbc]'
                        }`}>
                          {tier.range}
                        </span>
                        <span className="text-xs font-bold text-[#1e1138]">{tier.label}</span>
                      </div>
                      <p className="text-xs text-[#5e586d] leading-relaxed flex-1">
                        {tier.message}
                      </p>
                      {isCurrentTier && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4b3fbc] text-white flex-shrink-0 self-start sm:self-center">
                          Your Level
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="ate2026-subcard rounded-2xl overflow-hidden mb-6 bg-white shadow-sm border border-[#e6e1ef]">
          <div className="ate2026-subcard-header px-5 sm:px-6 py-4 bg-[#191132] border-b-2 border-[#4b3fbc]">
            <h3 className="text-white text-base sm:text-lg font-semibold tracking-tight">
              Next Steps &amp; Priority Guidance
            </h3>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {!allAnswered ? (
              /* Incomplete state: friendly progress prompt */
              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e6e1ef] text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#f2f0fb] flex items-center justify-center mx-auto mb-3 text-[#4b3fbc]">
                  <ClipboardCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-[#1e1138] mb-1">
                  Complete the Assessment to Generate Tailored Next Steps
                </h4>
                <p className="text-xs sm:text-sm text-[#706a7d] max-w-md mx-auto mb-4">
                  Answer the questions in all 4 categories above to reveal your prioritized action plan and category-specific recommendations.
                </p>
                <div className="max-w-xs mx-auto">
                  <div className="flex justify-between text-xs font-semibold text-[#4b3fbc] mb-1.5">
                    <span>Assessment Progress</span>
                    <span>{completedCategoriesCount} of 4 Categories Complete</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e8e4f0] overflow-hidden">
                    <div
                      className="h-full bg-[#4b3fbc] transition-all duration-300"
                      style={{ width: `${(completedCategoriesCount / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : categoriesWithGaps.length === 0 ? (
              /* Perfect Score 100 across all 4 categories */
              <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center flex-shrink-0 text-[#16a34a]">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-[#166534]">
                        Strong Readiness Across All 4 Categories (100 / 100)
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#16a34a] text-white">
                        All Targets Met
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#15803d] leading-relaxed mb-4">
                      Your self-assessment indicates established baseline safeguards across Security, Data Privacy, Legal Compliance, and AI Governance. To preserve this posture as regulatory landscapes and your operations evolve, focus on continuous governance:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2.5 text-xs text-[#166534]">
                      <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-[#bbf7d0]">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                        <span>Schedule annual CAR filing and maintain your NDPC audit calendar.</span>
                      </li>
                      <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-[#bbf7d0]">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                        <span>Perform recurring vulnerability scans and periodic penetration tests.</span>
                      </li>
                      <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-[#bbf7d0]">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                        <span>Conduct annual legal reviews of standard commercial contracts and consumer terms.</span>
                      </li>
                      <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-[#bbf7d0]">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                        <span>Review AI governance policies as new models and automated tools are adopted.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Prioritized Category Recommendations */
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-[#5e586d] font-medium leading-relaxed">
                  Based on your completed assessment, we have prioritized your action items starting with your lowest-scoring areas:
                </p>

                <div className="space-y-4">
                  {categoriesWithGaps.map((cat, idx) => {
                    const Icon = cat.icon;
                    const guidance = CATEGORY_GUIDANCE[cat.id];
                    const isLowest = cat.score === lowestCategoryScore;

                    return (
                      <div
                        key={cat.id}
                        className={`rounded-2xl p-5 border transition-all ${
                          isLowest
                            ? 'bg-[#faf8fe] border-[#4b3fbc]/40 shadow-sm'
                            : 'bg-[#ffffff] border-[#e6e1ef]'
                        }`}
                      >
                        {/* Header row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isLowest ? 'bg-[#4b3fbc] text-white' : 'bg-[#f2f0fb] text-[#4b3fbc]'
                            }`}>
                              <Icon className="w-4 h-4" aria-hidden="true" />
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-[#1e1138] leading-tight">
                                {guidance ? guidance.categoryTitle : cat.title}
                              </h4>
                              <p className="text-xs text-[#706a7d] leading-tight mt-0.5">
                                {guidance?.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#f2f0fb] text-[#4b3fbc] border border-[#e6e1ef]">
                              Score: {cat.score} / 100
                            </span>
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                              isLowest
                                ? 'bg-[#F4C236] text-[#13062c]'
                                : 'bg-[#eeeaf4] text-[#4b3fbc]'
                            }`}>
                              {isLowest ? `Top Priority (#${idx + 1})` : `Priority Area (#${idx + 1})`}
                            </span>
                          </div>
                        </div>

                        {/* Practical Recommended Actions */}
                        <div className="mt-3.5 pt-3 border-t border-[#eeeaf4]">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#4b3fbc] mb-2">
                            Practical Recommended Actions:
                          </p>
                          <ul className="space-y-2">
                            {cat.gapIndices.length > 0 && guidance
                              ? cat.gapIndices.map(qi => (
                                  <li key={qi} className="flex items-start gap-2.5 text-xs text-[#39334a] leading-relaxed">
                                    <ArrowRight className="w-3.5 h-3.5 text-[#4b3fbc] flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{guidance.practicalActions[qi]}</span>
                                  </li>
                                ))
                              : guidance?.practicalActions.map((action, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#39334a] leading-relaxed">
                                    <ArrowRight className="w-3.5 h-3.5 text-[#4b3fbc] flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{action}</span>
                                  </li>
                                ))
                            }
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Advisory Contact Card */}
            <div className="ate2026-contact rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#160D2B] to-[#241544] border border-[#4b3fbc]/30 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                    Need Guidance Addressing These Priorities?
                  </h4>
                  <p className="text-xs sm:text-sm text-[#d3cee4] leading-relaxed max-w-xl">
                    Mustarred Africa provides practical privacy, compliance, cybersecurity, and startup advisory to help you build resilient operations and scale with confidence.
                  </p>
                </div>
                <a
                  href="mailto:info@mustarred.com"
                  className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl bg-[#4b3fbc] hover:bg-[#3e33a4] text-white shadow-md transition-all flex-shrink-0 self-start sm:self-auto"
                >
                  <span>Contact: info@mustarred.com</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="ate2026-subcard mb-6 rounded-xl px-5 py-4 bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">
            <strong className="text-gray-700 font-black">Privacy Notice:</strong> No personal data is retained by Mustarred Africa when you complete this assessment. Where you voluntarily provide contact information, it will be processed in accordance with Mustarred Africa's Privacy Notice at{' '}
            <a href="https://mustarred.com" className="text-[#5145B5] underline font-semibold">mustarred.com</a>.
          </p>
        </div>
      </div>

      {/* Modal */}
      {activeModal && activeSection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}
        >
          <div className="ate2026-modal w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.6)', maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Modal header */}
            <div className="ate2026-modal-header px-6 py-5 flex items-start justify-between gap-3 sticky top-0" style={{ background: '#160D2B', borderBottom: '2px solid #5145B5' }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#5145B5' }}>{activeSection.part}</p>
                <h3 className="text-white text-lg font-semibold leading-tight" style={{ letterSpacing: '-0.02em' }}>{activeSection.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-white/50 hover:text-white transition-colors mt-0.5 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions */}
            {activeSection.questions.map(({ q, note }, qi) => {
              const ans = modalAnswers[qi];
              return (
                <div
                  key={qi}
                  className="ate2026-modal-row px-6 py-5 flex flex-col gap-3"
                  style={{ borderBottom: '1px solid #f1f5f9', background: ans ? '#f8fafc' : '#fff' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: '#5145B5', color: '#FFFFFF' }}>
                      {qi + 1}
                    </span>
                    <div>
                      <p className="text-gray-900 text-sm leading-snug" style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>{q}</p>
                      {note && <p className="text-gray-400 text-xs mt-1 italic leading-relaxed">{note}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-9">
                    <button
                      onClick={() => setAnswer(activeModal, qi, 'yes')}
                      className={`px-5 py-2 rounded-lg text-sm font-bold border-2 transition-all ${ans === 'yes' ? 'ate2026-selected-yes ate2026-on-primary' : ''}`}
                      style={ans === 'yes'
                        ? { background: '#16a34a', borderColor: '#16a34a', color: '#fff' }
                        : { background: '#fff', borderColor: '#e5e7eb', color: '#9ca3af' }
                      }
                    >
                      ✓ Yes
                    </button>
                    <button
                      onClick={() => setAnswer(activeModal, qi, 'no')}
                      className={`px-5 py-2 rounded-lg text-sm font-bold border-2 transition-all ${ans === 'no' ? 'ate2026-selected-no' : ''}`}
                      style={ans === 'no'
                        ? { background: '#dc2626', borderColor: '#dc2626', color: '#fff' }
                        : { background: '#fff', borderColor: '#e5e7eb', color: '#9ca3af' }
                      }
                    >
                      ✕ No
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Modal score footer */}
            <div className="ate2026-modal-footer px-6 py-5 flex items-center justify-between gap-3" style={{ background: '#f8fafc', borderTop: '2px solid #f1f5f9' }}>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{activeSection.scoreLabel}</p>
                {modalComplete && modalRating
                  ? <p className="text-base font-semibold mt-1" style={{ color: modalRating.color }}>{modalRating.label}</p>
                  : <p className="text-gray-300 text-sm mt-1">Answer all 4 to see your score</p>
                }
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
                  style={modalComplete && modalRating
                    ? { background: modalRating.light, border: `2px solid ${modalRating.border}`, color: modalRating.color }
                    : { background: '#f1f5f9', border: '2px solid #e2e8f0', color: '#cbd5e1' }
                  }
                >
                  {modalComplete ? modalScore : '—'}
                </div>
                {modalComplete && (
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: '#5145B5', color: '#FFFFFF' }}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
