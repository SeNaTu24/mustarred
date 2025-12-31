import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    ArrowRight,
    Search,
    Mail,
    MessageSquare,
    Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import React, { useState } from "react";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import EbookDownloadModal from "@/components/EbookDownloadModal";
import { getPostsByCategory } from "@/data/blog-posts";
import { BLOG_CATEGORIES } from "@/data/blog-config";
import { formatDate } from "@/data/blog-config";
import { BlogCategory } from "@/data/blog-types";

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<BlogCategory>("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Optimized filtering with better performance
    const filteredPosts = React.useMemo(() => {
        let posts = getPostsByCategory(selectedCategory);

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            posts = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchLower) ||
                    post.excerpt.toLowerCase().includes(searchLower) ||
                    post.content.toLowerCase().includes(searchLower)
            );
        }

        return posts;
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-16 sm:pt-20 md:pt-24">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-background">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
                            Our Insights and Updates
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                            Stay informed with expert insights on compliance,
                            regulations, and governance best practices for
                            African businesses.
                        </p>

                        {/* Search and Filter */}
                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {BLOG_CATEGORIES.map((category) => (
                                    <Button
                                        key={category}
                                        variant={
                                            selectedCategory === category
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className="transition-all duration-200 hover:scale-105"
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured PDF Download Section - SPOTLIGHT */}
                <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                                Essential GAID 2025 Compliance Guide
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Get ahead of regulatory requirements with our comprehensive guide
                            </p>
                        </div>

                        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl border-2 border-blue-200">
                            <div className="flex flex-col">
                                <div 
                                    className="h-48 sm:h-56 md:h-64 lg:h-80 bg-cover bg-center bg-no-repeat relative"
                                    style={{
                                        backgroundImage: 'url(/assets/images/blog/gaidImage.PNG)'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                        <Badge className="bg-blue-600 text-white text-xs">
                                            Featured Resource
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                                        <Badge variant="outline" className="bg-white/90 text-xs">
                                            Free Download
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                                        Are You GAID-Ready?
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                                        Essential GAID 2025 Guidelines for DPOS and SMES
                                    </p>
                                    <div className="mb-4 sm:mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                                            What's Inside:
                                        </h4>
                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-start">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                                <span>Definition of Acronyms</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                                <span>Introduction & Governance Registration</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                                <span>Core Processing Principles & Lawful Bases</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                                <span>Technical & Operational Measures</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                                <span>Transparency & Data Subject Rights</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 text-sm sm:text-base font-semibold"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Free Guide
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                                Latest Articles
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Stay updated with regulatory insights and industry trends
                            </p>
                        </div>
                        
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
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
                                                {formatDate(post.date)}
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
                                            onClick={() => window.location.href = `/blog/${post.id}?from=blog`}
                                        >
                                            Read More
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    No articles found matching your criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-8 md:py-12 bg-card/30">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Let's Connect
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Ready to protect your business? Contact us
                                    for a consultation or to learn more about
                                    how we can assist you.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5 text-primary" />
                                            Get in Touch
                                        </h3>
                                        <Button
                                            size="lg"
                                            data-testid="button-contact"
                                            onClick={() =>
                                                window.open(
                                                    "https://mail.google.com/mail/?view=cm&to=info@mustarred.com",
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Contact Us
                                        </Button>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Mail className="h-5 w-5 text-primary" />
                                            Email
                                        </h3>
                                        <a
                                            href="https://mail.google.com/mail/?view=cm&to=info@mustarred.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            info@mustarred.com
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Follow Us
                                        </h3>
                                        <div className="flex gap-4">
                                            {[
                                                {
                                                    icon: SiX,
                                                    label: "X",
                                                    href: "https://x.com/mustarred",
                                                },
                                                {
                                                    icon: SiLinkedin,
                                                    label: "LinkedIn",
                                                    href: "https://www.linkedin.com/company/mustarred/about/",
                                                },
                                                {
                                                    icon: SiInstagram,
                                                    label: "Instagram",
                                                    href: "https://www.instagram.com/mustarred__crest/",
                                                },
                                            ].map((social, i) => (
                                                <a
                                                    key={i}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={social.label}
                                                    className="p-3 rounded-lg bg-card hover-elevate active-elevate-2"
                                                    data-testid={`link-social-${social.label.toLowerCase()}`}
                                                >
                                                    <social.icon className="h-5 w-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <MailchimpNewsletter />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            
            <EbookDownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
