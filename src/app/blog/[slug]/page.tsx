import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, html } = post;
  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[currentIdx + 1] ?? null;
  const next = allPosts[currentIdx - 1] ?? null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Organization", name: "Approtic" },
    publisher: { "@type": "Organization", name: "Approtic", url: "https://approtic.in" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Section className="pt-32 pb-10" tight>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted hover:text-text text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-6">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="accent">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text leading-tight mb-4">
          {meta.title}
        </h1>
        <p className="text-muted text-xl mb-6">{meta.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {meta.readingTime}
          </div>
          <span>·</span>
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          <span>·</span>
          <span>Approtic Team</span>
        </div>

        {/* Blog content (compiled to HTML at build time — Workers-safe) */}
        <article
          className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text prose-p:text-muted prose-a:text-accent prose-code:text-accent-2 prose-pre:bg-surface prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Prev/Next nav */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-6">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="flex flex-col gap-1 group">
              <span className="text-xs text-muted">← Previous</span>
              <span className="text-text text-sm font-medium group-hover:text-accent transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="flex flex-col gap-1 text-right group">
              <span className="text-xs text-muted">Next →</span>
              <span className="text-text text-sm font-medium group-hover:text-accent transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}
