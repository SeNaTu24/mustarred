import BlogHeader from "@/components/layout/BlogHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Mail, MessageSquare } from "lucide-react";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import { useParams } from "wouter";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import ReactMarkdown from "react-markdown";
import { getPostById } from "@/data/blog-posts";
import { formatDate } from "@/data/blog-config";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id!);

  if (!post) {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = '/blog'}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }



  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="pt-24">
        <article className="max-w-4xl mx-auto px-6 md:px-8 py-16">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-8"
            onClick={() => window.location.href = '/blog'}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
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
            
            <h1 className="font-bold mb-6 leading-tight" style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '40px' }}>
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">By {post.author}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          {post.category === "Mustarred Insights" ? (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-foreground" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <ReactMarkdown 
                  components={{
                    p: ({ children }) => <p className="text-foreground mb-4 leading-relaxed">{children}</p>,
                    h1: ({ children }) => <h1 className="text-foreground font-bold text-xl md:text-2xl mb-4 mt-8">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-foreground font-bold text-lg md:text-xl mb-3 mt-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-foreground font-semibold text-base md:text-lg mb-2 mt-4">{children}</h3>,
                    li: ({ children }) => <li className="text-foreground mb-1 leading-relaxed">{children}</li>,
                    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                    ul: ({ children }) => <ul className="mb-4 pl-6">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-4 pl-6">{children}</ol>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline transition-colors duration-200"
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
              <div className="flex items-start">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 md:mb-12">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 md:h-64 lg:h-80 object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  loading="lazy"
                />
              </div>
              <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert text-foreground" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <ReactMarkdown 
                  components={{
                    p: ({ children }) => <p className="text-foreground mb-4 leading-relaxed">{children}</p>,
                    h1: ({ children }) => <h1 className="text-foreground font-bold text-xl md:text-2xl mb-4 mt-8">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-foreground font-bold text-lg md:text-xl mb-3 mt-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-foreground font-semibold text-base md:text-lg mb-2 mt-4">{children}</h3>,
                    li: ({ children }) => <li className="text-foreground mb-1 leading-relaxed">{children}</li>,
                    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                    ul: ({ children }) => <ul className="mb-4 pl-6">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-4 pl-6">{children}</ol>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline transition-colors duration-200"
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/blog'}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                More Articles
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </footer>
        </article>

        {/* Contact Section */}
        <section id="contact" className="py-8 md:py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to protect your business? Contact us for a
                  consultation or to learn more about how we can
                  assist you.
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
                      onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com', '_blank')}
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
                        { icon: SiX, label: "X", href: "https://x.com/mustarred" },
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