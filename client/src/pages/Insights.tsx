import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/contexts/ModalContext";
import { blogPosts } from "@/data/blog-posts";
import { useState } from "react";

export default function Insights() {
    const { openModal } = useModal();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-background">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                        Our Insights and Updates
                    </h1>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                        Stay informed with expert insights on compliance, regulations, and governance best practices for African businesses.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Resource Spotlight */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Featured Resource
                                </span>
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Free Download
                                </span>
                            </div>
                            
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Are You GAID-Ready?
                            </h2>
                            
                            <p className="text-xl text-gray-700 mb-8">
                                Essential GAID 2025 Guidelines for DPOS and SMES
                            </p>

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    What's Inside:
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                                        Definition of Acronyms
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                                        Introduction & Governance Registration
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                                        Core Processing Principles & Lawful Bases
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                                        Technical & Operational Measures
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                                        Transparency & Data Subject Rights
                                    </li>
                                </ul>
                            </div>

                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                                onClick={() => openModal("Free Resources", "I'd like to download the GAID 2025 Guidelines")}
                            >
                                <Download className="mr-3 h-5 w-5" />
                                Download Free Guide
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/assets/images/blog/gaidImage.PNG"
                                    alt="GAID Guidelines"
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Insights */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Latest Insights
                    </h2>
                    
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {filteredPosts.map((post, i) => (
                            <div 
                                key={i}
                                className="break-inside-avoid bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div 
                                    className="h-48 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${post.image})`,
                                    }}
                                ></div>
                                
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {post.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => window.location.href = `/blog/${post.id}?from=insights`}
                                    >
                                        Read More
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}