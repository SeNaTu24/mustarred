import { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";
import { secureStorage } from "@/lib/storage";

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

interface FormData {
    // Section 1: About You
    fullName: string;
    businessName: string;
    businessEmail: string;
    phone: string;
    address: string;
    industry: string;
    website: string;

    // Section 2: Quick Check
    dataVolume: "1-200" | "201-999" | "1000+" | "";
    sensitiveData: boolean | null;
    internationalStorage: boolean | null;

    // Section 3: Registration Details
    nin: string;
    dataTypes: string[];
    collectionReasons: string[];
    renewalReminders: boolean | null;
}

interface EmailData {
    _subject: string;
    _captcha: string;
    PRIORITY?: string;
    STATUS?: string;
    Name: string;
    Business: string;
    Email: string;
    Phone: string;
    "Data Volume": string;
    "Sensitive Data"?: string;
    NIN?: string;
    Date?: string;
}

export default function DCMICompliance() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showBigTable, setShowBigTable] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [submissionAttempts, setSubmissionAttempts] = useState(0);
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
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

    // Load saved form data on component mount
    useEffect(() => {
        const savedData = secureStorage.getItem("dcmi-form-data");
        const savedStep = secureStorage.getItem("dcmi-current-step");

        if (savedData) {
            setFormData(savedData);
        }

        if (savedStep && typeof savedStep === "number") {
            if (savedStep > 0 && savedStep < totalSteps) {
                setCurrentStep(savedStep);
            }
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === "Enter" && currentStep < 4) {
                    e.preventDefault();
                    handleNext();
                }
                if (e.key === "ArrowLeft" && currentStep > 1) {
                    e.preventDefault();
                    handleBack();
                }
                if (e.key === "ArrowRight" && currentStep < 4) {
                    e.preventDefault();
                    handleNext();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentStep]);

    // Save form data whenever it changes
    useEffect(() => {
        secureStorage.setItem("dcmi-form-data", formData);
        setLastSaved(new Date());
    }, [formData]);

    // Monitor online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // Save current step whenever it changes
    useEffect(() => {
        secureStorage.setItem("dcmi-current-step", currentStep);
    }, [currentStep]);

    const totalSteps = 5; // Welcome, Section 1, Section 2, Section 3, Payment

    // Logic to determine if user should see "Big Table" message
    const shouldShowBigTable = () => {
        return (
            formData.dataVolume === "1000+" || formData.sensitiveData === true
        );
    };

    const handleNext = async () => {
        setIsNavigating(true);
        const newErrors = { ...errors };

        // Save to secure storage for cross-tab persistence
        secureStorage.setItem("dcmi-form-data", formData);
        secureStorage.setItem("dcmi-current-step", currentStep);

        // Validate current step before proceeding
        if (currentStep === 1) {
            // Validate all Step 1 fields
            const step1Fields = [
                "fullName",
                "businessName",
                "businessEmail",
                "phone",
                "address",
                "industry",
            ];
            step1Fields.forEach((field) => {
                validateField(
                    field as keyof FormData,
                    formData[field as keyof FormData]
                );
            });
            if (!isStep1Valid()) return;
        }

        if (currentStep === 2) {
            if (!formData.dataVolume)
                newErrors.dataVolume = "Please select data volume";
            if (formData.sensitiveData === null)
                newErrors.sensitiveData = "Please answer this question";
            if (formData.internationalStorage === null)
                newErrors.internationalStorage = "Please answer this question";
            setErrors(newErrors);
            if (!isStep2Valid()) return;
            if (shouldShowBigTable()) {
                // Send email for Big Table users
                await sendBigTableEmail();
                setIsNavigating(false);
                setShowBigTable(true);
                return;
            }
        }

        if (currentStep === 3) {
            // Validate Step 3 fields
            validateField("nin", formData.nin);
            if (formData.dataTypes.length === 0)
                newErrors.dataTypes = "Please select at least one";
            if (formData.collectionReasons.length === 0)
                newErrors.collectionReasons = "Please select at least one";
            if (formData.renewalReminders === null)
                newErrors.renewalReminders = "Please answer this question";
            setErrors(newErrors);

            if (!isStep3Valid()) {
                setIsNavigating(false);
                return;
            }
        }

        // Small delay for better UX
        setTimeout(() => {
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            }
            setIsNavigating(false);
        }, 300);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const validateField = (field: keyof FormData, value: any) => {
        const newErrors = { ...errors };

        switch (field) {
            case "fullName":
                if (!value || value.trim().length < 2) {
                    newErrors[field] =
                        "Full name must be at least 2 characters";
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    newErrors[field] =
                        "Name should only contain letters and spaces";
                } else {
                    delete newErrors[field];
                }
                break;
            case "businessName":
                if (!value || value.trim().length < 2) {
                    newErrors[field] = "Business name is required";
                } else {
                    delete newErrors[field];
                }
                break;
            case "businessEmail":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    newErrors[field] = "Business email is required";
                } else if (!emailRegex.test(value)) {
                    newErrors[field] = "Please enter a valid email address";
                } else {
                    delete newErrors[field];
                }
                break;
            case "phone":
                const cleanPhone = value.replace(/\D/g, "");
                if (!value) {
                    newErrors[field] = "Phone number is required";
                } else if (cleanPhone.length < 10) {
                    newErrors[field] =
                        "Phone number must be at least 10 digits";
                } else if (cleanPhone.length > 15) {
                    newErrors[field] = "Phone number cannot exceed 15 digits";
                } else {
                    delete newErrors[field];
                }
                break;
            case "address":
                if (!value || value.trim().length < 10) {
                    newErrors[field] = "Please provide a complete address";
                } else {
                    delete newErrors[field];
                }
                break;
            case "industry":
                if (!value) {
                    newErrors[field] = "Please select your industry";
                } else {
                    delete newErrors[field];
                }
                break;
            case "nin":
                const cleanNin = value.replace(/\D/g, "");
                if (!value) {
                    newErrors[field] = "NIN is required";
                } else if (cleanNin.length !== 11) {
                    newErrors[field] = "NIN must be exactly 11 digits";
                } else {
                    delete newErrors[field];
                }
                break;
        }

        setErrors(newErrors);
    };

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const updateArrayField = (
        field: "dataTypes" | "collectionReasons",
        value: string,
        checked: boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: checked
                ? [...prev[field], value]
                : prev[field].filter((item) => item !== value),
        }));
    };

    // Validation functions
    const isStep1Valid = () => {
        const requiredFields = [
            "fullName",
            "businessName",
            "businessEmail",
            "phone",
            "address",
            "industry",
        ];
        return requiredFields.every(
            (field) => formData[field as keyof FormData] && !errors[field]
        );
    };

    const isStep2Valid = () => {
        return (
            formData.dataVolume &&
            formData.sensitiveData !== null &&
            formData.internationalStorage !== null
        );
    };

    const isStep3Valid = () => {
        return (
            formData.nin &&
            !errors.nin &&
            formData.dataTypes.length > 0 &&
            formData.collectionReasons.length > 0 &&
            formData.renewalReminders !== null
        );
    };

    const sendEmailWithRetry = async (emailData: EmailData, maxRetries = 3) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const result = await fetch(
                    "https://formsubmit.co/solusesi03@gmail.com",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(emailData),
                    }
                );

                if (result.ok) {
                    console.log(
                        `✅ FormSubmit sent successfully on attempt ${attempt}`
                    );
                    console.log("Response status:", result.status);
                    console.log("Response headers:", result.headers);
                    return result;
                }
                throw new Error(`HTTP ${result.status}`);
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : "Unknown error";
                console.log(
                    `❌ FormSubmit attempt ${attempt} failed:`,
                    errorMessage
                );
                console.log("Full error:", error);

                if (attempt === maxRetries) {
                    throw new Error(
                        `Failed after ${maxRetries} attempts: ${errorMessage}`
                    );
                }

                // Wait before retry: 2s, 4s, 6s
                await new Promise((resolve) =>
                    setTimeout(resolve, 2000 * attempt)
                );
            }
        }
    };

    const sendToMakeFallback = async (formData: FormData) => {
        try {
            // Make.com webhook URL
            const makeWebhookUrl =
                "https://hook.eu2.make.com/lbhfkmyseeu7f2cnrtf262fhtp1fvyt2";

            const makeData = {
                subject: "DCMI Registration - Payment Received (BACKUP)",
                name: formData.fullName,
                business: formData.businessName,
                email: formData.businessEmail,
                phone: formData.phone,
                nin: formData.nin,
                dataVolume: formData.dataVolume,
                timestamp: new Date().toISOString(),
                source: "FormSubmit Fallback",
            };

            const result = await fetch(makeWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(makeData),
            });

            if (result.ok) {
                console.log("✅ Make.com fallback sent successfully");
                return result;
            }
            throw new Error(`Make.com failed: ${result.status}`);
        } catch (error) {
            console.error("❌ Make.com fallback failed:", error);
            throw error;
        }
    };

    const sendBigTableEmail = async () => {
        try {
            const emailData = {
                _subject: "HIGH PRIORITY: Big Table DCMI Lead",
                _captcha: "false",
                PRIORITY: "🚨 BIG TABLE LEAD",
                Name: formData.fullName,
                Business: formData.businessName,
                Email: formData.businessEmail,
                Phone: formData.phone,
                "Data Volume": formData.dataVolume,
                "Sensitive Data": formData.sensitiveData ? "Yes" : "No",
            };

            try {
                await sendEmailWithRetry(emailData);
            } catch (error) {
                console.log(
                    "📧 FormSubmit failed, trying Make.com fallback..."
                );
                await sendToMakeFallback(formData);
            }

            // Clear saved form data after Big Table submission
            secureStorage.removeItem("dcmi-form-data");
            secureStorage.removeItem("dcmi-current-step");
        } catch (error) {
            console.error(
                "❌ Both FormSubmit and Make.com failed for Big Table:",
                error
            );
            // Don't block user flow for Big Table emails
        }
    };

    const handleSubmit = async () => {
        // Rate limiting: max 3 attempts per 10 minutes
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;

        if (submissionAttempts >= 3 && now - lastSubmissionTime < tenMinutes) {
            const waitTime = Math.ceil(
                (tenMinutes - (now - lastSubmissionTime)) / 60000
            );
            setSubmitError(
                `Too many attempts. Please wait ${waitTime} minutes before trying again.`
            );
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmissionAttempts((prev) => prev + 1);
        setLastSubmissionTime(now);

        try {
            const emailData = {
                _subject: "DCMI Registration - Payment Received",
                _captcha: "false",
                STATUS: "✅ PAID ₦100,000",
                Name: formData.fullName,
                Business: formData.businessName,
                Email: formData.businessEmail,
                Phone: formData.phone,
                NIN: formData.nin,
                "Data Volume": formData.dataVolume,
                Date: new Date().toLocaleDateString(),
            };

            try {
                await sendEmailWithRetry(emailData);
            } catch (error) {
                console.log(
                    "📧 FormSubmit failed, trying Make.com fallback..."
                );
                await sendToMakeFallback(formData);
            }

            // Clear saved form data after successful submission
            secureStorage.removeItem("dcmi-form-data");
            secureStorage.removeItem("dcmi-current-step");

            // Reset rate limiting on success
            setSubmissionAttempts(0);

            setTimeout(() => {
                setIsSubmitting(false);
                setShowThankYou(true);
            }, 1500);
        } catch (error) {
            console.error("❌ Both FormSubmit and Make.com failed:", error);
            setIsSubmitting(false);
            setSubmitError(
                "Submission failed. Please try again or contact us directly."
            );
        }
    };

    const retrySubmission = () => {
        setSubmitError(null);
        handleSubmit();
    };

    if (showThankYou) {
        return (
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-[#4b4ba3]">
                                Mustarred
                            </div>
                            <a
                                href="/"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                ← Back to Home
                            </a>
                        </div>
                    </div>
                </nav>

                <div className="py-20">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-12">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-8" />
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                Payment Successful!
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Your DCMI/DCPMI registration is being processed.
                                You will receive your certificate and compliance
                                documents within 5 working days.
                            </p>
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    What happens next:
                                </h3>
                                <ul className="text-left text-gray-600 space-y-2">
                                    <li>
                                        ✓ DCMI/DCPMI Registration Certificate (5
                                        working days)
                                    </li>
                                    <li>
                                        ✓ Tailored Privacy Notice for your
                                        business
                                    </li>
                                    <li>✓ Data Processing Agreement (DPA)</li>
                                    <li>✓ Cookie Policy</li>
                                    <li>✓ Data Retention Policy</li>
                                </ul>
                            </div>
                            <a
                                href="/"
                                className="bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Return to Homepage
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (showBigTable) {
        return (
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-[#4b4ba3]">
                                Mustarred
                            </div>
                            <a
                                href="/"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                ← Back to Home
                            </a>
                        </div>
                    </div>
                </nav>

                <div className="py-20">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#a49fe7] to-[#4b4ba3] rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="text-3xl">🎉</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                Welcome to the big table!
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Your business is operating at a level where the
                                NDPC requires additional compliance steps such
                                as a Compliance Audit Return (CAR).
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                This is a great sign; it means your business is
                                growing and handling data on a larger scale.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                                <p className="text-blue-800 font-medium">
                                    Our team will reach out within one business
                                    day to guide you through your specific
                                    requirements and provide a tailored
                                    compliance plan.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/"
                                    className="bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Return to Homepage
                                </a>
                                <button
                                    onClick={() => {
                                        setShowBigTable(false);
                                        setCurrentStep(1);
                                    }}
                                    className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-[#4b4ba3]">
                            Mustarred
                        </div>
                        <a
                            href="/"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </nav>

            {/* Welcome Screen */}
            {currentStep === 0 && (
                <div className="py-20">
                    <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                🎉 Congratulations!
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                You have taken the first step toward being
                                compliant with the Nigeria Data Protection Act
                                (NDPA) 2023 and the General Application and
                                Implementation Directive (GAID) 2025.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                                <p className="text-gray-700 mb-4">
                                    Completing this quick form will serve as a
                                    vehicle to help you meet your compliance
                                    obligation to register as a Data
                                    Controller/Processor of Major Importance
                                    (DCMI/DCPMI) if you have processed over 200
                                    personal data in the last 6 months.
                                </p>
                                <p className="text-gray-700">
                                    This is also a strong business decision
                                    because when customers know their data is
                                    protected, they maintain loyalty to your
                                    business, and you maintain a predictable
                                    scale.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    After completing the form and payment, you
                                    will receive:
                                </h3>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>
                                        ✓ Your DCMI/DCPMI Registration
                                        Certificate (within 5 working days)
                                    </li>
                                    <li>
                                        ✓ A tailored Privacy Notice for your
                                        business
                                    </li>
                                    <li>
                                        ✓ A Data Processing Agreement (DPA) to
                                        sign with your partners
                                    </li>
                                    <li>✓ Cookie Policy</li>
                                    <li>✓ Data Retention Policy</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-8">
                                <p className="text-sm text-gray-600">
                                    🔒 Your information is stored securely, and
                                    only authorized personnel will see it.
                                </p>
                                <p className="text-sm text-green-600 mt-2">
                                    💾 Your progress is automatically saved as
                                    you fill out the form.
                                </p>
                                {lastSaved && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Last saved:{" "}
                                        {lastSaved.toLocaleTimeString()}
                                    </p>
                                )}
                                {!isOnline && (
                                    <p className="text-xs text-orange-600 mt-1">
                                        ⚠️ You're offline. Your progress is
                                        saved locally.
                                    </p>
                                )}
                            </div>

                            <p className="text-lg font-semibold text-gray-900 mb-8">
                                Let's begin! This takes under 5 minutes.
                            </p>

                            <button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1"
                            >
                                Start Registration →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Form Steps */}
            {currentStep > 0 && (
                <div className="py-8 md:py-16">
                    <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
                        {/* Progress Indicator */}
                        <div className="flex justify-center mb-6 md:mb-8">
                            <div className="flex items-center space-x-2 md:space-x-4">
                                {Array.from(
                                    { length: totalSteps - 1 },
                                    (_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <div
                                                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold ${
                                                    i < currentStep
                                                        ? "bg-[#a49fe7] text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                }`}
                                            >
                                                {i + 1}
                                            </div>
                                            {i < totalSteps - 2 && (
                                                <div
                                                    className={`w-8 md:w-16 h-1 mx-1 md:mx-2 ${
                                                        i < currentStep - 1
                                                            ? "bg-[#a49fe7]"
                                                            : "bg-gray-200"
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-4 md:p-8 lg:p-12">
                                {/* Section 1: About You */}
                                {currentStep === 1 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Section 1: About You
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Tell us about yourself and your
                                            business
                                        </p>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Your Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "fullName",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.fullName
                                                            ? "border-red-500"
                                                            : formData.fullName &&
                                                              !errors.fullName
                                                            ? "border-green-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="Enter your full name"
                                                    aria-describedby={
                                                        errors.fullName
                                                            ? "fullName-error"
                                                            : undefined
                                                    }
                                                    autoComplete="name"
                                                />
                                                {errors.fullName && (
                                                    <p
                                                        id="fullName-error"
                                                        className="text-red-500 text-sm mt-2"
                                                        role="alert"
                                                    >
                                                        {errors.fullName}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Business / Brand Name (as
                                                    registered with CAC) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        formData.businessName
                                                    }
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "businessName",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.businessName
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="Your registered business name"
                                                />
                                                {errors.businessName && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.businessName}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Business Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={
                                                        formData.businessEmail
                                                    }
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "businessEmail",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.businessEmail
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="business@company.com"
                                                />
                                                {errors.businessEmail && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.businessEmail}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.phone
                                                            ? "border-red-500"
                                                            : formData.phone &&
                                                              !errors.phone
                                                            ? "border-green-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="Enter your phone number with country code"
                                                    aria-describedby={
                                                        errors.phone
                                                            ? "phone-error"
                                                            : undefined
                                                    }
                                                    autoComplete="tel"
                                                />
                                                {errors.phone && (
                                                    <p
                                                        id="phone-error"
                                                        className="text-red-500 text-sm mt-2"
                                                        role="alert"
                                                    >
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Full Business Address *
                                                </label>
                                                <textarea
                                                    value={formData.address}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "address",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={3}
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all resize-none ${
                                                        errors.address
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="House number, street, city, LGA, state"
                                                />
                                                {errors.address && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.address}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Industry *
                                                </label>
                                                <select
                                                    value={formData.industry}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "industry",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.industry
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                >
                                                    <option value="">
                                                        Select your industry
                                                    </option>
                                                    <option value="Fashion / Clothing / Ready-to-wear">
                                                        Fashion / Clothing /
                                                        Ready-to-wear
                                                    </option>
                                                    <option value="Beauty / Skincare">
                                                        Beauty / Skincare
                                                    </option>
                                                    <option value="Hair / Wigs">
                                                        Hair / Wigs
                                                    </option>
                                                    <option value="Food & Confectionery">
                                                        Food & Confectionery
                                                    </option>
                                                    <option value="Tech">
                                                        Tech
                                                    </option>
                                                    <option value="Other">
                                                        Other
                                                    </option>
                                                </select>
                                                {errors.industry && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.industry}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Website (if available)
                                                </label>
                                                <input
                                                    type="url"
                                                    value={formData.website}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "website",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all"
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Section 2: Quick Check */}
                                {currentStep === 2 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Section 2: Quick Check
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Help us understand your data
                                            processing activities
                                        </p>
                                        {!isStep2Valid() &&
                                            Object.keys(errors).length > 0 && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                                    <p className="text-red-700 text-sm">
                                                        Please answer all
                                                        required questions to
                                                        continue.
                                                    </p>
                                                </div>
                                            )}

                                        <div className="space-y-8">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    How many people's personal
                                                    data have you collected in
                                                    the last 6 months? *
                                                </label>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    (Names, phone numbers,
                                                    emails, delivery addresses,
                                                    payment confirmations, etc.)
                                                </p>
                                                <div className="space-y-3">
                                                    {[
                                                        "1–200",
                                                        "201–999",
                                                        "1000 and more",
                                                    ].map((option) => (
                                                        <label
                                                            key={option}
                                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="dataVolume"
                                                                value={
                                                                    option ===
                                                                    "1000 and more"
                                                                        ? "1000+"
                                                                        : option
                                                                }
                                                                checked={
                                                                    formData.dataVolume ===
                                                                    (option ===
                                                                    "1000 and more"
                                                                        ? "1000+"
                                                                        : option)
                                                                }
                                                                onChange={(e) =>
                                                                    updateFormData(
                                                                        "dataVolume",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mr-4 text-[#a49fe7] focus:ring-[#a49fe7]"
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                {option}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    Do you handle any sensitive
                                                    personal data? *
                                                </label>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    (Health information,
                                                    biometrics, religion,
                                                    political beliefs, etc.)
                                                </p>
                                                <div className="space-y-3">
                                                    {[
                                                        {
                                                            value: false,
                                                            label: "No",
                                                        },
                                                        {
                                                            value: true,
                                                            label: "Yes",
                                                        },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.label}
                                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="sensitiveData"
                                                                value={option.value.toString()}
                                                                checked={
                                                                    formData.sensitiveData ===
                                                                    option.value
                                                                }
                                                                onChange={(e) =>
                                                                    updateFormData(
                                                                        "sensitiveData",
                                                                        e.target
                                                                            .value ===
                                                                            "true"
                                                                    )
                                                                }
                                                                className="mr-4 text-[#a49fe7] focus:ring-[#a49fe7]"
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    Do you store or send
                                                    customer data outside
                                                    Nigeria? *
                                                </label>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    (e.g., Google Drive, cloud
                                                    services, foreign servers,
                                                    some payment processors)
                                                </p>
                                                <div className="space-y-3">
                                                    {[
                                                        {
                                                            value: false,
                                                            label: "No",
                                                        },
                                                        {
                                                            value: true,
                                                            label: "Yes",
                                                        },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.label}
                                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="internationalStorage"
                                                                value={option.value.toString()}
                                                                checked={
                                                                    formData.internationalStorage ===
                                                                    option.value
                                                                }
                                                                onChange={(e) =>
                                                                    updateFormData(
                                                                        "internationalStorage",
                                                                        e.target
                                                                            .value ===
                                                                            "true"
                                                                    )
                                                                }
                                                                className="mr-4 text-[#a49fe7] focus:ring-[#a49fe7]"
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Section 3: Registration Details */}
                                {currentStep === 3 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Section 3: Details for Your
                                            Registration
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Final details needed for your
                                            DCMI/DCPMI registration
                                        </p>

                                        <div className="space-y-8">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                    Your NIN (required by NDPC)
                                                    *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.nin}
                                                    onChange={(e) =>
                                                        updateFormData(
                                                            "nin",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all ${
                                                        errors.nin
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                    placeholder="Enter your 11-digit NIN"
                                                    maxLength={11}
                                                />
                                                {errors.nin && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.nin}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    What type of customer data
                                                    do you collect? (Tick all
                                                    that apply) *
                                                </label>
                                                {formData.dataTypes.length ===
                                                    0 &&
                                                    errors.dataTypes && (
                                                        <p className="text-red-500 text-sm mb-3">
                                                            Please select at
                                                            least one data type
                                                        </p>
                                                    )}
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {[
                                                        "Names",
                                                        "Phone numbers",
                                                        "Emails",
                                                        "Delivery addresses",
                                                        "Payment confirmations from payment gateways",
                                                        "WhatsApp chats that include names, contacts, or order details",
                                                        "Other",
                                                    ].map((dataType) => (
                                                        <label
                                                            key={dataType}
                                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.dataTypes.includes(
                                                                    dataType
                                                                )}
                                                                onChange={(e) =>
                                                                    updateArrayField(
                                                                        "dataTypes",
                                                                        dataType,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                                className="mr-3 text-[#a49fe7] focus:ring-[#a49fe7] rounded"
                                                            />
                                                            <span className="text-gray-700 text-sm">
                                                                {dataType}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    Why do you collect customer
                                                    data? *
                                                </label>
                                                {formData.collectionReasons
                                                    .length === 0 &&
                                                    errors.collectionReasons && (
                                                        <p className="text-red-500 text-sm mb-3">
                                                            Please select at
                                                            least one reason
                                                        </p>
                                                    )}
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {[
                                                        "To deliver orders",
                                                        "To contact customers",
                                                        "For marketing/promos",
                                                        "For account or order history management",
                                                        "Other",
                                                    ].map((reason) => (
                                                        <label
                                                            key={reason}
                                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.collectionReasons.includes(
                                                                    reason
                                                                )}
                                                                onChange={(e) =>
                                                                    updateArrayField(
                                                                        "collectionReasons",
                                                                        reason,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                                className="mr-3 text-[#a49fe7] focus:ring-[#a49fe7] rounded"
                                                            />
                                                            <span className="text-gray-700 text-sm">
                                                                {reason}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                                    Would you like us to remind
                                                    you about your yearly
                                                    renewal requirement? *
                                                </label>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    (NDPA/GAID requires yearly
                                                    renewal for OHL-level
                                                    businesses.)
                                                </p>
                                                <div className="space-y-3">
                                                    {[
                                                        {
                                                            value: true,
                                                            label: "Yes, send reminders",
                                                        },
                                                        {
                                                            value: false,
                                                            label: "No",
                                                        },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.label}
                                                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="renewalReminders"
                                                                value={option.value.toString()}
                                                                checked={
                                                                    formData.renewalReminders ===
                                                                    option.value
                                                                }
                                                                onChange={(e) =>
                                                                    updateFormData(
                                                                        "renewalReminders",
                                                                        e.target
                                                                            .value ===
                                                                            "true"
                                                                    )
                                                                }
                                                                className="mr-4 text-[#a49fe7] focus:ring-[#a49fe7]"
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Section */}
                                {currentStep === 4 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Section 4: Payment
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Complete your DCMI/DCPMI
                                            registration
                                        </p>

                                        <div className="bg-gradient-to-br from-[#a49fe7] to-[#4b4ba3] rounded-xl p-8 text-white text-center mb-8">
                                            <h3 className="text-2xl font-bold mb-4">
                                                ₦100,000
                                            </h3>
                                            <div className="bg-white/95 rounded-lg p-6 mb-6">
                                                <p className="text-lg text-gray-800 mb-4">
                                                    Kindly pay ₦100,000 to finalize
                                                    your submission. We will deliver
                                                    your certificate in 5 working
                                                    days and send you your tailored
                                                    compliance documents.
                                                </p>
                                            </div>

                                            <div className="bg-white/95 rounded-lg p-4 mb-6">
                                                <h4 className="font-semibold mb-2 text-gray-800">
                                                    What's included:
                                                </h4>
                                                <ul className="text-sm space-y-1 text-gray-700">
                                                    <li>
                                                        ✓ DCMI/DCPMI
                                                        Registration Certificate
                                                    </li>
                                                    <li>
                                                        ✓ Tailored Privacy
                                                        Notice
                                                    </li>
                                                    <li>
                                                        ✓ Data Processing
                                                        Agreement (DPA)
                                                    </li>
                                                    <li>✓ Cookie Policy</li>
                                                    <li>
                                                        ✓ Data Retention Policy
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            {submitError && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                                    <p className="text-red-700 mb-3">
                                                        {submitError}
                                                    </p>
                                                    <button
                                                        onClick={
                                                            retrySubmission
                                                        }
                                                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                                    >
                                                        Try Again
                                                    </button>
                                                </div>
                                            )}

                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className={`flex items-center justify-center gap-3 px-8 md:px-12 py-4 rounded-xl font-semibold text-base md:text-lg transition-all transform w-full sm:w-auto ${
                                                    isSubmitting
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white hover:shadow-lg hover:-translate-y-1"
                                                }`}
                                                aria-label="Submit form and process payment"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                        Processing Payment...
                                                    </>
                                                ) : (
                                                    "Pay & Submit"
                                                )}
                                            </button>
                                            <p className="text-sm text-gray-500 mt-4">
                                                Secure payment processing •
                                                256-bit SSL encryption
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-200">
                                    <button
                                        onClick={handleBack}
                                        disabled={currentStep === 1}
                                        className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all w-full sm:w-auto justify-center sm:justify-start ${
                                            currentStep === 1
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        }`}
                                        aria-label="Go to previous step"
                                        tabIndex={currentStep === 1 ? -1 : 0}
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        Back
                                    </button>

                                    {currentStep < 4 ? (
                                        <button
                                            onClick={handleNext}
                                            disabled={isNavigating}
                                            className={`flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-xl font-semibold transition-all w-full sm:w-auto ${
                                                isNavigating
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white hover:shadow-lg transform hover:-translate-y-0.5"
                                            }`}
                                            aria-label="Continue to next step"
                                        >
                                            {isNavigating ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Next
                                                    <ArrowRight className="h-5 w-5" />
                                                </>
                                            )}
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
