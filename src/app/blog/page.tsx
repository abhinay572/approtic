import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Insights on AI engineering, product development, SEO, and startup growth from the Approtic team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Blog"
        title="Insights from the studio"
        description="Technical deep-dives, product lessons, and growth frameworks from building with AI."
      />

      {posts.length === 0 ? (
        <p className="text-muted text-center py-12">Posts coming soon — check back shortly.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card hover className="h-full flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="accent">{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-text leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted pt-2">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </div>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read post <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
