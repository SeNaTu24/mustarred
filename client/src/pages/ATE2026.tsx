import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { X } from 'lucide-react';

const SECTIONS = [
  {
    id: 'security',
    part: 'Part 1',
    title: 'Basic Security Assessment',
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
  75:  { label: 'Mostly Compliant',       color: '#2BC9A3', light: '#f0fdf9', border: '#99f6e4', message: 'You are making genuine progress. One gap is all that stands between you and full compliance.' },
  100: { label: 'Fully Compliant',        color: '#B3F00E', light: '#f7ffe6', border: '#d9f99d', message: 'Outstanding. A perfect score reflects sustained commitment to governance. Keep it up.' },
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
    <div className="min-h-screen" style={{ background: 'rgb(10, 6, 24)', fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}>
      <Header />

      {/* Hero */}
      <div className="pt-16 sm:pt-20 md:pt-24" style={{ background: 'linear-gradient(160deg, rgba(10,6,24,0.85) 0%, rgba(15,30,20,0.75) 60%, rgba(10,6,24,0.85) 100%), url("/nat.jpg") center/cover no-repeat' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 text-center">
          <img src="/ate-logo.svg" alt="Africa Technology Expo" className="h-9 w-auto mx-auto mb-4" />
          <h2 className="font-black uppercase mb-3" style={{ color: '#B3F00E', fontSize: 'clamp(1.25rem, 4vw, 2rem)', letterSpacing: '0.08em' }}>Africa Tech Expo 2026</h2>
          <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Regulatory Readiness Check
          </p>
          <h1 style={{ color: '#ffffff', fontWeight: 900, fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            How Compliant Is{' '}
            <span style={{ color: '#B3F00E' }}>Your Business?</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', lineHeight: 1.7, marginTop: '1rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Answer 16 quick questions across Security, Data Privacy, Legal, and AI Governance — and get your score instantly.
          </p>
        </div>
      </div>

      {/* Assessment */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Header */}
        <div className="mb-8" style={{ borderBottom: '1px solid rgba(179,240,14,0.15)', paddingBottom: '1.5rem' }}>
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#B3F00E' }}>Mustarred Africa</span>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em', marginTop: '0.25rem', marginBottom: '0.5rem' }}>Basic Regulatory Readiness Check</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Tap on any section below to begin. Answer 4 quick questions and get your score instantly.
          </p>
        </div>

        {/* Section cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {SECTIONS.map(section => {
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
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: complete && rating ? rating.color : '#9ca3af' }}>{section.part}</p>
                    <h3 className="font-semibold text-base leading-tight" style={{ color: complete && rating ? rating.color : '#111827' }}>{section.title}</h3>
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
                      background: complete && rating ? rating.color : 'rgb(30,17,56)',
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
          <div className="rounded-2xl overflow-hidden mb-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            <div className="px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, rgb(30,17,56) 0%, #4b4ba3 100%)' }}>
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
              </div>
            </div>
          </div>
        )}

        {/* Rating Scale */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-5 sm:px-6 py-4" style={{ background: 'rgb(10,6,24)', borderBottom: '2px solid #B3F00E' }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#B3F00E' }}>Reference</p>
            <h3 className="text-white text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>Rating Scale</h3>
          </div>
          {([0, 25, 50, 75, 100] as const).map((s, i) => {
            const r = RATINGS[s];
            return (
              <div key={s} className="px-5 sm:px-6 py-4 flex gap-4 items-start" style={{ borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
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
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-5 sm:px-6 py-4" style={{ background: 'rgb(10,6,24)', borderBottom: '2px solid #B3F00E' }}>
            <h3 className="text-white text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>Next Steps</h3>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              Wherever you have landed on the scale, this is not where the story ends — it is where the work begins.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4 border-2 border-orange-100 bg-orange-50">
                <p className="text-orange-700 font-semibold text-sm mb-1">Scored 75 and below?</p>
                <p className="text-gray-600 text-xs font-medium leading-relaxed">Your next step is a focused remediation conversation. We help you identify exactly which gaps to close first, in what order, without overwhelming you.</p>
              </div>
              <div className="rounded-xl p-4" style={{ border: '2px solid #d1fae5', background: '#f0fdf4' }}>
                <p className="font-semibold text-sm mb-1" style={{ color: '#15803d' }}>Scored 100?</p>
                <p className="text-gray-600 text-xs font-medium leading-relaxed">Great work. Let us help you maintain and sharpen that compliance posture as regulations evolve. The landscape does not stand still.</p>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgb(10,6,24) 0%, rgb(15,40,20) 100%)', border: '1px solid rgba(179,240,14,0.25)' }}>
              <p className="text-white font-semibold text-base mb-1" style={{ letterSpacing: '-0.01em' }}>Ready to close those gaps?</p>
              <p className="text-sm font-medium leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Whether you scored 10 or 90, there is a clear path forward. Mustarred Africa builds roadmaps, not lectures.
              </p>
              <a
                href="mailto:info@mustarred.com?subject=Regulatory Readiness Check — ATE2026"
                className="inline-flex items-center gap-2 font-black text-sm px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: '#B3F00E', color: 'rgb(10,6,24)' }}
              >
                Email us: info@mustarred.com →
              </a>
              <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Visit <a href="https://mustarred.com" className="underline" style={{ color: '#B3F00E' }}>mustarred.com</a> or speak to our team at the Mustarred Africa stand.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-10 rounded-xl px-5 py-4 bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">
            <strong className="text-gray-700 font-black">Privacy Notice:</strong> No personal data is retained by Mustarred Africa when you complete this assessment. Where you voluntarily provide contact information, it will be processed in accordance with Mustarred Africa's Privacy Notice at{' '}
            <a href="https://mustarred.com" className="text-[#4b4ba3] underline font-semibold">mustarred.com</a>.
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
            <div className="px-6 py-5 flex items-start justify-between gap-4 sticky top-0" style={{ background: 'rgb(10,6,24)', borderBottom: '2px solid #B3F00E' }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#B3F00E' }}>{activeSection.part}</p>
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
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: '#B3F00E', color: 'rgb(10,6,24)' }}>
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
            <div className="px-6 py-5 flex items-center justify-between gap-4" style={{ background: '#f8fafc', borderTop: '2px solid #f1f5f9' }}>
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
                    style={{ background: '#B3F00E', color: 'rgb(10,6,24)' }}
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
