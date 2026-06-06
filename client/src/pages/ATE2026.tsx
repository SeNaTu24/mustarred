import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  0:   { label: 'Critical Gaps Detected', color: '#dc2626', light: '#fef2f2', border: '#fca5a5' },
  25:  { label: 'At Risk',                color: '#ea580c', light: '#fff7ed', border: '#fdba74' },
  50:  { label: 'Partially Compliant',    color: '#b45309', light: '#fefce8', border: '#fcd34d' },
  75:  { label: 'Mostly Compliant',       color: '#1d4ed8', light: '#eff6ff', border: '#93c5fd' },
  100: { label: 'Fully Compliant',        color: '#15803d', light: '#f0fdf4', border: '#86efac' },
} as const;

const RATING_MESSAGES = {
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
function getMessage(score: number) { return RATING_MESSAGES[(score as ScoreKey)] ?? RATING_MESSAGES[0]; }

export default function ATE2026() {
  const [answers, setAnswers] = useState<Record<string, Answer[]>>(
    Object.fromEntries(SECTIONS.map(s => [s.id, [null, null, null, null]]))
  );

  const setAnswer = (sectionId: string, qi: number, val: Answer) =>
    setAnswers(prev => {
      const arr = [...prev[sectionId]];
      arr[qi] = val;
      return { ...prev, [sectionId]: arr };
    });

  const [activeTab, setActiveTab] = useState(0);

  const allAnswered = SECTIONS.every(s => answers[s.id].every(a => a !== null));
  const totalScore = Math.round(SECTIONS.reduce((sum, s) => sum + getScore(answers[s.id]), 0) / SECTIONS.length);
  const roundedTotal = Math.round(totalScore / 25) * 25 as ScoreKey;

  return (
    <div className="min-h-screen" style={{ background: 'rgb(12, 8, 30)' }}>
      <Header />

      {/* Hero */}
      <div className="pt-16 sm:pt-20 md:pt-24" style={{ background: 'linear-gradient(135deg, rgb(20,11,45) 0%, rgb(40,22,80) 50%, rgb(30,17,56) 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-12">

          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              🌍 ATE 2026 · Lagos, Nigeria
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              We're exhibiting at<br />
              <span style={{ color: '#facc15' }}>Africa Technology<br />Expo 2026</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Connecting with founders, business leaders, and innovators on how to build organisations that are secure, compliant, and prepared for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Date</p>
                  <p className="text-white font-black text-sm">June 26th – 27th, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Venue</p>
                  <p className="text-white font-black text-sm">National Theatre, Lagos</p>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm">
              Visit our booth · Meet the team · Activities & giveaways
            </p>
          </div>

          {/* Right — poster */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30" style={{ background: 'linear-gradient(135deg, #facc15, #4b4ba3)' }} />
              <img
                src="/afrotech 1.jpeg"
                alt="Africa Technology Expo 2026"
                className="relative rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/10"
              />
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/5 max-w-6xl mx-auto" />
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-8">
          <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">Compliance Tool</p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">Basic Regulatory Readiness Check</h2>
          <p className="text-white/50 text-base font-medium max-w-2xl leading-relaxed">
            A quick self-assessment across four key compliance areas. Answer Yes or No — your score calculates automatically at the end of each section.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Tab bar */}
        <div className="flex rounded-2xl p-1 mb-6 gap-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {SECTIONS.map((section, i) => {
            const sectionAnswers = answers[section.id];
            const complete = sectionAnswers.every(a => a !== null);
            const score = complete ? getScore(sectionAnswers) : null;
            const rating = score !== null ? getRating(score) : null;
            const active = activeTab === i;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-200 relative"
                style={active ? { background: 'rgb(30,17,56)' } : {}}
              >
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: active ? '#facc15' : 'rgba(255,255,255,0.3)' }}>{section.part}</span>
                <span className="text-xs font-black text-center leading-tight hidden sm:block" style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}>{section.title.replace(' Assessment', '')}</span>
                {complete && rating && (
                  <span className="text-[10px] font-black mt-0.5" style={{ color: rating.color }}>{score}</span>
                )}
                {!complete && (
                  <div className="flex gap-0.5 mt-0.5">
                    {sectionAnswers.map((a, idx) => (
                      <div key={idx} className={`w-1.5 h-1.5 rounded-full ${a === 'yes' ? 'bg-green-400' : a === 'no' ? 'bg-red-400' : 'bg-white/20'}`} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active section */}
        {SECTIONS.map((section, i) => {
          if (activeTab !== i) return null;
          const sectionAnswers = answers[section.id];
          const complete = sectionAnswers.every(a => a !== null);
          const score = complete ? getScore(sectionAnswers) : null;
          const rating = score !== null ? getRating(score) : null;
          return (
            <fieldset
              key={section.id}
              className="rounded-2xl overflow-hidden bg-white"
              style={{ border: 'none', boxShadow: '0 4px 32px rgba(0,0,0,0.4)', margin: 0, padding: 0 }}
            >
              <div className="px-6 sm:px-10 py-6 flex items-center justify-between" style={{ background: 'rgb(30,17,56)' }}>
                <legend className="float-left p-0">
                  <p className="text-yellow-400 text-[11px] font-black uppercase tracking-widest mb-1">{section.part}</p>
                  <p className="text-white text-xl font-black leading-tight">{section.title}</p>
                </legend>
                <div className="flex gap-2 flex-shrink-0">
                  {sectionAnswers.map((a, idx) => (
                    <div key={idx} className={`h-2 w-8 rounded-full transition-all duration-300 ${a === 'yes' ? 'bg-green-400' : a === 'no' ? 'bg-red-400' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {section.questions.map(({ q, note }, qi) => {
                  const ans = sectionAnswers[qi];
                  return (
                    <div key={qi} className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: ans ? '#f8fafc' : '#fff' }}>
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black" style={{ background: 'rgb(30,17,56)', color: '#fff' }}>{qi + 1}</span>
                        <div>
                          <p className="text-gray-900 text-base font-semibold leading-snug">{q}</p>
                          {note && <p className="text-gray-400 text-xs italic mt-1 leading-relaxed">{note}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-11 sm:ml-0 flex-shrink-0">
                        <button type="button" onClick={() => setAnswer(section.id, qi, 'yes')}
                          className="px-6 py-2.5 rounded-xl text-sm font-black border-2 transition-all duration-150"
                          style={ans === 'yes' ? { background: '#16a34a', borderColor: '#16a34a', color: '#fff' } : { background: '#fff', borderColor: '#d1d5db', color: '#9ca3af' }}
                        >✓ Yes</button>
                        <button type="button" onClick={() => setAnswer(section.id, qi, 'no')}
                          className="px-6 py-2.5 rounded-xl text-sm font-black border-2 transition-all duration-150"
                          style={ans === 'no' ? { background: '#dc2626', borderColor: '#dc2626', color: '#fff' } : { background: '#fff', borderColor: '#d1d5db', color: '#9ca3af' }}
                        >✕ No</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 sm:px-10 py-5 flex items-center justify-between" style={{ background: '#f8fafc', borderTop: '2px solid #f1f5f9' }}>
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{section.scoreLabel}</p>
                  {complete && rating
                    ? <p className="text-base font-black mt-1" style={{ color: rating.color }}>{rating.label}</p>
                    : <p className="text-gray-300 text-sm font-semibold mt-1">Answer all 4 to see score</p>
                  }
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl"
                    style={complete && rating ? { background: rating.light, border: `2px solid ${rating.border}`, color: rating.color } : { background: '#f1f5f9', border: '2px solid #e2e8f0', color: '#cbd5e1' }}
                  >{complete ? score : '—'}</div>
                  {i < SECTIONS.length - 1 && (
                    <button type="button" onClick={() => setActiveTab(i + 1)}
                      className="px-5 py-2.5 rounded-xl text-sm font-black border-2 transition-all"
                      style={{ background: 'rgb(30,17,56)', borderColor: 'rgb(30,17,56)', color: '#fff' }}
                    >Next →</button>
                  )}
                </div>
              </div>
            </fieldset>
          );
        })}

        {/* Overall Score */}
        {allAnswered && (
          <div className="mt-8 rounded-2xl overflow-hidden">
            <div className="px-8 py-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, rgb(30,17,56) 0%, #4b4ba3 100%)' }}>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: getRating(roundedTotal).light, border: `3px solid ${getRating(roundedTotal).border}` }}>
                <div className="text-center">
                  <p className="text-3xl font-black leading-none" style={{ color: getRating(roundedTotal).color }}>{totalScore}</p>
                  <p className="text-xs font-bold text-gray-400">/100</p>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">Overall Regulatory Readiness</p>
                <p className="text-white text-2xl sm:text-3xl font-black mb-2">{getRating(roundedTotal).label}</p>
                <p className="text-white/70 text-sm font-medium leading-relaxed max-w-lg">{getMessage(roundedTotal)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-6 rounded-2xl p-6 sm:p-8" style={{ background: 'rgb(20,13,42)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="text-white text-lg font-black mb-4">Next Steps</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl p-5" style={{ background: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)' }}>
              <p className="text-orange-400 font-black text-sm mb-2">Scored 75 and below?</p>
              <p className="text-white/40 text-sm leading-relaxed">A focused remediation conversation will get you to safe, defensible ground faster than you expect.</p>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(21,128,61,0.1)', border: '1px solid rgba(21,128,61,0.2)' }}>
              <p className="text-green-400 font-black text-sm mb-2">Scored 100?</p>
              <p className="text-white/40 text-sm leading-relaxed">Let us help you maintain that posture as regulations evolve. The landscape does not stand still.</p>
            </div>
          </div>
          <a
            href="mailto:info@mustarred.com?subject=Regulatory Readiness Check — ATE2026"
            className="inline-flex items-center gap-2 text-gray-900 font-black text-sm px-6 py-3 rounded-xl transition-colors hover:bg-yellow-300"
            style={{ background: '#facc15' }}
          >Email us: info@mustarred.com →</a>
        </div>

        {/* Rating Scale */}
        <div className="mt-6 rounded-2xl overflow-hidden" style={{ background: 'rgb(20,13,42)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-6 sm:px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-yellow-400 text-[11px] font-black uppercase tracking-widest mb-1">Reference</p>
            <h3 className="text-white text-lg font-black">Rating Scale</h3>
          </div>
          {([0, 25, 50, 75, 100] as const).map((s, i) => {
            const r = RATINGS[s];
            return (
              <div key={s} className="px-6 sm:px-8 py-4 flex gap-5 items-start" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span className="text-xl font-black w-14 flex-shrink-0" style={{ color: r.color }}>{s}<span className="text-xs text-white/20 font-semibold">/100</span></span>
                <div>
                  <p className="text-sm font-black mb-0.5" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{getMessage(s)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy */}
        <div className="mt-4 mb-10 rounded-xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/30 text-xs leading-relaxed">
            <strong className="text-white/50 font-black">Privacy Notice:</strong> No personal data is retained by Mustarred Africa when you complete this assessment. Where you voluntarily provide contact information, it will be processed in accordance with Mustarred Africa's Privacy Notice at{' '}
            <a href="https://mustarred.com" className="text-yellow-400 underline">mustarred.com</a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
