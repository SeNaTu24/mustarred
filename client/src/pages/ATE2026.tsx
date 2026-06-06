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

  const allAnswered = SECTIONS.every(s => answers[s.id].every(a => a !== null));
  const totalScore = Math.round(SECTIONS.reduce((sum, s) => sum + getScore(answers[s.id]), 0) / SECTIONS.length);
  const roundedTotal = Math.round(totalScore / 25) * 25 as ScoreKey;

  return (
    <div className="min-h-screen" style={{ background: 'rgb(12, 8, 30)' }}>
      <Header />

      {/* Hero */}
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="relative overflow-hidden" style={{ maxHeight: 500 }}>
          <img src="/afrotech.webp" alt="ATE 2026" className="w-full object-cover object-top" style={{ maxHeight: 500 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,8,30,0.1) 0%, rgba(12,8,30,0.9) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 sm:pb-14">
            <div className="max-w-5xl mx-auto">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Official Event Partner · Mustarred Africa</p>
              <h1 className="text-white font-black leading-none mb-3" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
                Africa Technology<br />Expo <span className="text-yellow-400">2026</span>
              </h1>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-yellow-400 text-gray-900 text-xs font-black px-4 py-2 rounded-full">June 26 & 27, 2026</span>
                <span className="text-white/70 text-xs font-semibold px-4 py-2 rounded-full border border-white/20">National Theatre, Iganmu, Lagos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro strip */}
      <div className="border-b border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-8">
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">Basic Regulatory Readiness Check</h2>
          <p className="text-white/60 text-base font-medium max-w-2xl leading-relaxed">
            A quick self-assessment across four key compliance areas. Answer Yes or No — your score calculates automatically at the end of each section.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {SECTIONS.map(section => {
            const sectionAnswers = answers[section.id];
            const complete = sectionAnswers.every(a => a !== null);
            const score = complete ? getScore(sectionAnswers) : null;
            const rating = score !== null ? getRating(score) : null;

            return (
              <div key={section.id} className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>

                {/* Card header */}
                <div className="px-6 py-5 flex items-center justify-between" style={{ background: 'rgb(30,17,56)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p className="text-yellow-400 text-[11px] font-black uppercase tracking-widest mb-1">{section.part}</p>
                    <h3 className="text-white text-lg font-black leading-tight">{section.title}</h3>
                  </div>
                  <div className="flex gap-1.5 ml-4 flex-shrink-0">
                    {sectionAnswers.map((a, i) => (
                      <div key={i} className={`h-2 w-7 rounded-full transition-all duration-300 ${a === 'yes' ? 'bg-green-400' : a === 'no' ? 'bg-red-400' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>

                {/* Questions */}
                {section.questions.map(({ q, note }, qi) => {
                  const ans = sectionAnswers[qi];
                  return (
                    <div key={qi} className="px-6 py-4 flex items-start gap-4" style={{ borderBottom: '1px solid #f1f5f9', background: ans ? '#f8fafc' : '#fff' }}>
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mt-0.5" style={{ background: 'rgb(30,17,56)', color: '#fff' }}>
                        {qi + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-semibold leading-snug">{q}</p>
                        {note && <p className="text-gray-400 text-xs mt-1 italic leading-relaxed">{note}</p>}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setAnswer(section.id, qi, 'yes')}
                            className="px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-all duration-150"
                            style={ans === 'yes'
                              ? { background: '#16a34a', borderColor: '#16a34a', color: '#fff' }
                              : { background: '#fff', borderColor: '#d1d5db', color: '#6b7280' }
                            }
                          >
                            ✓ Yes
                          </button>
                          <button
                            onClick={() => setAnswer(section.id, qi, 'no')}
                            className="px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-all duration-150"
                            style={ans === 'no'
                              ? { background: '#dc2626', borderColor: '#dc2626', color: '#fff' }
                              : { background: '#fff', borderColor: '#d1d5db', color: '#6b7280' }
                            }
                          >
                            ✕ No
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Score footer */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#f8fafc', borderTop: '2px solid #f1f5f9' }}>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{section.scoreLabel}</p>
                    {complete && rating
                      ? <p className="text-sm font-black mt-1" style={{ color: rating.color }}>{rating.label}</p>
                      : <p className="text-gray-300 text-sm font-semibold mt-1">Answer all 4 to see score</p>
                    }
                  </div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0"
                    style={complete && rating
                      ? { background: rating.light, border: `2px solid ${rating.border}`, color: rating.color }
                      : { background: '#f1f5f9', border: '2px solid #e2e8f0', color: '#cbd5e1' }
                    }
                  >
                    {complete ? score : '—'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Score */}
        {allAnswered && (
          <div className="mt-6 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            <div className="px-8 py-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, rgb(30,17,56) 0%, #4b4ba3 100%)' }}>
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: getRating(roundedTotal).light, border: `3px solid ${getRating(roundedTotal).border}` }}
              >
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

        {/* Rating Scale */}
        <div className="mt-6 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-6 py-5" style={{ background: 'rgb(30,17,56)' }}>
            <p className="text-yellow-400 text-[11px] font-black uppercase tracking-widest mb-1">Reference</p>
            <h3 className="text-white text-lg font-black">Rating Scale</h3>
          </div>
          {([0, 25, 50, 75, 100] as const).map((s, i) => {
            const r = RATINGS[s];
            return (
              <div key={s} className="px-6 py-4 flex gap-5 items-start" style={{ borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                <div className="flex-shrink-0 w-16 pt-0.5">
                  <span className="text-2xl font-black" style={{ color: r.color }}>{s}</span>
                  <p className="text-gray-400 text-xs font-semibold">/100</p>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-black mb-1" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{getMessage(s)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="mt-6 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <div className="px-6 py-5" style={{ background: 'rgb(30,17,56)' }}>
            <h3 className="text-white text-lg font-black">Next Steps</h3>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-gray-700 text-base font-medium leading-relaxed">
              Wherever you have landed on the scale, this is not where the story ends — it is where the work begins.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-5 border-2 border-orange-100 bg-orange-50">
                <p className="text-orange-700 font-black text-base mb-2">Scored 75 and below?</p>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">Your next step is a focused remediation conversation. We help you identify exactly which gaps to close first, in what order, without overwhelming you.</p>
              </div>
              <div className="rounded-xl p-5 border-2 border-green-100 bg-green-50">
                <p className="text-green-700 font-black text-base mb-2">Scored 100?</p>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">Great work. Let us help you maintain and sharpen that compliance posture as regulations evolve. The landscape does not stand still.</p>
              </div>
            </div>
            <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgb(30,17,56) 0%, #4b4ba3 100%)' }}>
              <p className="text-white font-black text-lg mb-2">Ready to close those gaps?</p>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-5">
                Whether you scored 10 or 90, there is a clear path forward. Mustarred Africa builds roadmaps, not lectures. Send us your score and we'll reach out with a practical, no-fluff remediation plan.
              </p>
              <a
                href="mailto:info@mustarred.com?subject=Regulatory Readiness Check — ATE2026"
                className="inline-flex items-center gap-2 text-gray-900 font-black text-sm px-6 py-3 rounded-xl transition-colors hover:bg-yellow-300"
                style={{ background: '#facc15' }}
              >
                Email us: info@mustarred.com →
              </a>
              <p className="text-white/40 text-xs font-medium mt-4">
                Visit <a href="https://mustarred.com" className="text-yellow-400 underline">mustarred.com</a> or speak to our team at the Mustarred Africa stand.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="mt-4 mb-10 rounded-xl px-5 py-4 bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">
            <strong className="text-gray-700 font-black">Privacy Notice:</strong> No personal data is retained by Mustarred Africa when you complete this assessment. Where you voluntarily provide contact information, it will be processed in accordance with Mustarred Africa's Privacy Notice at{' '}
            <a href="https://mustarred.com" className="text-[#4b4ba3] underline font-semibold">mustarred.com</a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
