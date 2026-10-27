import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useModal } from "@/contexts/ModalContext";
import { BlogPost } from "@/data/blog-types";
import { blogPosts as staticPosts } from "@/data/blog-posts";
import { getWPPosts } from "@/lib/wordpress";

type Guide = {
    id?: string;
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    features: string[];
    proof: string;
    modalDescription: string;
};

const guides: Guide[] = [
    {
        image: "/assets/images/blog/gaidCanva.png",
        imageAlt: "GAID Guidelines",
        title: "Are You GAID-Ready?",
        description: "Essential GAID 2025 Guidelines for DPOs and SMEs",
        features: [
            "Governance Registration & Principles",
            "Technical & Security Measures",
            "Data Subject Rights Framework",
        ],
        proof: "Join 1,000+ DPOs who downloaded this",
        modalDescription: "I'd like to download the GAID 2025 Guidelines",
    },
    {
        id: "sme-guide",
        image: "/assets/images/blog/smeCanva.png",
        imageAlt: "SME Compliance Guide",
        title: "SME Compliance Guide",
        description: "Comprehensive Framework for Small & Medium Enterprises",
        features: [
            "Regulatory Requirements for SMEs",
            "Compliance Checklist & Templates",
            "Risk Assessment Framework",
        ],
        proof: "Trusted by 500+ SMEs across Africa",
        modalDescription: "I'd like to download the SME Compliance Guide",
    },
];

function filterPosts(posts: BlogPost[], searchTerm: string) {
    const query = searchTerm.toLowerCase();
    return posts.filter(
        (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query),
    );
}

