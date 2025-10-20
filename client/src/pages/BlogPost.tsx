import BlogHeader from "@/components/layout/BlogHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import { useParams } from "wouter";
import ReactMarkdown from "react-markdown";
import ndprImage from "@assets/ndpr_article_img.webp";


const blogPosts = {
  "1": {
    id: 1,
    title: "Understanding NDPR Compliance for Nigerian Startups",
    content: `
## Introduction

The Nigeria Data Protection Regulation (NDPR) is a comprehensive data protection law that governs the processing of personal data in Nigeria. For startups operating in Nigeria, understanding and complying with NDPR is crucial for avoiding penalties and building trust with customers.

## Key Requirements

NDPR requires organizations to:

- Obtain consent before processing personal data
- Implement appropriate security measures
- Appoint a Data Protection Officer (DPO)
- Conduct Data Protection Impact Assessments (DPIA)
- Report data breaches within 72 hours

## Implementation Steps

To achieve NDPR compliance, startups should:

1. Conduct a data audit to understand what personal data you collect
2. Update privacy policies and consent mechanisms
3. Implement technical and organizational security measures
4. Train staff on data protection principles
5. Establish procedures for handling data subject requests

## Conclusion

NDPR compliance is not just about avoiding penalties—it's about building a foundation of trust with your customers and stakeholders. By implementing proper data protection measures, startups can demonstrate their commitment to privacy and security.
    `,
    category: "Data Protection",
    date: "2024-01-15",
    readTime: "5 min read",
    author: "Mustarred Team"
  }
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts[id as keyof typeof blogPosts];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
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

          {/* Article Image */}
          {post.id === 1 && (
            <div className="mb-12">
              <img 
                src={ndprImage} 
                alt="NDPR Compliance Guide" 
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

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
                <div className="p-8 rounded-lg bg-card">
                  <h3 className="text-2xl font-bold mb-4">
                    Subscribe to our Newsletter
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Stay ahead of the curve with the latest compliance
                    insights, regulatory updates, and legal guidance
                    delivered to your inbox.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        data-testid="input-newsletter-email"
                      />
                      <Button
                        data-testid="button-subscribe"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Join 2K+ business professionals who stay compliant
                      and ahead of the curve
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}