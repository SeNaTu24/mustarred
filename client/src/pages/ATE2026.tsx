import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { X, Shield, Lock, Scale, BrainCircuit } from 'lucide-react';

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
  0:   { label: 'Critical Gaps Detected', color: '#6b7280', light: '#f9fafb', border: '#e5e7eb', message: 'Your compliance posture requires urgent attention. You are operating with significant regulatory exposure.' },
  25:  { label: 'At Risk',                color: '#6b7280', light: '#f9fafb', border: '#e5e7eb', message: 'Meaningful gaps remain. A structured remediation plan will get you to safe ground faster than you expect.' },
  50:  { label: 'Partially Compliant',    color: '#4b5563', light: '#f3f4f6', border: '#d1d5db', message: 'You are halfway there. A targeted review will close the remaining gaps without reinventing the wheel.' },
  75:  { label: 'Mostly Compliant',       color: '#5145B5', light: '#E9E5FA', border: '#E9E5FA', message: 'You are making genuine progress. One gap is all that stands between you and full compliance.' },
  100: { label: 'Strong Readiness',       color: '#5145B5', light: '#f0eefb', border: '#C9C2F0', message: 'Outstanding. A perfect score reflects sustained commitment to governance. Keep it up.' },
} as const;

const OVERALL_MESSAGES = {
  0:   'Your compliance posture requires urgent attention. You are operating with significant regulatory exposure. The good news? Doing this check means you already want to fix it — that is the first step.',
  25:  'Meaningful gaps remain. A structured remediation plan will get you to safe, defensible ground faster than you expect.',
  50:  'You are halfway there, which is more than most. A targeted review will close the remaining gaps without reinventing the wheel.',
  75:  'You are making genuine progress. One gap is all that stands between you and full compliance. A focused effort will take you across the line.',
  100: 'Outstanding. A perfect score reflects sustained commitment to governance. Compliance is not a destination — it is a practice.',
} as const;

type Answer = 'yes' | 'no' | null;
type ScoreKey = keyof typeof RATINGS;

function getScore(answers: Answer[]) { return answers.filter(a => a === 'yes').length * 25; }
function getRating(score: number) { return RATINGS[(score as ScoreKey)] ?? RATINGS[0]; }