export default function Insights() {
    const { openModal } = useModal();
    const [searchTerm, setSearchTerm] = useState("");
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [latestError, setLatestError] = useState(false);
    const [refreshAttempt, setRefreshAttempt] = useState(0);

    useEffect(() => {
        let isCurrentRequest = true;
        setLoadingLatest(true);
        setLatestError(false);

        getWPPosts()
            .then((posts) => {
                if (isCurrentRequest) setLatestPosts(posts);
            })
            .catch((error: unknown) => {
                if (!isCurrentRequest) return;
                console.error("Failed to fetch latest insights:", error);
                setLatestError(true);
            })
            .finally(() => {
                if (isCurrentRequest) setLoadingLatest(false);
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [refreshAttempt]);

    const filteredLatest = useMemo(
        () => filterPosts(latestPosts, searchTerm),
        [latestPosts, searchTerm],
    );
    const filteredStatic = useMemo(
        () => filterPosts(staticPosts, searchTerm),
        [searchTerm],
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-24">
                <section className="border-b border-gray-100 pb-12 pt-2 sm:pb-14" style={{ background: 'radial-gradient(ellipse at 30% 40%, #2a1a4a 0%, #1a0d33 60%, #0d0520 100%)' }}>
                    <div className="mx-auto max-w-7xl">
                        <Breadcrumbs
                            crumbs={[
                                { label: "Insights & Updates" },
                            ]}
                        />
                        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-end md:gap-12 md:px-8">
                            <div>
                                <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                                    Our Insights and Updates
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                                    Stay informed with expert insights on compliance, regulations, and governance best practices for African businesses.
                                </p>
                            </div>
                            <div>
                                <label
                                    htmlFor="insights-search"
                                    className="mb-2 block text-sm font-semibold text-gray-200"
                                >
                                    Search articles...
                                </label>
                                <div className="relative">
                                    <Search
                                        aria-hidden="true"
                                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                                    />
                                    <Input
                                        id="insights-search"
                                        type="search"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        className="h-12 rounded-lg border-gray-300 bg-white pl-11 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="latest-heading"
                    className="bg-white py-12 sm:py-16 md:py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <h2
                            id="latest-heading"
                            className="mb-8 text-2xl font-semibold tracking-tight text-gray-950 sm:mb-10 sm:text-3xl"
                        >
                            Latest
                        </h2>

                        {loadingLatest ? (
                            <LatestLoadingState />
                        ) : latestError ? (
                            <div
                                role="alert"
                                className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:p-6"
                            >
                                <p className="text-base text-gray-700">
                                    Unable to load latest articles right now. Please try again later.
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setRefreshAttempt((attempt) => attempt + 1)}
                                    className="shrink-0"
                                >
                                    Try again
                                </Button>
                            </div>
                        ) : filteredLatest.length === 0 ? (
                            <div className="border-y border-gray-200 py-8">
                                <p className="text-base text-gray-600">
                                    {searchTerm
                                        ? "No latest articles match your search."
                                        : "No latest articles yet. Check back soon."}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <LeadArticle key={filteredLatest[0].id} post={filteredLatest[0]} />
                                {filteredLatest.length > 1 && (
                                    <div className="mt-10 grid gap-x-10 md:grid-cols-2 md:gap-x-12">
                                        {filteredLatest.slice(1).map((post) => (
                                            <LatestArticleRow key={post.id} post={post} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                <section
                    aria-labelledby="more-articles-heading"
                    className="border-t border-gray-100 bg-white py-12 sm:py-16"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <h2
                            id="more-articles-heading"
                            className="mb-7 text-2xl font-semibold tracking-tight text-gray-950 sm:mb-9 sm:text-3xl"
                        >
                            More Articles
                        </h2>
                        {filteredStatic.length === 0 ? (
                            <div className="border-y border-gray-200 py-8">
                                <p className="text-base text-gray-600">
                                    No articles match your search.
                                </p>
                            </div>
                        ) : (
                            <div className="border-t border-gray-200">
                                {filteredStatic.map((post) => (
                                    <ArchiveArticleRow key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section
                    aria-labelledby="guides-heading"
                    className="bg-gray-50 py-12 sm:py-16 md:py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-sm font-semibold text-primary">
                                    Free Resources
                                </p>
                                <h2
                                    id="guides-heading"
                                    className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl"
                                >
                                    Essential Compliance Guides
                                </h2>
                            </div>
                            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-right">
                                Download our comprehensive guides to stay ahead of regulatory requirements
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                            {guides.map((guide) => (
                                <GuideCard
                                    key={guide.id ?? guide.title}
                                    guide={guide}
                                    onDownload={() =>
                                        openModal("Free Resources", guide.modalDescription)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function LeadArticle({ post }: { post: BlogPost }) {
    const [imageUnavailable, setImageUnavailable] = useState(false);
    const hasImage = Boolean(post.image) && !imageUnavailable;

    return (
        <article
            className={`grid overflow-hidden rounded-2xl border border-gray-200 bg-white ${
                hasImage ? "lg:grid-cols-[1.08fr_0.92fr]" : "grid-cols-1"
            }`}
        >
            {hasImage && (
                <div className="aspect-[16/9] bg-gray-100 lg:aspect-auto lg:min-h-[23rem]">
                    <PostImage
                        post={post}
                        loading="eager"
                        className="h-full w-full object-contain lg:min-h-[23rem]"
                        onUnavailable={() => setImageUnavailable(true)}
                    />
                </div>
            )}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                <ArticleCategory category={post.category} />
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl">
                    <ArticleTitleLink post={post} />
                </h3>
                {post.excerpt.trim() && (
                    <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-gray-700">
                        {post.excerpt}
                    </p>
                )}
                <div className="mt-5">
                    <ArticleMeta post={post} />
                </div>
                <ArticleReadMore post={post} className="mt-6" />
            </div>
        </article>
    );
}

function LatestArticleRow({ post }: { post: BlogPost }) {
    return (
        <article className="border-t border-gray-200 py-6 first:border-t-0 md:first:border-t">
            <ArticleCategory category={post.category} />
            <h3 className="mt-3 text-xl font-semibold leading-snug text-gray-950">
                <ArticleTitleLink post={post} />
            </h3>
            <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-gray-700">
                {post.excerpt}
            </p>
            <div className="mt-3">
                <ArticleMeta post={post} />
            </div>
            <ArticleReadMore post={post} className="mt-4" />
        </article>
    );
}

function ArchiveArticleRow({ post }: { post: BlogPost }) {
    return (
        <article className="flex flex-col gap-5 border-b border-gray-200 py-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-8 sm:py-7">
            <div className="min-w-0 flex-1">
                <ArticleCategory category={post.category} />
                <h3 className="mt-2 text-lg font-semibold leading-snug text-gray-950 sm:text-xl">
                    <ArticleTitleLink post={post} />
                </h3>
                <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-gray-700">
                    {post.excerpt}
                </p>
                <div className="mt-3">
                    <ArticleMeta post={post} />
                </div>
                <ArticleReadMore post={post} className="mt-3" />
            </div>
            <PostImage
                post={post}
                className="h-full w-full object-cover"
                containerClassName="hidden aspect-[16/9] w-48 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:block"
            />
        </article>
    );
}

function ArticleTitleLink({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.id}?from=insights`}
            className="transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            {post.title}
        </Link>
    );
}

function ArticleReadMore({ post, className = "" }: { post: BlogPost; className?: string }) {
    return (
        <Link
            href={`/blog/${post.id}?from=insights`}
            aria-label={`Read More: ${post.title}`}
            className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
        >
            Read More
            <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
        </Link>
    );
}

function ArticleCategory({ category }: { category: BlogPost["category"] }) {
    return (
        <p className="text-sm font-medium text-gray-600">
            {category}
        </p>
    );
}

function ArticleMeta({ post }: { post: BlogPost }) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
                <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString()}
            </span>
            {post.readTime && (
                <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                    {post.readTime}
                </span>
            )}
        </div>
    );
}

function PostImage({
    post,
    className,
    containerClassName,
    loading = "lazy",
    onUnavailable,
}: {
    post: BlogPost;
    className: string;
    containerClassName?: string;
    loading?: "eager" | "lazy";
    onUnavailable?: () => void;
}) {
    const [imageUnavailable, setImageUnavailable] = useState(false);

    if (!post.image || imageUnavailable) return null;

    const image = (
        <img
            src={post.image}
            alt={`${post.title} article cover`}
            className={className}
            loading={loading}
            decoding="async"
            onError={() => {
                setImageUnavailable(true);
                onUnavailable?.();
            }}
        />
    );

    return containerClassName ? (
        <div className={containerClassName}>{image}</div>
    ) : (
        image
    );
}

function LatestLoadingState() {
    return (
        <div role="status" aria-label="Loading latest articles">
            <p className="mb-5 text-base text-gray-600">Loading latest articles...</p>
            <div
                aria-hidden="true"
                className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-2"
            >
                <div className="min-h-64 bg-gray-100 sm:min-h-80" />
                <div className="space-y-5 p-6 sm:p-8 lg:p-10">
                    <div className="h-4 w-28 rounded bg-gray-100" />
                    <div className="h-8 w-4/5 rounded bg-gray-100" />
                    <div className="h-4 w-full rounded bg-gray-100" />
                    <div className="h-4 w-11/12 rounded bg-gray-100" />
                    <div className="h-4 w-2/3 rounded bg-gray-100" />
                </div>
            </div>
            <div className="mt-7 grid gap-8 md:grid-cols-2">
                <div className="space-y-4 border-t border-gray-200 pt-6">
                    <div className="h-4 w-24 rounded bg-gray-100" />
                    <div className="h-6 w-3/4 rounded bg-gray-100" />
                    <div className="h-4 w-full rounded bg-gray-100" />
                </div>
                <div className="space-y-4 border-t border-gray-200 pt-6">
                    <div className="h-4 w-24 rounded bg-gray-100" />
                    <div className="h-6 w-4/5 rounded bg-gray-100" />
                    <div className="h-4 w-11/12 rounded bg-gray-100" />
                </div>
            </div>
            <span className="sr-only">Loading latest articles...</span>
        </div>
    );
}

function GuideCard({ guide, onDownload }: { guide: Guide; onDownload: () => void }) {
    return (
        <Card
            id={guide.id}
            className="overflow-hidden rounded-2xl border-gray-200 bg-white shadow-sm"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                    src={guide.image}
                    alt={guide.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                />
                <div className="absolute right-4 top-4 flex gap-2">
                    <Badge className="no-default-hover-elevate border-0 bg-primary px-3 py-1 text-white">
                        Featured
                    </Badge>
                    <Badge
                        variant="outline"
                        className="no-default-hover-elevate border-white/80 bg-white/95 px-3 py-1 text-gray-800"
                    >
                        Free
                    </Badge>
                </div>
            </div>
            <div className="flex h-full flex-col p-5 sm:p-7">
                <h3 className="text-xl font-semibold leading-snug text-gray-950 sm:text-2xl">
                    {guide.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                    {guide.description}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                    {guide.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-base text-gray-700">
                            <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <Button type="button" className="w-full" onClick={onDownload}>
                        Download Guide
                    </Button>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        {guide.proof}
                    </p>
                </div>
            </div>
        </Card>
    );
}
