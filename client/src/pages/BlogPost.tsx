import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
} from "lucide-react";
import { SiX, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import ReactMarkdown from "react-markdown";
import { getWPPostBySlug, getWPPosts } from "@/lib/wordpress";
import { blogPosts as staticPosts } from "@/data/blog-posts";
import { BlogPost as BlogPostType } from "@/data/blog-types";
import { formatDate } from "@/data/blog-config";
import "./BlogPost.css";

// Determines if content is HTML vs markdown
const isHtml = (content: string): boolean => content.trim().startsWith('<');

// Shared ReactMarkdown components for legacy hardcoded string posts
const markdownComponents = {
    p: ({ children }: any) => <p className="text-foreground mb-4 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-foreground font-bold text-xl md:text-2xl mb-4 mt-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-foreground font-bold text-lg md:text-xl mb-3 mt-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-foreground font-semibold text-base md:text-lg mb-2 mt-4">{children}</h3>,
    li: ({ children }: any) => <li className="text-foreground mb-1 leading-relaxed">{children}</li>,
    strong: ({ children }: any) => <strong className="text-foreground font-semibold">{children}</strong>,
    ul: ({ children }: any) => <ul className="mb-4 pl-6">{children}</ul>,
    ol: ({ children }: any) => <ol className="mb-4 pl-6">{children}</ol>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
    a: ({ href, children }: any) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline transition-colors duration-200">
            {children}
        </a>
    ),
};

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const [location] = useLocation();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
    
    useEffect(() => {
        async function fetchPost() {
            if (id) {
                setLoading(true);
                try {
                    const foundPost = await getWPPostBySlug(id) ?? staticPosts.find(p => p.id === id) ?? null;
                    setPost(foundPost || null);
                } catch (error) {
                    console.error("Error fetching post:", error);
                    setPost(null);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchPost();
    }, [id]);

    useEffect(() => {
        let isCurrentRequest = true;

        getWPPosts()
            .then((posts) => {
                if (isCurrentRequest) setRelatedPosts(posts);
            })
            .catch((error) => {
                console.error("Error fetching related articles:", error);
                if (isCurrentRequest) {
                    setRelatedPosts(staticPosts);
                }
            });

        return () => {
            isCurrentRequest = false;
        };
    }, []);

    const recommendedPosts = post
        ? relatedPosts
              .filter((relatedPost) => relatedPost.id !== post.id)
              .sort((a, b) => {
                  const categoryMatch =
                      Number(b.category === post.category) -
                      Number(a.category === post.category);
                  return (
                      categoryMatch ||
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
              })
              .slice(0, 3)
        : [];
    
    // Determine back URL based on query parameter or default to /our-insights
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const from = searchParams.get('from');
    const backUrl = from === 'blog' ? '/blog' : '/our-insights';

    if (loading) {
        return (
            <div className="blog-post-page min-h-screen">
                <Header />
                <main className="blog-post-main pt-16">
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 text-center">
                        <p className="text-muted-foreground">Loading article...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog-post-page min-h-screen">
                <Header />
                <main className="blog-post-main pt-16">
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Article Not Found
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            The article you're looking for doesn't exist.
                        </p>
                        <Button
                            onClick={() => (window.location.href = backUrl)}
                        >
                            Back to Blog
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="blog-post-page min-h-screen">
            <Helmet>
                <title>{post.title} | Mustarred Africa</title>
                <meta name="description" content={post.excerpt.slice(0, 160)} />
                <meta property="og:title" content={`${post.title} | Mustarred Africa`} />
                <meta property="og:description" content={post.excerpt.slice(0, 160)} />
                {post.image && <meta property="og:image" content={post.image} />}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | Mustarred Africa`} />
                <meta name="twitter:description" content={post.excerpt.slice(0, 160)} />
            </Helmet>
            <Header />
            <main className="blog-post-main pt-24">
                <article className="blog-post-article max-w-4xl mx-auto px-6 md:px-8 py-16">
                    {/* Back Button */}
<Button
                            variant="ghost"
                            className="blog-back-button mb-8"
                            onClick={() => (window.location.href = backUrl)}
                        >
                            Back to {from === 'blog' ? 'Blog' : 'Insights'}
                        </Button>

                    {/* Article Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <Badge variant="secondary">{post.category}</Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.date)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                            </div>
                        </div>

                        <h1
                            className="font-bold mb-6 leading-tight text-2xl md:text-3xl lg:text-4xl"
                            style={{ fontFamily: "Satoshi, sans-serif" }}
                        >
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">
                                {post.author}
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: post.title,
                                            text: post.title,
                                            url: window.location.href,
                                        });
                                    } else {
                                        navigator.clipboard.writeText(
                                            window.location.href
                                        );
                                        alert(
                                            "Article link copied to clipboard!"
                                        );
                                    }
                                }}
                            >
                                Share
                            </Button>
                        </div>
                    </header>

                    {/* Article Content */}
                    <>
                        {post.image && (
                            <div className="mb-8 md:mb-12">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div
                            className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-foreground"
                            style={{ fontFamily: "Satoshi, sans-serif" }}
                        >
                            {isHtml(post.content) ? (
                                <div className="space-y-4 leading-relaxed [&>p]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-1" dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : (
                                <ReactMarkdown components={markdownComponents}>
                                    {post.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    </>

                    {/* Article Footer */}
                    <footer className="mt-16 pt-8 border-t">
                        <div className="flex flex-wrap items-center justify-end gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Share:</span>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank" rel="noopener noreferrer"
                                    aria-label="Share on X"
                                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                                >
                                    <SiX className="h-4 w-4" />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank" rel="noopener noreferrer"
                                    aria-label="Share on LinkedIn"
                                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                                >
                                    <FaLinkedin className="h-4 w-4" />
                                </a>
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                                    target="_blank" rel="noopener noreferrer"
                                    aria-label="Share on WhatsApp"
                                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                                >
                                    <SiWhatsapp className="h-4 w-4 text-green-500" />
                                </a>
                            </div>
                        </div>
                        {/* Internal links */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Explore our services</p>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <a href="/services" className="text-[#4b4ba3] hover:underline">Our Services</a>
                                <span className="text-gray-300">|</span>
                                <a href="/cac-registration" className="text-[#4b4ba3] hover:underline">CAC Registration</a>
                                <span className="text-gray-300">|</span>
                                <a href="/dcmi-compliance" className="text-[#4b4ba3] hover:underline">DCMI Compliance</a>
                                <span className="text-gray-300">|</span>
                                <a href="/training" className="text-[#4b4ba3] hover:underline">Training</a>
                                <span className="text-gray-300">|</span>
                                <a href="/our-insights" className="text-[#4b4ba3] hover:underline">More Insights</a>
                            </div>
                        </div>
                    </footer>
                </article>

                {recommendedPosts.length > 0 && (
                    <section
                        aria-labelledby="related-articles-heading"
                        className="blog-related-section mx-auto max-w-7xl px-6 pb-16 md:px-8"
                    >
                        <h2
                            id="related-articles-heading"
                            className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl"
                        >
                            You May Also Like
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {recommendedPosts.map((relatedPost) => (
                                <a
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.id}?from=${from === "blog" ? "blog" : "insights"}`}
                                    className="blog-related-card overflow-hidden rounded-xl border"
                                >
                                    {relatedPost.image && (
                                        <img
                                            src={relatedPost.image}
                                            alt=""
                                            className="aspect-[16/9] w-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-5">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide">
                                            {relatedPost.category}
                                        </p>
                                        <h3 className="mb-3 text-lg font-semibold leading-snug">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                <section
                    aria-label="Subscribe to email updates"
                    className="blog-newsletter-section mx-auto max-w-4xl px-6 pb-16 md:px-8"
                >
                    <div className="blog-newsletter">
                        <MailchimpNewsletter />
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