export default function ATE2026() {
  const [answers, setAnswers] = useState<Record<string, Answer[]>>(
    Object.fromEntries(SECTIONS.map(s => [s.id, [null, null, null, null]]))
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const setAnswer = (sectionId: string, qi: number, val: Answer) =>
    setAnswers(prev => {
      const arr = [...prev[sectionId]];
      arr[qi] = val;
      return { ...prev, [sectionId]: arr };
    });

  const allAnswered = SECTIONS.every(s => answers[s.id].every(a => a !== null));
  const totalScore = Math.round(SECTIONS.reduce((sum, s) => sum + getScore(answers[s.id]), 0) / SECTIONS.length);
  const roundedTotal = Math.round(totalScore / 25) * 25 as ScoreKey;

  const activeSection = SECTIONS.find(s => s.id === activeModal);
  const modalAnswers = activeModal ? answers[activeModal] : [];
  const modalComplete = modalAnswers.every(a => a !== null);
  const modalScore = modalComplete ? getScore(modalAnswers) : null;
  const modalRating = modalScore !== null ? getRating(modalScore) : null;

  return (
    <div className="min-h-screen" style={{ background: '#160D2B', fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}>
      <Header />

      {/* Hero */}
      <div style={{ background: '#160D2B', paddingTop: '112px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.15, maxWidth: '850px', margin: '0 auto 20px' }}>
            Is Your Business Ready to Scale?
          </h1>
          <p style={{ color: '#E9E5FA', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 20px' }}>
            Check your readiness across Security, Data Privacy, Legal Compliance, and AI Governance.
          </p>
          <p style={{ color: '#C9BFFF', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
            16 Questions · Instant Results
          </p>
          <a href="#assessment" onClick={(e) => { e.preventDefault(); const el = document.getElementById('assessment'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ display: 'inline-flex', alignItems: 'center', background: '#5145B5', color: '#FFFFFF', fontSize: '15px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', border: '1px solid #786CD5', textDecoration: 'none' }}>
            Start Free Assessment
          </a>
          <p style={{ color: '#D1CADF', fontSize: '12px', marginTop: '16px' }}>
            Self-assessment only · Not a compliance certification
          </p>
        </div>
      </div>

      {/* Assessment */}
      <div id="assessment" className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ scrollMarginTop: '90px' }}>
        <div className="mb-5" style={{ borderBottom: '1px solid rgba(179,240,14,0.15)', paddingBottom: '1.5rem' }}>
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
                className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: complete && rating ? rating.light : '#fff',
                  border: complete && rating ? `2px solid ${rating.border}` : '2px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,17,56,0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: complete && rating ? rating.color : '#9ca3af' }}>{section.part}</p>
                      <h3 className="font-semibold text-base leading-tight" style={{ color: complete && rating ? rating.color : '#111827' }}>{section.title}</h3>
                      <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{section.description}</p>
                    </div>
                  </div>
                  {complete && rating ? (
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: rating.border, color: rating.color }}>
                      {score}
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-gray-400" style={{ background: '#f3f4f6' }}>
                      {answeredCount}/4
                    </div>
                  )}
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(answeredCount / 4) * 100}%`,
                      background: complete && rating ? rating.color : '#160D2B',
                    }}
                  />
                </div>
                <p className="text-xs font-medium mt-2" style={{ color: complete && rating ? rating.color : '#9ca3af' }}>
                  {complete && rating ? rating.label : answeredCount === 0 ? 'Tap to start' : `${answeredCount} of 4 answered`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Overall Score */}
        {allAnswered && (
          <div className="rounded-2xl overflow-hidden mb-5" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-3" style={{ background: 'linear-gradient(135deg, #160D2B 0%, #5145B5 100%)' }}>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: getRating(roundedTotal).light, border: `3px solid ${getRating(roundedTotal).border}` }}>
                <div className="text-center">
                  <p className="text-3xl font-black leading-none" style={{ color: getRating(roundedTotal).color }}>{totalScore}</p>
                  <p className="text-xs font-bold text-gray-400">/100</p>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Overall Regulatory Readiness</p>
                <p className="text-white text-2xl sm:text-3xl font-bold mb-2">{getRating(roundedTotal).label}</p>
                <p className="text-white/70 text-sm font-medium leading-relaxed max-w-lg">{OVERALL_MESSAGES[roundedTotal]}</p>
                <p className="text-white/40 text-xs mt-2">A high self-assessment score is not certification or proof of regulatory compliance.</p>
              </div>
            </div>
          </div>
        )}

        {/* Rating Scale */}
        <div className="rounded-2xl overflow-hidden mb-3" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-5 sm:px-6 py-4" style={{ background: '#160D2B', borderBottom: '2px solid #5145B5' }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#5145B5' }}>Reference</p>
            <h3 className="text-white text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>Rating Scale</h3>
          </div>
          {([0, 25, 50, 75, 100] as const).map((s, i) => {
            const r = RATINGS[s];
            return (
              <div key={s} className="px-5 sm:px-6 py-4 flex gap-3 items-start" style={{ borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                <div className="flex-shrink-0 w-14 pt-0.5">
                  <span className="text-xl font-black" style={{ color: r.color }}>{s}</span>
                  <p className="text-gray-400 text-xs font-semibold">/100</p>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-semibold mb-0.5" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl overflow-hidden mb-3" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-5 sm:px-6 py-4" style={{ background: '#160D2B', borderBottom: '2px solid #5145B5' }}>
            <h3 className="text-white text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>Next Steps</h3>
          </div>
          <div className="p-4 sm:p-5 space-y-4">
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              Wherever you have landed on the scale, this is not where the story ends — it is where the work begins.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4 border-2 border-orange-100 bg-orange-50">
                <p className="text-orange-700 font-semibold text-sm mb-1">Scored 75 and below?</p>
                <p className="text-gray-600 text-xs font-medium leading-relaxed">Identify and address your most important regulatory gaps first, in priority order.</p>
              </div>
              <div className="rounded-xl p-4" style={{ border: '2px solid #d1fae5', background: '#f0fdf4' }}>
                <p className="font-semibold text-sm mb-1" style={{ color: '#15803d' }}>Scored 100?</p>
                <p className="text-gray-600 text-xs font-medium leading-relaxed">Continue monitoring and improving as your business grows and regulations evolve.</p>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #160D2B 0%, #160D2B 100%)', border: '1px solid rgba(81,69,181,0.25)' }}>
              <p className="text-white font-semibold text-base mb-1" style={{ letterSpacing: '-0.01em' }}>Ready to strengthen your business?</p>
              <p className="text-sm font-medium leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Mustarred Africa helps growing businesses identify governance risks and develop practical roadmaps for sustainable growth.
              </p>
              <a
                href="mailto:info@mustarred.com"
                className="inline-flex items-center gap-2 font-black text-sm px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: '#5145B5', color: '#FFFFFF' }}
              >
                Contact: info@mustarred.com
              </a>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-6 rounded-xl px-5 py-4 bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
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
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.6)', maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Modal header */}
            <div className="px-6 py-5 flex items-start justify-between gap-3 sticky top-0" style={{ background: '#160D2B', borderBottom: '2px solid #5145B5' }}>
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
                  className="px-6 py-5 flex flex-col gap-3"
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
                      className="px-5 py-2 rounded-lg text-sm font-bold border-2 transition-all"
                      style={ans === 'yes'
                        ? { background: '#16a34a', borderColor: '#16a34a', color: '#fff' }
                        : { background: '#fff', borderColor: '#e5e7eb', color: '#9ca3af' }
                      }
                    >
                      ✓ Yes
                    </button>
                    <button
                      onClick={() => setAnswer(activeModal, qi, 'no')}
                      className="px-5 py-2 rounded-lg text-sm font-bold border-2 transition-all"
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
            <div className="px-6 py-5 flex items-center justify-between gap-3" style={{ background: '#f8fafc', borderTop: '2px solid #f1f5f9' }}>
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





