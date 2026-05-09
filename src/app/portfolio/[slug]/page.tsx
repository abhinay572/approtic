import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description,
    author: { "@type": "Organization", name: "Approtic" },
    publisher: { "@type": "Organization", name: "Approtic", url: "https://approtic.in" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <Section className="pt-32 pb-0">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-muted hover:text-text text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        {/* Hero cover */}
        <div
          className={`h-72 rounded-3xl bg-gradient-to-br ${project.color} flex items-end p-8 mb-10`}
        >
          <div>
            <Badge variant="accent" className="mb-3">{project.category}</Badge>
            <p className="font-display font-bold text-4xl text-text">{project.metric}</p>
          </div>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-muted text-sm font-medium mb-2">Client: {project.client}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">
            {project.title}
          </h1>
          <p className="text-muted text-xl leading-relaxed">{project.description}</p>
        </div>

        {/* Case study body */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-16">
          {[
            { label: "The Problem", body: project.problem, color: "border-red-500/30" },
            { label: "Our Solution", body: project.solution, color: "border-accent/30" },
            { label: "The Result", body: project.result, color: "border-success/30" },
          ].map((block) => (
            <div
              key={block.label}
              className={`border-l-2 ${block.color} pl-5 flex flex-col gap-3`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                {block.label}
              </p>
              <p className="text-text leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
        </div>

        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="gradient" size="lg">
              View live project <ExternalLink size={16} />
            </Button>
          </a>
        )}
      </Section>

      <CTABanner />
    </>
  );
}
