import BlogHeader from "@/components/layout/BlogHeader";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Search, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding NDPR Compliance for Nigerian Startups",
    excerpt: "A comprehensive guide to navigating Nigeria's Data Protection Regulation and ensuring your startup stays compliant.",
    category: "Data Protection",
    date: "2024-01-15",
    readTime: "5 min read",
    author: "Mustarred Team",
    featured: true
  },
  {
    id: 2,
    title: "CBN's New Fintech Guidelines: What You Need to Know",
    excerpt: "Breaking down the Central Bank of Nigeria's latest fintech regulations and their impact on digital financial services.",
    category: "Banking & Finance",
    date: "2024-01-10",
    readTime: "7 min read",
    author: "Mustarred Team",
    featured: false
  },
  {
    id: 3,
    title: "ISO 27001 Certification: A Step-by-Step Guide",
    excerpt: "Learn how to achieve ISO 27001 certification for your business and strengthen your information security management.",
    category: "Compliance",
    date: "2024-01-05",
    readTime: "6 min read",
    author: "Mustarred Team",
    featured: false
  },
  {
    id: 4,
    title: "Corporate Governance Best Practices for African Startups",
    excerpt: "Essential governance frameworks and practices that every African startup should implement for sustainable growth.",
    category: "Corporate Governance",
    date: "2023-12-28",
    readTime: "8 min read",
    author: "Mustarred Team",
    featured: false
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Legal</span> Insights & <span className="text-primary">Updates</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Stay informed with expert insights on compliance, regulations, and legal best practices for African businesses.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover-elevate">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="w-fit">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.date)}
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = `/blog/${post.id}`}
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
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
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