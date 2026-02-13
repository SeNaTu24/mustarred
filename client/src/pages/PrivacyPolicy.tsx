import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicy() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex gap-8">
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
                    <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Privacy Notice</h1>
                        
                        <section id="introduction" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Here at Mustarred Limited ("Mustarred", the "Firm", or "we" or "us"), we greatly value your privacy. It is our obligation to protect your personal data whenever you interact with us physically or digitally. This Privacy Notice (the "Notice") details how we collect, process, use, store, and share your personal data when you engage with us. Everything is in strict compliance with the laws!
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You may still have questions. So, please feel free to reach out to us via <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>, and we will respond very quickly, within 24 - 72 hours.
                            </p>
                        </section>

                        <section id="how-we-collect" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Collect Personal Data</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We typically collect your personal data through one or more media:</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Clients</h3>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                        <li>You are a representative, director, employee, consultant, or authorised contact of any of our clients;</li>
                                        <li>You directly engage Mustarred for advisory, consulting, training, or compliance-related services;</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Prospective Clients</h3>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                        <li>You contact us to enquire about our services or request information;</li>
                                        <li>You commence an onboarding, proposal, or engagement process with us but do not complete it;</li>
                                        <li>You interact with our business development teams in relation to potential services.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Site Visitors</h3>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                        <li>You visit or interact with our website;</li>
                                        <li>You submit information through our website forms, contact pages, or other online interfaces.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription and Community Engagement</h3>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                        <li>You subscribe to our newsletters;</li>
                                        <li>You register for or participate in our events, webinars, training sessions, or community initiatives.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recruitment / Employment</h3>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                        <li>You participate in our recruitment or selection process, whether successfully or otherwise; for employees, you are advised to refer to our employee privacy policy.</li>
                                        <li>You are a former staff member of Mustarred.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section id="your-rights" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">You can exercise the following rights with respect to your personal data with Mustarred:</p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
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
                            <p className="text-gray-700 leading-relaxed mt-4">
                                You may exercise any of these rights by sending an email to <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>, where your requests will be treated promptly. You may also reach out to the regulator through <a href="mailto:info@ndpc.gov.ng" className="text-blue-600 hover:text-blue-800 underline">info@ndpc.gov.ng</a>
                            </p>
                        </section>

                        <section id="information-we-collect" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Information we Collect</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Information We Collect</th>
                                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">How We Use It</th>
                                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Lawful Basis for Processing</th>
                                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Who We Share the Data With</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Contact and Identification Information – this includes name, email address, phone number, job title, organisation name, and NIN.</td>
                                            <td className="border border-gray-300 px-4 py-3">To communicate with you; Respond to enquiries; Provide advisory and consulting services; and Manage client and business relationships</td>
                                            <td className="border border-gray-300 px-4 py-3">Contract; Legitimate interest</td>
                                            <td className="border border-gray-300 px-4 py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Engagement and Correspondence Information – this includes emails, proposals, onboarding records, meeting notes, complaints, feedback and other communications (including messages sent via social media platforms) linked to identifiable individuals</td>
                                            <td className="border border-gray-300 px-4 py-3">To assess service requests; Deliver services; Maintain records; and Improve our offerings</td>
                                            <td className="border border-gray-300 px-4 py-3">Contract; Legitimate interest</td>
                                            <td className="border border-gray-300 px-4 py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Due Diligence and Business Acceptance Information – this includes personal data of beneficial owners, controllers, or key personnel (such as names, nationality, employment history) obtained from public sources</td>
                                            <td className="border border-gray-300 px-4 py-3">To conduct business acceptance checks; Comply with regulatory and Professional obligations</td>
                                            <td className="border border-gray-300 px-4 py-3">Legal obligation; Legitimate interest</td>
                                            <td className="border border-gray-300 px-4 py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Website and Technical Information – this includes IP address, server log files, date and time of access, and limited browser or device information automatically generated when you access our website.</td>
                                            <td className="border border-gray-300 px-4 py-3">To operate, secure, and improve our website; Prevent fraud and misuse</td>
                                            <td className="border border-gray-300 px-4 py-3">Legitimate interest</td>
                                            <td className="border border-gray-300 px-4 py-3">Not Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Subscription and Community Information – this includes name (optional), email address, subscription preferences</td>
                                            <td className="border border-gray-300 px-4 py-3">To send newsletters, policy alerts, and community updates.</td>
                                            <td className="border border-gray-300 px-4 py-3">Consent</td>
                                            <td className="border border-gray-300 px-4 py-3">Newsletter platforms Shared</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Event and Webinar Information – this includes name, email address, and other registration details</td>
                                            <td className="border border-gray-300 px-4 py-3">To share event information, manage participation and post event feedback</td>
                                            <td className="border border-gray-300 px-4 py-3">Consent</td>
                                            <td className="border border-gray-300 px-4 py-3">Event hosting platforms</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Recruitment Information – this includes CVs, application forms, interview notes, and contact details</td>
                                            <td className="border border-gray-300 px-4 py-3">To assess candidates; Manage recruitment and HR processes</td>
                                            <td className="border border-gray-300 px-4 py-3">Legitimate interest; Contract; Consent Legal obligation</td>
                                            <td className="border border-gray-300 px-4 py-3">Background check service provider</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-3">Regulatory and Compliance Information – this includes records required to meet legal or regulatory obligations involving identifiable individuals</td>
                                            <td className="border border-gray-300 px-4 py-3">To comply with applicable laws, regulatory requests, and professional standards</td>
                                            <td className="border border-gray-300 px-4 py-3">Legal obligation</td>
                                            <td className="border border-gray-300 px-4 py-3">Regulators</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section id="data-usage" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">We only use your data for the cause we tell you. No hidden agenda.</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We collect and process your personal data only for the specific and legitimate purposes that we tell you at the time of collecting that data. Where we need to reuse you data for anything else, we will inform you beforehand, or rely on any other strict legal options available to us
                            </p>
                        </section>

                        <section id="data-necessity" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">We only collect, use and/or store what is necessary</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you deal with us, you can rest assured that we only collect or utilize the portion of your personal data that is limit the personal data we collect and process to what is relevant, adequate, and necessary for the engagement. We are always on the lookout to ensure that our activities are aligned with this promise.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                What we may also do is to anonymize your personal data completely for purposes that are outside of the scope of why we collected your personal data.
                            </p>
                        </section>

                        <section id="consent" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Consent is always yours to retract.</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Anytime we ask for you consent to process your personal data, you may decide to give us that consent, or give us at that initial stage and take it back later, at any time, really. At any time you intend to take back your consent, please send us an email at <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>. For things like newsletters or forms, you may simply click the , "unsubscribe" or "opt-out" options.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Please note that withdrawing your consent will not affect the lawfulness of any processing carried out before the withdrawal. However, withdrawal of consent may affect our ability to provide certain services or communications to you.
                            </p>
                        </section>

                        <section id="cookies" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our website does not use cookies or similar tracking technologies.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                However, when you visit our website, our servers may automatically collect limited technical information, such as your IP address and server log data, for the purposes of operating, securing, and maintaining the website. This information is not used to track you across websites or for advertising purposes.
                            </p>
                        </section>

                        <section id="employee-confidentiality" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Employee Confidentiality Obligations</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All Mustarred employees, contractors, and consultants who handle personal data are subject to confidentiality obligations and are required to process personal data only in accordance with this Notice and our internal policies.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Access to personal data is restricted to individuals who require such access to perform their job responsibilities. Any unauthorised processing or disclosure of personal data is treated as a disciplinary matter and may result in appropriate sanctions.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you receive any communication requesting sensitive information from anyone claiming to represent Mustarred, please report the incident to us immediately at <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a>
                            </p>
                        </section>

                        <section id="data-transfer" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transfer of Personal Data</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may transfer personal data to third-party service providers located outside Nigeria, including providers that store or process data in jurisdictions such as the United States and other countries where Google Workspace operates its infrastructure.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Where personal data is transferred outside Nigeria, we ensure that such transfers are carried out in accordance with applicable data protection laws and are subject to appropriate safeguards. These safeguards may include:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>transfer to countries recognised as providing an adequate level of data protection;</li>
                                <li>the use of approved contractual safeguards or data processing agreements; or</li>
                                <li>reliance on your consent, where required by law.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                In addition, we take reasonable technical and organisational measures to protect personal data during such transfers, including access controls, encryption, and contractual obligations on recipients to protect personal data and respect data subject rights.
                            </p>
                        </section>

                        <section id="third-party" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Links</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our website may contain links to third-party websites or platforms that are not operated or controlled by Mustarred. We encourage you to review the privacy policies of such third parties before providing any personal data. Mustarred is not responsible for the privacy practices or content of third-party websites.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                In addition, we may rely on third-party service providers to support the operation and security of our website and systems. These providers may process limited technical information on our behalf strictly for such purposes and are subject to appropriate confidentiality and data protection obligations.
                            </p>
                        </section>

                        <section id="data-retention" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We retain personal data only for as long as is necessary to fulfil the purposes for which it was collected, including for the duration of our relationship with you.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We may also retain personal data for longer periods where required to comply with applicable legal, regulatory, accounting, or reporting obligations. When personal data is no longer required, it is securely deleted or anonymised.
                            </p>
                        </section>

                        <section id="data-protection" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Protect Your Personal Data</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement appropriate technical, organisational, and administrative security measures to protect personal data against loss, misuse, unauthorised access, disclosure, alteration, or destruction. Our safeguards include, but are not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>access controls and role-based permissions;</li>
                                <li>secure cloud infrastructure;</li>
                                <li>encryption and firewall protections;</li>
                                <li>physical and administrative security controls.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Only authorised personnel are permitted to access personal data, and any processing carried out outside an individual's authorised role is considered unauthorised.
                            </p>
                        </section>

                        <section id="updates" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Privacy Notice</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Notice from time to time to reflect changes in our practices, technology, or legal obligations. Where material changes are made, we will update the effective date on our website.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We encourage you to review this Privacy Notice periodically. Continued use of our website or services after updates take effect constitutes acceptance of the revised Privacy Notice.
                            </p>
                        </section>

                        <section id="complaints" className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complaints and Contact</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions, concerns, or complaints regarding this Privacy Notice or how we process your personal data, or if you wish to exercise your data protection rights, please contact us at:
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-2">Email: <a href="mailto:privacy@mustarred.com" className="text-blue-600 hover:text-blue-800 underline">privacy@mustarred.com</a></p>
                            <p className="text-gray-700 leading-relaxed mb-4">Business Address: No 6, Okun Street, Gbagada, Lagos, Nigeria.</p>
                            <p className="text-gray-700 leading-relaxed">
                                If you are not satisfied with our response, you have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) via <a href="mailto:info@ndpc.gov.ng" className="text-blue-600 hover:text-blue-800 underline">info@ndpc.gov.ng</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
