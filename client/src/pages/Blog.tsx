import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import React, { useState } from "react";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import { getPostsByCategory } from "@/data/blog-posts";
import { BLOG_CATEGORIES } from "@/data/blog-config";
import { formatDate } from "@/data/blog-config";
import { BlogCategory } from "@/data/blog-types";

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<BlogCategory>("All");

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
            <main className="pt-24">
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

                {/* Blog Posts */}
                <section className="py-16 bg-card/30">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    className="hover-elevate flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden"
                                >
                                    <CardHeader className="space-y-3 p-4 md:p-6">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="secondary"
                                                className="w-fit text-xs"
                                            >
                                                {post.category}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg md:text-xl leading-tight line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 flex-grow p-4 md:p-6 pt-0">
                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                            {formatDate(post.date)}
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="mt-auto p-4 md:p-6 pt-0">
                                        <Button
                                            variant="outline"
                                            className="w-full transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                                            onClick={() =>
                                                (window.location.href = `/blog/${post.id}`)
                                            }
                                        >
                                            Read Article
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardFooter>
                                </Card>
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
        </div>
    );
}
