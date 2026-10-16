import { useState } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, AlertCircle, Shield, FileText, Users } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { trackEvent, trackFormSubmit } from '@/lib/analytics';

interface FormData {
    fullName: string;
    businessName: string;
    businessEmail: string;
    phone: string;
    address: string;
    industry: string;
    website: string;
    dataVolume: "1-200" | "201-999" | "1000+" | "";
    sensitiveData: boolean | null;
    internationalStorage: boolean | null;
    nin: string;
    dataTypes: string[];
    collectionReasons: string[];
    renewalReminders: boolean | null;
}

interface ValidationErrors {
    [key: string]: string;
}

const BRAND = '#4b4ba3';
const BRAND_DARK = '#1e1038';
const BRAND_BG = '#0d0520';

export default function DCMICompliance() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showBigTable, setShowBigTable] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showBackConfirmation, setShowBackConfirmation] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        businessName: "",
        businessEmail: "",
        phone: "",
        address: "",
        industry: "",
        website: "",
        dataVolume: "",
        sensitiveData: null,
        internationalStorage: null,
        nin: "",
        dataTypes: [],
        collectionReasons: [],
        renewalReminders: null,
    });

    const steps = [
        { id: 1, title: 'About You', icon: Users },
        { id: 2, title: 'Quick Check', icon: Shield },
        { id: 3, title: 'Registration Details', icon: FileText },
        { id: 4, title: 'Review & Submit', icon: CheckCircle }
    ];

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);

    const validateField = (field: keyof FormData, value: any) => {
        const newErrors = { ...errors };
        switch (field) {
            case "fullName":
                if (!value || value.trim().length < 2) newErrors[field] = "Full name must be at least 2 characters";
                else if (!/^[a-zA-Z\s]+$/.test(value.trim())) newErrors[field] = "Name should only contain letters and spaces";
                else delete newErrors[field];
                break;
            case "businessName":
                if (!value || value.trim().length < 2) newErrors[field] = "Business name is required";
                else delete newErrors[field];
                break;
            case "businessEmail":
                if (!value) newErrors[field] = "Business email is required";
                else if (!validateEmail(value)) newErrors[field] = "Please enter a valid email address";
                else delete newErrors[field];
                break;
            case "phone":
                if (!value) newErrors[field] = "Phone number is required";
                else if (!validatePhone(value)) newErrors[field] = "Please enter a valid phone number";
                else delete newErrors[field];
                break;
            case "address":
                if (!value || value.trim().length < 10) newErrors[field] = "Please provide a complete address";
                else delete newErrors[field];
                break;
            case "industry":
                if (!value) newErrors[field] = "Please select your industry";
                else delete newErrors[field];
                break;
            case "nin":
                const cleanNin = value.replace(/\D/g, "");
                if (!value) newErrors[field] = "NIN is required";
                else if (cleanNin.length !== 11) newErrors[field] = "NIN must be exactly 11 digits";
                else delete newErrors[field];
                break;
        }
        setErrors(newErrors);
    };

    const validateStep = (step: number): boolean => {
        const newErrors: ValidationErrors = {};
        if (step === 1) {
            ["fullName", "businessName", "businessEmail", "phone", "address", "industry"].forEach((field) => {
                const value = formData[field as keyof FormData];
                if (!value || (typeof value === 'string' && !value.trim())) {
                    newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} is required`;
                }
            });
            if (formData.businessEmail && !validateEmail(formData.businessEmail)) newErrors.businessEmail = "Please enter a valid email address";
            if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number";
        }
        if (step === 2) {
            if (!formData.dataVolume) newErrors.dataVolume = "Please select data volume";
            if (formData.sensitiveData === null) newErrors.sensitiveData = "Please answer this question";
            if (formData.internationalStorage === null) newErrors.internationalStorage = "Please answer this question";
        }
        if (step === 3) {
            if (!formData.nin) newErrors.nin = "NIN is required";
            else if (formData.nin.replace(/\D/g, "").length !== 11) newErrors.nin = "NIN must be exactly 11 digits";
            if (formData.dataTypes.length === 0) newErrors.dataTypes = "Please select at least one data type";
            if (formData.collectionReasons.length === 0) newErrors.collectionReasons = "Please select at least one reason";
            if (formData.renewalReminders === null) newErrors.renewalReminders = "Please answer this question";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const shouldShowBigTable = () => formData.dataVolume === "1000+" || formData.sensitiveData === true;

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 2 && shouldShowBigTable()) {
                sendBigTableEmail();
                setShowBigTable(true);
                return;
            }
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const updateArrayField = (field: "dataTypes" | "collectionReasons", value: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked ? [...prev[field], value] : prev[field].filter(item => item !== value),
        }));
        if (checked && errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const sendBigTableEmail = async () => {
        try {
            await fetch("https://formsubmit.co/solusesi03@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: "HIGH PRIORITY: Big Table DCMI Lead",
                    _captcha: "false",
                    PRIORITY: "🚨 BIG TABLE LEAD",
                    Name: formData.fullName,
                    Business: formData.businessName,
                    Email: formData.businessEmail,
                    Phone: formData.phone,
                    "Data Volume": formData.dataVolume,
                    "Sensitive Data": formData.sensitiveData ? "Yes" : "No",
                }),
            });
        } catch (error) {
            console.error("Big Table email failed:", error);
        }
    };

    const handleSubmit = async () => {
        trackFormSubmit('DCMI Registration');
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const result = await fetch("https://formsubmit.co/solusesi03@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _subject: "DCMI Registration - Form Submitted",
                    _captcha: "false",
                    STATUS: "📋 FORM SUBMITTED",
                    Name: formData.fullName,
                    Business: formData.businessName,
                    Email: formData.businessEmail,
                    Phone: formData.phone,
                    Address: formData.address,
                    Industry: formData.industry,
                    Website: formData.website || "Not provided",
                    NIN: formData.nin,
                    "Data Volume": formData.dataVolume,
                    "Sensitive Data": formData.sensitiveData ? "Yes" : "No",
                    "International Storage": formData.internationalStorage ? "Yes" : "No",
                    "Data Types": formData.dataTypes.join(", "),
                    "Collection Reasons": formData.collectionReasons.join(", "),
                    "Renewal Reminders": formData.renewalReminders ? "Yes, send reminders" : "No",
                    Date: new Date().toLocaleDateString(),
                }),
            });
            if (result.ok) {
                setTimeout(() => { setIsSubmitting(false); setShowThankYou(true); }, 1500);
            } else {
                throw new Error(`HTTP ${result.status}`);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setIsSubmitting(false);
            setSubmitError("Submission failed. Please try again or contact us directly.");
        }
    };

    // ── Shared input class helper ──────────────────────────────────────────────
    const inputCls = (hasError: boolean) =>
        `w-full px-4 py-3 border rounded-lg text-sm text-gray-800 outline-none transition-all duration-150 ${
            hasError
                ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300'
                : 'border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500'
        }`;

    const ErrorMsg = ({ msg }: { msg?: string }) =>
        msg ? (
            <div className="flex items-center gap-1 text-red-600 text-xs mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {msg}
            </div>
        ) : null;

    // ── Thank You Screen ──────────────────────────────────────────────────────
    if (showThankYou) {
        return (
            <div className="min-h-screen flex flex-col" style={{ background: BRAND_BG }}>
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${BRAND}, #a49fe7)` }} />
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#f0fdf4' }}>
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Registration Submitted!</h1>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Thank you for submitting your DCMI/DCPMI registration. Our team will review your details and reach out to you shortly with next steps.
                            </p>
                            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                                <p className="text-sm font-semibold text-gray-700 mb-3">What happens next:</p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {[
                                        "DCMI/DCPMI Registration Certificate (5 working days)",
                                        "Tailored Privacy Notice for your business",
                                        "Data Processing Agreement (DPA)",
                                        "Cookie Policy",
                                        "Data Retention Policy",
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-3 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ background: BRAND }}
                            >
                                Return to Homepage
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // ── Big Table Screen ──────────────────────────────────────────────────────
    if (showBigTable) {
        return (
            <div className="min-h-screen flex flex-col" style={{ background: BRAND_BG }}>
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${BRAND}, #a49fe7)` }} />
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: '#ede9fe' }}>
                                🎉
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Welcome to the big table!</h1>
                            <p className="text-gray-500 mb-4 leading-relaxed">
                                Your business is operating at a level where the NDPC requires additional compliance steps such as a Compliance Audit Return (CAR).
                            </p>
                            <p className="text-gray-500 mb-8 text-sm">
                                This is a great sign; it means your business is growing and handling data on a larger scale.
                            </p>
                            <div className="rounded-xl p-5 mb-8 text-sm font-medium text-left" style={{ background: '#ede9fe', color: BRAND_DARK }}>
                                Our team will reach out within one business day to guide you through your specific requirements and provide a tailored compliance plan.
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                    style={{ background: BRAND }}
                                >
                                    Return to Homepage
                                </button>
                                <button
                                    onClick={() => setShowBackConfirmation(true)}
                                    className="px-8 py-3 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showBackConfirmation && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Return to Form?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to go back? Your progress will be saved and you can modify your responses.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowBackConfirmation(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { setShowBackConfirmation(false); setShowBigTable(false); setCurrentStep(1); }}
                                    className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                                    style={{ background: BRAND }}
                                >
                                    Yes, Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        );
    }

    // ── Main Return ───────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#f5f4fb' }}>
            <div className="flex-1 py-8 px-4">
                <div className="max-w-3xl mx-auto">

                    {/* Back button + page title */}
                    <div className="mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-5"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-1 h-7 rounded-full" style={{ background: BRAND }} />
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">DCMI/DCPMI Registration</h1>
                        </div>
                        <p className="text-sm text-gray-400 ml-4">Complete your Nigeria Data Protection Act compliance registration</p>
                    </div>

                    {/* ── Welcome Screen ── */}
                    {currentStep === 0 && (
                        <div>
                            {/* Hero banner */}
                            <div
                                className="rounded-2xl px-8 py-12 mb-6 relative overflow-hidden"
                                style={{ background: `radial-gradient(ellipse at 20% 50%, #2a1a4a 0%, #1a0d33 60%, ${BRAND_BG} 100%)` }}
                            >
                                {/* decorative ring */}
                                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10" style={{ border: `2px solid #a49fe7` }} />
                                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10" style={{ border: `2px solid #a49fe7` }} />

                                <div className="relative z-10 max-w-2xl">
                                    <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{ background: 'rgba(164,159,231,0.15)', color: '#a49fe7' }}>
                                        NDPA 2023 · GAID 2025
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">🎉 Congratulations!</h2>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        You have taken the first step toward being compliant with the Nigeria Data Protection Act (NDPA) 2023 and the General Application and Implementation Directive (GAID) 2025.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        Completing this quick form will serve as a vehicle to help you meet your compliance obligation to register as a Data Controller/Processor of Major Importance (DCMI/DCPMI) if you have processed over 200 personal data in the last 6 months.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        This is also a strong business decision because when customers know their data is protected, they maintain loyalty to your business, and you maintain a predictable scale.
                                    </p>
                                </div>
                            </div>

                            {/* Deliverables + CTA card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">What you'll receive</p>
                                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                    {[
                                        "Your DCMI/DCPMI Registration Certificate (within 5 working days)",
                                        "A tailored Privacy Notice for your business",
                                        "A Data Processing Agreement (DPA) to sign with your partners",
                                        "Cookie Policy",
                                        "Data Retention Policy",
                                    ].map(item => (
                                        <div key={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#f5f4fb' }}>
                                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                                            <span className="text-base text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">Let's begin! This takes under 5 minutes.</p>
                                    <button
                                        onClick={() => {
                                            trackEvent('dcmi_start', { event_category: 'conversion', event_label: 'DCMI Registration Start' });
                                            setCurrentStep(1);
                                        }}
                                        className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
                                        style={{ background: BRAND }}
                                    >
                                        Start Registration
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Form Steps ── */}
                    {currentStep > 0 && (
                        <>
                            {/* Progress bar */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    {steps.map((step, index) => {
                                        const isCompleted = currentStep > step.id;
                                        const isActive = currentStep === step.id;
                                        return (
                                            <div key={step.id} className="flex items-center flex-1">
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                                        style={{
                                                            background: isCompleted ? '#22c55e' : isActive ? BRAND : '#e5e7eb',
                                                            color: isCompleted || isActive ? '#fff' : '#9ca3af',
                                                        }}
                                                    >
                                                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.id}
                                                    </div>
                                                    <span className="text-xs mt-1 font-medium" style={{ color: isActive ? BRAND : isCompleted ? '#22c55e' : '#9ca3af' }}>
                                                        {step.title}
                                                    </span>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className="flex-1 h-0.5 mx-2 mb-4 rounded" style={{ background: isCompleted ? '#22c55e' : '#e5e7eb' }} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Form card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                    <div className="w-1 h-6 rounded-full" style={{ background: BRAND }} />
                                    <h2 className="font-semibold text-gray-800">{steps.find(s => s.id === currentStep)?.title}</h2>
                                    <span className="ml-auto text-xs text-gray-400">Step {currentStep} of {steps.length}</span>
                                </div>

                                <div className="p-6 sm:p-8">

                                {/* Step 1 */}
                                {currentStep === 1 && (
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Full Name *</label>
                                            <input type="text" value={formData.fullName} onChange={e => updateFormData("fullName", e.target.value)} placeholder="Enter your full name" className={inputCls(!!errors.fullName)} />
                                            <ErrorMsg msg={errors.fullName} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Business / Brand Name *</label>
                                            <input type="text" value={formData.businessName} onChange={e => updateFormData("businessName", e.target.value)} placeholder="Your registered business name" className={inputCls(!!errors.businessName)} />
                                            <ErrorMsg msg={errors.businessName} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Email *</label>
                                            <input type="email" value={formData.businessEmail} onChange={e => updateFormData("businessEmail", e.target.value)} placeholder="business@company.com" className={inputCls(!!errors.businessEmail)} />
                                            <ErrorMsg msg={errors.businessEmail} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                                            <input type="tel" value={formData.phone} onChange={e => updateFormData("phone", e.target.value)} placeholder="e.g. 0800 000 0000" className={inputCls(!!errors.phone)} />
                                            <ErrorMsg msg={errors.phone} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Business Address *</label>
                                            <textarea value={formData.address} onChange={e => updateFormData("address", e.target.value)} placeholder="House number, street, city, LGA, state" className={`${inputCls(!!errors.address)} h-24 resize-none`} />
                                            <ErrorMsg msg={errors.address} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry *</label>
                                            <select value={formData.industry} onChange={e => updateFormData("industry", e.target.value)} className={inputCls(!!errors.industry)}>
                                                <option value="">Select your industry</option>
                                                <option>Fashion / Clothing / Ready-to-wear</option>
                                                <option>Beauty / Skincare</option>
                                                <option>Hair / Wigs</option>
                                                <option>Food & Confectionery</option>
                                                <option>Tech</option>
                                                <option>Other</option>
                                            </select>
                                            <ErrorMsg msg={errors.industry} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website (optional)</label>
                                            <input type="url" value={formData.website} onChange={e => updateFormData("website", e.target.value)} placeholder="https://yourwebsite.com" className={inputCls(false)} />
                                        </div>
                                    </div>
                                )}

                                {/* Step 2 */}
                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">How many people's personal data have you collected in the last 6 months? *</label>
                                            <p className="text-xs text-gray-400 mb-3">(Names, phone numbers, emails, delivery addresses, payment confirmations, etc.)</p>
                                            <div className="space-y-2">
                                                {[{ label: "1–200", val: "1-200" }, { label: "201–999", val: "201-999" }, { label: "1000 and more", val: "1000+" }].map(opt => (
                                                    <label key={opt.val} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.dataVolume === opt.val ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="radio" name="dataVolume" value={opt.val} checked={formData.dataVolume === opt.val} onChange={e => updateFormData("dataVolume", e.target.value)} className="accent-indigo-600" />
                                                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.dataVolume} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Do you handle any sensitive personal data? *</label>
                                            <p className="text-xs text-gray-400 mb-3">(Health information, biometrics, religion, political beliefs, etc.)</p>
                                            <div className="space-y-2">
                                                {[{ label: "No", val: false }, { label: "Yes", val: true }].map(opt => (
                                                    <label key={opt.label} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.sensitiveData === opt.val ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="radio" name="sensitiveData" value={opt.val.toString()} checked={formData.sensitiveData === opt.val} onChange={e => updateFormData("sensitiveData", e.target.value === "true")} className="accent-indigo-600" />
                                                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.sensitiveData} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Do you store or send customer data outside Nigeria? *</label>
                                            <p className="text-xs text-gray-400 mb-3">(e.g., Google Drive, cloud services, foreign servers, some payment processors)</p>
                                            <div className="space-y-2">
                                                {[{ label: "No", val: false }, { label: "Yes", val: true }].map(opt => (
                                                    <label key={opt.label} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.internationalStorage === opt.val ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="radio" name="internationalStorage" value={opt.val.toString()} checked={formData.internationalStorage === opt.val} onChange={e => updateFormData("internationalStorage", e.target.value === "true")} className="accent-indigo-600" />
                                                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.internationalStorage} />
                                        </div>
                                    </div>
                                )}

                                {/* Step 3 */}
                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your NIN (required by NDPC) *</label>
                                            <input type="text" value={formData.nin} onChange={e => updateFormData("nin", e.target.value)} placeholder="Enter your 11-digit NIN" maxLength={11} className={inputCls(!!errors.nin)} />
                                            <ErrorMsg msg={errors.nin} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">What type of customer data do you collect? (Select all that apply) *</label>
                                            <div className="grid sm:grid-cols-2 gap-2 mt-3">
                                                {["Names","Phone numbers","Emails","Delivery addresses","Payment confirmations from payment gateways","WhatsApp chats that include names, contacts, or order details","Other"].map(item => (
                                                    <label key={item} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.dataTypes.includes(item) ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="checkbox" checked={formData.dataTypes.includes(item)} onChange={e => updateArrayField("dataTypes", item, e.target.checked)} className="accent-indigo-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.dataTypes} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Why do you collect customer data? *</label>
                                            <div className="grid sm:grid-cols-2 gap-2 mt-3">
                                                {["To deliver orders","To contact customers","For marketing/promos","For account or order history management","Other"].map(item => (
                                                    <label key={item} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.collectionReasons.includes(item) ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="checkbox" checked={formData.collectionReasons.includes(item)} onChange={e => updateArrayField("collectionReasons", item, e.target.checked)} className="accent-indigo-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.collectionReasons} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Would you like us to remind you about your yearly renewal requirement? *</label>
                                            <p className="text-xs text-gray-400 mb-3">(NDPA/GAID requires yearly renewal for OHL-level businesses.)</p>
                                            <div className="space-y-2">
                                                {[{ label: "Yes, send reminders", val: true }, { label: "No", val: false }].map(opt => (
                                                    <label key={opt.label} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.renewalReminders === opt.val ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <input type="radio" name="renewalReminders" value={opt.val.toString()} checked={formData.renewalReminders === opt.val} onChange={e => updateFormData("renewalReminders", e.target.value === "true")} className="accent-indigo-600" />
                                                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMsg msg={errors.renewalReminders} />
                                        </div>
                                    </div>
                                )}

                                {/* Step 4 */}
                                {currentStep === 4 && (
                                    <div>
                                        <div className="rounded-xl p-6 mb-6" style={{ background: '#f5f4fb', border: `1px solid #ddd8f8` }}>
                                            <h3 className="text-sm font-semibold text-gray-800 mb-3">What happens next:</h3>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                {[
                                                    "Our team will review your submission",
                                                    "We will reach out to you with an invoice",
                                                    "Upon payment, you will receive your DCMI/DCPMI Registration Certificate within 5 working days",
                                                    "Tailored Privacy Notice, DPA, Cookie Policy & Data Retention Policy included",
                                                ].map(item => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {submitError && (
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                                <p className="text-sm text-red-700 mb-3">{submitError}</p>
                                                <button onClick={() => setSubmitError(null)} className="text-sm underline text-red-600">Try Again</button>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                                            style={{ background: BRAND }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : "Submit Registration"}
                                        </button>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                                    <button
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Previous
                                    </button>
                                    {currentStep < 4 && (
                                        <button
                                            onClick={nextStep}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                            style={{ background: BRAND }}
                                        >
                                            Next Step
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                </div>{/* end p-6 */}
                            </div>{/* end form card */}
                        </>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}
