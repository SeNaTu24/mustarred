import React, { createContext, useContext, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs-config';
import { trackEvent, trackFormSubmit, trackDownload } from '@/lib/analytics';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    selectedResource?: string;
    subscribeNewsletter: boolean;
}

interface ModalContextType {
    openModal: (title: string, description?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        selectedResource: "",
        subscribeNewsletter: false
    });
    const [showThankYou, setShowThankYou] = useState(false);

    const openModal = (title: string, description?: string) => {
        trackEvent('modal_open', {
            event_category: 'engagement',
            event_label: title
        });
        setModalTitle(title);
        setModalDescription(description || "");
        setIsOpen(true);
        setShowThankYou(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Subscribe to newsletter if consent given
        if (formData.subscribeNewsletter && formData.email && formData.name) {
            try {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.name = 'mailchimp-iframe';
                document.body.appendChild(iframe);

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://mustarred.us12.list-manage.com/subscribe/post';
                form.target = 'mailchimp-iframe';
                
                const fields = [
                    { name: 'u', value: 'cdd12424c1d674fa391e8e63e' },
                    { name: 'id', value: '22107e23a3' },
                    { name: 'EMAIL', value: formData.email },
                    { name: 'FNAME', value: formData.name }
                ];
                
                fields.forEach(field => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = field.name;
                    input.value = field.value;
                    form.appendChild(input);
                });
                
                document.body.appendChild(form);
                form.submit();
                
                setTimeout(() => {
                    document.body.removeChild(form);
                    document.body.removeChild(iframe);
                }, 1000);
            } catch (error) {
                console.error('Newsletter subscription failed:', error);
            }
        }
        
        // If it's GAID or SME download, send email notification and trigger download
        if (modalDescription?.includes("GAID") || modalDescription?.includes("SME")) {
            const isGAID = modalDescription?.includes("GAID");
            const resourceName = isGAID ? 'GAID 2025 Guidelines' : 'SME Compliance Guide';
            const fileName = isGAID ? 'Are You GAID-Ready 3.pdf' : 'SME GUIDEE.pdf';
            const emoji = isGAID ? '🎯' : '📊';
            
            trackDownload(`${resourceName} PDF`);
            try {
                // Send email notification via EmailJS
                const emailMessage = `
New ${resourceName} Download Request

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Resource: ${resourceName}
Newsletter Consent: ${formData.subscribeNewsletter ? 'Yes' : 'No'}
Time: ${new Date().toLocaleString()}
                `.trim();

                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM,
                    {
                        to_email: 'info@mustarred.com',
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: `${emoji} New ${resourceName} Download`,
                        message: emailMessage
                    },
                    EMAILJS_CONFIG.PUBLIC_KEY
                );
                
                // Trigger PDF download
                const filePath = `/assets/resources/${encodeURIComponent(fileName)}`;
                
                // Method 1: Create download link
                const link = document.createElement('a');
                link.href = filePath;
                link.download = fileName;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Method 2: Fallback to window.open
                setTimeout(() => {
                    window.open(filePath, '_blank');
                }, 100);
                
                setShowThankYou(true);
            } catch (error) {
                console.error(`${resourceName} email notification failed:`, error);
                // Still show success and download even if email fails
                setShowThankYou(true);
                
                // Trigger download anyway
                const filePath = `/assets/resources/${encodeURIComponent(fileName)}`;
                const link = document.createElement('a');
                link.href = filePath;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            // For other forms, try to send email
            trackFormSubmit(modalTitle);
            try {
                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM,
                    {
                        name: formData.name,
                        email: formData.email,
                        title: modalTitle,
                        message: formData.message
                    },
                    EMAILJS_CONFIG.PUBLIC_KEY
                );
                setShowThankYou(true);
            } catch (error) {
                console.error('Failed to send email:', error);
                alert('Failed to send email. Please try again or contact us directly.');
                return;
            }
        }
        
        setTimeout(() => {
            setIsOpen(false);
            setShowThankYou(false);
            setFormData({ name: "", email: "", phone: "", company: "", message: "", selectedResource: "", subscribeNewsletter: false });
            document.getElementById("more-content")?.scrollIntoView({ behavior: "smooth" });
        }, 3000);
    };

    return (
        <ModalContext.Provider value={{ openModal }}>
            {children}
            
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md mx-4 shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
                        <Dialog.Close className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full">
                            <X className="h-4 w-4" />
                        </Dialog.Close>
                        
                        {!showThankYou ? (
                            <>
                                <Dialog.Title className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 pr-8">
                                    {modalTitle}
                                </Dialog.Title>
                                {modalDescription && (
                                    <Dialog.Description className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                                        {modalDescription}
                                    </Dialog.Description>
                                )}
                                
                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        />
                                    </div>
                                    {!modalDescription?.includes("GAID") && !modalDescription?.includes("SME") && (
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                {modalTitle.includes("Resource") ? "Which resources do you need?" : "How can we help you?"} *
                                            </label>
                                            {modalTitle.includes("Resource") ? (
                                                <select
                                                    required
                                                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                    value={formData.selectedResource}
                                                    onChange={(e) => setFormData({...formData, selectedResource: e.target.value})}
                                                >
                                                    <option value="">Select a resource...</option>
                                                    <option value="GAID Compliance Guide">GAID Compliance Guide</option>
                                                    <option value="Data Protection Templates">Data Protection Templates</option>
                                                    <option value="Privacy Policy Template">Privacy Policy Template</option>
                                                    <option value="Terms of Service Template">Terms of Service Template</option>
                                                    <option value="Cookie Policy Template">Cookie Policy Template</option>
                                                    <option value="GDPR Compliance Checklist">GDPR Compliance Checklist</option>
                                                    <option value="AI Governance Framework">AI Governance Framework</option>
                                                    <option value="Risk Assessment Template">Risk Assessment Template</option>
                                                    <option value="All Resources Package">All Resources Package</option>
                                                </select>
                                            ) : (
                                                <textarea
                                                    required
                                                    rows={3}
                                                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                                                    placeholder="Tell us about your needs..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                />
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-start gap-2 pt-2">
                                        <input
                                            type="checkbox"
                                            id="newsletter-consent"
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500"
                                            checked={formData.subscribeNewsletter}
                                            onChange={(e) => setFormData({...formData, subscribeNewsletter: e.target.checked})}
                                        />
                                        <label htmlFor="newsletter-consent" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                                            I'd like to receive compliance insights and updates via email
                                        </label>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 sm:py-3 mt-4 sm:mt-6 text-sm sm:text-base"
                                    >
                                        {(modalDescription?.includes("GAID") || modalDescription?.includes("SME")) ? "Download Now" : "Submit Request"}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-6 sm:py-8">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                    {(modalDescription?.includes("GAID") || modalDescription?.includes("SME"))
                                        ? `Download should start automatically. Check your downloads folder!`
                                        : `Thank you for your submission. Our team will contact you within 24 hours.`
                                    }
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Discover more about our services below...
                                </p>
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}