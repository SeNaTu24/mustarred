import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import {
  FormField,
  TextInput,
  TextArea,
  SelectInput,
  QuestionHeader,
  PersonCard,
  AddPersonButton,
  PSCCard,
  DocumentsNotice,
  StepProgress,
} from '@/components/cac/FormComponents';
import { formatEmailMessage } from '@/components/cac/emailFormatter';
import { SICSearch } from '@/components/cac/SICSearch';
import {
  type Country,
  type CACFormData,
  type PersonEntry,
  type PSCEntry,
  EMPTY_PERSON,
  EMPTY_PSC,
  EMPTY_FORM_DATA,
} from '@/components/cac/types';

// ─── EmailJS configuration ────────────────────────────────────────────────────
// Set these in client/.env:
//   VITE_EMAILJS_SERVICE_ID=your_service_id
//   VITE_EMAILJS_TEMPLATE_ID=your_template_id  (template vars: subject, from_name, from_email, message)
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

// ─── Country config ───────────────────────────────────────────────────────────

interface CountryConfig {
  flag: string;
  label: string;
  tagline: string;
  steps: StepDef[];
}

interface StepDef {
  id: string;
  title: string;
}

const NIGERIA_STEPS: StepDef[] = [
  { id: 'applicant', title: 'Your Details' },
  { id: 'company_names', title: 'Company Names' },
  { id: 'company_details', title: 'Company Details' },
  { id: 'address_capital', title: 'Address & Capital' },
  { id: 'directors', title: 'Directors' },
  { id: 'shareholders', title: 'Shareholders' },
  { id: 'secretary', title: 'Company Secretary' },
  { id: 'review', title: 'Review & Submit' },
];

const GHANA_STEPS: StepDef[] = [
  { id: 'applicant', title: 'Your Details' },
  { id: 'company_names', title: 'Company Name' },
  { id: 'company_details', title: 'Company Details' },
  { id: 'directors', title: 'Directors & Secretary' },
  { id: 'shareholders', title: 'Shareholders' },
  { id: 'address_capital', title: 'Address & Capital' },
  { id: 'gipc', title: 'GIPC & Ownership' },
  { id: 'review', title: 'Review & Submit' },
];

const KENYA_STEPS: StepDef[] = [
  { id: 'applicant', title: 'Your Details' },
  { id: 'company_names', title: 'Company Names' },
  { id: 'company_details', title: 'Company Details' },
  { id: 'directors', title: 'Directors & Shareholders' },
  { id: 'address', title: 'Registered Address' },
  { id: 'capital_beneficial', title: 'Capital & Ownership' },
  { id: 'secretary', title: 'Company Secretary' },
  { id: 'review', title: 'Review & Submit' },
];

const UK_STEPS: StepDef[] = [
  { id: 'applicant', title: 'Your Details' },
  { id: 'company_names', title: 'Company Name' },
  { id: 'articles_sic', title: 'Articles & SIC Code' },
  { id: 'directors', title: 'Directors' },
  { id: 'shareholders', title: 'Shareholders & Capital' },
  { id: 'psc_address', title: 'PSC & Address' },
  { id: 'review', title: 'Review & Submit' },
];

const COUNTRIES: Record<Country, CountryConfig> = {
  nigeria: {
    flag: '🇳🇬',
    label: 'Nigeria',
    tagline: 'Register via CAC e-portal · Private Limited, Business Name & more',
    steps: NIGERIA_STEPS,
  },
  ghana: {
    flag: '🇬🇭',
    label: 'Ghana',
    tagline: 'Register via ORC · Companies Act, 2019 (Act 992)',
    steps: GHANA_STEPS,
  },
  kenya: {
    flag: '🇰🇪',
    label: 'Kenya',
    tagline: 'Register via BRS eCitizen · Business Registration Service',
    steps: KENYA_STEPS,
  },
  uk: {
    flag: '🇬🇧',
    label: 'United Kingdom',
    tagline: 'Register via Companies House · England & Wales, Scotland, N. Ireland',
    steps: UK_STEPS,
  },
};

// ─── ID options per country ───────────────────────────────────────────────────

