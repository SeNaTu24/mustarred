import { useState } from "react";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";

interface FormData {
    fullName: string;
    email: string;
    companyName: string;
    companyAddress: string;
}

export default function Consultation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        companyName: '',
        companyAddress: ''
    });

    const totalSteps = 2;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isStep1Valid = formData.fullName && formData.email && formData.companyName && formData.companyAddress;

    const handleSubmit = () => {
        setShowThankYou(true);
    };

    if (showThankYou) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Simple Navbar */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-[#4b4ba3]">
                                Mustarred
                            </div>
                            <a 
                                href="https://mail.google.com/mail/?view=cm&to=info@mustarred.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#4b4ba3] text-white px-6 py-2 rounded-lg hover:bg-[#3a3a8a] transition-colors"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Thank You Content */}
                <div className="py-20">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-12">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-8" />
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                Thank You!
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                We've received your questionnaire and will review your responses carefully. 
                                Our team will get back to you within 24-48 hours with personalized recommendations.
                            </p>
                            <p className="text-gray-600 mb-10">
                                In the meantime, feel free to explore our services or contact us directly if you have any urgent questions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a 
                                    href="/"
                                    className="bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Go to Homepage
                                </a>
                                <button 
                                    onClick={() => setShowThankYou(false)}
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
            {/* Simple Navbar */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-[#4b4ba3]">
                            Mustarred
                        </div>
                        <a 
                            href="https://mail.google.com/mail/?view=cm&to=info@mustarred.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4b4ba3] text-white px-6 py-2 rounded-lg hover:bg-[#3a3a8a] transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#a49fe7] via-[#8b85d1] to-[#4b4ba3] py-16">
                <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Book Your Consultation
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Help us understand your needs so we can provide you with the most relevant guidance and recommendations.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="py-16">
                <div className="max-w-2xl mx-auto px-6 md:px-8">
                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            {Array.from({ length: totalSteps }, (_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                        i <= currentStep 
                                            ? 'bg-[#a49fe7] text-white' 
                                            : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {i + 1}
                                    </div>
                                    {i < totalSteps - 1 && (
                                        <div className={`w-16 h-1 mx-2 ${
                                            i < currentStep ? 'bg-[#a49fe7]' : 'bg-gray-200'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12">
                            {currentStep === 0 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                                        <p className="text-gray-600">Let's start with your basic details</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                Full Name *
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.fullName}
                                                onChange={(e) => updateFormData('fullName', e.target.value)}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all"
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                Email Address *
                                            </label>
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                onChange={(e) => updateFormData('email', e.target.value)}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                Company Name *
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.companyName}
                                                onChange={(e) => updateFormData('companyName', e.target.value)}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all"
                                                placeholder="Your company name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                Company Address *
                                            </label>
                                            <textarea 
                                                value={formData.companyAddress}
                                                onChange={(e) => updateFormData('companyAddress', e.target.value)}
                                                rows={3}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a49fe7] focus:border-transparent transition-all resize-none"
                                                placeholder="Your company's full address"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Information</h2>
                                        <p className="text-gray-600">Tell us more about your business needs</p>
                                    </div>

                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg">
                                            More questions coming soon...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                                        currentStep === 0 
                                            ? 'text-gray-400 cursor-not-allowed' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    Back
                                </button>

                                {currentStep < totalSteps - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={currentStep === 0 && !isStep1Valid}
                                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                                            (currentStep === 0 && !isStep1Valid)
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                        }`}
                                    >
                                        Next
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}