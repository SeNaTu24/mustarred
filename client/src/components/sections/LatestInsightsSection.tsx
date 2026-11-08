import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@/data/blog-types";
import { getWPPosts } from "@/lib/wordpress";
import "./LatestInsightsSection.css";

const RELEVANCE = /data protection|privacy|compliance|regulat|governance|business growth|startup|corporate|ndpr|ndpa|gdpr/i;

function selectInsights(posts: BlogPost[]): BlogPost[] {
  return [...posts]
    .sort((a, b) => {
      const aRelevant = RELEVANCE.test(`${a.category} ${a.title} ${a.excerpt}`) ? 1 : 0;
      const bRelevant = RELEVANCE.test(`${b.category} ${b.title} ${b.excerpt}`) ? 1 : 0;
      if (aRelevant !== bRelevant) return bRelevant - aRelevant;
      return b.date.localeCompare(a.date);
    })
    .slice(0, 3);
}

function formatPublishedDate(dateString: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LatestInsightsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus("loading");

    getWPPosts()
      .then((articles) => {
        if (!active) return;
        setPosts(selectInsights(articles));
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!active) return;
        console.error("Failed to load homepage insights:", error);
        setPosts([]);
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  return (
    <section className="home-insights" aria-labelledby="latest-insights-heading">
      <div className="home-insights__inner">
        <div className="home-insights__header">
          <div>
            <h2 id="latest-insights-heading">
              Insights for businesses building in <span>Africa.</span>
            </h2>
            <p className="home-insights__lede">
              Practical perspectives on compliance, data protection, regulation, and business growth across Africa and beyond.
            </p>
          </div>
          <Link href="/our-insights" className="home-insights__all">
            View all insights <span aria-hidden="true">→</span>
          </Link>
        </div>

        {status === "loading" && (
          <div className="home-insights__grid" aria-busy="true" aria-live="polite">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="home-insights__skeleton" key={index} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="home-insights__state" role="alert">
            <p>Unable to load the latest articles right now.</p>
            <button type="button" onClick={() => setAttempt((value) => value + 1)}>
              Try again
            </button>
          </div>
        )}

        {status === "ready" && posts.length === 0 && (
          <div className="home-insights__state">
            <p>No insights are published yet. Check back soon.</p>
          </div>
        )}

        {status === "ready" && posts.length > 0 && (
          <div className="home-insights__grid">
            {posts.map((post) => (
              <InsightCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function InsightCard({ post }: { post: BlogPost }) {
  const [imageFailed, setImageFailed] = useState(false);
  const published = formatPublishedDate(post.date);
  const readTime = post.readTime && !post.readTime.startsWith("0 ") ? post.readTime : "";
  const href = `/blog/${post.id}?from=insights`;
  const showImage = Boolean(post.image) && !imageFailed;

  return (
    <article className="home-insights__card">
      <Link href={href} className="home-insights__media" tabIndex={-1} aria-hidden="true">
        {showImage ? (
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="home-insights__media-fallback" />
        )}
        {post.category && <span className="home-insights__category">{post.category}</span>}
      </Link>
      <div className="home-insights__body">
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="home-insights__meta">
          {published && (
            <span>
              <Calendar aria-hidden="true" />
              <time dateTime={post.date}>{published}</time>
            </span>
          )}
          {readTime && (
            <span>
              <Clock aria-hidden="true" />
              {readTime}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
