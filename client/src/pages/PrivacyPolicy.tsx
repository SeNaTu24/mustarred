import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = "Privacy Notice - Mustarred";
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50 pt-24 sm:pt-28 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Table of Contents - Sticky Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">Contents</h3>
                            <nav className="space-y-2">
                                <button onClick={() => scrollToSection('introduction')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Introduction</button>
                                <button onClick={() => scrollToSection('how-we-collect')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">How We Collect Personal Data</button>
                                <button onClick={() => scrollToSection('your-rights')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Your Rights</button>
                                <button onClick={() => scrollToSection('information-we-collect')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">The Information we Collect</button>
                                <button onClick={() => scrollToSection('data-usage')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Data Usage</button>
                                <button onClick={() => scrollToSection('data-necessity')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Data Necessity</button>
                                <button onClick={() => scrollToSection('consent')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Your Consent</button>
                                <button onClick={() => scrollToSection('cookies')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Cookies</button>
                                <button onClick={() => scrollToSection('employee-confidentiality')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Employee Confidentiality</button>
                                <button onClick={() => scrollToSection('data-transfer')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Transfer of Personal Data</button>
                                <button onClick={() => scrollToSection('third-party')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Third-Party Links</button>
                                <button onClick={() => scrollToSection('data-retention')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Data Retention</button>
                                <button onClick={() => scrollToSection('data-protection')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">How We Protect Your Data</button>
                                <button onClick={() => scrollToSection('updates')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Updates to This Notice</button>
                                <button onClick={() => scrollToSection('complaints')} className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left w-full py-1.5 px-2 rounded transition-colors">Complaints and Contact</button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Privacy Notice</h1>
                        
                        <section id="introduction" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Introduction</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                Here at Mustarred Limited ("Mustarred", the "Firm", or "we" or "us"), we greatly value your privacy. It is our obligation to protect your personal data whenever you interact with us physically or digitally. This Privacy Notice (the "Notice") details how we collect, process, use, store, and share your personal data when you engage with us. Everything is in strict compliance with the laws!
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                You may still have questions. So, please feel free to reach out to us via <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>, and we will respond very quickly, within 24 - 72 hours.
                            </p>
                        </section>

                        <section id="how-we-collect" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">How We Collect Personal Data</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">We typically collect your personal data through one or more media:</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Clients</h3>
                                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1">
                                        <li>You are a representative, director, employee, consultant, or authorised contact of any of our clients;</li>
                                        <li>You directly engage Mustarred for advisory, consulting, training, or compliance-related services;</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Prospective Clients</h3>
                                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1">
                                        <li>You contact us to enquire about our services or request information;</li>
                                        <li>You commence an onboarding, proposal, or engagement process with us but do not complete it;</li>
                                        <li>You interact with our business development teams in relation to potential services.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Site Visitors</h3>
                                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1">
                                        <li>You visit or interact with our website;</li>
                                        <li>You submit information through our website forms, contact pages, or other online interfaces.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Subscription and Community Engagement</h3>
                                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1">
                                        <li>You subscribe to our newsletters;</li>
                                        <li>You register for or participate in our events, webinars, training sessions, or community initiatives.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Recruitment / Employment</h3>
                                    <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1">
                                        <li>You participate in our recruitment or selection process, whether successfully or otherwise; for employees, you are advised to refer to our employee privacy policy.</li>
                                        <li>You are a former staff member of Mustarred.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section id="your-rights" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Your Rights</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">You can exercise the following rights with respect to your personal data with Mustarred:</p>
                            <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-2">
                                <li>Request and access your Personal Data collected and stored by Mustarred;</li>
                                <li>Withdraw consent at any time. For example, you can withdraw your consent to receive our marketing or promotional materials or unsubscribe to our newsletters;</li>
                                <li>Object to automated decision-making;</li>
                                <li>Request rectification and modification of Personal Data kept by Mustarred;</li>
                                <li>Request for deletion of your Personal Data;</li>
                                <li>Refuse or disable cookies by adjusting your device browser settings. However, if you choose to refuse, disable, or delete cookies, some of the functionality of the Platform may no longer be available to you;</li>
                                <li>Be informed of and entitled to provide consent prior to the processing of Personal Data for purposes other than that for which the Personal Data were collected;</li>
                                <li>Request that Mustarred restrict processing of your Personal Data; and</li>
                                <li>Request for information regarding any specific processing of your personal data.</li>
                            </ul>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                                You may exercise any of these rights by sending an email to <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>, where your requests will be treated promptly. You may also reach out to the regulator through <a href="mailto:info@ndpc.gov.ng" className="text-blue-600 hover:text-blue-800 underline">info@ndpc.gov.ng</a>
                            </p>
                        </section>

                        <section id="information-we-collect" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">The Information we Collect</h2>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <table className="min-w-full border border-gray-300 text-xs sm:text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Information We Collect</th>
                                            <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">How We Use It</th>
                                            <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Lawful Basis</th>
                                            <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Who We Share With</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Contact and Identification Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To communicate with you; Respond to enquiries</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Contract; Legitimate interest</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Engagement and Correspondence Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To assess service requests; Deliver services</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Contract; Legitimate interest</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Due Diligence Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To conduct business acceptance checks</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Legal obligation</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Website and Technical Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To operate, secure, and improve our website</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Legitimate interest</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Subscription Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To send newsletters and updates</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Consent</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Newsletter platforms</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Event Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To manage participation</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Consent</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Event platforms</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Recruitment Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To assess candidates</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Legitimate interest</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Background check providers</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Regulatory Information</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">To comply with laws</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Legal obligation</td>
                                            <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">Regulators</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section id="data-usage" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Data Usage</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We collect and process your personal data only for the specific and legitimate purposes that we tell you at the time of collecting that data.
                            </p>
                        </section>

                        <section id="data-necessity" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Data Necessity</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                We only collect or utilize the portion of your personal data that is relevant, adequate, and necessary for the engagement.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We may anonymize your personal data completely for purposes outside the scope of why we collected it.
                            </p>
                        </section>

                        <section id="consent" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Your Consent</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                You may withdraw your consent at any time by emailing <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Withdrawing consent will not affect the lawfulness of any processing carried out before the withdrawal.
                            </p>
                        </section>

                        <section id="cookies" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Cookies</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Our website does not use cookies or similar tracking technologies.
                            </p>
                        </section>

                        <section id="employee-confidentiality" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Employee Confidentiality</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                All employees are subject to confidentiality obligations and process personal data only in accordance with this Notice.
                            </p>
                        </section>

                        <section id="data-transfer" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Transfer of Personal Data</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We may transfer personal data outside Nigeria with appropriate safeguards in accordance with applicable data protection laws.
                            </p>
                        </section>

                        <section id="third-party" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Third-Party Links</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                            </p>
                        </section>

                        <section id="data-retention" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Data Retention</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected.
                            </p>
                        </section>

                        <section id="data-protection" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">How We Protect Your Data</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We implement appropriate technical, organisational, and administrative security measures to protect personal data.
                            </p>
                        </section>

                        <section id="updates" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Updates to This Notice</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                We may update this Privacy Notice from time to time. Continued use constitutes acceptance of the revised Notice.
                            </p>
                        </section>

                        <section id="complaints" className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Complaints and Contact</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">Email: <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a></p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">Business Address: No 6, Okun Street, Gbagada, Lagos, Nigeria.</p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                You may lodge a complaint with the NDPC via <a href="mailto:info@ndpc.gov.ng" className="text-blue-600 hover:text-blue-800 underline">info@ndpc.gov.ng</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
