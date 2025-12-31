// Logo path will be used directly
import { useModal } from "@/contexts/ModalContext";

export default function Footer() {
    const { openModal } = useModal();
    const handleFooterNavigation = (href: string) => {
        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            
            // If we're on the homepage and element exists, scroll to it
            if (el && window.location.pathname === "/") {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If we're on another page, go to homepage with hash
                window.location.href = `/${href}`;
            }
        } else {
            window.location.href = href;
        }
    };

    return (
        <footer className="text-white py-16 mt-0 relative overflow-hidden" style={{backgroundColor: 'rgb(30,17,56)'}}>
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Mobile: Logo section spans full width */}
                <div className="block sm:hidden mb-8">
                    <div className="flex items-center mb-4">
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred"
                            className="h-20 w-auto object-contain brightness-0 invert"
                        />
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        ...for the startups that scale
                    </p>
                    <p className="text-xs text-gray-400">
                        Legal compliance made simple for African businesses.
                    </p>
                </div>

                {/* Desktop and Mobile Grid */}
                <div className="grid grid-cols-2 sm:hidden gap-6 mb-8">
                    {/* Mobile: Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#about")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#services")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#testimonials")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Testimonials
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile: Resources & Legal combined */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base">Resources</h4>
                        <ul className="space-y-2 text-gray-300 text-sm mb-4">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/blog")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Our Insights
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => openModal("Free Resources", "Access our compliance guides and templates")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Free Resources
                                </button>
                            </li>
                        </ul>
                        <h4 className="font-semibold mb-4 text-base">Legal</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/privacy-policy")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/terms-of-service")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                    Terms of Service
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12">
                    <div>
                        <div className="flex items-center mb-6">
                            <img
                                src="/assets/brand/logo.png"
                                alt="Mustarred"
                                className="h-24 w-auto object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            ...for the startups that scale
                        </p>
                        <p className="text-sm text-gray-400">
                            Legal compliance made simple for African businesses.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#about")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#services")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("#testimonials")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Testimonials
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-lg">Resources</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/blog")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Our Insights
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => openModal("Free Resources", "Access our compliance guides and templates")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Free Resources
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-lg">Legal</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/privacy-policy")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFooterNavigation("/terms-of-service")}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                                    Terms of Service
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-700 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400">
                            &copy; {new Date().getFullYear()} Mustarred. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>Made with ❤️ for African businesses</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
