import { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, AlertCircle, Shield, FileText, CreditCard, Users } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from "@/components/layout/Footer";
import { secureStorage } from "@/lib/storage";

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

interface ValidationErrors {
    [key: string]: string;
}

export default function DCMICompliance() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showBigTable, setShowBigTable] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [submissionAttempts, setSubmissionAttempts] = useState(0);
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
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
        { id: 4, title: 'Payment', icon: CreditCard }
    ];

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    };

    const validateField = (field: keyof FormData, value: any) => {
        const newErrors = { ...errors };

        switch (field) {
            case "fullName":
                if (!value || value.trim().length < 2) {
                    newErrors[field] = "Full name must be at least 2 characters";
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    newErrors[field] = "Name should only contain letters and spaces";
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
                if (!value) {
                    newErrors[field] = "Business email is required";
                } else if (!validateEmail(value)) {
                    newErrors[field] = "Please enter a valid email address";
                } else {
                    delete newErrors[field];
                }
                break;
            case "phone":
                if (!value) {
                    newErrors[field] = "Phone number is required";
                } else if (!validatePhone(value)) {
                    newErrors[field] = "Please enter a valid phone number";
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

    const validateStep = (step: number): boolean => {
        const newErrors: ValidationErrors = {};

        if (step === 1) {
            const requiredFields = ["fullName", "businessName", "businessEmail", "phone", "address", "industry"];
            requiredFields.forEach((field) => {
                const value = formData[field as keyof FormData];
                if (!value || (typeof value === 'string' && !value.trim())) {
                    newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
                }
            });

            if (formData.businessEmail && !validateEmail(formData.businessEmail)) {
                newErrors.businessEmail = "Please enter a valid email address";
            }
            if (formData.phone && !validatePhone(formData.phone)) {
                newErrors.phone = "Please enter a valid phone number";
            }
        }

        if (step === 2) {
            if (!formData.dataVolume) newErrors.dataVolume = "Please select data volume";
            if (formData.sensitiveData === null) newErrors.sensitiveData = "Please answer this question";
            if (formData.internationalStorage === null) newErrors.internationalStorage = "Please answer this question";
        }

        if (step === 3) {
            if (!formData.nin) {
                newErrors.nin = "NIN is required";
            } else {
                const cleanNin = formData.nin.replace(/\D/g, "");
                if (cleanNin.length !== 11) {
                    newErrors.nin = "NIN must be exactly 11 digits";
                }
            }
            if (formData.dataTypes.length === 0) newErrors.dataTypes = "Please select at least one data type";
            if (formData.collectionReasons.length === 0) newErrors.collectionReasons = "Please select at least one reason";
            if (formData.renewalReminders === null) newErrors.renewalReminders = "Please answer this question";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const shouldShowBigTable = () => {
        return formData.dataVolume === "1000+" || formData.sensitiveData === true;
    };

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

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const updateArrayField = (field: "dataTypes" | "collectionReasons", value: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked
                ? [...prev[field], value]
                : prev[field].filter(item => item !== value),
        }));
        // Clear error when user makes selection
        if (checked && errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
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

            await fetch("https://formsubmit.co/solusesi03@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
            });

            secureStorage.removeItem("dcmi-form-data");
            secureStorage.removeItem("dcmi-current-step");
        } catch (error) {
            console.error("Big Table email failed:", error);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;
        
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const emailData = {
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
            };

            const result = await fetch("https://formsubmit.co/solusesi03@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
            });

            if (result.ok) {
                secureStorage.removeItem("dcmi-form-data");
                secureStorage.removeItem("dcmi-current-step");
                setTimeout(() => {
                    setIsSubmitting(false);
                    setShowThankYou(true);
                }, 1500);
            } else {
                throw new Error(`HTTP ${result.status}`);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setIsSubmitting(false);
            setSubmitError("Submission failed. Please try again or contact us directly.");
        }
    };

    if (showThankYou) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl text-center shadow-xl">
                    <CardContent className="p-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Payment Successful!</h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Your DCMI/DCPMI registration is being processed. You will receive your certificate and compliance documents within 5 working days.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="font-semibold text-gray-900 mb-4">What happens next:</h3>
                            <ul className="text-left text-gray-600 space-y-2">
                                <li>✓ DCMI/DCPMI Registration Certificate (5 working days)</li>
                                <li>✓ Tailored Privacy Notice for your business</li>
                                <li>✓ Data Processing Agreement (DPA)</li>
                                <li>✓ Cookie Policy</li>
                                <li>✓ Data Retention Policy</li>
                            </ul>
                        </div>
                        <Button onClick={() => window.location.href = '/'} className="w-full">
                            Return to Homepage
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (showBigTable) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl text-center shadow-xl">
                    <CardContent className="p-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <span className="text-3xl">🎉</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to the big table!</h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Your business is operating at a level where the NDPC requires additional compliance steps such as a Compliance Audit Return (CAR).
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            This is a great sign; it means your business is growing and handling data on a larger scale.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <p className="text-blue-800 font-medium">
                                Our team will reach out within one business day to guide you through your specific requirements and provide a tailored compliance plan.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => window.location.href = '/'} className="flex-1">
                                Return to Homepage
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setShowBackConfirmation(true)}
                                className="flex-1"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Form
                            </Button>
                        </div>

                        {showBackConfirmation && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <Card className="max-w-md w-full">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Return to Form?</h3>
                                        <p className="text-gray-600 mb-6">
                                            Are you sure you want to go back? Your progress will be saved and you can modify your responses.
                                        </p>
                                        <div className="flex gap-3">
                                            <Button variant="outline" onClick={() => setShowBackConfirmation(false)} className="flex-1">
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={() => {
                                                    setShowBackConfirmation(false);
                                                    setShowBigTable(false);
                                                    setCurrentStep(1);
                                                }}
                                                className="flex-1"
                                            >
                                                Yes, Go Back
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => window.history.back()}
                        className="mb-4 hover:bg-white/50"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">DCMI/DCPMI Registration</h1>
                    <p className="text-gray-600">
                        Complete your Nigeria Data Protection Act compliance registration
                    </p>
                </div>

                {/* Welcome Screen */}
                {currentStep === 0 && (
                    <Card className="shadow-xl border-0">
                        <CardContent className="p-12 text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">🎉 Congratulations!</h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                You have taken the first step toward being compliant with the Nigeria Data Protection Act (NDPA) 2023 and the General Application and Implementation Directive (GAID) 2025.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                                <p className="text-gray-700 mb-4">
                                    Completing this quick form will serve as a vehicle to help you meet your compliance obligation to register as a Data Controller/Processor of Major Importance (DCMI/DCPMI) if you have processed over 200 personal data in the last 6 months.
                                </p>
                                <p className="text-gray-700">
                                    This is also a strong business decision because when customers know their data is protected, they maintain loyalty to your business, and you maintain a predictable scale.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    After completing the form and payment, you will receive:
                                </h3>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>✓ Your DCMI/DCPMI Registration Certificate (within 5 working days)</li>
                                    <li>✓ A tailored Privacy Notice for your business</li>
                                    <li>✓ A Data Processing Agreement (DPA) to sign with your partners</li>
                                    <li>✓ Cookie Policy</li>
                                    <li>✓ Data Retention Policy</li>
                                </ul>
                            </div>

                            <p className="text-lg font-semibold text-gray-900 mb-8">
                                Let's begin! This takes under 5 minutes.
                            </p>

                            <Button onClick={() => setCurrentStep(1)} size="lg" className="px-12">
                                Start Registration →
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Form Steps */}
                {currentStep > 0 && (
                    <>
                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === step.id;
                                    const isCompleted = currentStep > step.id;
                                    
                                    return (
                                        <div key={step.id} className="flex items-center">
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                                                isCompleted 
                                                    ? 'bg-green-500 border-green-500 text-white' 
                                                    : isActive 
                                                        ? 'bg-blue-500 border-blue-500 text-white' 
                                                        : 'bg-white border-gray-300 text-gray-400'
                                            }`}>
                                                {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                            </div>
                                            <div className="ml-3">
                                                <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                                                    Step {step.id}
                                                </p>
                                                <p className={`text-xs ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {step.title}
                                                </p>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form Card */}
                        <Card className="shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                                <CardTitle className="text-xl">
                                    {steps.find(s => s.id === currentStep)?.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                {/* Step 1: About You */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Your Full Name *</label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => updateFormData("fullName", e.target.value)}
                                                placeholder="Enter your full name"
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.fullName && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.fullName}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Business / Brand Name *</label>
                                            <input
                                                type="text"
                                                value={formData.businessName}
                                                onChange={(e) => updateFormData("businessName", e.target.value)}
                                                placeholder="Your registered business name"
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.businessName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.businessName && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.businessName}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Business Email *</label>
                                            <input
                                                type="email"
                                                value={formData.businessEmail}
                                                onChange={(e) => updateFormData("businessEmail", e.target.value)}
                                                placeholder="business@company.com"
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.businessEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.businessEmail && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.businessEmail}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Phone Number *</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => updateFormData("phone", e.target.value)}
                                                placeholder="+234 xxx xxx xxxx"
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.phone && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Full Business Address *</label>
                                            <textarea
                                                value={formData.address}
                                                onChange={(e) => updateFormData("address", e.target.value)}
                                                placeholder="House number, street, city, LGA, state"
                                                className={`w-full p-4 border-2 rounded-lg h-24 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.address && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.address}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Industry *</label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => updateFormData("industry", e.target.value)}
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.industry ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select your industry</option>
                                                <option value="Fashion / Clothing / Ready-to-wear">Fashion / Clothing / Ready-to-wear</option>
                                                <option value="Beauty / Skincare">Beauty / Skincare</option>
                                                <option value="Hair / Wigs">Hair / Wigs</option>
                                                <option value="Food & Confectionery">Food & Confectionery</option>
                                                <option value="Tech">Tech</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.industry && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.industry}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Website (optional)</label>
                                            <input
                                                type="url"
                                                value={formData.website}
                                                onChange={(e) => updateFormData("website", e.target.value)}
                                                placeholder="https://yourwebsite.com"
                                                className="w-full p-4 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Quick Check */}
                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                How many people's personal data have you collected in the last 6 months? *
                                            </label>
                                            <p className="text-sm text-gray-600 mb-4">
                                                (Names, phone numbers, emails, delivery addresses, payment confirmations, etc.)
                                            </p>
                                            <div className="space-y-3">
                                                {["1–200", "201–999", "1000 and more"].map((option) => (
                                                    <label key={option} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="radio"
                                                            name="dataVolume"
                                                            value={option === "1000 and more" ? "1000+" : option}
                                                            checked={formData.dataVolume === (option === "1000 and more" ? "1000+" : option)}
                                                            onChange={(e) => updateFormData("dataVolume", e.target.value)}
                                                            className="mr-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-gray-700 font-medium">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.dataVolume && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.dataVolume}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                Do you handle any sensitive personal data? *
                                            </label>
                                            <p className="text-sm text-gray-600 mb-4">
                                                (Health information, biometrics, religion, political beliefs, etc.)
                                            </p>
                                            <div className="space-y-3">
                                                {[{ value: false, label: "No" }, { value: true, label: "Yes" }].map((option) => (
                                                    <label key={option.label} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="radio"
                                                            name="sensitiveData"
                                                            value={option.value.toString()}
                                                            checked={formData.sensitiveData === option.value}
                                                            onChange={(e) => updateFormData("sensitiveData", e.target.value === "true")}
                                                            className="mr-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-gray-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.sensitiveData && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.sensitiveData}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                Do you store or send customer data outside Nigeria? *
                                            </label>
                                            <p className="text-sm text-gray-600 mb-4">
                                                (e.g., Google Drive, cloud services, foreign servers, some payment processors)
                                            </p>
                                            <div className="space-y-3">
                                                {[{ value: false, label: "No" }, { value: true, label: "Yes" }].map((option) => (
                                                    <label key={option.label} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="radio"
                                                            name="internationalStorage"
                                                            value={option.value.toString()}
                                                            checked={formData.internationalStorage === option.value}
                                                            onChange={(e) => updateFormData("internationalStorage", e.target.value === "true")}
                                                            className="mr-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-gray-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.internationalStorage && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.internationalStorage}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Registration Details */}
                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-semibold mb-3 text-gray-700">Your NIN (required by NDPC) *</label>
                                            <input
                                                type="text"
                                                value={formData.nin}
                                                onChange={(e) => updateFormData("nin", e.target.value)}
                                                placeholder="Enter your 11-digit NIN"
                                                maxLength={11}
                                                className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.nin ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            {errors.nin && (
                                                <div className="flex items-center text-red-600 text-sm mt-1">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.nin}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                What type of customer data do you collect? (Select all that apply) *
                                            </label>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {[
                                                    "Names",
                                                    "Phone numbers", 
                                                    "Emails",
                                                    "Delivery addresses",
                                                    "Payment confirmations from payment gateways",
                                                    "WhatsApp chats that include names, contacts, or order details",
                                                    "Other"
                                                ].map((dataType) => (
                                                    <label key={dataType} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.dataTypes.includes(dataType)}
                                                            onChange={(e) => updateArrayField("dataTypes", dataType, e.target.checked)}
                                                            className="mr-3 text-blue-600 focus:ring-blue-500 rounded"
                                                        />
                                                        <span className="text-gray-700 text-sm">{dataType}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.dataTypes && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.dataTypes}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                Why do you collect customer data? *
                                            </label>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {[
                                                    "To deliver orders",
                                                    "To contact customers",
                                                    "For marketing/promos",
                                                    "For account or order history management",
                                                    "Other"
                                                ].map((reason) => (
                                                    <label key={reason} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.collectionReasons.includes(reason)}
                                                            onChange={(e) => updateArrayField("collectionReasons", reason, e.target.checked)}
                                                            className="mr-3 text-blue-600 focus:ring-blue-500 rounded"
                                                        />
                                                        <span className="text-gray-700 text-sm">{reason}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.collectionReasons && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.collectionReasons}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-4 text-gray-700">
                                                Would you like us to remind you about your yearly renewal requirement? *
                                            </label>
                                            <p className="text-sm text-gray-600 mb-4">
                                                (NDPA/GAID requires yearly renewal for OHL-level businesses.)
                                            </p>
                                            <div className="space-y-3">
                                                {[
                                                    { value: true, label: "Yes, send reminders" },
                                                    { value: false, label: "No" }
                                                ].map((option) => (
                                                    <label key={option.label} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="radio"
                                                            name="renewalReminders"
                                                            value={option.value.toString()}
                                                            checked={formData.renewalReminders === option.value}
                                                            onChange={(e) => updateFormData("renewalReminders", e.target.value === "true")}
                                                            className="mr-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-gray-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.renewalReminders && (
                                                <div className="flex items-center text-red-600 text-sm mt-2">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {errors.renewalReminders}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Payment */}
                                {currentStep === 4 && (
                                    <div className="text-center">
                                        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-8 text-white mb-8">
                                            <h3 className="text-3xl font-bold mb-4">₦100,000</h3>
                                            <div className="bg-white/95 rounded-lg p-6 mb-6">
                                                <p className="text-lg text-gray-800 mb-4">
                                                    Kindly pay ₦100,000 to finalize your submission. We will deliver your certificate in 5 working days and send you your tailored compliance documents.
                                                </p>
                                            </div>

                                            <div className="bg-white/95 rounded-lg p-4">
                                                <h4 className="font-semibold mb-2 text-gray-800">What's included:</h4>
                                                <ul className="text-sm space-y-1 text-gray-700">
                                                    <li>✓ DCMI/DCPMI Registration Certificate</li>
                                                    <li>✓ Tailored Privacy Notice</li>
                                                    <li>✓ Data Processing Agreement (DPA)</li>
                                                    <li>✓ Cookie Policy</li>
                                                    <li>✓ Data Retention Policy</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {submitError && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                                <p className="text-red-700 mb-3">{submitError}</p>
                                                <Button variant="outline" onClick={() => setSubmitError(null)}>
                                                    Try Again
                                                </Button>
                                            </div>
                                        )}

                                        <Button 
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="w-full sm:w-auto px-12"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Registration"
                                            )}
                                        </Button>
                                        <p className="text-sm text-gray-500 mt-4">
                                            Secure payment processing • 256-bit SSL encryption
                                        </p>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-8 border-t border-gray-200">
                                    <Button 
                                        variant="outline" 
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        className="px-8"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Previous
                                    </Button>
                                    
                                    {currentStep < 4 && (
                                        <Button 
                                            onClick={nextStep}
                                            className="px-8"
                                        >
                                            Next Step
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}