const ID_OPTIONS: Record<Country, { value: string; label: string }[]> = {
  nigeria: [
    { value: 'international_passport', label: 'International Passport' },
    { value: 'nin_card', label: 'NIN Card' },
    { value: 'drivers_licence', label: "Driver's Licence" },
  ],
  ghana: [
    { value: 'voters_card', label: 'Ghana Voters Card' },
    { value: 'national_id', label: 'National Identity Card' },
    { value: 'driving_licence', label: 'Driving Licence' },
  ],
  kenya: [
    { value: 'national_id', label: 'National ID (Citizens)' },
    { value: 'passport', label: 'Passport (Foreigners)' },
  ],
  uk: [
    { value: 'passport', label: 'Passport' },
    { value: 'uk_driving_licence', label: 'UK Driving Licence' },
    { value: 'national_id', label: 'National Identity Card' },
  ],
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validatePersons(
  persons: PersonEntry[],
  role: string,
  opts: { dob?: boolean; nationality?: boolean; shares?: boolean },
): Record<string, string> {
  const errs: Record<string, string> = {};
  persons.forEach((p, i) => {
    const pre = `${role.toLowerCase()}_${i}`;
    if (!p.fullName.trim()) errs[`${pre}_name`] = 'Full name is required';
    if (!p.email.trim()) errs[`${pre}_email`] = 'Email is required';
    else if (!validateEmail(p.email)) errs[`${pre}_email`] = 'Invalid email address';
    if (!p.phone.trim()) errs[`${pre}_phone`] = 'Phone is required';
    if (!p.address.trim()) errs[`${pre}_address`] = 'Address is required';
    if (opts.dob && !p.dateOfBirth) errs[`${pre}_dob`] = 'Date of birth is required';
    if (opts.nationality && !p.nationality?.trim())
      errs[`${pre}_nationality`] = 'Nationality is required';
    if (opts.shares && !p.numberOfShares?.trim())
      errs[`${pre}_shares`] = 'Number of shares is required';
    if (!p.idType) errs[`${pre}_id`] = 'ID type is required';
  });
  return errs;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CACRegistration() {
  const [country, setCountry] = useState<Country | null>(null);
  const [stepIndex, setStepIndex] = useState(0); // 0-based within the country's steps array
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState<CACFormData>(EMPTY_FORM_DATA());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const steps = country ? COUNTRIES[country].steps : [];
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const idOptions = country ? ID_OPTIONS[country] : [];

  const set = useCallback(
    (key: keyof CACFormData, value: unknown) =>
      setFormData((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  // ── Validate current step ──────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!currentStep) return true;

    if (currentStep.id === 'applicant') {
      if (!formData.applicantName.trim()) errs.applicantName = 'Your full name is required';
      if (!formData.applicantEmail.trim()) errs.applicantEmail = 'Your email is required';
      else if (!/[\s@]+@[\s@]+\.[\s@]+$/.test(formData.applicantEmail)) errs.applicantEmail = 'Invalid email address';
      if (!formData.applicantPhone.trim()) errs.applicantPhone = 'Your phone number is required';
    }

    if (currentStep.id === 'company_names') {
      if (!formData.companyName1.trim()) errs.companyName1 = 'First name option is required';
      if (!formData.companyName2.trim()) errs.companyName2 = 'Second name option is required';
      if (country === 'kenya' && !formData.companyName3.trim())
        errs.companyName3 = 'Third name option is required for Kenya';
    }

    if (currentStep.id === 'company_details') {
      if (!formData.companyType.trim()) errs.companyType = 'Company type is required';
      if (!formData.companyObjects.trim()) errs.companyObjects = 'Please describe the business';
    }

    if (currentStep.id === 'address_capital' || currentStep.id === 'address') {
      if (!formData.registeredAddress.trim())
        errs.registeredAddress = 'Registered address is required';
      if (
        (currentStep.id === 'address_capital') &&
        country !== 'kenya' &&
        !formData.shareCapital.trim()
      )
        errs.shareCapital = 'Share capital is required';
    }

    if (currentStep.id === 'directors') {
      const dob = country === 'nigeria';
      const nationality = country === 'kenya' || country === 'uk';
      const dirErrs = validatePersons(formData.directors, 'director', { dob, nationality });
      Object.assign(errs, dirErrs);
    }

    if (currentStep.id === 'shareholders') {
      const shErrs = validatePersons(formData.shareholders, 'shareholder', { shares: true });
      Object.assign(errs, shErrs);

      if (formData.totalShares) {
        const total = parseInt(formData.totalShares, 10);
        const allocated = formData.shareholders.reduce(
          (sum, s) => sum + (parseInt(s.numberOfShares ?? '0', 10) || 0),
          0,
        );
        if (allocated !== total) {
          errs.sharesTotal = `Shares allocated (${allocated.toLocaleString()}) must equal total shares (${total.toLocaleString()}). Difference: ${Math.abs(total - allocated).toLocaleString()}`;
        }
      }
    }

    if (currentStep.id === 'secretary') {
      if (!formData.secretaryOption) {
        errs.secretaryOption = 'Please select an option';
      } else if (formData.secretaryOption === 'own') {
        if (formData.secretaryType === 'individual') {
          if (!formData.secretary.fullName.trim()) errs.secretary_name = 'Secretary name is required';
          if (!formData.secretary.address.trim()) errs.secretary_address = 'Secretary address is required';
        } else if (formData.secretaryType === 'corporate') {
          if (!formData.corporateSecretaryName?.trim()) errs.corpSec_name = 'Company name is required';
          if (!formData.corporateSecretaryAddress?.trim()) errs.corpSec_address = 'Registered address is required';
        }
      }
    }

    if (currentStep.id === 'psc_address' && country === 'uk') {
      if (!formData.registeredAddress.trim())
        errs.registeredAddress = 'Registered address is required';
      if (!formData.registeredEmail?.trim())
        errs.registeredEmail = 'Registered email is required';
      if (!formData.jurisdiction?.trim()) errs.jurisdiction = 'Jurisdiction is required';
    }

    if (currentStep.id === 'capital_beneficial' && country === 'kenya') {
      if (!formData.shareCapital.trim()) errs.shareCapital = 'Share capital is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const goNext = () => {
    if (!validate()) return;
    setDirection(1);
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setDirection(-1);
    setStepIndex((i) => i - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');

    try {
      const message = formatEmailMessage(country!, formData);
      const companyName = formData.companyName1 || 'Unknown';

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'adoyo5348@gmail.com',
          from_name: formData.applicantName,
          from_email: formData.applicantEmail,
          subject: `CAC Registration — ${COUNTRIES[country!].label} — ${companyName}`,
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      // Show the real EmailJS error so it can be diagnosed
      const ejsErr = err as { status?: number; text?: string };
      const detail = ejsErr?.status
        ? ` (${ejsErr.status}: ${ejsErr.text})`
        : err instanceof Error
        ? ` (${err.message})`
        : '';
      setSubmitError(
        `There was a problem sending your application.${detail} Please try again or contact us directly.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Person helpers ─────────────────────────────────────────────────────────

  const updatePerson = (role: 'directors' | 'shareholders', index: number, updated: PersonEntry) => {
    const arr = [...formData[role]];
    arr[index] = updated;
    set(role, arr);
  };

  const addPerson = (role: 'directors' | 'shareholders') => {
    set(role, [...formData[role], EMPTY_PERSON()]);
  };

  const removePerson = (role: 'directors' | 'shareholders', index: number) => {
    const arr = formData[role].filter((_, i) => i !== index);
    set(role, arr);
  };

  const updatePSC = (index: number, updated: PSCEntry) => {
    const arr = [...(formData.pscEntries ?? [])];
    arr[index] = updated;
    set('pscEntries', arr);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Success screen
  // ─────────────────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SimpleNav />
        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
            <p className="text-gray-600 mb-2">
              Thank you, <strong>{formData.applicantName}</strong>. We've received your{' '}
              {COUNTRIES[country!].label} registration application for{' '}
              <strong>{formData.companyName1}</strong>.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Our team will review your details and reach out within <strong>24–48 hours</strong> to
              collect supporting documents and guide you through the next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/"
                className="flex-1 bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                Back to Home
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCountry(null);
                  setStepIndex(0);
                  setFormData(EMPTY_FORM_DATA());
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors text-center"
              >
                Start New Application
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Country selection screen
  // ─────────────────────────────────────────────────────────────────────────────
  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SimpleNav />
        {/* Hero */}
        <div
          className="py-16 px-4 text-center text-white"
          style={{ background: 'linear-gradient(135deg, rgb(30,17,56) 0%, #4b4ba3 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold text-yellow-300 bg-yellow-400/20 px-3 py-1 rounded-full mb-4">
              Company Registration Service
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              We Register Your Company
              <br />
              <span className="text-yellow-300">Across Africa & Beyond</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Tell us about your company and we handle the entire registration process — no back
              and forth, no paperwork headaches.
            </p>
          </motion.div>
        </div>

        {/* Country cards */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
          <h2 className="text-center text-lg font-bold text-gray-900 mb-2">
            Which country are you registering in?
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Select a country to begin your step-by-step application
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {(Object.entries(COUNTRIES) as [Country, CountryConfig][]).map(([code, config]) => (
              <motion.button
                key={code}
                type="button"
                onClick={() => {
                  setCountry(code);
                  setStepIndex(0);
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-[#4b4ba3]/40 p-6 text-left shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{config.flag}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#4b4ba3] transition-colors">
                      {config.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{config.tagline}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#4b4ba3] ml-auto mt-1 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Don't see your country?{' '}
            <a href="/#contact" className="text-[#4b4ba3] underline">
              Contact us
            </a>{' '}
            — we handle registrations in more jurisdictions.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Multi-step form
  // ─────────────────────────────────────────────────────────────────────────────
  const config = COUNTRIES[country];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SimpleNav />

      {/* Compact header bar */}
      <div
        className="px-4 py-4 flex items-center gap-3"
        style={{ background: 'rgb(30,17,56)' }}
      >
        <button
          type="button"
          onClick={() => {
            if (stepIndex === 0) {
              setCountry(null);
            } else {
              goBack();
            }
          }}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.flag}</span>
          <div>
            <p className="text-white text-sm font-semibold leading-none">{config.label} Company Registration</p>
            <p className="text-white/50 text-xs mt-0.5">
              {currentStep?.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* Progress */}
        <StepProgress
          current={stepIndex + 1}
          total={steps.length}
          stepLabel={currentStep?.title ?? ''}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep?.id ?? stepIndex}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              {/* ── Step: Company Names ────────────────────────────────── */}
              {currentStep?.id === 'company_names' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question={
                      country === 'kenya'
                        ? 'What are your three preferred company names?'
                        : 'What are your preferred company names?'
                    }
                    description={
                      country === 'kenya'
                        ? 'Provide three options in order of preference. The BRS will use these to check availability.'
                        : country === 'nigeria'
                        ? 'Submit two proposed names to the CAC in order of preference. Names must comply with CAC naming guidelines.'
                        : 'Provide your preferred name(s). The registrar will verify availability.'
                    }
                  />
                  <FormField
                    label="1st Preferred Name"
                    required
                    hint="Most preferred option"
                    error={errors.companyName1}
                  >
                    <TextInput
                      placeholder="e.g. Apex Fintech Solutions Limited"
                      value={formData.companyName1}
                      onChange={(e) => {
                        set('companyName1', e.target.value);
                        clearError('companyName1');
                      }}
                      error={!!errors.companyName1}
                    />
                  </FormField>
                  <FormField
                    label="2nd Preferred Name"
                    required
                    hint="In case the first is unavailable"
                    error={errors.companyName2}
                  >
                    <TextInput
                      placeholder="e.g. Apex Financial Technologies Limited"
                      value={formData.companyName2}
                      onChange={(e) => {
                        set('companyName2', e.target.value);
                        clearError('companyName2');
                      }}
                      error={!!errors.companyName2}
                    />
                  </FormField>
                  {country === 'kenya' && (
                    <FormField
                      label="3rd Preferred Name"
                      required
                      hint="Final fallback option"
                      error={errors.companyName3}
                    >
                      <TextInput
                        placeholder="e.g. Apex Capital Technologies Limited"
                        value={formData.companyName3}
                        onChange={(e) => {
                          set('companyName3', e.target.value);
                          clearError('companyName3');
                        }}
                        error={!!errors.companyName3}
                      />
                    </FormField>
                  )}
                </div>
              )}

              {/* ── Step: Company Details ──────────────────────────────── */}
              {currentStep?.id === 'company_details' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Tell us about the company."
                    description="This information forms the core of your registration application."
                  />
                  <FormField label="Type of Company" required error={errors.companyType}>
                    <SelectInput
                      value={formData.companyType}
                      onChange={(e) => {
                        set('companyType', e.target.value);
                        clearError('companyType');
                      }}
                      error={!!errors.companyType}
                      placeholder="Select company type"
                      options={
                        country === 'nigeria'
                          ? [
                              { value: 'private_limited', label: 'Private Limited Company (Ltd)' },
                              { value: 'business_name', label: 'Business Name (Sole Proprietorship / Partnership)' },
                              { value: 'public_limited', label: 'Public Limited Company (Plc)' },
                            ]
                          : country === 'ghana'
                          ? [
                              { value: 'private_limited', label: 'Private Limited Company (Ltd)' },
                              { value: 'public_limited', label: 'Public Limited Company' },
                              { value: 'external_company', label: 'External Company' },
                            ]
                          : country === 'kenya'
                          ? [
                              { value: 'private_limited', label: 'Private Company Limited by Shares' },
                              { value: 'public_limited', label: 'Public Company Limited by Shares' },
                              { value: 'unlimited', label: 'Unlimited Company' },
                            ]
                          : [
                              { value: 'private_limited', label: 'Private Limited Company (Ltd)' },
                              { value: 'public_limited', label: 'Public Limited Company (Plc)' },
                              { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
                            ]
                      }
                    />
                  </FormField>

                  <FormField
                    label={
                      country === 'ghana'
                        ? 'Company Constitution / Objectives'
                        : country === 'kenya'
                        ? 'Memorandum — Company Objectives'
                        : 'Objects of the Company'
                    }
                    required
                    hint="Describe what your company will do. Be specific — this forms part of your registration documents."
                    error={errors.companyObjects}
                  >
                    <TextArea
                      rows={4}
                      placeholder="e.g. To provide financial technology solutions including payment processing, digital lending, and financial advisory services to businesses across Africa..."
                      value={formData.companyObjects}
                      onChange={(e) => {
                        set('companyObjects', e.target.value);
                        clearError('companyObjects');
                      }}
                      error={!!errors.companyObjects}
                    />
                  </FormField>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Company Email Address" error={errors.companyEmail}>
                      <TextInput
                        type="email"
                        placeholder="company@example.com"
                        value={formData.companyEmail}
                        onChange={(e) => set('companyEmail', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Company Phone Number" error={errors.companyPhone}>
                      <TextInput
                        type="tel"
                        placeholder="+234 000 000 0000"
                        value={formData.companyPhone}
                        onChange={(e) => set('companyPhone', e.target.value)}
                      />
                    </FormField>
                  </div>

                  {(country === 'kenya' || country === 'uk') && currentStep.id === 'company_details' && false && (
                    // SIC moved to its own step for Kenya/UK
                    null
                  )}
                </div>
              )}

              {/* ── Step: Articles & SIC (UK) ──────────────────────────── */}
              {currentStep?.id === 'articles_sic' && country === 'uk' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Articles of Association & SIC Code"
                    description="Your articles set the internal rules of the company. A SIC code identifies your primary business activity."
                  />
                  <FormField
                    label="Articles of Association"
                    required
                    hint="Most companies adopt Model Articles. Custom articles are needed only if you require specific governance provisions."
                    error={errors.articlesType}
                  >
                    <SelectInput
                      value={formData.articlesType ?? ''}
                      onChange={(e) => {
                        set('articlesType', e.target.value);
                        clearError('articlesType');
                      }}
                      placeholder="Select articles type"
                      options={[
                        { value: 'model', label: 'Adopt Model Articles (recommended for most companies)' },
                        { value: 'custom', label: 'Custom Articles (tailored governance provisions)' },
                      ]}
                    />
                  </FormField>

                  {formData.articlesType === 'custom' && (
                    <FormField
                      label="Custom Articles — Key Provisions"
                      hint="Summarise the key governance provisions you require"
                    >
                      <TextArea
                        rows={3}
                        placeholder="e.g. Enhanced director appointment rights, drag-along/tag-along provisions, weighted voting rights..."
                        value={formData.customArticlesDescription ?? ''}
                        onChange={(e) => set('customArticlesDescription', e.target.value)}
                      />
                    </FormField>
                  )}

                  <FormField
                    label="SIC Code"
                    hint="Standard Industrial Classification code for your primary business activity"
                    error={errors.sicCode}
                  >
                    <SICSearch
                      value={formData.sicCode ?? ''}
                      onChange={(val) => { set('sicCode', val); clearError('sicCode'); }}
                      error={!!errors.sicCode}
                    />
                  </FormField>
                </div>
              )}

              {/* ── Step: Address & Capital ────────────────────────────── */}
              {currentStep?.id === 'address_capital' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Where will the company be registered?"
                    description="Provide the official registered address and your planned share capital."
                  />
                  <FormField
                    label="Registered Office Address"
                    required
                    hint={
                      country === 'ghana'
                        ? 'Physical address in Ghana including digital address (Ghana Post GPS)'
                        : country === 'nigeria'
                        ? 'A physical address in Nigeria to which official CAC correspondence will be delivered'
                        : 'Physical address for official correspondence'
                    }
                    error={errors.registeredAddress}
                  >
                    <TextArea
                      rows={3}
                      placeholder="House/building number, street name, city, state"
                      value={formData.registeredAddress}
                      onChange={(e) => {
                        set('registeredAddress', e.target.value);
                        clearError('registeredAddress');
                      }}
                      error={!!errors.registeredAddress}
                    />
                  </FormField>

                  {country === 'ghana' && (
                    <FormField
                      label="Ghana Post GPS Digital Address"
                      hint="e.g. GA-123-4567"
                      error={errors.digitalAddress}
                    >
                      <TextInput
                        placeholder="e.g. GA-123-4567"
                        value={formData.digitalAddress ?? ''}
                        onChange={(e) => set('digitalAddress', e.target.value)}
                      />
                    </FormField>
                  )}

                  {country !== 'kenya' && (
                    <>
                      <FormField
                        label="Total Number of Shares"
                        required
                        hint="Total shares to be issued across all shareholders"
                        error={errors.totalShares}
                      >
                        <TextInput
                          type="number"
                          placeholder="e.g. 1000000"
                          value={formData.totalShares ?? ''}
                          onChange={(e) => {
                            set('totalShares', e.target.value);
                            clearError('totalShares');
                          }}
                          error={!!errors.totalShares}
                        />
                      </FormField>

                      <FormField
                        label="Authorised Share Capital"
                        required
                        hint={
                          country === 'nigeria'
                            ? 'Minimum ₦100,000 for local companies; ₦10,000,000 for foreign-owned'
                            : country === 'ghana'
                            ? 'No minimum for local companies; USD 500,000 for wholly foreign-owned (GIPC)'
                            : 'Stated share capital'
                        }
                        error={errors.shareCapital}
                      >
                        <TextInput
                          placeholder={country === 'nigeria' ? 'e.g. ₦1,000,000' : 'e.g. GHS 50,000'}
                          value={formData.shareCapital}
                          onChange={(e) => {
                            set('shareCapital', e.target.value);
                            clearError('shareCapital');
                          }}
                          error={!!errors.shareCapital}
                        />
                      </FormField>

                      <FormField label="Ownership Type" required>
                        <SelectInput
                          value={formData.ownershipType}
                          onChange={(e) => set('ownershipType', e.target.value)}
                          options={[
                            { value: 'local', label: 'Locally Owned' },
                            { value: 'foreign', label: 'Foreign Owned' },
                            { value: 'joint_venture', label: 'Joint Venture (Local + Foreign)' },
                          ]}
                        />
                      </FormField>
                    </>
                  )}
                </div>
              )}

              {/* ── Step: Address (Kenya standalone) ──────────────────── */}
              {currentStep?.id === 'address' && country === 'kenya' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="What is the company's registered address in Kenya?"
                    description="Provide both the physical and postal address for official correspondence."
                  />
                  <FormField
                    label="Physical / Street Address"
                    required
                    hint="Street name, building name/number, town"
                    error={errors.registeredAddress}
                  >
                    <TextArea
                      rows={2}
                      placeholder="e.g. 14 Westlands Road, Nairobi, Kenya"
                      value={formData.registeredAddress}
                      onChange={(e) => {
                        set('registeredAddress', e.target.value);
                        clearError('registeredAddress');
                      }}
                      error={!!errors.registeredAddress}
                    />
                  </FormField>
                  <FormField label="Postal Address" hint="P.O. Box number, if applicable">
                    <TextInput
                      placeholder="e.g. P.O. Box 12345, Nairobi 00100"
                      value={formData.postalAddress ?? ''}
                      onChange={(e) => set('postalAddress', e.target.value)}
                    />
                  </FormField>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Company Email" required error={errors.companyEmail}>
                      <TextInput
                        type="email"
                        placeholder="company@example.com"
                        value={formData.companyEmail}
                        onChange={(e) => set('companyEmail', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Company Phone" required error={errors.companyPhone}>
                      <TextInput
                        type="tel"
                        placeholder="+254 700 000000"
                        value={formData.companyPhone}
                        onChange={(e) => set('companyPhone', e.target.value)}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* ── Step: Capital & Beneficial Ownership (Kenya) ───────── */}
              {currentStep?.id === 'capital_beneficial' && country === 'kenya' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Share structure and beneficial ownership"
                    description="Declare your company's share capital structure and identify who ultimately owns or controls the company."
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Share Classes" hint="e.g. Ordinary Shares, Preference Shares">
                      <TextInput
                        placeholder="e.g. Ordinary"
                        value={formData.shareClasses ?? ''}
                        onChange={(e) => set('shareClasses', e.target.value)}
                      />
                    </FormField>
                    <FormField label="Nominal Value Per Share" hint="e.g. KES 10">
                      <TextInput
                        placeholder="e.g. KES 10"
                        value={formData.nominalValuePerShare ?? ''}
                        onChange={(e) => set('nominalValuePerShare', e.target.value)}
                      />
                    </FormField>
                    <FormField
                      label="Total Proposed Share Capital"
                      required
                      hint="Total value of all shares"
                      error={errors.shareCapital}
                    >
                      <TextInput
                        placeholder="e.g. KES 1,000,000"
                        value={formData.shareCapital}
                        onChange={(e) => {
                          set('shareCapital', e.target.value);
                          clearError('shareCapital');
                        }}
                        error={!!errors.shareCapital}
                      />
                    </FormField>
                    <FormField label="SIC Code" hint="Primary business activity code from BRS portal">
                      <TextInput
                        placeholder="e.g. 6499"
                        value={formData.sicCode ?? ''}
                        onChange={(e) => set('sicCode', e.target.value)}
                      />
                    </FormField>
                  </div>
                  <FormField
                    label="Beneficial Ownership Information"
                    hint="Name the natural person(s) who ultimately own or exercise control over the company — per the 2024 BRS Beneficial Ownership Directive"
                  >
                    <TextArea
                      rows={3}
                      placeholder="e.g. John Mwangi Kamau (Kenyan, ID No. 12345678) holds 60% of shares and exercises majority control."
                      value={formData.beneficialOwnership ?? ''}
                      onChange={(e) => set('beneficialOwnership', e.target.value)}
                    />
                  </FormField>
                </div>
              )}

              {/* ── Step: Directors ────────────────────────────────────── */}
              {currentStep?.id === 'directors' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question={
                      country === 'kenya'
                        ? 'Who are the directors and shareholders?'
                        : 'Who are the directors of this company?'
                    }
                    description={
                      country === 'nigeria'
                        ? 'A minimum of one director is required. Provide full particulars for each.'
                        : country === 'ghana'
                        ? 'An LLC requires a minimum of two directors, at least one of whom must be a Ghanaian resident.'
                        : country === 'kenya'
                        ? 'Provide particulars for each director and shareholder. Each shareholder must hold at least one share.'
                        : 'Since 18 Nov 2025, identity verification via GOV.UK One Login is mandatory for all directors. Our team will guide you through this.'
                    }
                  />
                  {formData.directors.map((director, i) => (
                    <PersonCard
                      key={director.id}
                      role="Director"
                      index={i}
                      person={director}
                      onChange={(updated) => updatePerson('directors', i, updated)}
                      onRemove={() => removePerson('directors', i)}
                      canRemove={formData.directors.length > 1}
                      showDob={country === 'nigeria'}
                      showGender={country === 'nigeria'}
                      showOccupation={country === 'ghana' || country === 'kenya' || country === 'uk'}
                      showNationality={country === 'kenya' || country === 'uk'}
                      showTaxPin={country === 'ghana' || country === 'kenya'}
                      showServiceAddress={country === 'uk'}
                      idOptions={idOptions}
                      errors={errors}
                    />
                  ))}
                  <AddPersonButton
                    label="Add Another Director"
                    onClick={() => addPerson('directors')}
                  />

                  {country === 'kenya' && (
                    <>
                      <div className="border-t border-gray-100 pt-5">
                        <h3 className="font-semibold text-gray-800 mb-1">Shareholders</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Each shareholder must hold at least one share. Provide KRA PIN where available.
                        </p>
                      </div>
                      {formData.shareholders.map((sh, i) => (
                        <PersonCard
                          key={sh.id}
                          role="Shareholder"
                          index={i}
                          person={sh}
                          onChange={(updated) => updatePerson('shareholders', i, updated)}
                          onRemove={() => removePerson('shareholders', i)}
                          canRemove={formData.shareholders.length > 1}
                          showNationality
                          showTaxPin
                          showShares
                          idOptions={idOptions}
                          errors={errors}
                        />
                      ))}
                      <AddPersonButton
                        label="Add Another Shareholder"
                        onClick={() => addPerson('shareholders')}
                      />
                    </>
                  )}

                  {country === 'ghana' && (
                    <>
                      <div className="border-t border-gray-100 pt-5">
                        <h3 className="font-semibold text-gray-800 mb-1">Company Secretary</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Every limited liability company must appoint a secretary.
                        </p>
                      </div>
                      <PersonCard
                        role="Secretary"
                        index={0}
                        person={formData.secretary}
                        onChange={(updated) => set('secretary', updated)}
                        canRemove={false}
                        showOccupation
                        showTaxPin
                        showQualification
                        idOptions={idOptions}
                        errors={errors}
                      />
                    </>
                  )}
                </div>
              )}

              {/* ── Step: Shareholders ────────────────────────────────── */}
              {currentStep?.id === 'shareholders' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question={
                      country === 'uk'
                        ? 'Who are the shareholders and what is the share capital?'
                        : 'Who are the shareholders / subscribers?'
                    }
                    description={
                      country === 'ghana'
                        ? 'Foreign shareholders must declare beneficial ownership and satisfy minimum capital requirements under the GIPC Act.'
                        : country === 'uk'
                        ? 'At least one shareholder is required. Also declare the statement of capital.'
                        : 'A director may also be a shareholder.'
                    }
                  />
                  {formData.shareholders.map((sh, i) => (
                    <PersonCard
                      key={sh.id}
                      role="Shareholder"
                      index={i}
                      person={sh}
                      onChange={(updated) => updatePerson('shareholders', i, updated)}
                      onRemove={() => removePerson('shareholders', i)}
                      canRemove={formData.shareholders.length > 1}
                      showNationality={country === 'ghana' || country === 'uk'}
                      showShares
                      showSharesPercentage
                      idOptions={idOptions}
                      errors={errors}
                    />
                  ))}
                  <AddPersonButton
                    label="Add Another Shareholder"
                    onClick={() => addPerson('shareholders')}
                  />

                  {/* Shares tally */}
                  {formData.totalShares && (() => {
                    const total = parseInt(formData.totalShares, 10);
                    const allocated = formData.shareholders.reduce(
                      (sum, s) => sum + (parseInt(s.numberOfShares ?? '0', 10) || 0), 0
                    );
                    const remaining = total - allocated;
                    const tallied = remaining === 0;
                    return (
                      <div className={`rounded-xl p-4 text-sm ${
                        tallied ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
                      }`}>
                        <div className="flex justify-between font-semibold">
                          <span className={tallied ? 'text-green-700' : 'text-amber-700'}>
                            {tallied ? '✓ Shares tally correctly' : 'Shares not yet balanced'}
                          </span>
                          <span className={tallied ? 'text-green-700' : 'text-amber-700'}>
                            {allocated.toLocaleString()} / {total.toLocaleString()}
                          </span>
                        </div>
                        {!tallied && (
                          <p className="text-amber-600 text-xs mt-1">
                            {remaining > 0
                              ? `${remaining.toLocaleString()} shares still unallocated`
                              : `Over-allocated by ${Math.abs(remaining).toLocaleString()} shares`}
                          </p>
                        )}
                      </div>
                    );
                  })()}

                  {errors.sharesTotal && (
                    <p className="text-red-500 text-xs">{errors.sharesTotal}</p>
                  )}

                  {country === 'ghana' && (
                    <FormField
                      label="Beneficial Ownership Declaration"
                      hint="Identify the natural person(s) who ultimately own or control the company (required for ORC registration)"
                    >
                      <TextArea
                        rows={3}
                        placeholder="e.g. John Mensah (Ghanaian citizen) ultimately owns and controls 70% of the company through direct shareholding."
                        value={formData.beneficialOwnership ?? ''}
                        onChange={(e) => set('beneficialOwnership', e.target.value)}
                      />
                    </FormField>
                  )}

                  {country === 'uk' && (
                    <>
                      <div className="border-t border-gray-100 pt-5 space-y-4">
                        <h3 className="font-semibold text-gray-800">Statement of Capital</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            label="Share Class"
                            hint="e.g. Ordinary"
                          >
                            <TextInput
                              placeholder="e.g. Ordinary"
                              value={formData.shareClasses ?? ''}
                              onChange={(e) => set('shareClasses', e.target.value)}
                            />
                          </FormField>
                          <FormField label="Nominal Value Per Share" hint="e.g. £0.01">
                            <TextInput
                              placeholder="e.g. £0.01"
                              value={formData.nominalValuePerShare ?? ''}
                              onChange={(e) => set('nominalValuePerShare', e.target.value)}
                            />
                          </FormField>
                          <FormField
                            label="Total Share Capital"
                            required
                            error={errors.shareCapital}
                          >
                            <TextInput
                              placeholder="e.g. £1,000"
                              value={formData.shareCapital}
                              onChange={(e) => {
                                set('shareCapital', e.target.value);
                                clearError('shareCapital');
                              }}
                              error={!!errors.shareCapital}
                            />
                          </FormField>
                          <FormField label="Ownership Type">
                            <SelectInput
                              value={formData.ownershipType}
                              onChange={(e) => set('ownershipType', e.target.value)}
                              options={[
                                { value: 'local', label: 'UK Owned' },
                                { value: 'foreign', label: 'Foreign Owned' },
                                { value: 'joint_venture', label: 'Mixed Ownership' },
                              ]}
                            />
                          </FormField>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── Step: Secretary ───────────────────────────────────── */}
              {currentStep?.id === 'secretary' && country !== 'ghana' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Who is the Company Secretary?"
                    description={
                      country === 'nigeria'
                        ? 'Every limited liability company must appoint a secretary. Provide their full particulars.'
                        : 'Provide the company secretary details.'
                    }
                  />

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Would you like Mustarred to act as your Company Secretary?
                    </p>
                    <p className="text-xs text-gray-500">
                      We offer professional company secretarial services — we handle statutory filings, compliance records, and all CAC correspondence on your behalf.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { set('secretaryOption', 'mustarred'); clearError('secretaryOption'); }}
                        className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                          formData.secretaryOption === 'mustarred'
                            ? 'border-[#4b4ba3] bg-[#4b4ba3]/5'
                            : 'border-gray-200 hover:border-[#4b4ba3]/40'
                        }`}
                      >
                        <p className="font-semibold text-sm text-gray-900">Yes, use Mustarred</p>
                        <p className="text-xs text-gray-500 mt-1">Our team will serve as your company secretary</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => { set('secretaryOption', 'own'); clearError('secretaryOption'); }}
                        className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                          formData.secretaryOption === 'own'
                            ? 'border-[#4b4ba3] bg-[#4b4ba3]/5'
                            : 'border-gray-200 hover:border-[#4b4ba3]/40'
                        }`}
                      >
                        <p className="font-semibold text-sm text-gray-900">No, I have a secretary</p>
                        <p className="text-xs text-gray-500 mt-1">I'll provide their details below</p>
                      </button>
                    </div>
                    {errors.secretaryOption && (
                      <p className="text-red-500 text-xs">{errors.secretaryOption}</p>
                    )}
                  </div>

                  {formData.secretaryOption === 'own' && (
                    <div className="space-y-4">
                      {/* Individual or Corporate toggle */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Is the secretary an individual or a company?</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => set('secretaryType', 'individual')}
                            className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                              formData.secretaryType === 'individual'
                                ? 'border-[#4b4ba3] bg-[#4b4ba3]/5'
                                : 'border-gray-200 hover:border-[#4b4ba3]/40'
                            }`}
                          >
                            <p className="font-semibold text-sm text-gray-900">Individual</p>
                            <p className="text-xs text-gray-500 mt-1">A natural person</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => set('secretaryType', 'corporate')}
                            className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                              formData.secretaryType === 'corporate'
                                ? 'border-[#4b4ba3] bg-[#4b4ba3]/5'
                                : 'border-gray-200 hover:border-[#4b4ba3]/40'
                            }`}
                          >
                            <p className="font-semibold text-sm text-gray-900">Corporate Entity</p>
                            <p className="text-xs text-gray-500 mt-1">A registered company</p>
                          </button>
                        </div>
                      </div>

                      {/* Individual secretary form */}
                      {formData.secretaryType === 'individual' && (
                        <PersonCard
                          role="Secretary"
                          index={0}
                          person={formData.secretary}
                          onChange={(updated) => set('secretary', updated)}
                          canRemove={false}
                          showOccupation
                          showQualification
                          idOptions={idOptions}
                          errors={Object.fromEntries(
                            Object.entries(errors).map(([k, v]) => [
                              k.replace('secretary_', 'secretary_0_'),
                              v,
                            ]),
                          )}
                        />
                      )}

                      {/* Corporate secretary form */}
                      {formData.secretaryType === 'corporate' && (
                        <div className="border-2 border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
                          <h4 className="font-semibold text-gray-800 text-sm">Corporate Secretary Details</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <FormField label="Company Name" required error={errors.corpSec_name}>
                              <TextInput
                                placeholder="e.g. Lexbridge Secretaries Ltd"
                                value={formData.corporateSecretaryName ?? ''}
                                onChange={(e) => { set('corporateSecretaryName', e.target.value); clearError('corpSec_name'); }}
                                error={!!errors.corpSec_name}
                              />
                            </FormField>
                            <FormField label="RC Number" hint="CAC registration number">
                              <TextInput
                                placeholder="e.g. RC 123456"
                                value={formData.corporateSecretaryRcNumber ?? ''}
                                onChange={(e) => set('corporateSecretaryRcNumber', e.target.value)}
                              />
                            </FormField>
                            <FormField label="Email Address">
                              <TextInput
                                type="email"
                                placeholder="secretary@example.com"
                                value={formData.corporateSecretaryEmail ?? ''}
                                onChange={(e) => set('corporateSecretaryEmail', e.target.value)}
                              />
                            </FormField>
                            <FormField label="Phone Number">
                              <TextInput
                                type="tel"
                                placeholder="+234 800 000 0000"
                                value={formData.corporateSecretaryPhone ?? ''}
                                onChange={(e) => set('corporateSecretaryPhone', e.target.value)}
                              />
                            </FormField>
                          </div>
                          <FormField label="Registered Address" required error={errors.corpSec_address}>
                            <TextArea
                              placeholder="Registered office address of the corporate secretary"
                              value={formData.corporateSecretaryAddress ?? ''}
                              onChange={(e) => { set('corporateSecretaryAddress', e.target.value); clearError('corpSec_address'); }}
                              error={!!errors.corpSec_address}
                              rows={2}
                            />
                          </FormField>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── Step: GIPC & Ownership (Ghana) ────────────────────── */}
              {currentStep?.id === 'gipc' && country === 'ghana' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="GIPC Registration & Ownership Details"
                    description="Companies with foreign participation must register with the Ghana Investment Promotion Centre (GIPC) before commencing operations."
                  />
                  <FormField
                    label="Does this company have foreign participation?"
                    required
                    error={errors.requiresGIPC}
                  >
                    <SelectInput
                      value={formData.requiresGIPC ?? ''}
                      onChange={(e) => {
                        set('requiresGIPC', e.target.value);
                        clearError('requiresGIPC');
                      }}
                      placeholder="Select an option"
                      options={[
                        { value: 'no', label: 'No — entirely locally owned' },
                        { value: 'yes_joint', label: 'Yes — joint venture (local + foreign, min USD 200,000)' },
                        { value: 'yes_foreign', label: 'Yes — wholly foreign-owned (min USD 500,000)' },
                      ]}
                    />
                  </FormField>
                  <FormField label="Stated Capital" required error={errors.shareCapital}>
                    <TextInput
                      placeholder="e.g. GHS 100,000 or USD 500,000"
                      value={formData.shareCapital}
                      onChange={(e) => {
                        set('shareCapital', e.target.value);
                        clearError('shareCapital');
                      }}
                      error={!!errors.shareCapital}
                    />
                  </FormField>
                  <FormField
                    label="Additional Notes (Optional)"
                    hint="Any other details relevant to your registration"
                  >
                    <TextArea
                      rows={3}
                      placeholder="e.g. We plan to commence operations in Q1 2025..."
                      value={formData.additionalNotes ?? ''}
                      onChange={(e) => set('additionalNotes', e.target.value)}
                    />
                  </FormField>
                </div>
              )}

              {/* ── Step: PSC & Address (UK) ───────────────────────────── */}
              {currentStep?.id === 'psc_address' && country === 'uk' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="People with Significant Control & Registered Office"
                    description="UK law requires you to register anyone who holds more than 25% of shares or voting rights, or otherwise exercises significant control."
                  />

                  <h3 className="font-semibold text-gray-800 text-sm">
                    PSC Register{' '}
                    <span className="text-gray-400 font-normal">
                      — persons holding &gt;25% control
                    </span>
                  </h3>
                  {(formData.pscEntries ?? []).map((psc, i) => (
                    <PSCCard
                      key={psc.id}
                      index={i}
                      psc={psc}
                      onChange={(updated) => updatePSC(i, updated)}
                      onRemove={() => {
                        const arr = (formData.pscEntries ?? []).filter((_, idx) => idx !== i);
                        set('pscEntries', arr);
                      }}
                      canRemove={(formData.pscEntries ?? []).length > 1}
                      errors={errors}
                    />
                  ))}
                  <AddPersonButton
                    label="Add Another PSC"
                    onClick={() =>
                      set('pscEntries', [...(formData.pscEntries ?? []), EMPTY_PSC()])
                    }
                  />

                  <div className="border-t border-gray-100 pt-5 space-y-4">
                    <h3 className="font-semibold text-gray-800 text-sm">Registered Office</h3>
                    <FormField
                      label="Registered Office Address (UK)"
                      required
                      hint="Must be a physical UK address — not a PO Box. Must be in the same jurisdiction as the company."
                      error={errors.registeredAddress}
                    >
                      <TextArea
                        rows={2}
                        placeholder="e.g. 42 High Street, Manchester, M1 1AB, England"
                        value={formData.registeredAddress}
                        onChange={(e) => {
                          set('registeredAddress', e.target.value);
                          clearError('registeredAddress');
                        }}
                        error={!!errors.registeredAddress}
                      />
                    </FormField>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        label="Registered Email Address"
                        required
                        hint="Mandatory since March 2024"
                        error={errors.registeredEmail}
                      >
                        <TextInput
                          type="email"
                          placeholder="company@example.co.uk"
                          value={formData.registeredEmail ?? ''}
                          onChange={(e) => {
                            set('registeredEmail', e.target.value);
                            clearError('registeredEmail');
                          }}
                          error={!!errors.registeredEmail}
                        />
                      </FormField>

                      <FormField
                        label="Jurisdiction"
                        required
                        hint="Country within the UK where the company is registered"
                        error={errors.jurisdiction}
                      >
                        <SelectInput
                          value={formData.jurisdiction ?? ''}
                          onChange={(e) => {
                            set('jurisdiction', e.target.value);
                            clearError('jurisdiction');
                          }}
                          error={!!errors.jurisdiction}
                          placeholder="Select jurisdiction"
                          options={[
                            { value: 'england_wales', label: 'England & Wales' },
                            { value: 'scotland', label: 'Scotland' },
                            { value: 'northern_ireland', label: 'Northern Ireland' },
                          ]}
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step: Review & Submit ─────────────────────────────── */}
              {currentStep?.id === 'review' && (
                <div className="space-y-5">
                  <QuestionHeader
                    question="Review your application before submitting."
                    description="Please check that all the details below are correct. Once submitted, our team will begin processing your registration."
                  />

                  <ReviewRow label="Country" value={`${config.flag} ${config.label}`} />
                  <ReviewRow label="Company Name (1st choice)" value={formData.companyName1} />
                  {formData.companyName2 && (
                    <ReviewRow label="Company Name (2nd choice)" value={formData.companyName2} />
                  )}
                  {formData.companyName3 && (
                    <ReviewRow label="Company Name (3rd choice)" value={formData.companyName3} />
                  )}
                  <ReviewRow label="Company Type" value={formData.companyType} />
                  <ReviewRow
                    label="Business Objects / Objectives"
                    value={formData.companyObjects}
                    multiline
                  />
                  {formData.registeredAddress && (
                    <ReviewRow label="Registered Address" value={formData.registeredAddress} multiline />
                  )}
                  {formData.shareCapital && (
                    <ReviewRow label="Share Capital" value={formData.shareCapital} />
                  )}
                  {formData.totalShares && (
                    <ReviewRow label="Total Shares" value={Number(formData.totalShares).toLocaleString()} />
                  )}
                  <ReviewRow
                    label="Directors"
                    value={formData.directors
                      .map((d, i) => `${i + 1}. ${d.fullName || '(unnamed)'}`)
                      .join(', ')}
                  />
                  <ReviewRow
                    label="Shareholders"
                    value={formData.shareholders
                      .map((s, i) => `${i + 1}. ${s.fullName || '(unnamed)'}`)
                      .join(', ')}
                  />
                  {(formData.secretaryOption) && (
                    <ReviewRow
                      label="Company Secretary"
                      value={
                        formData.secretaryOption === 'mustarred'
                          ? 'Mustarred (acting as Company Secretary)'
                          : formData.secretaryType === 'corporate'
                          ? `${formData.corporateSecretaryName || '(unnamed)'} — Corporate Secretary`
                          : formData.secretary.fullName
                      }
                    />
                  )}

                  <DocumentsNotice />

                  <FormField label="Additional Notes (Optional)">
                    <TextArea
                      rows={3}
                      placeholder="Anything else you'd like us to know?"
                      value={formData.additionalNotes ?? ''}
                      onChange={(e) => set('additionalNotes', e.target.value)}
                    />
                  </FormField>

                  {submitError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
                      {submitError}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6 gap-3">
          <Button
            variant="outline"
            onClick={stepIndex === 0 ? () => setCountry(null) : goBack}
            className="flex items-center gap-2 px-5"
            disabled={submitting}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] hover:opacity-90 transition-opacity"
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="flex items-center gap-2 px-8 bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] hover:opacity-90 transition-opacity"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SimpleNav() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/assets/brand/logo.png" alt="Mustarred" className="h-20 sm:h-24 w-auto object-contain" />
        </a>
        <a
          href="/#contact"
          className="text-sm font-medium text-[#4b4ba3] border border-[#4b4ba3]/30 px-4 py-2 rounded-lg hover:bg-[#4b4ba3]/5 transition-colors"
        >
          Need Help?
        </a>
      </div>
    </nav>
  );
}

interface ReviewRowProps {
  label: string;
  value?: string;
  multiline?: boolean;
}
function ReviewRow({ label, value, multiline }: ReviewRowProps) {
  if (!value) return null;
  return (
    <div className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-gray-500 w-40 flex-shrink-0 pt-0.5">{label}</span>
      <span className={`text-sm text-gray-900 ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value}
      </span>
    </div>
  );
}
